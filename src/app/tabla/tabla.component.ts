import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Registro } from '../models/registro.model';
import { RegistroService } from '../services/registros.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
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

  displayedColumns: string[] = ['identificacion', 'idInventario', 'modelo', 'serie', 'direccionIp', 'usuario', 'adminEntrego', 'fechaEntrega', 'area', 'cargo', 'acciones'];
  dataSource = new MatTableDataSource<Registro>();

  constructor(private registroService: RegistroService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.registroService.getRegistros().subscribe((registros) => {
      const registrosConFechas = registros.map((registro) => {
        return { ...registro, fechaEntrega: moment(registro.fechaEntrega).toDate() };
      });
      this.dataSource.data = registrosConFechas;
      console.log(this.dataSource.data); // Añadir esta línea para verificar los registros y las fechas
    });
  }
  editarRegistro(registro: Registro): void {
    // Navega a la ruta de edición de registros (reemplaza 'ruta-editar' con la ruta correcta en tu aplicación)
    this.router.navigate(['/ruta-editar', registro.id]);
  }
  
  eliminarRegistro(registro: Registro): void {
    // Muestra un cuadro de diálogo de confirmación antes de eliminar el registro
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { mensaje: '¿Estás seguro de que deseas eliminar los registros?' },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Si el usuario confirmó la eliminación, llama al servicio de registro para eliminar el registro
        this.registroService.eliminarRegistro(registro.id).then(() => {
          // Elimina el registro de la tabla y actualiza la vista
          const index = this.dataSource.data.findIndex((r) => r.id === registro.id);
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        });
      }
    });
  }
  
  
  

  exportarPDF(): void {
    const columnHeaders = this.displayedColumns.map((column) => column.toUpperCase());
    const tableData = this.dataSource.data.map((registro) => [
      registro.identificacion,
      registro.idInventario,
      registro.modelo,
      registro.serie,
      registro.direccionIP,
      registro.usuario,
      registro.usuarioAdmin,
      registro.cargo,
      registro.area,
      registro.fechaEntrega,
    ]);
  
    const docDefinition: TDocumentDefinitions = {
      pageOrientation: 'landscape',
      content: [
        { text: 'Reporte de Registros', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['10%', '10%', '10%', '8%', '10%', '10%', '10%', '10%', '8%', '8%','10%'],
            body: [columnHeaders, ...tableData],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 20, // Cambiar aquí
          bold: true,
          margin: [0, 0, 0, 0],
        },
      },
    };
  
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
