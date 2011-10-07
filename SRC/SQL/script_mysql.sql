DROP database enap;
create database enap;
use enap;

drop table if exists E006_3;

drop table if exists E006_4;

drop table if exists HISTORIAL_INFORME;

drop table if exists MATRIZ_EMPRESA;

drop table if exists MATRIZ_HISTORIAL;

drop table if exists TBL_ACCION;

drop table if exists TBL_ACCION_CORRECTIVA;

drop table if exists TBL_ACCION_CORRECTIVA_RECURSO;

drop table if exists TBL_ACTIVIDAD_ESPECIFICA;

drop table if exists TBL_ACTIVIDAD_EVALUADA;

drop table if exists TBL_ACTIVIDAD_GENERAL;

drop table if exists TBL_ACTIVIDAD_RESPONSABLE;

drop table if exists TBL_ACTIVIDAD_TRABAJADOR;

drop table if exists TBL_ACTIVIDAD_TRABAJADOR_REALIZADA;

drop table if exists TBL_ARCHIVO;

drop table if exists TBL_AREA;

drop table if exists TBL_CARGO;

drop table if exists TBL_CAUSA;

drop table if exists TBL_CAUSA_MEDIDA_DE_CONTROL;

drop table if exists TBL_CONSECUENCIA;

drop table if exists TBL_DATO_EVENTO;

drop table if exists TBL_DEPARTAMENTO;

drop table if exists TBL_DEPARTAMENTO_ORGANIZACION;

drop table if exists TBL_DIVISION;

drop table if exists TBL_EMPRESA;

drop table if exists TBL_EVALUACION_MENSUAL;

drop table if exists TBL_EVENTO;

drop table if exists TBL_EVENTO_DATO;

drop table if exists TBL_EVENTO_EMPRESA;

drop table if exists TBL_EVENTO_TRABAJADOR;

drop table if exists TBL_EVIDENCIA;

drop table if exists TBL_GRUPO;

drop table if exists TBL_GRUPO_PRIVILEGIO;

drop table if exists TBL_HISTORIAL_EMPRESA;

drop table if exists TBL_MATRIZ;

drop table if exists TBL_MATRIZ_ACTIVIDAD;

drop table if exists TBL_MEDIDA_DE_CONTROL;

drop table if exists TBL_MODULO;

drop table if exists TBL_ORGANIZACION;

drop table if exists TBL_PARTE_CORPORAL;

drop table if exists TBL_PARTE_CORPORAL_TRABAJADOR;

drop table if exists TBL_PELIGRO;

drop table if exists TBL_PELIGRO_MEDIDA;

drop table if exists TBL_PRIVILEGIO;

drop table if exists TBL_PROGRAMA_ACTIVIDAD;

drop table if exists TBL_PROGRAMA_ANUAL;

drop table if exists TBL_PUNTO_GEOGRAFICO;

drop table if exists TBL_RECURSO_COMPROMETIDO;

drop table if exists TBL_SUB_ACTIVIDAD;

drop table if exists TBL_TRABAJADOR;

drop table if exists TBL_USUARIO;

drop table if exists TBL_USUARIO_GRUPO;

/*==============================================================*/
/* Table: E006_3                                                */
/*==============================================================*/
create table E006_3
(
   ID_INFORME           int not null auto_increment,
   E00_ID_INFORME       int not null,
   ID_EVENTO_EMPRESA    int,
   FECHA_INGRESO        datetime,
   CLASIFICACION        int,
   primary key (ID_INFORME)
);

/*==============================================================*/
/* Table: E006_4                                                */
/*==============================================================*/
create table E006_4
(
   ID_INFORME           int not null auto_increment,
   E00_ID_INFORME       int,
   DESCRIPCION_INCIDENTE text,
   ANTECEDENTES         text,
   RELATO_DE_HECHO      text,
   COMENTARIO           text,
   FECHA_CREACION       datetime,
   primary key (ID_INFORME)
);

/*==============================================================*/
/* Table: HISTORIAL_INFORME                                     */
/*==============================================================*/
create table HISTORIAL_INFORME
(
   ID_HISTORIAL_INFORME int not null auto_increment,
   ID_INFORME           int,
   FECHA_MODIFICACION   datetime,
   DESCRIPCION_MODIFICACION text,
   primary key (ID_HISTORIAL_INFORME)
);

/*==============================================================*/
/* Table: MATRIZ_EMPRESA                                        */
/*==============================================================*/
create table MATRIZ_EMPRESA
(
   ID_MATRIZ            int not null,
   ID_EMPRESA           int not null,
   FECHA_CREACION       datetime,
   primary key (ID_MATRIZ, ID_EMPRESA)
);

/*==============================================================*/
/* Table: MATRIZ_HISTORIAL                                      */
/*==============================================================*/
create table MATRIZ_HISTORIAL
(
   ID_MATRIZ_HISTORIAL  int not null auto_increment,
   ID_MATRIZ            int,
   FECHA_ACTUALIZACION  datetime,
   DESCRIPCION_ACTUALIZACION text,
   primary key (ID_MATRIZ_HISTORIAL)
);

/*==============================================================*/
/* Table: TBL_ACCION                                            */
/*==============================================================*/
create table TBL_ACCION
(
   ID_ACCION            int not null auto_increment,
   NOMBRE_ACCION        varchar(200),
   primary key (ID_ACCION)
);

/*==============================================================*/
/* Table: TBL_ACCION_CORRECTIVA                                 */
/*==============================================================*/
create table TBL_ACCION_CORRECTIVA
(
   ID_ACCION_CORRECTIVA int not null auto_increment,
   ID_USUARIO           int,
   ID_INFORME           int not null,
   ID_ACCION            int,
   FECHA_PLAZO          datetime,
   FECHA_REALIZACION    datetime,
   PORCENTAJE_CUMPLIMIENTO int,
   DESCRIPCION          text,
   FECHA_CREACION       datetime,
   primary key (ID_ACCION_CORRECTIVA)
);

/*==============================================================*/
/* Table: TBL_ACCION_CORRECTIVA_RECURSO                         */
/*==============================================================*/
create table TBL_ACCION_CORRECTIVA_RECURSO
(
   ID_RECURSO_COMPROMETIDO int not null,
   ID_ACCION_CORRECTIVA int not null,
   UTILIZADO            bool,
   primary key (ID_RECURSO_COMPROMETIDO, ID_ACCION_CORRECTIVA)
);

/*==============================================================*/
/* Table: TBL_ACTIVIDAD_ESPECIFICA                              */
/*==============================================================*/
create table TBL_ACTIVIDAD_ESPECIFICA
(
   ID_ACTIVIDAD_ESPECIFICA int not null auto_increment,
   NOM_ACTIVIDAD_ESPECIFICA varchar(100),
   primary key (ID_ACTIVIDAD_ESPECIFICA)
);

/*==============================================================*/
/* Table: TBL_ACTIVIDAD_EVALUADA                                */
/*==============================================================*/
create table TBL_ACTIVIDAD_EVALUADA
(
   ID_ACTIVIDAD_EVALUADA int not null auto_increment,
   ID_ACTIVIDAD_GENERAL int,
   ID_CARGO             int,
   ID_DIVISION          int,
   ID_ACTIVIDAD_ESPECIFICA int,
   ID_DEPARTAMENTO_ORGANIZACION int,
   ID_PELIGRO           int,
   ID_AREA              int,
   ESTADO               bool default 0,
   VALORACION_CONSECUENCIA int comment 'Valores:
            1 = LIGERAMENTE DAÑINO
            2 = DAÑINO
            3 = EXTREMADAMENTE DAÑINO',
   VALORACION_PROBABILIDAD int comment 'Valores:
            1 = BAJO
            2 = MEDIO
            3 = ALTO',
   MEDIDA_VALORACION_CONSECUENCIA int,
   MEDIDA_VALORACION_PROBABILIDAD int,
   FECHA_CREACION       datetime,
   CONDICION            int comment '1=RUTINARIO
            2=NO RUTINARIO
            3=EMERGENCIA',
   primary key (ID_ACTIVIDAD_EVALUADA)
);

