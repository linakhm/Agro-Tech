package com.example.agrotechsolutions.services;

import com.example.agrotechsolutions.entities.InventaireInitial;
import com.example.agrotechsolutions.entities.Vendor;
import com.example.agrotechsolutions.entities.vendorType;
import com.example.agrotechsolutions.repositories.VendorRepo;
import com.example.agrotechsolutions.services.email.MailSender;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.webjars.NotFoundException;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Slf4j
public class VendorServicesImpl implements VendorServices {
    @Autowired
    VendorRepo vendorRepo;
    @Autowired
    private MailSender mailSender;
    @Override
    public Vendor addVendor(Vendor vendor) {
        return vendorRepo.save(vendor);
    }
    @Override
        public Vendor updateVendor(String id, Vendor vendor) {
            Vendor existingVendor = retrieveVendorById(id);
            if (existingVendor == null) {
                throw new IllegalArgumentException("Invalid vendor ID: " + id);
            }
            existingVendor.setName(vendor.getName());
            existingVendor.setType(vendor.getType());
            existingVendor.setCurrencyCode(vendor.getCurrencyCode());
            existingVendor.setPaymentTerm(vendor.getPaymentTerm());
            existingVendor.setAddress(vendor.getAddress());
            existingVendor.setCodeCity(vendor.getCodeCity());
            existingVendor.setNameCity(vendor.getNameCity());
            existingVendor.setWilayaName(vendor.getWilayaName());
            existingVendor.setPhone(vendor.getPhone());
            existingVendor.setEmail(vendor.getEmail());
            existingVendor.setCode(vendor.getCode());
            existingVendor.setShippingAddress(vendor.getShippingAddress());
            existingVendor.setShippingCity(vendor.getShippingCity());

            // Save the updated vendor object to the database
            return vendorRepo.save(existingVendor);
        }



    @Override
    public Vendor retrieveVendorById(String idVendor) {
     //   return vendorRepo.findById(idVendor).get();
        Optional<Vendor> vendorOptional = vendorRepo.findById(idVendor);
        // Check if a value is present in the Optional
        if (vendorOptional.isPresent()) {
            return vendorOptional.get(); // Return the Vendor if it exists
        } else {
            // Handle the case when no Vendor is found with the given ID
            throw new NoSuchElementException("Vendor with ID " + idVendor + " not found.");
        }
    }




    @Override
    public void deleteVendor(String idVendor) {

        vendorRepo.deleteById(idVendor);
    }
    @Override
    public Page<Vendor> getpages(int pageSize, int pageNumber, String filter) {
        Pageable pageable = PageRequest.of(pageSize,pageNumber);
        Page<Vendor> result = vendorRepo.findByIsDeletedAndNameContainingIgnoreCase(false,filter,pageable);
        return result;

    }

   /* @Override
    public Page<Vendor> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return vendorRepo.findAll(pageable);
    }*/

  /*  @Override
    public Page<Vendor> findAll(int page, int size, String sortField, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending() :
                Sort.by(sortField).descending();
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        return vendorRepo.findAll(pageable);
    }*/
    @Override
    public void ExportVendorsToCsv(HttpServletResponse servletResponse) throws IOException {
        List<Vendor> vendors = vendorRepo.findAll();

        String filename = "Vendors.csv";
        String csvContent = ConvertVendorsToCsv(vendors);

        servletResponse.setContentType("text/csv");
        servletResponse.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + filename);

