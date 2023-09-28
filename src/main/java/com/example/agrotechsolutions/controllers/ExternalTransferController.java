package com.example.agrotechsolutions.controllers;

import com.example.agrotechsolutions.entities.ExternalTransfer;
import com.example.agrotechsolutions.entities.Product;
import com.example.agrotechsolutions.services.ExternalTransferServices;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("/externals")
public class ExternalTransferController {

    @Autowired
    ExternalTransferServices externalTransferServices;

    @GetMapping("/transferslist")

    public ResponseEntity<Page<ExternalTransfer>> getExternalsPage(

            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "4") int size)
    //  @RequestParam(defaultValue = "name") String sortField,
    // @RequestParam(defaultValue = "asc") String sortDir)
    {
        {

            // Retrieve the paginated and sorted list
            Page<ExternalTransfer> externalTransferPage = externalTransferServices.findAll(page, size);
            // Return the list of vendors with HTTP status 200 OK
            return ResponseEntity.ok().body(externalTransferPage);

        }

    }

 /*   @GetMapping("/transfers-Csv")
    public void ExportProductsToCsv(HttpServletResponse servletResponse) throws java.io.IOException {
        externalTransferServices.ExportProductsToCsv(servletResponse);

    }
*/
    @PostMapping("/addExternalTransfer")
    public ExternalTransfer addExternalTransfer(@RequestBody ExternalTransfer externalTransfer) {
        return externalTransferServices.addExternalTransfer(externalTransfer);

    }

    @PutMapping("/updateExternalTransfer/{id}")
    @ResponseBody
    public Map<String, Object> updateExternalTransfer(@PathVariable("id") String id, @RequestBody ExternalTransfer externalTransfer) {
        ExternalTransfer updatedExternalTransfer = externalTransferServices.updateExternalTransfer(id, externalTransfer);
        Map<String, Object> response = new HashMap<>();
        response.put("externalTransfer", updatedExternalTransfer);
        return response;

    }

    @DeleteMapping("/deleteExternalTransfer/{id}")

    public void deleteExternalTransfer(@PathVariable("id") String id) {
        externalTransferServices.deleteExternalTransfer(id);

    }

    @GetMapping("/getExternalTransfer/{id}")
    public ExternalTransfer GetExternalTransferById(@PathVariable("id") String id) {
        return externalTransferServices.retrieveExternalTransferById(id);
    }
    @GetMapping("/searchExternals")
    public ResponseEntity<List<ExternalTransfer>> searchExternals(
            @RequestParam(required = false) Float price,
            @RequestParam(required = false) String locationCode) {
        List<ExternalTransfer> externalTransfers = externalTransferServices.searchExternals(price, locationCode);
        return new ResponseEntity<>(externalTransfers, HttpStatus.OK);
    }

}
