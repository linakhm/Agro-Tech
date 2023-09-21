package com.example.agrotechsolutions.services;


import com.example.agrotechsolutions.entities.InventaireInitial;
import com.example.agrotechsolutions.entities.Vendor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.webjars.NotFoundException;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public interface VendorServices {
    public Vendor addVendor(Vendor vendor);
    public Vendor updateVendor( String id,Vendor vendor);
    public Vendor retrieveVendorById(String idVendor);
    public void deleteVendor(String idVendor);
   // public Page<Vendor> findAll(int page, int size) ;
    Page<Vendor> getpages(int pageSize, int pageNumber, String filter) ;

    public List<Vendor> searchVendors(String name, String namecity) ;
   // public Page<Vendor> findAll(int page, int size, String sortField, String sortDir) ;
    public void ExportVendorsToCsv(HttpServletResponse servletResponse) throws IOException;
    public String ConvertVendorsToCsv(List<Vendor> vendors) throws IOException ;
    Page<Vendor> getArchivedVendors(int pageSize, int pageNumber, String filter) ;
    public void archiveVendor(String id) throws NotFoundException;
    public void desarchiveVendor(String id) throws NotFoundException;
    public void generatePdf(HttpServletResponse servletResponse) throws IOException ;
    public void sendEmailVendorReport() ;
    public ResponseEntity<Void> importCSV(MultipartFile file) ;


}
