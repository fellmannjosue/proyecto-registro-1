import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Registro } from '../models/registro.model';
import { RegistroService } from '../services/registros.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';


import { TDocumentDefinitions } from 'pdfmake/interfaces';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  displayedColumns: string[] = ['identificacion', 'idInventario', 'modelo', 'serie', 'direccionIp', 'usuario', 'adminEntrego', 'fechaEntrega'];
  dataSource = new MatTableDataSource<Registro>();

  constructor(private registroService: RegistroService, private router: Router) { }

  ngOnInit(): void {
    this.registroService.getRegistros().subscribe((registros) => {
      const registrosConFechas = registros.map((registro) => {
        return { ...registro, fechaEntrega: moment(registro.fechaEntrega).toDate() };
      });
      this.dataSource.data = registrosConFechas;
      console.log(this.dataSource.data); // Añadir esta línea para verificar los registros y las fechas
    });
  }
  
  

  exportarPDF(): void {
    const columnHeaders = this.displayedColumns.map((column) => column.toUpperCase());
    const tableData = this.dataSource.data.map((registro) => Object.values(registro));

    const docDefinition: TDocumentDefinitions = {
      pageOrientation: 'landscape',
      content: [
        { text: 'Reporte de Registros', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%'],
            body: [columnHeaders, ...tableData],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 14, // Cambiar aquí
          bold: true,
          margin: [0, 0, 0, 0],
        },
      },
    };
    
    pdfMake.createPdf(docDefinition).download('registros.pdf');
    
    
    pdfMake.createPdf(docDefinition).download('registros.pdf');
    

    pdfMake.createPdf(docDefinition).download('registros.pdf');
  }
  exportarExcel(): void {
    const registrosArray = this.dataSource.data.map((registro) => {
      return Object.values(registro);
    });

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(registrosArray);
    XLSX.utils.book_append_sheet(wb, ws, 'Registros');
    XLSX.writeFile(wb, 'registros.xlsx');
  }

}