        servletResponse.getOutputStream().print(csvContent);
    }

    @Override
    public String ConvertVendorsToCsv(List<Vendor> vendors) throws IOException {
        StringWriter writer = new StringWriter();
        CSVFormat format = CSVFormat.DEFAULT
                .withHeader("Name", "Email","Type", "Phone","City Name","Currency Code","Shipping Adress")
                .withDelimiter(';');
        try (CSVPrinter csvPrinter = new CSVPrinter(writer, format)) {
            for (Vendor vendor : vendors) {
                csvPrinter.printRecord(vendor.getName(),vendor.getEmail(), vendor.getType(),vendor.getPhone(), vendor.getNameCity(), vendor.getCurrencyCode(), vendor.getShippingAddress()
                );
            }
        } catch (IOException e) {
            log.error("Error while writing CSV", e);
        }

        return writer.toString();
    }



    @Override
    public List<Vendor> searchVendors(String name, String namecity) {

        if (name == null && namecity == null) {
            // If no criteria is provided, return all vendors
            return vendorRepo.findAll();
        } else if (name != null && namecity == null) {
            // If only name criteria is provided, search by name
            return vendorRepo.findByNameContainingIgnoreCase(name);
        } else if (name == null && namecity != null) {
            // If only city criteria is provided, search by city
            return vendorRepo.findByNameCityContainingIgnoreCase(namecity);
        } else {
            // If both name and city criteria are provided, search by both
            return vendorRepo.findByNameContainingIgnoreCaseAndNameCityContainingIgnoreCase(name, namecity);
        }

    }
    @Override
    public Page<Vendor> getArchivedVendors(int pageSize, int pageNumber, String filter) {
        Pageable pageable = PageRequest.of(  pageNumber,pageSize,Sort.by("name").ascending());
        Page<Vendor> result =  vendorRepo.findByIsDeletedAndNameContainingIgnoreCase(true, filter,pageable);

        return result;    }
    @Override
    public void archiveVendor(String id) throws NotFoundException {
        Optional<Vendor> groOptional =  vendorRepo.findById(id);
        Vendor groExisting = groOptional.get();
        groExisting.setIsDeleted(true);
        vendorRepo.save(groExisting);
    }

    @Override
    public void desarchiveVendor(String id) throws NotFoundException {
        Optional<Vendor> groOptional =  vendorRepo.findById(id);
        Vendor groExisting = groOptional.get();
        groExisting.setIsDeleted(false);
        vendorRepo.save(groExisting);
    }
    @Override
    public void generatePdf(HttpServletResponse servletResponse) throws IOException {
        List<Vendor> fournisseurs = vendorRepo.findAll(); // Fetch inventaires from the repository
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        // Initialize PDF writer and document
        PdfWriter writer = new PdfWriter(outputStream);
        PdfDocument pdf = new PdfDocument(new PdfWriter(outputStream));
        Document doc = new Document(pdf, PageSize.A4);

// Set up fonts
        PdfFont font = PdfFontFactory.createFont();

        // Add a title to the PDF
        Paragraph title = new Paragraph("Fournisseurs")
                .setFont(font)
                .setFontSize(24)
                .setMarginTop(20)
                .setMarginBottom(20);
        doc.add(title);

        int itemNumber = 1; // Initialize a counter for item numbers
        for (Vendor fournisseur : fournisseurs) {
            // Create a Paragraph for the item number and apply underline
            Paragraph itemNumberParagraph = new Paragraph("Fournisseur N° " + itemNumber);
            itemNumberParagraph.setUnderline(); // Apply underline
            doc.add(itemNumberParagraph);
            doc.add(new Paragraph("Name: " + fournisseur.getName()));
            doc.add(new Paragraph("Email: " + fournisseur.getEmail()));
            doc.add(new Paragraph("Type: " + fournisseur.getType()));
            doc.add(new Paragraph("Phone: " + fournisseur.getPhone()));
            doc.add(new Paragraph("City name: " + fournisseur.getNameCity()));
            doc.add(new Paragraph("Curency code: " + fournisseur.getCurrencyCode()));
            doc.add(new Paragraph("Shipping adress: " + fournisseur.getShippingAddress()));

            // Add more fields as needed
            doc.add(new Paragraph("\n")); // Add some space between inventaires
            itemNumber++;
        }
        // Close the PDF document
        doc.close();

        // Set the response headers
        servletResponse.setContentType("application/pdf");
        servletResponse.setHeader("Content-Disposition", "attachment; filename=Fournisseurs.pdf");

        // Write the PDF content to the response output stream
        servletResponse.getOutputStream().write(outputStream.toByteArray());
    }
    @Override
    //@Scheduled(cron = "0 * * * * ?")
    @Scheduled(cron = "0 0 8 * * MON") // Schedule to run every Monday at 8 AM
    public void sendEmailVendorReport() {

        try {
            List<Vendor> archivedVendors = vendorRepo.findByIsDeleted(true);

            String subject = "Weekly Vendor Archive Report";
            String body = "Archived Vendors:\n";
            for (Vendor item : archivedVendors) {
                body += "Name: " + item.getName() + "\n";
                body += "Type : " + item.getType() + "\n";
                body += "Phone: " + item.getPhone() + "\n";
                body += "City name : " + item.getNameCity() + "\n";
                body += "Currency code: " + item.getCurrencyCode() + "\n";

            }

            // Send the email
            String adminEmail = "liliyyy1758@gmail.com"; // Admin's mail
            mailSender.sendEmail(adminEmail, subject, body);
            log.info("***********mail sent ");
        } catch (Exception e) {
            // Handle exceptions if needed
            log.error("***************Error sending email:", e);

        }
    }

    @Override
    public ResponseEntity<Void> importCSV(MultipartFile file) {
        if (file == null) {
            return ResponseEntity.badRequest().build();
        }

        try (InputStream inputStream = file.getInputStream();
             Reader reader = new InputStreamReader(inputStream);
             CSVReader csvReader = new CSVReaderBuilder(reader)
                     .withCSVParser(new CSVParserBuilder().withSeparator(';').build())
                     .build()) {

            // Read all the rows from the CSV file
            List<String[]> rows = csvReader.readAll();

            // Check if the CSV has at least one row (header + data)
            if (rows.size() < 2) {
                return ResponseEntity.badRequest().build();
            }

            // Process and save each row of data to MongoDB
            for (int i = 1; i < rows.size(); i++) { // Start from index 1 to skip the header row
                String[] row = rows.get(i);

                // Trim leading and trailing spaces from each cell
                for (int j = 0; j < row.length; j++) {
                    row[j] = row[j].trim();
                }
                System.out.println("Row Data: " + Arrays.toString(row));

                if (row.length != 7) {
                    System.err.println("Error: Row at index " + i + " has insufficient columns: " + Arrays.toString(row));
                    continue; // Skip this row
                }

                // Create an instance of your MongoDB document class
                Vendor document = new Vendor();

                String Name = row[0];
                if (!Name.isEmpty()) {
                    document.setName(Name);
                }
                String Email = row[1];
                if (!Email.isEmpty()) {
                    document.setEmail(Email);
                }

                String Type = row[2];
                if (!Type.isEmpty()) {
                    try {
                        document.setType(vendorType.valueOf(Type));
                    } catch (IllegalArgumentException e) {
                        // Handle the case where the enum value is not valid
                        System.err.println("Error: Invalid vendorType at index " + i + ": " + Type);
                        continue; // Skip this row
                    }
                }


                String Phone = row[3];
                if (!Phone.isEmpty()) {
                    document.setPhone(Phone);
                }

                String CityName = row[4];
                if (!CityName.isEmpty()) {
                    document.setNameCity(CityName); // Fixed setter method name
                }

                String CurrencyCode = row[5];
                if (!CurrencyCode.isEmpty()) {
                    document.setCurrencyCode(CurrencyCode);
                }
                String ShippingAddress = row[6];
                if (!ShippingAddress.isEmpty()) {
                    document.setShippingAddress(ShippingAddress);
                }
                vendorRepo.save(document);
            }

            log.info("*********************import called in backend");

            // Return a success response
            return ResponseEntity.ok().build();
        } catch (IOException | CsvException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    // ...
}

