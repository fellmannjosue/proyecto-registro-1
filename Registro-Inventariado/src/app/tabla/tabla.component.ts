import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Registro } from '../models/registro.model';
import { RegistroService } from '../services/registros.service';
import * as XLSX from 'xlsx';
import *as pdfMakeLib from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

const pdfMake = pdfMakeLib;
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { TDocumentDefinitions, StyleDictionary, Style } from 'pdfmake/interfaces';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface CustomStyleDictionary extends StyleDictionary {
  header: Style;
}

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  displayedColumns: string[] = ['identificacion', 'idInventario', 'modelo', 'serie', 'direccionIp', 'usuario', 'adminEntrego', 'fechaEntrega'];
  dataSource = new MatTableDataSource<Registro>();

  constructor(private registroService: RegistroService) { }

  ngOnInit(): void {
    this.registroService.getRegistros().subscribe((registros) => {
      this.dataSource.data = registros;
    });
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

  exportarPDF(): void {
    const columnHeaders = this.displayedColumns.map((column) => column.toUpperCase());
    const tableData = this.dataSource.data.map((registro) => Object.values(registro));

    const docDefinition: TDocumentDefinitions = {
      content: [
        { text: 'Reporte de Registros', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [columnHeaders, ...tableData],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 14,
          bold: true,
          margin: [0, 0, 0, 0],
        },
      } as CustomStyleDictionary,
    };

    pdfMake.createPdf(docDefinition).download('registros.pdf');
  }
}