/*==============================================================*/
/* Table: TBL_ACTIVIDAD_GENERAL                                 */
/*==============================================================*/
create table TBL_ACTIVIDAD_GENERAL
(
   ID_ACTIVIDAD_GENERAL int not null auto_increment,
   NOM_ACTIVIDAD_GENERAL varchar(100),
   primary key (ID_ACTIVIDAD_GENERAL)
);

/*==============================================================*/
/* Table: TBL_ACTIVIDAD_RESPONSABLE                             */
/*==============================================================*/
create table TBL_ACTIVIDAD_RESPONSABLE
(
   ID_SUB_ACTIVIDAD     int not null,
   ID_CARGO             int not null,
   primary key (ID_SUB_ACTIVIDAD, ID_CARGO)
);

/*==============================================================*/
/* Table: TBL_ACTIVIDAD_TRABAJADOR                              */
/*==============================================================*/
create table TBL_ACTIVIDAD_TRABAJADOR
(
   ID_ACTIVIDAD_TRABAJADOR int not null auto_increment,
   NOMBRE_ACTIVIDAD_TRABAJADOR varchar(200),
   primary key (ID_ACTIVIDAD_TRABAJADOR)
);

/*==============================================================*/
/* Table: TBL_ACTIVIDAD_TRABAJADOR_REALIZADA                    */
/*==============================================================*/
create table TBL_ACTIVIDAD_TRABAJADOR_REALIZADA
(
   ID_TRABAJADOR        int not null,
   ID_ACTIVIDAD_TRABAJADOR int not null,
   REALIZADA            bool,
   primary key (ID_TRABAJADOR, ID_ACTIVIDAD_TRABAJADOR)
);

/*==============================================================*/
/* Table: TBL_ARCHIVO                                           */
/*==============================================================*/
create table TBL_ARCHIVO
(
   ID_ARCHIVO           int not null auto_increment,
   ID_INFORME           int,
   NOMBRE_ARCHIVO       varchar(255),
   PATH                 text,
   primary key (ID_ARCHIVO)
);

/*==============================================================*/
/* Table: TBL_AREA                                              */
/*==============================================================*/
create table TBL_AREA
(
   ID_AREA              int not null auto_increment,
   ID_DIVISION          int,
   NOMBRE_AREA          varchar(200),
   primary key (ID_AREA)
);

/*==============================================================*/
/* Table: TBL_CARGO                                             */
/*==============================================================*/
create table TBL_CARGO
(
   ID_CARGO             int not null auto_increment,
   NOMBRE_CARGO         varchar(200),
   primary key (ID_CARGO)
);

/*==============================================================*/
/* Table: TBL_CAUSA                                             */
/*==============================================================*/
create table TBL_CAUSA
(
   ID_CAUSA             int not null auto_increment,
   ID_INFORME           int,
   DESCRIPCION          text,
   TIPO_CAUSA           int,
   primary key (ID_CAUSA)
);

/*==============================================================*/
/* Table: TBL_CAUSA_MEDIDA_DE_CONTROL                           */
/*==============================================================*/
create table TBL_CAUSA_MEDIDA_DE_CONTROL
(
   ID_CAUSA             int not null,
   ID_MEDIDAS_DE_CONTROL int not null,
   ESTADO               bool,
   primary key (ID_CAUSA, ID_MEDIDAS_DE_CONTROL)
);

/*==============================================================*/
/* Table: TBL_CONSECUENCIA                                      */
/*==============================================================*/
create table TBL_CONSECUENCIA
(
   ID_CONSECUENCIA      int not null auto_increment,
   ID_PELIGRO           int,
   NOMBRE_CONSECUENCIA  varchar(150),
   primary key (ID_CONSECUENCIA)
);

/*==============================================================*/
/* Table: TBL_DATO_EVENTO                                       */
/*==============================================================*/
create table TBL_DATO_EVENTO
(
   ID_TIPO_EVENTO       int not null auto_increment,
   NOMBRE_TIPO_EVENTO   varchar(200),
   TIPO                 int,
   primary key (ID_TIPO_EVENTO)
);

/*==============================================================*/
/* Table: TBL_DEPARTAMENTO                                      */
/*==============================================================*/
create table TBL_DEPARTAMENTO
(
   ID_DEPARTAMENTO      int not null auto_increment,
   NOMBRE_DEPARTAMENTO  varchar(200),
   primary key (ID_DEPARTAMENTO)
);

/*==============================================================*/
/* Table: TBL_DEPARTAMENTO_ORGANIZACION                         */
/*==============================================================*/
create table TBL_DEPARTAMENTO_ORGANIZACION
(
   ID_DEPARTAMENTO_ORGANIZACION int not null auto_increment,
   ID_ORGANIZACION      int not null,
   ID_DEPARTAMENTO      int not null,
   primary key (ID_DEPARTAMENTO_ORGANIZACION)
);

/*==============================================================*/
/* Table: TBL_DIVISION                                          */
/*==============================================================*/
create table TBL_DIVISION
(
   ID_DIVISION          int not null auto_increment,
   ID_DEPARTAMENTO_ORGANIZACION int,
   NOMBRE_DIVISION      varchar(150),
   primary key (ID_DIVISION)
);

/*==============================================================*/
/* Table: TBL_EMPRESA                                           */
/*==============================================================*/
create table TBL_EMPRESA
(
   ID_EMPRESA           int not null auto_increment,
   NOMBRE_EMPRESA       varchar(150),
   DIRECCION_EMPRESA    varchar(250),
   FONO_EMPRESA         varchar(20),
   EMAIL_EMPRESA        varchar(150),
   NOMBRE_CONTRATO      varchar(250),
   primary key (ID_EMPRESA)
);

/*==============================================================*/
/* Table: TBL_EVALUACION_MENSUAL                                */
/*==============================================================*/
create table TBL_EVALUACION_MENSUAL
(
   ID_EVALUACION_MENSUAL int not null,
   ID_SUB_ACTIVIDAD     int,
   PROGRAMADO           int,
   REALIZADO            int,
   FECHA_EVALUACION     datetime,
   primary key (ID_EVALUACION_MENSUAL)
);

/*==============================================================*/
/* Table: TBL_EVENTO                                            */
/*==============================================================*/
create table TBL_EVENTO
(
   ID_EVENTO            int not null auto_increment,
   ID_DEPARTAMENTO_ORGANIZACION int,
   OCURRIO              int comment '1 = CAMINO A
            2 = EN
            3 = DE VUELTA DE',
   FECHA_HORA_EVENTO    datetime,
   FECHA_INGRESO        datetime,
   LAT_EVENTO           double,
   LNG_EVENTO           double,
   TIPO_EVENTO          bool,
   LUGAR_EXACTO         varchar(200),
   primary key (ID_EVENTO)
);

/*==============================================================*/
/* Table: TBL_EVENTO_DATO                                       */
/*==============================================================*/
create table TBL_EVENTO_DATO
(
   ID_INFORME           int not null,
   ID_TIPO_EVENTO       int not null,
   ESTADO               bool,
   primary key (ID_INFORME, ID_TIPO_EVENTO)
);

/*==============================================================*/
/* Table: TBL_EVENTO_EMPRESA                                    */
/*==============================================================*/
create table TBL_EVENTO_EMPRESA
(
   ID_EVENTO_EMPRESA    int not null auto_increment,
   ID_EVENTO            int,
   ID_EMPRESA           int,
   DESCRIPCION          text,
   ESTADO               bool,
   primary key (ID_EVENTO_EMPRESA)
);

/*==============================================================*/
/* Table: TBL_EVENTO_TRABAJADOR                                 */
/*==============================================================*/
create table TBL_EVENTO_TRABAJADOR
(
   ID_EVENTO_TRABAJADOR int not null auto_increment,
   ID_EVENTO_EMPRESA    int,
   ID_TRABAJADOR        int,
   ID_MATRIZ            int,
   FECHA_PRESENTACION_HOSPITAL datetime,
   FECHA_ALTA_MEDICA    datetime,
   TIPO_LESION          int comment '1=Musculares: Contracturas, desgarros, calambres, contusiones y hematomas, entre otras.
            2=Tendones: Tendinopatías y tendinosis, por ejemplo.
            3=Articulaciones: Lesiones ligamentosas, de cartílagos, luxaciones y subluxaciones, meniscopatías, bursitis, etc.
            4=Huesos: fracturas, fisuras, periostitis, entre otras.',
   primary key (ID_EVENTO_TRABAJADOR)
);

