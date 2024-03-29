import { environment } from './../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: Usuario = new Usuario();
  idUser: number
  confirmarSenha: string
  tipoUsuario: string


  constructor(
    private authService : AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(){

  window.scroll(0,0)

    if(environment.token == '') {
      alert('Sua seção expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value;
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value;
  }

  atualizar(){
    this.user.tipo = this.tipoUsuario

    if(this.user.senha != this.confirmarSenha){
      alert('A senha está incorreta.')

    }else{
      this.authService.cadastrar(this.user).subscribe((resp: Usuario) => {
        this.user = resp;
        this.router.navigate(['/inicio']);
        alert('Usuário atualizado com sucesso!, faça o login novamente');
        environment.token = '';
        environment.foto = '';
        environment.id = 0;
        environment.tipo = '';
        environment.nome = '';

        this.router.navigate(['/entrar'])
      });
    }
  }

  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: Usuario) => {
      this.user = resp
    })
    }
}
