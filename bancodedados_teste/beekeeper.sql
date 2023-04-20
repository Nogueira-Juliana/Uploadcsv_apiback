create table usuarios(
	id serial primary key,
  	nome text,
  	email text not null unique,
  	senha text not null
);

create table transacoes_usuario(
	id serial primary key,
  	data_lancamento timestamp default now(),
  	saldo numeric,
    documento varchar(11) not null,
  	usuario_id int not null,

FOREIGN KEY (usuario_id) references usuarios(id)
);

create table recuperacao_senha(
  usuario_email text not null unique,
  token_recuperacao_senha text not null,
  token_expiracao timestamp,
  
 foreign key (usuario_email) references usuarios(email)
 );

drop table recuperacao_senha;
drop table usuarios;
drop table transacoes_usuario;