/*==============================================================*/
/* Table: TBL_EVIDENCIA                                         */
/*==============================================================*/
create table TBL_EVIDENCIA
(
   ID_EVIDENCIA         int not null auto_increment,
   NOMBRE_EVIDENCIA     varchar(200),
   primary key (ID_EVIDENCIA)
);

/*==============================================================*/
/* Table: TBL_GRUPO                                             */
/*==============================================================*/
create table TBL_GRUPO
(
   ID_GRUPO             int not null auto_increment,
   NOMBRE_GRUPO         varchar(250),
   DESCRIPCION_GRUPO    text,
   primary key (ID_GRUPO)
);

/*==============================================================*/
/* Table: TBL_GRUPO_PRIVILEGIO                                  */
/*==============================================================*/
create table TBL_GRUPO_PRIVILEGIO
(
   ID_GRUPO             int not null,
   ID_PRIVILEGIO        int not null,
   ID_MODULO            int not null,
   ESTADO               bool,
   primary key (ID_GRUPO, ID_PRIVILEGIO, ID_MODULO)
);

/*==============================================================*/
/* Table: TBL_HISTORIAL_EMPRESA                                 */
/*==============================================================*/
create table TBL_HISTORIAL_EMPRESA
(
   ID_HISTORIAL         int not null auto_increment,
   ID_EMPRESA           int,
   FECHA_CREACION       datetime,
   N_TRABAJADORES       int,
   H_TRABAJADAS         int,
   H_SOBRETIEMPO        int,
   primary key (ID_HISTORIAL)
);

/*==============================================================*/
/* Table: TBL_MATRIZ                                            */
/*==============================================================*/
create table TBL_MATRIZ
(
   ID_MATRIZ            int not null auto_increment,
   ID_USUARIO           int,
   FECHA_CREACION       datetime,
   ESTADO               bool,
   primary key (ID_MATRIZ)
);

/*==============================================================*/
/* Table: TBL_MATRIZ_ACTIVIDAD                                  */
/*==============================================================*/
create table TBL_MATRIZ_ACTIVIDAD
(
   ID_MATRIZ            int not null,
   ID_ACTIVIDAD_EVALUADA int not null,
   FECHA_CREACION       datetime,
   primary key (ID_MATRIZ, ID_ACTIVIDAD_EVALUADA)
);

/*==============================================================*/
/* Table: TBL_MEDIDA_DE_CONTROL                                 */
/*==============================================================*/
create table TBL_MEDIDA_DE_CONTROL
(
   ID_MEDIDAS_DE_CONTROL int not null auto_increment,
   NOM_MEDIDA_DE_CONTROL varchar(100),
   ESTADO               bool,
   primary key (ID_MEDIDAS_DE_CONTROL)
);

/*==============================================================*/
/* Table: TBL_MODULO                                            */
/*==============================================================*/
create table TBL_MODULO
(
   ID_MODULO            int not null auto_increment,
   NOMBRE_MODULO        varchar(100),
   DESCRIPCION_MODULO   text,
   URL_MODULO           varchar(250),
   primary key (ID_MODULO)
);

/*==============================================================*/
/* Table: TBL_ORGANIZACION                                      */
/*==============================================================*/
create table TBL_ORGANIZACION
(
   ID_ORGANIZACION      int not null auto_increment,
   NOMBRE_ORGANIZACION  varchar(100),
   primary key (ID_ORGANIZACION)
);

/*==============================================================*/
/* Table: TBL_PARTE_CORPORAL                                    */
/*==============================================================*/
create table TBL_PARTE_CORPORAL
(
   ID_PARTE_CORPORAL    int not null auto_increment,
   NOMBRE_PARTE_CORPORAL varchar(100),
   primary key (ID_PARTE_CORPORAL)
);

/*==============================================================*/
/* Table: TBL_PARTE_CORPORAL_TRABAJADOR                         */
/*==============================================================*/
create table TBL_PARTE_CORPORAL_TRABAJADOR
(
   ID_PARTE_CORPORAL    int not null,
   ID_EVENTO_TRABAJADOR int not null,
   primary key (ID_PARTE_CORPORAL, ID_EVENTO_TRABAJADOR)
);

/*==============================================================*/
/* Table: TBL_PELIGRO                                           */
/*==============================================================*/
create table TBL_PELIGRO
(
   ID_PELIGRO           int not null auto_increment,
   NOM_PELIGRO          varchar(100),
   primary key (ID_PELIGRO)
);

/*==============================================================*/
/* Table: TBL_PELIGRO_MEDIDA                                    */
/*==============================================================*/
create table TBL_PELIGRO_MEDIDA
(
   ID_MEDIDAS_DE_CONTROL int not null,
   ID_ACTIVIDAD_EVALUADA int not null,
   FECHA_CREACION       datetime,
   primary key (ID_MEDIDAS_DE_CONTROL, ID_ACTIVIDAD_EVALUADA)
);

/*==============================================================*/
/* Table: TBL_PRIVILEGIO                                        */
/*==============================================================*/
create table TBL_PRIVILEGIO
(
   ID_PRIVILEGIO        int not null auto_increment,
   NOMBRE_PRIVILEGIO    varchar(150),
   ESTADO               bool,
   primary key (ID_PRIVILEGIO)
);

/*==============================================================*/
/* Table: TBL_PROGRAMA_ACTIVIDAD                                */
/*==============================================================*/
create table TBL_PROGRAMA_ACTIVIDAD
(
   ID_PROGRAMA_ACTIVIDAD int not null auto_increment,
   ID_PROGRAMA_ANUAL    int,
   NOMBRE_PROGRAMA_ACTIVIDAD varchar(200),
   primary key (ID_PROGRAMA_ACTIVIDAD)
);

/*==============================================================*/
/* Table: TBL_PROGRAMA_ANUAL                                    */
/*==============================================================*/
create table TBL_PROGRAMA_ANUAL
(
   ID_PROGRAMA_ANUAL    int not null auto_increment,
   OBJETIVO             text,
   META                 text,
   FECHA_CREACION       datetime,
   primary key (ID_PROGRAMA_ANUAL)
);

/*==============================================================*/
/* Table: TBL_PUNTO_GEOGRAFICO                                  */
/*==============================================================*/
create table TBL_PUNTO_GEOGRAFICO
(
   ID_PUNTO_GEOGRAFICA  int not null auto_increment,
   ID_DEPARTAMENTO_ORGANIZACION int not null,
   LAT_PUNTO            double,
   LNG_PUNTO            double,
   primary key (ID_PUNTO_GEOGRAFICA)
);

/*==============================================================*/
/* Table: TBL_RECURSO_COMPROMETIDO                              */
/*==============================================================*/
create table TBL_RECURSO_COMPROMETIDO
(
   ID_RECURSO_COMPROMETIDO int not null auto_increment,
   NOMBRE_RECURSO       varchar(150),
   DESCRIPCION          text,
   primary key (ID_RECURSO_COMPROMETIDO)
);

/*==============================================================*/
/* Table: TBL_SUB_ACTIVIDAD                                     */
/*==============================================================*/
create table TBL_SUB_ACTIVIDAD
(
   ID_SUB_ACTIVIDAD     int not null auto_increment,
   ID_EVIDENCIA         int,
   ID_PROGRAMA_ACTIVIDAD int,
   NOMBRE_SUB_ACTIVIDAD varchar(200),
   TIPO_FRECUENCIA      int comment 'Éste campo podra tener los siguientes valores:
            1=Diario
            2=Semanal
            3=Mensual
            4=Anual
            5=Semestral
            6=Trimestral
            7=Cuando Aplique
            8=Permanente',
   CANTIDAD_ACTIVIDADES varchar(200),
   primary key (ID_SUB_ACTIVIDAD)
);

