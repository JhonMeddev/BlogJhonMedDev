import { environment } from './../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema : Tema = new Tema();
  idTema: number

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    if(environment.token == '') {
      alert('Sua seção expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }

    this.idTema = this.route.snapshot.params['id']
    this.findByIdTema(this.idTema)
  }

  findByIdTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  apagar(){
    this.temaService.deleteTema(this.idTema).subscribe(() => {
      alert('Tema Apagado')
      this.router.navigate(['/tema'])
    })
  }

}
