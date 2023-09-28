package com.example.agrotechsolutions.services;

import com.example.agrotechsolutions.entities.ExternalTransfer;
import com.example.agrotechsolutions.entities.InventaireInitial;
import com.example.agrotechsolutions.entities.Vendor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.webjars.NotFoundException;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public interface InventaireInitialServices {
    public InventaireInitial addInventaireInitial(InventaireInitial inventaireInitial);
    Page<InventaireInitial> getpagesInventaireInitial(int pageSize, int pageNumber, String filter) ;
    Page<InventaireInitial> getpagesarchive(int pageSize, int pageNumber, String filter) ;
    public void archiveInventaireInitial(String id) throws NotFoundException;
    public void desarchiveInventaireInitial(String id) throws NotFoundException;
    public void deleteInventaireInitial(String id);
    public void ExportInventaireInitialToCsv(HttpServletResponse servletResponse) throws IOException;
    public String ConvertInventaireInitialToCsv(List<InventaireInitial> inventaires) throws IOException ;
    public ResponseEntity<Void> importCSV(MultipartFile file) ;
    public void generatePdf(HttpServletResponse servletResponse) throws IOException ;
    public void sendEmailInventaireInitialReport() ;
    public List<InventaireInitial> searchInventairesInitiaux( Float price,String name);

//searchInternals
    }