/*==============================================================*/
/* Table: TBL_TRABAJADOR                                        */
/*==============================================================*/
create table TBL_TRABAJADOR
(
   RUT_TRABAJADOR       varchar(12) not null,
   NOMBRES              varchar(200),
   APELLIDO_MATERNO     varchar(200),
   APELLIDO_PATERNO     varchar(200),
   TELEFONO             varchar(20),
   ANOS_EXPERIENCIA     int,
   ID_TRABAJADOR        int not null auto_increment,
   ID_CARGO             int,
   primary key (ID_TRABAJADOR)
);

/*==============================================================*/
/* Table: TBL_USUARIO                                           */
/*==============================================================*/
create table TBL_USUARIO
(
   PASSWORD             varchar(32),
   EMAIL                varchar(150),
   ESTADO               bool,
   ID_USUARIO           int not null auto_increment,
   ID_EMPRESA           int,
   RUT_TRABAJADOR       varchar(12),
   NOMBRES              varchar(200),
   APELLIDO_MATERNO     varchar(200),
   APELLIDO_PATERNO     varchar(200),
   TELEFONO             varchar(20),
   ANOS_EXPERIENCIA     int,
   primary key (ID_USUARIO)
);

/*==============================================================*/
/* Table: TBL_USUARIO_GRUPO                                     */
/*==============================================================*/
create table TBL_USUARIO_GRUPO
(
   ID_USUARIO           int not null,
   ID_GRUPO             int not null,
   GRUPO_ADMIN          bool,
   primary key (ID_USUARIO, ID_GRUPO)
);

alter table E006_3 add constraint FK_INCORPORA foreign key (ID_EVENTO_EMPRESA)
      references TBL_EVENTO_EMPRESA (ID_EVENTO_EMPRESA) on delete restrict on update restrict;

alter table E006_3 add constraint FK_RELATIONSHIP_39 foreign key (E00_ID_INFORME)
      references E006_4 (ID_INFORME) on delete restrict on update restrict;

alter table E006_4 add constraint FK_RELATIONSHIP_40 foreign key (E00_ID_INFORME)
      references E006_3 (ID_INFORME) on delete restrict on update restrict;

alter table HISTORIAL_INFORME add constraint FK_NECESITA foreign key (ID_INFORME)
      references E006_3 (ID_INFORME) on delete restrict on update restrict;

alter table MATRIZ_EMPRESA add constraint FK_empresa_matriz foreign key (ID_EMPRESA)
      references TBL_EMPRESA (ID_EMPRESA) on delete restrict on update restrict;

alter table MATRIZ_EMPRESA add constraint FK_matriz_matriz_empresa foreign key (ID_MATRIZ)
      references TBL_MATRIZ (ID_MATRIZ) on delete restrict on update restrict;

alter table MATRIZ_HISTORIAL add constraint FK_MATRIZ_HISTORIAL foreign key (ID_MATRIZ)
      references TBL_MATRIZ (ID_MATRIZ) on delete restrict on update restrict;

alter table TBL_ACCION_CORRECTIVA add constraint FK_ACCION_CORRECTIVA_E006_3 foreign key (ID_INFORME)
      references E006_3 (ID_INFORME) on delete restrict on update restrict;

alter table TBL_ACCION_CORRECTIVA add constraint FK_POSEE foreign key (ID_USUARIO)
      references TBL_USUARIO (ID_USUARIO) on delete restrict on update restrict;

alter table TBL_ACCION_CORRECTIVA add constraint FK_TIENE foreign key (ID_ACCION)
      references TBL_ACCION (ID_ACCION) on delete restrict on update restrict;

alter table TBL_ACCION_CORRECTIVA_RECURSO add constraint FK_TBL_ACCION_CORRECTIVA_RECURSO_correctiva foreign key (ID_ACCION_CORRECTIVA)
      references TBL_ACCION_CORRECTIVA (ID_ACCION_CORRECTIVA) on delete restrict on update restrict;

alter table TBL_ACCION_CORRECTIVA_RECURSO add constraint FK_TBL_ACCION_CORRECTIVA_RECURSO_COMPROMETIDO foreign key (ID_RECURSO_COMPROMETIDO)
      references TBL_RECURSO_COMPROMETIDO (ID_RECURSO_COMPROMETIDO) on delete restrict on update restrict;

alter table TBL_ACTIVIDAD_EVALUADA add constraint FK_ASOCIA foreign key (ID_PELIGRO)
      references TBL_PELIGRO (ID_PELIGRO) on delete restrict on update restrict;

alter table TBL_ACTIVIDAD_EVALUADA add constraint FK_ASOCIADA foreign key (ID_ACTIVIDAD_GENERAL)
      references TBL_ACTIVIDAD_GENERAL (ID_ACTIVIDAD_GENERAL) on delete restrict on update restrict;

alter table TBL_ACTIVIDAD_EVALUADA add constraint FK_CARGO_ACTIVIDAD_EVALUADA foreign key (ID_CARGO)
      references TBL_CARGO (ID_CARGO) on delete restrict on update restrict;

alter table TBL_ACTIVIDAD_EVALUADA add constraint FK_DIVISION_ACTIVIDAD_EVALUADA foreign key (ID_DIVISION)
      references TBL_DIVISION (ID_DIVISION) on delete restrict on update restrict;

alter table TBL_ACTIVIDAD_EVALUADA add constraint FK_DPTO_ORGANIZACION_ACTIVIDAD_EVALUADA foreign key (ID_DEPARTAMENTO_ORGANIZACION)
      references TBL_DEPARTAMENTO_ORGANIZACION (ID_DEPARTAMENTO_ORGANIZACION) on delete restrict on update restrict;

alter table TBL_ACTIVIDAD_EVALUADA add constraint FK_INVOLUCRA_AREA foreign key (ID_AREA)
      references TBL_AREA (ID_AREA) on delete restrict on update restrict;

alter table TBL_ACTIVIDAD_EVALUADA add constraint FK_INVOLUCRA_A_ESPECIFICA foreign key (ID_ACTIVIDAD_ESPECIFICA)
      references TBL_ACTIVIDAD_ESPECIFICA (ID_ACTIVIDAD_ESPECIFICA) on delete restrict on update restrict;

alter table TBL_ACTIVIDAD_RESPONSABLE add constraint FK_TBL_ACTIVIDAD_RESPONSABLE_CARGO foreign key (ID_CARGO)
      references TBL_CARGO (ID_CARGO) on delete restrict on update restrict;

alter table TBL_ACTIVIDAD_RESPONSABLE add constraint FK_TBL_ACTIVIDAD_RESPONSABLE_SUB_ACTIVIDAD foreign key (ID_SUB_ACTIVIDAD)
      references TBL_SUB_ACTIVIDAD (ID_SUB_ACTIVIDAD) on delete restrict on update restrict;

alter table TBL_ACTIVIDAD_TRABAJADOR_REALIZADA add constraint FK_TBL_ACTIVIDAD_TRABAJADOR_REALIZADA_ACTIVIDAD foreign key (ID_ACTIVIDAD_TRABAJADOR)
      references TBL_ACTIVIDAD_TRABAJADOR (ID_ACTIVIDAD_TRABAJADOR) on delete restrict on update restrict;

alter table TBL_ACTIVIDAD_TRABAJADOR_REALIZADA add constraint FK_TBL_ACTIVIDAD_TRABAJADOR_REALIZADA_TRABAJADOR foreign key (ID_TRABAJADOR)
      references TBL_TRABAJADOR (ID_TRABAJADOR) on delete restrict on update restrict;

alter table TBL_ARCHIVO add constraint FK_ARCHIVO_E006_3 foreign key (ID_INFORME)
      references E006_3 (ID_INFORME) on delete restrict on update restrict;

alter table TBL_AREA add constraint FK_INMERSA foreign key (ID_DIVISION)
      references TBL_DIVISION (ID_DIVISION) on delete restrict on update restrict;

alter table TBL_CAUSA add constraint FK_PERTENECE foreign key (ID_INFORME)
      references E006_4 (ID_INFORME) on delete restrict on update restrict;

alter table TBL_CAUSA_MEDIDA_DE_CONTROL add constraint FK_TBL_CAUSA_MEDIDA_DE_CONTROL_CAUSA foreign key (ID_CAUSA)
      references TBL_CAUSA (ID_CAUSA) on delete restrict on update restrict;

