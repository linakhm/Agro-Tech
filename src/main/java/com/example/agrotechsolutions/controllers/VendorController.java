package com.example.agrotechsolutions.controllers;


import com.example.agrotechsolutions.entities.InventaireInitial;
import com.example.agrotechsolutions.entities.Vendor;
import com.example.agrotechsolutions.entities.vendorType;
import com.example.agrotechsolutions.services.VendorServices;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.webjars.NotFoundException;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("/vendors")
public class VendorController {
    @Autowired
    VendorServices vendorServices;


   /* @GetMapping("/vendorslist")
    public List<Vendor> ListVendors() {
        return vendorServices.retrieveAllVendors();
    }
*/

    @GetMapping("/vendorslist")

    public ResponseEntity<?> getpages(@RequestParam(defaultValue = "5") int pageSize,
                                                 @RequestParam(defaultValue = "0") int pageNumber,
                                                 @RequestParam(defaultValue = "") String filter)

    {
        Page<Vendor> response = vendorServices.getpages(pageNumber,pageSize,  filter);
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

        @GetMapping( "/Vendors-Csv")
    public void ExportVendorsToCsv(HttpServletResponse servletResponse) throws java.io.IOException {
        vendorServices.ExportVendorsToCsv(servletResponse);
        log.info("********************* export called in backend");

    }

    @PostMapping("/addVendor")
    public Vendor addVendor(@Valid @RequestBody Vendor vendor) {
        return vendorServices.addVendor(vendor);

    }
    @PutMapping("/updateVendor/{id}")
    @ResponseBody
    public Map<String, Object> updateVendor(@PathVariable("id") String id,@RequestBody Vendor vendor)

    {
        Vendor updatedVendor = vendorServices.updateVendor(id, vendor);
        Map<String, Object> response = new HashMap<>();
        response.put("vendor", updatedVendor);
        return response;

    }
/*
    @PutMapping("/updateVendor/{id}")
    @ResponseBody
    public Map<String, Object> updateVendor(@PathVariable("id") String id,
                                            @RequestParam("name") String name,
                                            @RequestParam("type") vendorType type,
                                            @RequestParam("currencyCode") String currencyCode,
                                            @RequestParam("paymentTerm") String paymentTerm,
                                            @RequestParam("address") String address,
                                            @RequestParam("codeCity") String codeCity,
                                            @RequestParam("nameCity") String nameCity,
                                            @RequestParam("wilayaName") String wilayaName,
                                            @RequestParam("phone") String phone,
                                            @RequestParam("email") String email,
                                            @RequestParam("code") String code,
                                      //    @RequestParam("vendorSKU") String vendorSKU,
                                            @RequestParam("shippingAddress") String shippingAddress,
                                            @RequestParam("shippingCity") String shippingCity)


    {
        Vendor vendor = vendorServices.retrieveVendorById(id);
        if (vendor == null) {
            throw new IllegalArgumentException("Invalid vendor ID: " + id
            );
        }

        vendor.setName(name);
        vendor.setType(type);
        vendor.setCurrencyCode(currencyCode);
        vendor.setPaymentTerm(paymentTerm);
        vendor.setAddress(address);
        vendor.setCodeCity(codeCity);
        vendor.setNameCity(nameCity);
        vendor.setWilayaName(wilayaName);
        vendor.setPhone(phone);
        vendor.setEmail(email);
        vendor.setCode(code);
      //  vendor.setVendorSKUS(vendorSKUS);
        vendor.setShippingAddress(shippingAddress);
        vendor.setShippingCity(shippingCity);
        vendorServices.updateVendor(id,vendor);

        Map<String, Object> response = new HashMap<>();
        response.put("vendor", vendor);
        return response;
    }
*/
    @DeleteMapping("/{id}")

    public void deleteVendor(@PathVariable("id") String id) {
        vendorServices.deleteVendor(id);

    }
    @GetMapping("/getVendorById/{idVendor}")
    public Vendor GetVendorById(@PathVariable("idVendor") String id) {
        return vendorServices.retrieveVendorById(id);
    }

    @GetMapping("/searchVendors")
    public ResponseEntity<List<Vendor>> searchVendors(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String namecity) {
        List<Vendor> vendors = vendorServices.searchVendors(name, namecity);
        return new ResponseEntity<>(vendors, HttpStatus.OK);
    }

    @PostMapping("/importCSV")
    @ResponseBody
    public ResponseEntity<Void> importCSV(@RequestBody MultipartFile file) {


        return vendorServices.importCSV(file);    }

    @GetMapping("/archiver/{id}")
    public ResponseEntity<?> archive(@PathVariable String id) throws NotFoundException {
        vendorServices.archiveVendor(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/desarchiver/{id}")
    public ResponseEntity<?> setNotArchive(@PathVariable String id) throws NotFoundException {
        vendorServices.desarchiveVendor(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/archived/page")
    public ResponseEntity<?> findArchivedPage(
            @RequestParam(defaultValue = "5") int pageSize,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "") String filter
    ) {
        Page<Vendor> response = vendorServices.getArchivedVendors(pageSize, pageNumber, filter);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/pdf")
    public void exportVendorToPdf(HttpServletResponse response) throws IOException {
        // Fetch your list of inventaires from a service or repository
        vendorServices.generatePdf(response);
    }
    @GetMapping("/Mail-Archive-Report")
    public void getDailyArchiveReport() {
        vendorServices.sendEmailVendorReport();
    }
    }

