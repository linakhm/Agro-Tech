package com.example.agrotechsolutions.services;

import com.example.agrotechsolutions.entities.ExternalTransfer;
import com.example.agrotechsolutions.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public interface ExternalTransferServices {

    public ExternalTransfer addExternalTransfer(ExternalTransfer externalTransfer);
    public ExternalTransfer updateExternalTransfer( String id,ExternalTransfer externalTransfer);
    public ExternalTransfer retrieveExternalTransferById(String id);
    public void deleteExternalTransfer(String id);
    public Page<ExternalTransfer> findAll(int page, int size) ;
    public ExternalTransfer createExternalTransfer(ExternalTransfer externalTransfer) ;

    /* public List<ExternalTransfer> searchExternalTransfers(Float taxRate, String category) ;
    public void ExportExternalTransfersToCsv(HttpServletResponse servletResponse) throws IOException;
    public String ConvertExternalTransfersToCsv(List<ExternalTransfer> externalTransfers) throws IOException ;
    public void archiveExternalTransfer(String id) ;
    public void disArchiveExternalTransfer(String id) ;
    public Page<ExternalTransfer> getArchivedExternalTransfers(Pageable pageable) ;*/
    public List<ExternalTransfer> searchExternals(Float price, String locationCode) ;
 //ConvertInventaireExterneToCsv
    //ExportInventaireExterneToCsv
    //archiveInventaireExterne
    //« desarchiveInventaireExterne»
    //generatePdf
}