alter table TBL_CAUSA_MEDIDA_DE_CONTROL add constraint FK_TBL_CAUSA_MEDIDA_DE_CONTROL_MEDIDA foreign key (ID_MEDIDAS_DE_CONTROL)
      references TBL_MEDIDA_DE_CONTROL (ID_MEDIDAS_DE_CONTROL) on delete restrict on update restrict;

alter table TBL_CONSECUENCIA add constraint FK_PROVOCA foreign key (ID_PELIGRO)
      references TBL_PELIGRO (ID_PELIGRO) on delete restrict on update restrict;

alter table TBL_DEPARTAMENTO_ORGANIZACION add constraint FK_ESTA_EN foreign key (ID_DEPARTAMENTO)
      references TBL_DEPARTAMENTO (ID_DEPARTAMENTO) on delete restrict on update restrict;

alter table TBL_DEPARTAMENTO_ORGANIZACION add constraint FK_REFERENCE_38 foreign key (ID_ORGANIZACION)
      references TBL_ORGANIZACION (ID_ORGANIZACION) on delete restrict on update restrict;

alter table TBL_DIVISION add constraint FK_DEPARTAMENTO_ORGANIZACION_DIVISION foreign key (ID_DEPARTAMENTO_ORGANIZACION)
      references TBL_DEPARTAMENTO_ORGANIZACION (ID_DEPARTAMENTO_ORGANIZACION) on delete restrict on update restrict;

alter table TBL_EVALUACION_MENSUAL add constraint FK_ENLAZA foreign key (ID_SUB_ACTIVIDAD)
      references TBL_SUB_ACTIVIDAD (ID_SUB_ACTIVIDAD) on delete restrict on update restrict;

alter table TBL_EVENTO add constraint FK_EVENTO_DPTO_ORGANIZACION foreign key (ID_DEPARTAMENTO_ORGANIZACION)
      references TBL_DEPARTAMENTO_ORGANIZACION (ID_DEPARTAMENTO_ORGANIZACION) on delete restrict on update restrict;

alter table TBL_EVENTO_DATO add constraint FK_dato_evento foreign key (ID_TIPO_EVENTO)
      references TBL_DATO_EVENTO (ID_TIPO_EVENTO) on delete restrict on update restrict;

alter table TBL_EVENTO_DATO add constraint FK_e006_3_evento_dato foreign key (ID_INFORME)
      references E006_3 (ID_INFORME) on delete restrict on update restrict;

alter table TBL_EVENTO_EMPRESA add constraint FK_AFECTA foreign key (ID_EVENTO)
      references TBL_EVENTO (ID_EVENTO) on delete restrict on update restrict;

alter table TBL_EVENTO_EMPRESA add constraint FK_EMPRESA_EVENTO_EMPRESA foreign key (ID_EMPRESA)
      references TBL_EMPRESA (ID_EMPRESA) on delete restrict on update restrict;

alter table TBL_EVENTO_TRABAJADOR add constraint FK_EVENTO_TRABAJADOR foreign key (ID_TRABAJADOR)
      references TBL_TRABAJADOR (ID_TRABAJADOR) on delete restrict on update restrict;

alter table TBL_EVENTO_TRABAJADOR add constraint FK_REALIZA foreign key (ID_MATRIZ)
      references TBL_MATRIZ (ID_MATRIZ) on delete restrict on update restrict;

alter table TBL_EVENTO_TRABAJADOR add constraint FK_REFERENCE_15 foreign key (ID_EVENTO_EMPRESA)
      references TBL_EVENTO_EMPRESA (ID_EVENTO_EMPRESA) on delete restrict on update restrict;

alter table TBL_GRUPO_PRIVILEGIO add constraint FK_grupo_grupo_privilegio foreign key (ID_GRUPO)
      references TBL_GRUPO (ID_GRUPO) on delete restrict on update restrict;

alter table TBL_GRUPO_PRIVILEGIO add constraint FK_modulo_grupo_privilegio foreign key (ID_MODULO)
      references TBL_MODULO (ID_MODULO) on delete restrict on update restrict;

alter table TBL_GRUPO_PRIVILEGIO add constraint FK_privilegio_grupo_privilegio foreign key (ID_PRIVILEGIO)
      references TBL_PRIVILEGIO (ID_PRIVILEGIO) on delete restrict on update restrict;

alter table TBL_HISTORIAL_EMPRESA add constraint FK_REGISTRA foreign key (ID_EMPRESA)
      references TBL_EMPRESA (ID_EMPRESA) on delete restrict on update restrict;

alter table TBL_MATRIZ add constraint FK_HACE foreign key (ID_USUARIO)
      references TBL_USUARIO (ID_USUARIO) on delete restrict on update restrict;

alter table TBL_MATRIZ_ACTIVIDAD add constraint FK_crean foreign key (ID_ACTIVIDAD_EVALUADA)
      references TBL_ACTIVIDAD_EVALUADA (ID_ACTIVIDAD_EVALUADA) on delete restrict on update restrict;

alter table TBL_MATRIZ_ACTIVIDAD add constraint FK_incluye foreign key (ID_MATRIZ)
      references TBL_MATRIZ (ID_MATRIZ) on delete restrict on update restrict;

alter table TBL_PARTE_CORPORAL_TRABAJADOR add constraint FK_INCORPORA_TRABAJADOR foreign key (ID_EVENTO_TRABAJADOR)
      references TBL_EVENTO_TRABAJADOR (ID_EVENTO_TRABAJADOR) on delete restrict on update restrict;

alter table TBL_PARTE_CORPORAL_TRABAJADOR add constraint FK_INCORPORA_CORPORAL foreign key (ID_PARTE_CORPORAL)
      references TBL_PARTE_CORPORAL (ID_PARTE_CORPORAL) on delete restrict on update restrict;

alter table TBL_PELIGRO_MEDIDA add constraint FK_se_toman foreign key (ID_MEDIDAS_DE_CONTROL)
      references TBL_MEDIDA_DE_CONTROL (ID_MEDIDAS_DE_CONTROL) on delete restrict on update restrict;

alter table TBL_PELIGRO_MEDIDA add constraint FK_se_controla foreign key (ID_ACTIVIDAD_EVALUADA)
      references TBL_ACTIVIDAD_EVALUADA (ID_ACTIVIDAD_EVALUADA) on delete restrict on update restrict;

alter table TBL_PROGRAMA_ACTIVIDAD add constraint FK_CORRESPONDE foreign key (ID_PROGRAMA_ANUAL)
      references TBL_PROGRAMA_ANUAL (ID_PROGRAMA_ANUAL) on delete restrict on update restrict;

alter table TBL_PUNTO_GEOGRAFICO add constraint FK_UBICADO_EN foreign key (ID_DEPARTAMENTO_ORGANIZACION)
      references TBL_DEPARTAMENTO_ORGANIZACION (ID_DEPARTAMENTO_ORGANIZACION) on delete restrict on update restrict;

alter table TBL_SUB_ACTIVIDAD add constraint FK_CONTIENE foreign key (ID_PROGRAMA_ACTIVIDAD)
      references TBL_PROGRAMA_ACTIVIDAD (ID_PROGRAMA_ACTIVIDAD) on delete restrict on update restrict;

alter table TBL_SUB_ACTIVIDAD add constraint FK_EXISTE foreign key (ID_EVIDENCIA)
      references TBL_EVIDENCIA (ID_EVIDENCIA) on delete restrict on update restrict;

alter table TBL_TRABAJADOR add constraint FK_TRABAJADOR_CARGO foreign key (ID_CARGO)
      references TBL_CARGO (ID_CARGO) on delete restrict on update restrict;

alter table TBL_USUARIO add constraint FK_CONTRATA foreign key (ID_EMPRESA)
      references TBL_EMPRESA (ID_EMPRESA) on delete restrict on update restrict;

alter table TBL_USUARIO_GRUPO add constraint FK_TBL_USUARIO_GRUPO_GRUPO foreign key (ID_GRUPO)
      references TBL_GRUPO (ID_GRUPO) on delete restrict on update restrict;

alter table TBL_USUARIO_GRUPO add constraint FK_TBL_USUARIO_GRUPO_USUARIO foreign key (ID_USUARIO)
      references TBL_USUARIO (ID_USUARIO) on delete restrict on update restrict;


	  
/*
DATA
*/
/*
	TBL_ORGANIZACION
*/
Insert into TBL_ORGANIZACION ( nombre_organizacion) values('ENAP Biobío');
Insert into TBL_ORGANIZACION ( nombre_organizacion) values('ENAP Magallanes');
Insert into TBL_ORGANIZACION ( nombre_organizacion) values('ENAP Aconcagua');
GO

/*
	TBL_DEPARTAMENTO
*/
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. De Personal');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. Desarrollo Organizacional');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto Gestión Medio Ambiente y Calidad ');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. Prevención de Riesgos ');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto Control de Calidad');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto Confiabilidad Operacional');																																																					
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto de Producción ');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto de Almac. y Terminales ');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto Mantención ');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto Ingeniería de Plantas');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. Ingeniería y Const. Biobío');																																																																																						
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Dirección General de Proyectos');
GO

/*
	TBL_DEPARTAMENTO_ORGANIZACION
*/
INSERT INTO TBL_DEPARTAMENTO_ORGANIZACION (id_organizacion,id_departamento) VALUES(1,1);
INSERT INTO TBL_DEPARTAMENTO_ORGANIZACION (id_organizacion,id_departamento) VALUES(1,2);
INSERT INTO TBL_DEPARTAMENTO_ORGANIZACION (id_organizacion,id_departamento) VALUES(1,3);
INSERT INTO TBL_DEPARTAMENTO_ORGANIZACION (id_organizacion,id_departamento) VALUES(1,4);
INSERT INTO TBL_DEPARTAMENTO_ORGANIZACION (id_organizacion,id_departamento) VALUES(1,5);
INSERT INTO TBL_DEPARTAMENTO_ORGANIZACION (id_organizacion,id_departamento) VALUES(1,6);
INSERT INTO TBL_DEPARTAMENTO_ORGANIZACION (id_organizacion,id_departamento) VALUES(1,7);
INSERT INTO TBL_DEPARTAMENTO_ORGANIZACION (id_organizacion,id_departamento) VALUES(1,8);
INSERT INTO TBL_DEPARTAMENTO_ORGANIZACION (id_organizacion,id_departamento) VALUES(1,9);
INSERT INTO TBL_DEPARTAMENTO_ORGANIZACION (id_organizacion,id_departamento) VALUES(1,10);
INSERT INTO TBL_DEPARTAMENTO_ORGANIZACION (id_organizacion,id_departamento) VALUES(1,11);
INSERT INTO TBL_DEPARTAMENTO_ORGANIZACION (id_organizacion,id_departamento) VALUES(1,12);


/*
	TBL_DIVISION
*/
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(1,'Div.Servicios de Apoyo');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(1,'Div. Salud y Calidad de Vida');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(1,'Div. Remuneraciones');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(1,'Serv. Médico');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(2,'Div. Desarrollo de las Personas');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(2,'Div. Desarrollo Organizacional');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(3,'Div. Aseguramiento de calidad');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(3,'Div. Medio Ambiente');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(4,'Div. Control de Pérdidas Biobío');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(4,'Div. Respuesta a Emergencias');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(5,'Div. Optimización y control Analítico');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(5,'Div. Certificación Calidad de Productos');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(7,'Div. Cracking Catalítico y Reformación Continua');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(7,'Div. Fraccionamiento y Visco Reducción');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(7,'Div. Etileno ');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(7,'Div. Coker');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(7,'Div. Hidrocraking');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(7,'Div. Suministros');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(7,'Div. Programación de la Producción');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(7,'Div. Turnos');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(8,'Div. Movimiento de Productos ');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(8,'Div. Programación y Terminales');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(9,'Director de Proyectos');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(9,'Div. Equipos Estáticos ');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(9,'Div. Electricidad e Instrumentos ');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(9,'Div. Mecánica ');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(9,'Div. Planificación Mantención ');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(9,'Div. Ingeniería de Mantención');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(9,'Div. Mant. Oleoducto y terminales');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(9,'Div. Servicios de Mantención');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(10,'Div. Ingeniería Plantas Biobío');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(10,'Directores Proyectos de Estudios Básicos');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(11,'Div. Ingeniería ');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(11,'Div. Construcción');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(12,'Director de Proyectos');
go


/*
	TBL_AREA
*/
Insert into TBL_AREA (id_division, nombre_area) values (11,'Octano y Cetano');
Insert into TBL_AREA (id_division, nombre_area) values(11,'Analisadores en Línea');
Insert into TBL_AREA (id_division, nombre_area) values(11,'TBP en Crudo');
Insert into TBL_AREA (id_division, nombre_area) values(12,'Laboratorio ensayos Químicos ');
Insert into TBL_AREA (id_division, nombre_area) values(12,'Laboratorio ensayos Físicos');
Insert into TBL_AREA (id_division, nombre_area) values(12,'Laboratorio de Cromatografía');
Insert into TBL_AREA (id_division, nombre_area) values(13,'Convertidor Cracking Catalítico');
Insert into TBL_AREA (id_division, nombre_area) values(13,'CCR');
Insert into TBL_AREA (id_division, nombre_area) values(13,'NHT');
Insert into TBL_AREA (id_division, nombre_area) values(13,'URL 1');
Insert into TBL_AREA (id_division, nombre_area) values(13,'URL 2');
Insert into TBL_AREA (id_division, nombre_area) values(13,'HDG');
Insert into TBL_AREA (id_division, nombre_area) values(13,'Fraccionamiento');
Insert into TBL_AREA (id_division, nombre_area) values(13,'Sala de Control TDC');
Insert into TBL_AREA (id_division, nombre_area) values(14,'Toping y Vacío 1');
Insert into TBL_AREA (id_division, nombre_area) values(14,'Toping y Vacío 2');
Insert into TBL_AREA (id_division, nombre_area) values(14,'HDS 1');
Insert into TBL_AREA (id_division, nombre_area) values(14,'HDS 2');
Insert into TBL_AREA (id_division, nombre_area) values(14,'Isomerizacion');
Insert into TBL_AREA (id_division, nombre_area) values(14,'Visbreaker');
Insert into TBL_AREA (id_division, nombre_area) values(14,'Hornos y Antorcha');
Insert into TBL_AREA (id_division, nombre_area) values(14,'Sala de Control TDC');
Insert into TBL_AREA (id_division, nombre_area) values(15,'Area 1 Hornos');
Insert into TBL_AREA (id_division, nombre_area) values(15,'Area 2 Fraccionamiento Primario');
Insert into TBL_AREA (id_division, nombre_area) values(15,'Area 3 Compresores');
Insert into TBL_AREA (id_division, nombre_area) values(15,'Area 4 Zona Fría');
Insert into TBL_AREA (id_division, nombre_area) values(15,'Area 5 Tranes y Gasolina');
Insert into TBL_AREA (id_division, nombre_area) values(15,'Area 6 HMAPD y STP');
Insert into TBL_AREA (id_division, nombre_area) values(16,'Coker 1 Cámara');
Insert into TBL_AREA (id_division, nombre_area) values(16,'Coker 2 Sistema de Purgas');
Insert into TBL_AREA (id_division, nombre_area) values(16,'Coker 3 Livianos');
Insert into TBL_AREA (id_division, nombre_area) values(16,'Tratamiento 1 MDEA 2 Aguas 2 Azufre 1');
Insert into TBL_AREA (id_division, nombre_area) values(16,'Tratamiento 2 Reg. MDEA 3 Aguas 3 Azufre 2');
Insert into TBL_AREA (id_division, nombre_area) values(16,'HDT');
Insert into TBL_AREA (id_division, nombre_area) values(16,'Sala de Control TDC');
Insert into TBL_AREA (id_division, nombre_area) values(17,'Alta HCK');
Insert into TBL_AREA (id_division, nombre_area) values(17,'Baja HCK');
Insert into TBL_AREA (id_division, nombre_area) values(17,'Alta MHC');
Insert into TBL_AREA (id_division, nombre_area) values(17,'Baja MHC');
Insert into TBL_AREA (id_division, nombre_area) values(17,'CHT');
Insert into TBL_AREA (id_division, nombre_area) values(17,'CHBB');
Insert into TBL_AREA (id_division, nombre_area) values(17,'Sala de Control TDC');
Insert into TBL_AREA (id_division, nombre_area) values(18,'Bocatoma');
Insert into TBL_AREA (id_division, nombre_area) values(18,'Planta de Agua DEMI');
Insert into TBL_AREA (id_division, nombre_area) values(18,'Terreno 1 Caldera y Compresores');
Insert into TBL_AREA (id_division, nombre_area) values(18,'Terreno 2 Caldera Co Turbo Generadores');
Insert into TBL_AREA (id_division, nombre_area) values(18,'Sala de Control TDC');
Insert into TBL_AREA (id_division, nombre_area) values(20,'Pipe_Fither');
Insert into TBL_AREA (id_division, nombre_area) values(20,'Jefe de Turno');
Insert into TBL_AREA (id_division, nombre_area) values(21,'Zona Intermedia');
Insert into TBL_AREA (id_division, nombre_area) values(21,'Zona de Carga de Productos Limpios');
Insert into TBL_AREA (id_division, nombre_area) values(21,'Zona Oleoductos');
Insert into TBL_AREA (id_division, nombre_area) values(21,'Zona de Crudos');
Insert into TBL_AREA (id_division, nombre_area) values(21,'Zona Efluentes');
Insert into TBL_AREA (id_division, nombre_area) values(21,'Zona LPG ');
Insert into TBL_AREA (id_division, nombre_area) values(22,'Terminal San Vicente');
Insert into TBL_AREA (id_division, nombre_area) values(22,'Sala de control TDC');
Insert into TBL_AREA (id_division, nombre_area) values(24,'Equipos Estáticos Área 1');
Insert into TBL_AREA (id_division, nombre_area) values(24,'Equipos Estáticos Área 2');
Insert into TBL_AREA (id_division, nombre_area) values(24,'Equipos Estáticos Área 3');
Insert into TBL_AREA (id_division, nombre_area) values(24,'Apoyo Contrato E. Estáticos');
Insert into TBL_AREA (id_division, nombre_area) values(24,'Mantencion Civil Biobío');
Insert into TBL_AREA (id_division, nombre_area) values(24,'Contratos Equipos Estáticos');
Insert into TBL_AREA (id_division, nombre_area) values(25,'Electricidad Biobío Área 1');
Insert into TBL_AREA (id_division, nombre_area) values(25,'Electricidad Biobío Área 2');
Insert into TBL_AREA (id_division, nombre_area) values(25,'Apoyo contratos Eléctricos');
Insert into TBL_AREA (id_division, nombre_area) values(25,'Electronica Biobío');
Insert into TBL_AREA (id_division, nombre_area) values(25,'Apoyo Contratos Electrónicos');
Insert into TBL_AREA (id_division, nombre_area) values(25,'Instrumentos Biobío Área 1');
Insert into TBL_AREA (id_division, nombre_area) values(25,'Instrumentos Biobío Área 2');
Insert into TBL_AREA (id_division, nombre_area) values(25,'Apoyo Contrato Instrumentos');
Insert into TBL_AREA (id_division, nombre_area) values(26,'Mecanica Biobío 1');
Insert into TBL_AREA (id_division, nombre_area) values(26,'Mecanica Biobío 2');
Insert into TBL_AREA (id_division, nombre_area) values(26,'Apoyo Contratos Mecánicos');
Insert into TBL_AREA (id_division, nombre_area) values(26,'Lubricador');
Insert into TBL_AREA (id_division, nombre_area) values(26,'Apoyo Contrato Lubricación');
Insert into TBL_AREA (id_division, nombre_area) values(26,'Maestranza');
Insert into TBL_AREA (id_division, nombre_area) values(26,'Maniobras');
Insert into TBL_AREA (id_division, nombre_area) values(26,'Apoyo Contrato Maestranza');
Insert into TBL_AREA (id_division, nombre_area) values(27,'lanificacion Biobío');
Insert into TBL_AREA (id_division, nombre_area) values(28,'Predictiva Estática Biobío');
Insert into TBL_AREA (id_division, nombre_area) values(28,'Analisis de Fallos');
Insert into TBL_AREA (id_division, nombre_area) values(28,'Predictiva Estática Biobío');
GO


/*
	TBL_CONSECUENCIA
*/
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Desmembramiento, traumatismo');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Desmembramiento, traumatismo');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Contusiones, heridas, politraumatismo');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Contusiones, heridas, politraumatismo');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Contusiones, heridas, traumatismo');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesiones, enfermedad, compromiso vital');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesiones, Compromiso Vital');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Contusiones, heridas, politraumatismo');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Contusiones, heridas, politraumatismo');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Contusiones, heridas, politraumatismo');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Shock eléctrico, muerte');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Quemaduras, lesiones a la piel');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Quemaduras, lesiones a la piel');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Cortes, magulladuras');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Cortes, heridas profundas');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Erosiones a la piel, quemaduras, irritación');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Politraumatismo, asfixia, muerte');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Quemaduras, lesiones a la piel');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesiones a la piel');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesiones a la piel, deshidratación');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Hipotermia');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Irritación a las vías respiratorias altas, intoxicación aguda, asfixia');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Irritación, lesiones pulmonares');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Irritación a las vías respiratorias altas, intoxicación aguda');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesiones pulmonares');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesiones vasculares');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Quemaduras, lesiones a la piel');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Quemaduras, lesiones a la piel');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Irritación a las vías respiratorias altas, intoxicación aguda');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesiones al oído');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Irritación a las vías respiratorias altas, intoxicación aguda');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('trastornos músculo esqueléticos');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Contusiones, heridas, traumatismo');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Contusiones, heridas, traumatismo');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Contusiones, heridas, traumatismo');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Quemaduras, asfixia, muerte');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesión pulmonar, muerte');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesión aguda al sistema digestivo');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Trastorno músculo esquelético');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Trastorno Psíquico');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Trastornos músculo esquelético');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Trastornos músculo esquelético');
GO


/*
	TBL_ACTIVIDAD_GENERAL
*/
Insert into TBL_ACTIVIDAD_GENERAL(Nom_Actividad_General) values('Mantención');
Insert into TBL_ACTIVIDAD_GENERAL(Nom_Actividad_General) values('Operación en Terreno');
Insert into TBL_ACTIVIDAD_GENERAL(Nom_Actividad_General) values('Análisis de Laboratorio');
Insert into TBL_ACTIVIDAD_GENERAL(Nom_Actividad_General) values('Administrativo');
Insert into TBL_ACTIVIDAD_GENERAL(Nom_Actividad_General) values('Recepción de Buques');
GO

/*
	TBL_PELIGRO
*/

Insert into TBL_PELIGRO (Nom_Peligro ) values('Atrapamiento entre objetos en movimiento o fijo y movimiento');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Atrapamiento por Objeto fijo o en movimiento');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Atropello');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Caída a diferente Nivel');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Caída al mismo nivel');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Causado por animal o insecto');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Causado por terceras personas');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Choque contra elementos móviles');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Choque contra objetos o estructura fija');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Choque por otro vehículo');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Contacto con electricidad');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Contacto con fuego');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Contacto con Objetos Calientes');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Contacto con Objetos Cortantes');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Contacto con Objetos Punzantes');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Contacto con sustancias químicas');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Explosión');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Exposición  a radiaciones ultravioletas');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Exposición a agentes biológicos (bacterias, hongos, etc.)');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Exposición a calor');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Exposición a frío');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Exposición a gases');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Exposición a humos metálicos');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Exposición a nieblas');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Exposición a Polvo');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Exposición a presiones anormales');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Exposición a radiaciones infrarrojas');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Exposición a radiaciones íonizantes');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Exposición a rocíos');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Exposición a ruido');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Exposición a vapores');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Exposición a vibraciones');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Golpeado con objeto o herramienta');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Golpeado contra objetos o equipos');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Golpeado por Objeto');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Incendio');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Inmersión');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Intoxicación por alimentos');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Sobre carga física');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Sobre tensión mental y psicológica');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Sobreesfuerzo por movimiento repetitivo');
Insert into TBL_PELIGRO (Nom_Peligro ) values('Sobreesfuerzo por manejo manual de materiales');
GO
/*
	TBL_PELIGRO

Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (1,'Atrapamiento entre objetos en movimiento o fijo y movimiento');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (2,'Atrapamiento por Objeto fijo o en movimiento');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (3,'Atropello');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (4,'Caída a diferente Nivel');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (5,'Caída al mismo nivel');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (6,'Causado por animal o insecto');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (7,'Causado por terceras personas');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (8,'Choque contra elementos móviles');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (9,'Choque contra objetos o estructura fija');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (10,'Choque por otro vehículo');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (11,'Contacto con electricidad');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (12,'Contacto con fuego');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (13,'Contacto con Objetos Calientes');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (14,'Contacto con Objetos Cortantes');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (15,'Contacto con Objetos Punzantes');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (16,'Contacto con sustancias químicas');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (17,'Explosión');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (18,'Exposición  a radiaciones ultravioletas');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (19,'Exposición a agentes biológicos (bacterias, hongos, etc.)');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (20,'Exposición a calor');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (21,'Exposición a frío');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (22,'Exposición a gases');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (23,'Exposición a humos metálicos');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (24,'Exposición a nieblas');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (25,'Exposición a Polvo');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (26,'Exposición a presiones anormales');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (27,'Exposición a radiaciones infrarrojas');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (28,'Exposición a radiaciones íonizantes');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (29,'Exposición a rocíos');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (30,'Exposición a ruido');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (31,'Exposición a vapores');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (32,'Exposición a vibraciones');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (33,'Golpeado con objeto o herramienta');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (34,'Golpeado contra objetos o equipos');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (35,'Golpeado por Objeto');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (36,'Incendio');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (37,'Inmersión');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (38,'Intoxicación por alimentos');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (39,'Sobre carga física');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (40,'Sobre tensión mental y psicológica');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (41,'Sobreesfuerzo por movimiento repetitivo');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (42,'Sobreesfuerzo por manejo manual de materiales');
GO
*/
/*
	TBL_CARGO
*/
Insert into TBL_CARGO (NOMBRE_CARGO) values('Gerente de Refinería');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Gerentes');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Jefe Departamento');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Jefe De División');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Supervisor');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Ingenieros');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Técnicos');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Secretarias');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Jede Departamento');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Jefe de División');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Supervisor de Operaciones');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Operador Jefe');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Supervisor de terreno');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Operador TDC');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Operador Terreno');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Operador Entrenamiento');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Ingeniero Analista');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Ingeniero en Mantención');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Supervisor de Mantención');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Técnico de Mantención');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Jefe de Laboratorio Servicio');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Químico Jefe');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Químico Especialista');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Químico Poli-funcional');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Químico Analista');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Especialista');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Químico');
GO
/*
	TBL_CARGO

Insert into TBL_CARGO (NOMBRE_CARGO) values('Gerente de Refinería');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Gerentes');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Jefe Departamento');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Jefe De División');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Supervisor');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Ingenieros');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Técnicos');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Secretarias');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Jede Departamento');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Jefe de División');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Supervisor de Operaciones');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Operador Jefe');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Supervisor de terreno');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Operador TDC');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Operador Terreno');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Operador Entrenamiento');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Ingeniero Analista');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Ingeniero en Mantención');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Supervisor de Mantención');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Técnico de Mantención');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Jefe de Laboratorio Servicio');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Químico Jefe');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Químico Especialista');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Químico Poli-funcional');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Químico Analista');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Especialista');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Químico');
GO


	TBL_CONDICION

Insert into TBL_CONDICION(Nom_Condicion) values('Rutinario');
Insert into TBL_CONDICION(Nom_Condicion) values('No rutinario');
Insert into TBL_CONDICION(Nom_Condicion) values('Emergencia');
GO
*/
/*
	TBL_VALORACION_PROBABILIDAD

Insert into TBL_VALORACION_PROBABILIDAD (Nom_Probabilidad) values('Bajo');
Insert into TBL_VALORACION_PROBABILIDAD (Nom_Probabilidad) values('Medio');
Insert into TBL_VALORACION_PROBABILIDAD (Nom_Probabilidad) values('Alto');
GO


	TBL_VALORACION_CONSECUENCIA

Insert into TBL_VALORACION_CONSECUENCIA (Nom_Consecuencia) values ('Ligeramente Dañino');
Insert into TBL_VALORACION_CONSECUENCIA (Nom_Consecuencia) values ('Dañino');
Insert into TBL_VALORACION_CONSECUENCIA (Nom_Consecuencia) values ('Extremadamente Dañino');
GO
*/

/*
	TBL_MEDIDA_DE_CONTROL
*/
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Conocer y aplicar E-022 (Sistema de Bloqueo y Tarjetas de Seguridad).');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Mantener atención a las zonas de tránsito vehicular.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Utilizar arnés de seguridad');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Utilizar absorbedor de impacto');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Mantener atención a las zonas de tránsito peatonal');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Usar pasos habilitados para cruzar calles');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Inspeccionar los lugares con posible presencia de animales o insectos antes de ingresar o manipular.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Informar inmediatamente a Servicio de Seguridad ante presencia de persona o evento extraña');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Chequear los elementos del vehiculo (luces, extintor, etc.)');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Asegurar que no exista tensión eléctrica');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Evaluar la deficiencia de oxígeno en los espacios confinados');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Evaluar nivel de agentes tóxicos previamente.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Evaluar nivel de explosividad previo a ejecución de trabajo en caliente');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Utilizar ropa de algodón para efectuar tareas (E-014)');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Utilizar EPP apropiados para la tarea (Casco, Zapatos, Guantes, Lentes)');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Utilizar EPP especiales (Mascaras para gases, polvo, niebla, trajes, guantes  E-014)');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Utilizar vestimenta manga larga y bloqueador solar');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('No beber agua de la red contra incendio.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Mantener hidratación y rotación');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Usar ropa térmica de abrigo ');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Utilizar detector de H2S calibrado');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Aplicar conceptos de Autocuidado');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Poseer licencia para el transporte de mercancías peligrosa.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Poseer licencia de conducir maquinaría pesada vigente');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Poseer licencia de conducir vigente');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Poseer curso de Conductor Defensivo ');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Utilizar equipo de respiración autónomo o aire en línea.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Señalizar o delimitar el área ');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Mantener puesta a tierra para zonas con posible fuga de corriente');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Mantener extintor en el área');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Encapsular el área y retirar los materiales combustibles');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Instalar arpillera húmeda en alcantarillas o canaletas');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Velocidad máxima 30Km. (E-015)');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Conocer y aplicar Estándar Corporativo de Trabajo en Altura');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Revisar los andamios armados.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Inspección y certificación de equipos y herramientas eléctricas (E-011-1)');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Conocer Hoja de Dato de Seguridad ');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Participar en la elaboración del Análisis Sistemático de Riesgo (A.S.R, E-007) ');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Conocer y Aplicar procedimiento especifico de trabajo');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Conocer y Aplicar procedimiento E-019 sobre radiaciones ionizante');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Poseer autorización para la operación de equipos emisores de radiación ionizante.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Revisar los equipos emisores de radiaciones ionizantes periódicamente');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Aplicar técnica de levantamiento de materiales');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Utilizar equipo de respiración autónoma');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Solicitar el Permiso de trabajo escrito respectivo.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Conocer y aplicar estándar E-001(P.G.E.) y lo establecido en P.L.E del área.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Asegurar que el calzado de seguridad mantiene  su sistema de tracción y agarre en buen estado');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Interpretar correctamente las señalizaciones de advertencia como: Rombo NFPA otros.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Revisar que el o los equipos a utilizar en la evaluación ambiental posean calibración vigente.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Poseer capacitación de supervivencia en el mar, uso de salvavidas.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('No utilizar elementos ígneos en el área.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Realizar charla de cinco minutos previo a la tarea');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Determinar los puntos de encuentro, frente a emergencias.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Inspección regular y certificación de equipos y herramientas.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Mantener un almacenamiento adecuado de químicos.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Mantener un almacenamiento adecuado de cilindros de gases comprimidos.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Poseer certificación de operación de aire en línea.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Poseer aptitud física compatible con la tarea.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Poseer certificación para realizar la tarea.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Coordinar tarea previamente con la línea de supervisión');
GO
