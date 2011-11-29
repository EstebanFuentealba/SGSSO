if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('E006_3') and o.name = 'FK_E006_3_INCORPORA_TBL_EVEN')
alter table E006_3
   drop constraint FK_E006_3_INCORPORA_TBL_EVEN
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('E006_4') and o.name = 'FK_E006_4_RELATIONS_E006_3')
alter table E006_4
   drop constraint FK_E006_4_RELATIONS_E006_3
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('HISTORIAL_INFORME') and o.name = 'FK_HISTORIA_NECESITA_E006_3')
alter table HISTORIAL_INFORME
   drop constraint FK_HISTORIA_NECESITA_E006_3
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('MATRIZ_EMPRESA') and o.name = 'FK_MATRIZ_E_EMPRESA_M_TBL_EMPR')
alter table MATRIZ_EMPRESA
   drop constraint FK_MATRIZ_E_EMPRESA_M_TBL_EMPR
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('MATRIZ_EMPRESA') and o.name = 'FK_MATRIZ_E_MATRIZ-MA_TBL_MATR')
alter table MATRIZ_EMPRESA
   drop constraint "FK_MATRIZ_E_MATRIZ-MA_TBL_MATR"
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('MATRIZ_HISTORIAL') and o.name = 'FK_MATRIZ_H_MATRIZ_HI_TBL_MATR')
alter table MATRIZ_HISTORIAL
   drop constraint FK_MATRIZ_H_MATRIZ_HI_TBL_MATR
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_ACCION_CORRECTIVA') and o.name = 'FK_TBL_ACCI_ACCION_CO_E006_3')
alter table TBL_ACCION_CORRECTIVA
   drop constraint FK_TBL_ACCI_ACCION_CO_E006_3
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_ACCION_CORRECTIVA') and o.name = 'FK_TBL_ACCI_REFERENCE_TBL_USUA')
alter table TBL_ACCION_CORRECTIVA
   drop constraint FK_TBL_ACCI_REFERENCE_TBL_USUA
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_ACCION_CORRECTIVA') and o.name = 'FK_TBL_ACCI_TIENE_TBL_ACCI')
alter table TBL_ACCION_CORRECTIVA
   drop constraint FK_TBL_ACCI_TIENE_TBL_ACCI
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_ACCION_CORRECTIVA_RECURSO') and o.name = 'FK_TBL_ACCI_TBL_ACCIO_TBL_ACCI')
alter table TBL_ACCION_CORRECTIVA_RECURSO
   drop constraint FK_TBL_ACCI_TBL_ACCIO_TBL_ACCI
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_ACCION_CORRECTIVA_RECURSO') and o.name = 'FK_TBL_ACCI_TBL_ACCIO_TBL_RECU')
alter table TBL_ACCION_CORRECTIVA_RECURSO
   drop constraint FK_TBL_ACCI_TBL_ACCIO_TBL_RECU
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_ACTIVIDAD_EVALUADA') and o.name = 'FK_TBL_ACTI_ASOCIA_TBL_PELI')
alter table TBL_ACTIVIDAD_EVALUADA
   drop constraint FK_TBL_ACTI_ASOCIA_TBL_PELI
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_ACTIVIDAD_EVALUADA') and o.name = 'FK_TBL_ACTI_ASOCIADA_TBL_ACTI')
alter table TBL_ACTIVIDAD_EVALUADA
   drop constraint FK_TBL_ACTI_ASOCIADA_TBL_ACTI
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_ACTIVIDAD_EVALUADA') and o.name = 'FK_TBL_ACTI_CARGO_ACT_TBL_CARG')
alter table TBL_ACTIVIDAD_EVALUADA
   drop constraint FK_TBL_ACTI_CARGO_ACT_TBL_CARG
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_ACTIVIDAD_EVALUADA') and o.name = 'FK_TBL_ACTI_DIVISION__TBL_DIVI')
alter table TBL_ACTIVIDAD_EVALUADA
   drop constraint FK_TBL_ACTI_DIVISION__TBL_DIVI
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_ACTIVIDAD_EVALUADA') and o.name = 'FK_TBL_ACTI_DPTO_ORGA_TBL_DEPA')
alter table TBL_ACTIVIDAD_EVALUADA
   drop constraint FK_TBL_ACTI_DPTO_ORGA_TBL_DEPA
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_ACTIVIDAD_EVALUADA') and o.name = 'FK_TBL_ACTI_INBOLUCRA_TBL_AREA')
alter table TBL_ACTIVIDAD_EVALUADA
   drop constraint FK_TBL_ACTI_INBOLUCRA_TBL_AREA
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_ACTIVIDAD_EVALUADA') and o.name = 'FK_TBL_ACTI_INVOLUCRA_TBL_ACTI')
alter table TBL_ACTIVIDAD_EVALUADA
   drop constraint FK_TBL_ACTI_INVOLUCRA_TBL_ACTI
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_ACTIVIDAD_RESPONSABLE') and o.name = 'FK_TBL_ACTI_TBL_ACTIV_TBL_CARG')
alter table TBL_ACTIVIDAD_RESPONSABLE
   drop constraint FK_TBL_ACTI_TBL_ACTIV_TBL_CARG
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_ACTIVIDAD_RESPONSABLE') and o.name = 'FK_TBL_ACTI_TBL_ACTIV_TBL_SUB_')
alter table TBL_ACTIVIDAD_RESPONSABLE
   drop constraint FK_TBL_ACTI_TBL_ACTIV_TBL_SUB_
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_ACTIVIDAD_TRABAJADOR_REALIZADA') and o.name = 'FK_TBL_ACTI_TBL_ACTIV_TBL_ACTI')
alter table TBL_ACTIVIDAD_TRABAJADOR_REALIZADA
   drop constraint FK_TBL_ACTI_TBL_ACTIV_TBL_ACTI
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_ACTIVIDAD_TRABAJADOR_REALIZADA') and o.name = 'FK_TBL_ACTI_TBL_ACTIV_TBL_TRAB')
alter table TBL_ACTIVIDAD_TRABAJADOR_REALIZADA
   drop constraint FK_TBL_ACTI_TBL_ACTIV_TBL_TRAB
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_ARCHIVO') and o.name = 'FK_TBL_ARCH_ARCHIVO_E_E006_3')
alter table TBL_ARCHIVO
   drop constraint FK_TBL_ARCH_ARCHIVO_E_E006_3
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_AREA') and o.name = 'FK_TBL_AREA_INMERSA_TBL_DIVI')
alter table TBL_AREA
   drop constraint FK_TBL_AREA_INMERSA_TBL_DIVI
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_CAUSA') and o.name = 'FK_TBL_CAUS_PERTENECE_E006_4')
alter table TBL_CAUSA
   drop constraint FK_TBL_CAUS_PERTENECE_E006_4
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_CAUSA_MEDIDA_DE_CONTROL') and o.name = 'FK_TBL_CAUS_TBL_CAUSA_TBL_CAUS')
alter table TBL_CAUSA_MEDIDA_DE_CONTROL
   drop constraint FK_TBL_CAUS_TBL_CAUSA_TBL_CAUS
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_CAUSA_MEDIDA_DE_CONTROL') and o.name = 'FK_TBL_CAUS_TBL_CAUSA_TBL_MEDI')
alter table TBL_CAUSA_MEDIDA_DE_CONTROL
   drop constraint FK_TBL_CAUS_TBL_CAUSA_TBL_MEDI
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_DEPARTAMENTO_ORGANIZACION') and o.name = 'FK_TBL_DEPA_ESTA_EN_TBL_DEPA')
alter table TBL_DEPARTAMENTO_ORGANIZACION
   drop constraint FK_TBL_DEPA_ESTA_EN_TBL_DEPA
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_DEPARTAMENTO_ORGANIZACION') and o.name = 'FK_TBL_DEPA_REFERENCE_TBL_ORGA')
alter table TBL_DEPARTAMENTO_ORGANIZACION
   drop constraint FK_TBL_DEPA_REFERENCE_TBL_ORGA
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_DIVISION') and o.name = 'FK_TBL_DIVI_DEPARTAME_TBL_DEPA')
alter table TBL_DIVISION
   drop constraint FK_TBL_DIVI_DEPARTAME_TBL_DEPA
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_EVALUACION_MENSUAL') and o.name = 'FK_TBL_EVAL_ENLAZA_TBL_SUB_')
alter table TBL_EVALUACION_MENSUAL
   drop constraint FK_TBL_EVAL_ENLAZA_TBL_SUB_
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_EVENTO') and o.name = 'FK_TBL_EVEN_EVENTO_DP_TBL_DEPA')
alter table TBL_EVENTO
   drop constraint FK_TBL_EVEN_EVENTO_DP_TBL_DEPA
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_EVENTO_DATO') and o.name = 'FK_TBL_EVEN_DATO_EVEN_TBL_DATO')
alter table TBL_EVENTO_DATO
   drop constraint FK_TBL_EVEN_DATO_EVEN_TBL_DATO
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_EVENTO_DATO') and o.name = 'FK_TBL_EVEN_E006-3-EV_E006_3')
alter table TBL_EVENTO_DATO
   drop constraint "FK_TBL_EVEN_E006-3-EV_E006_3"
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_EVENTO_EMPRESA') and o.name = 'FK_TBL_EVEN_AFECTA_TBL_EVEN')
alter table TBL_EVENTO_EMPRESA
   drop constraint FK_TBL_EVEN_AFECTA_TBL_EVEN
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_EVENTO_EMPRESA') and o.name = 'FK_TBL_EVEN_EMPRESA_E_TBL_EMPR')
alter table TBL_EVENTO_EMPRESA
   drop constraint FK_TBL_EVEN_EMPRESA_E_TBL_EMPR
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_EVENTO_TRABAJADOR') and o.name = 'FK_TBL_EVEN_EVENTO_TR_TBL_TRAB')
alter table TBL_EVENTO_TRABAJADOR
   drop constraint FK_TBL_EVEN_EVENTO_TR_TBL_TRAB
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_EVENTO_TRABAJADOR') and o.name = 'FK_TBL_EVEN_REALIZA_TBL_MATR')
alter table TBL_EVENTO_TRABAJADOR
   drop constraint FK_TBL_EVEN_REALIZA_TBL_MATR
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_EVENTO_TRABAJADOR') and o.name = 'FK_TBL_EVEN_REFERENCE_TBL_EVEN')
alter table TBL_EVENTO_TRABAJADOR
   drop constraint FK_TBL_EVEN_REFERENCE_TBL_EVEN
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_GRUPO_PRIVILEGIO') and o.name = 'FK_TBL_GRUP_GRUPO_GRU_TBL_GRUP')
alter table TBL_GRUPO_PRIVILEGIO
   drop constraint FK_TBL_GRUP_GRUPO_GRU_TBL_GRUP
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_GRUPO_PRIVILEGIO') and o.name = 'FK_TBL_GRUP_MODULO_GR_TBL_MODU')
alter table TBL_GRUPO_PRIVILEGIO
   drop constraint FK_TBL_GRUP_MODULO_GR_TBL_MODU
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_HISTORIAL_EMPRESA') and o.name = 'FK_TBL_HIST_REGISTRA_TBL_EMPR')
alter table TBL_HISTORIAL_EMPRESA
   drop constraint FK_TBL_HIST_REGISTRA_TBL_EMPR
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_MATRIZ') and o.name = 'FK_TBL_MATR_REFERENCE_TBL_USUA')
alter table TBL_MATRIZ
   drop constraint FK_TBL_MATR_REFERENCE_TBL_USUA
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_MATRIZ_ACTIVIDAD') and o.name = 'FK_TBL_MATR_CREAN_TBL_ACTI')
alter table TBL_MATRIZ_ACTIVIDAD
   drop constraint FK_TBL_MATR_CREAN_TBL_ACTI
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_MATRIZ_ACTIVIDAD') and o.name = 'FK_TBL_MATR_INCLUYE_TBL_MATR')
alter table TBL_MATRIZ_ACTIVIDAD
   drop constraint FK_TBL_MATR_INCLUYE_TBL_MATR
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_PARTE_CORPORAL_TRABAJADOR') and o.name = 'FK_TBL_PART_INCORPORA_TBL_EVEN')
alter table TBL_PARTE_CORPORAL_TRABAJADOR
   drop constraint FK_TBL_PART_INCORPORA_TBL_EVEN
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_PARTE_CORPORAL_TRABAJADOR') and o.name = 'FK_TBL_PART_INCORPORA_TBL_PART')
alter table TBL_PARTE_CORPORAL_TRABAJADOR
   drop constraint FK_TBL_PART_INCORPORA_TBL_PART
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_PELIGRO_CONSECUENCIA') and o.name = 'FK_TBL_PELI_REFERENCE_TBL_PELI')
alter table TBL_PELIGRO_CONSECUENCIA
   drop constraint FK_TBL_PELI_REFERENCE_TBL_PELI
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_PELIGRO_CONSECUENCIA') and o.name = 'FK_TBL_PELI_REFERENCE_TBL_CONS')
alter table TBL_PELIGRO_CONSECUENCIA
   drop constraint FK_TBL_PELI_REFERENCE_TBL_CONS
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_PELIGRO_MEDIDA') and o.name = 'FK_TBL_PELI_SE TOMAN_TBL_MEDI')
alter table TBL_PELIGRO_MEDIDA
   drop constraint "FK_TBL_PELI_SE TOMAN_TBL_MEDI"
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_PELIGRO_MEDIDA') and o.name = 'FK_TBL_PELI_SE CONTRO_TBL_ACTI')
alter table TBL_PELIGRO_MEDIDA
   drop constraint "FK_TBL_PELI_SE CONTRO_TBL_ACTI"
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_PROGRAMA_ACTIVIDAD') and o.name = 'FK_TBL_PROG_CORRESPON_TBL_PROG')
alter table TBL_PROGRAMA_ACTIVIDAD
   drop constraint FK_TBL_PROG_CORRESPON_TBL_PROG
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_PUNTO_GEOGRAFICO') and o.name = 'FK_TBL_PUNT_UBICADO_E_TBL_DEPA')
alter table TBL_PUNTO_GEOGRAFICO
   drop constraint FK_TBL_PUNT_UBICADO_E_TBL_DEPA
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_SUB_ACTIVIDAD') and o.name = 'FK_TBL_SUB__CONTIENE_TBL_PROG')
alter table TBL_SUB_ACTIVIDAD
   drop constraint FK_TBL_SUB__CONTIENE_TBL_PROG
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_SUB_ACTIVIDAD') and o.name = 'FK_TBL_SUB__EXISTE_TBL_EVID')
alter table TBL_SUB_ACTIVIDAD
   drop constraint FK_TBL_SUB__EXISTE_TBL_EVID
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_TRABAJADOR') and o.name = 'FK_TBL_TRAB_TRABAJADO_TBL_CARG')
alter table TBL_TRABAJADOR
   drop constraint FK_TBL_TRAB_TRABAJADO_TBL_CARG
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_USUARIO') and o.name = 'FK_TBL_USUA_CONTRATA_TBL_EMPR')
alter table TBL_USUARIO
   drop constraint FK_TBL_USUA_CONTRATA_TBL_EMPR
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_USUARIO_GRUPO') and o.name = 'FK_TBL_USUA_REFERENCE_TBL_USUA')
alter table TBL_USUARIO_GRUPO
   drop constraint FK_TBL_USUA_REFERENCE_TBL_USUA
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_USUARIO_GRUPO') and o.name = 'FK_TBL_USUA_TBL_USUAR_TBL_GRUP')
alter table TBL_USUARIO_GRUPO
   drop constraint FK_TBL_USUA_TBL_USUAR_TBL_GRUP
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('E006_3')
            and   name  = 'RELATIONSHIP_39_FK'
            and   indid > 0
            and   indid < 255)
   drop index E006_3.RELATIONSHIP_39_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('E006_3')
            and   type = 'U')
   drop table E006_3
go

if exists (select 1
            from  sysobjects
           where  id = object_id('E006_4')
            and   type = 'U')
   drop table E006_4
go

if exists (select 1
            from  sysobjects
           where  id = object_id('HISTORIAL_INFORME')
            and   type = 'U')
   drop table HISTORIAL_INFORME
go

if exists (select 1
            from  sysobjects
           where  id = object_id('MATRIZ_EMPRESA')
            and   type = 'U')
   drop table MATRIZ_EMPRESA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('MATRIZ_HISTORIAL')
            and   type = 'U')
   drop table MATRIZ_HISTORIAL
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_ACCION')
            and   type = 'U')
   drop table TBL_ACCION
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('TBL_ACCION_CORRECTIVA')
            and   name  = 'POSEE_FK'
            and   indid > 0
            and   indid < 255)
   drop index TBL_ACCION_CORRECTIVA.POSEE_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_ACCION_CORRECTIVA')
            and   type = 'U')
   drop table TBL_ACCION_CORRECTIVA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_ACCION_CORRECTIVA_RECURSO')
            and   type = 'U')
   drop table TBL_ACCION_CORRECTIVA_RECURSO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_ACTIVIDAD_ESPECIFICA')
            and   type = 'U')
   drop table TBL_ACTIVIDAD_ESPECIFICA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_ACTIVIDAD_EVALUADA')
            and   type = 'U')
   drop table TBL_ACTIVIDAD_EVALUADA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_ACTIVIDAD_GENERAL')
            and   type = 'U')
   drop table TBL_ACTIVIDAD_GENERAL
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_ACTIVIDAD_RESPONSABLE')
            and   type = 'U')
   drop table TBL_ACTIVIDAD_RESPONSABLE
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_ACTIVIDAD_TRABAJADOR')
            and   type = 'U')
   drop table TBL_ACTIVIDAD_TRABAJADOR
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_ACTIVIDAD_TRABAJADOR_REALIZADA')
            and   type = 'U')
   drop table TBL_ACTIVIDAD_TRABAJADOR_REALIZADA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_ARCHIVO')
            and   type = 'U')
   drop table TBL_ARCHIVO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_AREA')
            and   type = 'U')
   drop table TBL_AREA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_CARGO')
            and   type = 'U')
   drop table TBL_CARGO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_CAUSA')
            and   type = 'U')
   drop table TBL_CAUSA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_CAUSA_MEDIDA_DE_CONTROL')
            and   type = 'U')
   drop table TBL_CAUSA_MEDIDA_DE_CONTROL
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('TBL_CONSECUENCIA')
            and   name  = 'PROVOCA_FK'
            and   indid > 0
            and   indid < 255)
   drop index TBL_CONSECUENCIA.PROVOCA_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_CONSECUENCIA')
            and   type = 'U')
   drop table TBL_CONSECUENCIA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_DATO_EVENTO')
            and   type = 'U')
   drop table TBL_DATO_EVENTO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_DEPARTAMENTO')
            and   type = 'U')
   drop table TBL_DEPARTAMENTO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_DEPARTAMENTO_ORGANIZACION')
            and   type = 'U')
   drop table TBL_DEPARTAMENTO_ORGANIZACION
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_DIVISION')
            and   type = 'U')
   drop table TBL_DIVISION
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_EMPRESA')
            and   type = 'U')
   drop table TBL_EMPRESA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_EVALUACION_MENSUAL')
            and   type = 'U')
   drop table TBL_EVALUACION_MENSUAL
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_EVENTO')
            and   type = 'U')
   drop table TBL_EVENTO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_EVENTO_DATO')
            and   type = 'U')
   drop table TBL_EVENTO_DATO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_EVENTO_EMPRESA')
            and   type = 'U')
   drop table TBL_EVENTO_EMPRESA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_EVENTO_TRABAJADOR')
            and   type = 'U')
   drop table TBL_EVENTO_TRABAJADOR
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_EVIDENCIA')
            and   type = 'U')
   drop table TBL_EVIDENCIA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_GRUPO')
            and   type = 'U')
   drop table TBL_GRUPO
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('TBL_GRUPO_PRIVILEGIO')
            and   name  = 'PRIVILEGIO_GRUPO_PRIVILEGIO_FK'
            and   indid > 0
            and   indid < 255)
   drop index TBL_GRUPO_PRIVILEGIO.PRIVILEGIO_GRUPO_PRIVILEGIO_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_GRUPO_PRIVILEGIO')
            and   type = 'U')
   drop table TBL_GRUPO_PRIVILEGIO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_HISTORIAL_EMPRESA')
            and   type = 'U')
   drop table TBL_HISTORIAL_EMPRESA
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('TBL_MATRIZ')
            and   name  = 'HACE_FK'
            and   indid > 0
            and   indid < 255)
   drop index TBL_MATRIZ.HACE_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_MATRIZ')
            and   type = 'U')
   drop table TBL_MATRIZ
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_MATRIZ_ACTIVIDAD')
            and   type = 'U')
   drop table TBL_MATRIZ_ACTIVIDAD
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_MEDIDA_DE_CONTROL')
            and   type = 'U')
   drop table TBL_MEDIDA_DE_CONTROL
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_MODULO')
            and   type = 'U')
   drop table TBL_MODULO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_ORGANIZACION')
            and   type = 'U')
   drop table TBL_ORGANIZACION
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_PARTE_CORPORAL')
            and   type = 'U')
   drop table TBL_PARTE_CORPORAL
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_PARTE_CORPORAL_TRABAJADOR')
            and   type = 'U')
   drop table TBL_PARTE_CORPORAL_TRABAJADOR
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_PELIGRO')
            and   type = 'U')
   drop table TBL_PELIGRO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_PELIGRO_CONSECUENCIA')
            and   type = 'U')
   drop table TBL_PELIGRO_CONSECUENCIA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_PELIGRO_MEDIDA')
            and   type = 'U')
   drop table TBL_PELIGRO_MEDIDA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_PROGRAMA_ACTIVIDAD')
            and   type = 'U')
   drop table TBL_PROGRAMA_ACTIVIDAD
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_PROGRAMA_ANUAL')
            and   type = 'U')
   drop table TBL_PROGRAMA_ANUAL
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_PUNTO_GEOGRAFICO')
            and   type = 'U')
   drop table TBL_PUNTO_GEOGRAFICO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_RECURSO_COMPROMETIDO')
            and   type = 'U')
   drop table TBL_RECURSO_COMPROMETIDO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_SUB_ACTIVIDAD')
            and   type = 'U')
   drop table TBL_SUB_ACTIVIDAD
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_TRABAJADOR')
            and   type = 'U')
   drop table TBL_TRABAJADOR
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_USUARIO')
            and   type = 'U')
   drop table TBL_USUARIO
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('TBL_USUARIO_GRUPO')
            and   name  = 'TBL_USUARIO_GRUPO_FK'
            and   indid > 0
            and   indid < 255)
   drop index TBL_USUARIO_GRUPO.TBL_USUARIO_GRUPO_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_USUARIO_GRUPO')
            and   type = 'U')
   drop table TBL_USUARIO_GRUPO
go

if exists(select 1 from systypes where name='MOMENTO_OCURRIDO')
   execute sp_unbindrule MOMENTO_OCURRIDO
go

if exists(select 1 from systypes where name='MOMENTO_OCURRIDO')
   execute sp_droptype MOMENTO_OCURRIDO
go

if exists(select 1 from systypes where name='PRIVILEGIO')
   execute sp_droptype PRIVILEGIO
go

if exists(select 1 from systypes where name='TIPO_EVENTO')
   execute sp_unbindrule TIPO_EVENTO
go

if exists(select 1 from systypes where name='TIPO_EVENTO')
   execute sp_droptype TIPO_EVENTO
go

if exists (select 1 from sysobjects where id=object_id('R_MOMENTO_OCURRIDO') and type='R')
   drop rule  R_MOMENTO_OCURRIDO
go

if exists (select 1 from sysobjects where id=object_id('R_TIPO_EVENTO') and type='R')
   drop rule  R_TIPO_EVENTO
go

create rule R_MOMENTO_OCURRIDO as
      @column between 1 and 3 and @column in (1,2,3)
go

create rule R_TIPO_EVENTO as
      @column between 1 and 6 and @column in (1,2,3,4,5,6)
go

/*==============================================================*/
/* Domain: MOMENTO_OCURRIDO                                     */
/*==============================================================*/
execute sp_addtype MOMENTO_OCURRIDO, 'int'
go

execute sp_bindrule R_MOMENTO_OCURRIDO, MOMENTO_OCURRIDO
go

/*==============================================================*/
/* Domain: PRIVILEGIO                                           */
/*==============================================================*/
execute sp_addtype PRIVILEGIO, 'int'
go

/*==============================================================*/
/* Domain: TIPO_EVENTO                                          */
/*==============================================================*/
execute sp_addtype TIPO_EVENTO, 'int'
go

execute sp_bindrule R_TIPO_EVENTO, TIPO_EVENTO
go

/*==============================================================*/
/* Table: E006_3                                                */
/*==============================================================*/
create table E006_3 (
   ID_INFORME           int                  identity,
   ID_EVENTO_EMPRESA    int                  null,
   FECHA_INGRESO        datetime             null,
   CLASIFICACION        int                  null
      constraint CKC_CLASIFICACION_E006_3 check (CLASIFICACION is null or (CLASIFICACION between 1 and 6 and CLASIFICACION in (1,2,3,4,5,6))),
   constraint PK_E006_3 primary key nonclustered (ID_INFORME)
)
go


/*==============================================================*/
/* Table: E006_4                                                */
/*==============================================================*/
create table E006_4 (
   ID_INFORME           int                  identity,
   E00_ID_INFORME       int                  null,
   DESCRIPCION_INCIDENTE text                 null,
   ANTECEDENTES         text                 null,
   RELATO_DE_HECHO      text                 null,
   COMENTARIO           text                 null,
   FECHA_CREACION       datetime             null,
   constraint PK_E006_4 primary key nonclustered (ID_INFORME)
)
go

/*==============================================================*/
/* Table: HISTORIAL_INFORME                                     */
/*==============================================================*/
create table HISTORIAL_INFORME (
   ID_HISTORIAL_INFORME int                  identity,
   ID_INFORME           int                  null,
   FECHA_MODIFICACION   datetime             null,
   DESCRIPCION_MODIFICACION text                 null,
   constraint PK_HISTORIAL_INFORME primary key nonclustered (ID_HISTORIAL_INFORME)
)
go

/*==============================================================*/
/* Table: MATRIZ_EMPRESA                                        */
/*==============================================================*/
create table MATRIZ_EMPRESA (
   ID_MATRIZ            int                  not null,
   ID_EMPRESA           int                  not null,
   FECHA_CREACION       datetime             null,
   constraint PK_MATRIZ_EMPRESA primary key nonclustered (ID_MATRIZ, ID_EMPRESA)
)
go

/*==============================================================*/
/* Table: MATRIZ_HISTORIAL                                      */
/*==============================================================*/
create table MATRIZ_HISTORIAL (
   ID_MATRIZ_HISTORIAL  int                  identity,
   ID_MATRIZ            int                  null,
   FECHA_ACTUALIZACION  datetime             null,
   DESCRIPCION_ACTUALIZACION text                 null,
   constraint PK_MATRIZ_HISTORIAL primary key nonclustered (ID_MATRIZ_HISTORIAL)
)
go

/*==============================================================*/
/* Table: TBL_ACCION                                            */
/*==============================================================*/
create table TBL_ACCION (
   ID_ACCION            int                  identity,
   NOMBRE_ACCION        varchar(200)         NOT NULL UNIQUE,
   constraint PK_TBL_ACCION primary key nonclustered (ID_ACCION)
)
go

/*==============================================================*/
/* Table: TBL_ACCION_CORRECTIVA                                 */
/*==============================================================*/
create table TBL_ACCION_CORRECTIVA (
   ID_ACCION_CORRECTIVA int                  identity,
   ID_INFORME           int                  not null,
   ID_ACCION            int                  null,
   ID_USUARIO           varchar(200)         null,
   FECHA_PLAZO          datetime             null,
   FECHA_REALIZACION    datetime             null,
   PORCENTAJE_CUMPLIMIENTO int                  null,
   DESCRIPCION          text                 null,
   FECHA_CREACION       datetime             null,
   constraint PK_TBL_ACCION_CORRECTIVA primary key nonclustered (ID_ACCION_CORRECTIVA)
)
go

/*==============================================================*/
/* Table: TBL_ACCION_CORRECTIVA_RECURSO                         */
/*==============================================================*/
create table TBL_ACCION_CORRECTIVA_RECURSO (
   ID_RECURSO_COMPROMETIDO int                  not null,
   ID_ACCION_CORRECTIVA int                  not null,
   UTILIZADO            bit                  null,
   constraint PK_TBL_ACCION_CORRECTIVA_RECUR primary key nonclustered (ID_RECURSO_COMPROMETIDO, ID_ACCION_CORRECTIVA)
)
go

/*==============================================================*/
/* Table: TBL_ACTIVIDAD_ESPECIFICA                              */
/*==============================================================*/
create table TBL_ACTIVIDAD_ESPECIFICA (
   ID_ACTIVIDAD_ESPECIFICA int                  identity,
   NOM_ACTIVIDAD_ESPECIFICA varchar(200)         NOT null UNIQUE,
   constraint PK_TBL_ACTIVIDAD_ESPECIFICA primary key nonclustered (ID_ACTIVIDAD_ESPECIFICA)
)
go

/*==============================================================*/
/* Table: TBL_ACTIVIDAD_EVALUADA                                */
/*==============================================================*/
create table TBL_ACTIVIDAD_EVALUADA (
   ID_ACTIVIDAD_EVALUADA int                  identity,
   ID_ACTIVIDAD_GENERAL int                  null,
   ID_CARGO             int                  null,
   ID_DIVISION          int                  null,
   ID_ACTIVIDAD_ESPECIFICA int                  null,
   ID_DEPARTAMENTO_ORGANIZACION int                  null,
   ID_PELIGRO           int                  null,
   ID_AREA              int                  null,
   ESTADO               bit                  null default 0,
   VALORACION_CONSECUENCIA int                  null,
   VALORACION_PROBABILIDAD int                  null,
   MEDIDA_VALORACION_CONSECUENCIA int                  null,
   MEDIDA_VALORACION_PROBABILIDAD int                  null,
   FECHA_CREACION       datetime             null,
   CONDICION            int                  null
      constraint CKC_CONDICION_TBL_ACTI check (CONDICION is null or (CONDICION between 1 and 3 and CONDICION in (1,2,3))),
   constraint PK_TBL_ACTIVIDAD_EVALUADA primary key nonclustered (ID_ACTIVIDAD_EVALUADA)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   'Valores:
   1 = LIGERAMENTE DA�INO
   2 = DA�INO
   3 = EXTREMADAMENTE DA�INO',
   'user', @CurrentUser, 'table', 'TBL_ACTIVIDAD_EVALUADA', 'column', 'VALORACION_CONSECUENCIA'
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   'Valores:
   1 = BAJO
   2 = MEDIO
   3 = ALTO',
   'user', @CurrentUser, 'table', 'TBL_ACTIVIDAD_EVALUADA', 'column', 'VALORACION_PROBABILIDAD'
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   '1=RUTINARIO
   2=NO RUTINARIO
   3=EMERGENCIA',
   'user', @CurrentUser, 'table', 'TBL_ACTIVIDAD_EVALUADA', 'column', 'CONDICION'
go

/*==============================================================*/
/* Table: TBL_ACTIVIDAD_GENERAL                                 */
/*==============================================================*/
create table TBL_ACTIVIDAD_GENERAL (
   ID_ACTIVIDAD_GENERAL int                  identity,
   NOM_ACTIVIDAD_GENERAL varchar(200)         NOT null UNIQUE,
   constraint PK_TBL_ACTIVIDAD_GENERAL primary key nonclustered (ID_ACTIVIDAD_GENERAL)
)
go

/*==============================================================*/
/* Table: TBL_ACTIVIDAD_RESPONSABLE                             */
/*==============================================================*/
create table TBL_ACTIVIDAD_RESPONSABLE (
   ID_SUB_ACTIVIDAD     int                  not null,
   ID_CARGO             int                  not null,
   constraint PK_TBL_ACTIVIDAD_RESPONSABLE primary key nonclustered (ID_SUB_ACTIVIDAD, ID_CARGO)
)
go

/*==============================================================*/
/* Table: TBL_ACTIVIDAD_TRABAJADOR                              */
/*==============================================================*/
create table TBL_ACTIVIDAD_TRABAJADOR (
   ID_ACTIVIDAD_TRABAJADOR int                  identity,
   NOMBRE_ACTIVIDAD_TRABAJADOR varchar(200)         NOT NULL UNIQUE,
   constraint PK_TBL_ACTIVIDAD_TRABAJADOR primary key nonclustered (ID_ACTIVIDAD_TRABAJADOR)
)
go

/*==============================================================*/
/* Table: TBL_ACTIVIDAD_TRABAJADOR_REALIZADA                    */
/*==============================================================*/
create table TBL_ACTIVIDAD_TRABAJADOR_REALIZADA (
   ID_TRABAJADOR        int                  not null,
   ID_ACTIVIDAD_TRABAJADOR int                  not null,
   REALIZADA            bit                  null,
   constraint PK_TBL_ACTIVIDAD_TRABAJADOR_RE primary key nonclustered (ID_TRABAJADOR, ID_ACTIVIDAD_TRABAJADOR)
)
go

/*==============================================================*/
/* Table: TBL_ARCHIVO                                           */
/*==============================================================*/
create table TBL_ARCHIVO (
   ID_ARCHIVO           int                  identity,
   ID_INFORME           int                  null,
   NOMBRE_ARCHIVO       varchar(255)         null,
   PATH                 text                 null,
   constraint PK_TBL_ARCHIVO primary key nonclustered (ID_ARCHIVO)
)
go

/*==============================================================*/
/* Table: TBL_AREA                                              */
/*==============================================================*/
create table TBL_AREA (
   ID_AREA              int                  identity,
   ID_DIVISION          int                  null,
   NOMBRE_AREA          varchar(200)         NOT NULL,
   constraint PK_TBL_AREA primary key nonclustered (ID_AREA)
)
go

/*==============================================================*/
/* Table: TBL_CARGO                                             */
/*==============================================================*/
create table TBL_CARGO (
   ID_CARGO             int                  identity,
   NOMBRE_CARGO         varchar(200)        NOT NULL UNIQUE,
   constraint PK_TBL_CARGO primary key nonclustered (ID_CARGO)
)
go

/*==============================================================*/
/* Table: TBL_CAUSA                                             */
/*==============================================================*/
create table TBL_CAUSA (
   ID_CAUSA             int                  identity,
   ID_INFORME           int                  null,
   DESCRIPCION          text                 null,
   TIPO_CAUSA           int                  null
      constraint CKC_TIPO_CAUSA_TBL_CAUS check (TIPO_CAUSA is null or (TIPO_CAUSA between 1 and 3 and TIPO_CAUSA in (1,2,3))),
   constraint PK_TBL_CAUSA primary key nonclustered (ID_CAUSA)
)
go

/*==============================================================*/
/* Table: TBL_CAUSA_MEDIDA_DE_CONTROL                           */
/*==============================================================*/
create table TBL_CAUSA_MEDIDA_DE_CONTROL (
   ID_CAUSA             int                  not null,
   ID_MEDIDAS_DE_CONTROL int                  not null,
   ESTADO               bit                  null,
   constraint PK_TBL_CAUSA_MEDIDA_DE_CONTROL primary key nonclustered (ID_CAUSA, ID_MEDIDAS_DE_CONTROL)
)
go

/*==============================================================*/
/* Table: TBL_CONSECUENCIA                                      */
/*==============================================================*/
create table TBL_CONSECUENCIA (
   ID_CONSECUENCIA      int                  identity,
   NOMBRE_CONSECUENCIA  varchar(200)         NOT NULL UNIQUE,
   constraint PK_TBL_CONSECUENCIA primary key nonclustered (ID_CONSECUENCIA)
)
go

/*==============================================================*/
/* Table: TBL_DATO_EVENTO                                       */
/*==============================================================*/
create table TBL_DATO_EVENTO (
   ID_TIPO_EVENTO       int                  identity,
   NOMBRE_TIPO_EVENTO   varchar(200)         NOT NULL,
   TIPO                 int                  null
      constraint CKC_TIPO_TBL_DATO check (TIPO is null or (TIPO in (1,2))),
   constraint PK_TBL_DATO_EVENTO primary key nonclustered (ID_TIPO_EVENTO)
)
go

/*==============================================================*/
/* Table: TBL_DEPARTAMENTO                                      */
/*==============================================================*/
create table TBL_DEPARTAMENTO (
   ID_DEPARTAMENTO      int                  identity,
   NOMBRE_DEPARTAMENTO  varchar(200)         NOT NULL UNIQUE,
   constraint PK_TBL_DEPARTAMENTO primary key nonclustered (ID_DEPARTAMENTO)
)
go

/*==============================================================*/
/* Table: TBL_DEPARTAMENTO_ORGANIZACION                         */
/*==============================================================*/
create table TBL_DEPARTAMENTO_ORGANIZACION (
   ID_DEPARTAMENTO_ORGANIZACION int                  identity,
   ID_ORGANIZACION      int                  not null,
   ID_DEPARTAMENTO      int                  not null,
   constraint PK_TBL_DEPARTAMENTO_ORGANIZACI primary key nonclustered (ID_DEPARTAMENTO_ORGANIZACION)
)
go

/*==============================================================*/
/* Table: TBL_DIVISION                                          */
/*==============================================================*/
create table TBL_DIVISION (
   ID_DIVISION          int                  identity,
   ID_DEPARTAMENTO_ORGANIZACION int                  null,
   NOMBRE_DIVISION      varchar(150)         NOT NULL,
   constraint PK_TBL_DIVISION primary key nonclustered (ID_DIVISION)
)
go

/*==============================================================*/
/* Table: TBL_EMPRESA                                           */
/*==============================================================*/
create table TBL_EMPRESA (
   ID_EMPRESA           int                  identity,
   NOMBRE_EMPRESA       varchar(150)         null,
   DIRECCION_EMPRESA    varchar(250)         null,
   FONO_EMPRESA         varchar(20)          null,
   EMAIL_EMPRESA        varchar(150)         null,
   NOMBRE_CONTRATO      varchar(250)         null,
   constraint PK_TBL_EMPRESA primary key nonclustered (ID_EMPRESA)
)
go

/*==============================================================*/
/* Table: TBL_EVALUACION_MENSUAL                                */
/*==============================================================*/
create table TBL_EVALUACION_MENSUAL (
   ID_EVALUACION_MENSUAL int                  not null,
   ID_SUB_ACTIVIDAD     int                  null,
   PROGRAMADO           int                  null,
   REALIZADO            int                  null,
   FECHA_EVALUACION     datetime             null,
   constraint PK_TBL_EVALUACION_MENSUAL primary key nonclustered (ID_EVALUACION_MENSUAL)
)
go

/*==============================================================*/
/* Table: TBL_EVENTO                                            */
/*==============================================================*/
create table TBL_EVENTO (
   ID_EVENTO            int                  identity,
   ID_DEPARTAMENTO_ORGANIZACION int                  null,
   OCURRIO              int                  null
      constraint CKC_OCURRIO_TBL_EVEN check (OCURRIO is null or (OCURRIO between 1 and 3 and OCURRIO in (1,2,3))),
   FECHA_HORA_EVENTO    datetime             null,
   FECHA_INGRESO        datetime             null,
   LAT_EVENTO           double precision     null,
   LNG_EVENTO           double precision     null,
   TIPO_EVENTO          int                  null
      constraint CKC_TIPO_EVENTO_TBL_EVEN check (TIPO_EVENTO is null or (TIPO_EVENTO between 1 and 6 and TIPO_EVENTO in (1,2,3,4,5,6))),
   LUGAR_EXACTO         varchar(200)         null,
   DESCRIPCION_GENERAL  text                 null,
   constraint PK_TBL_EVENTO primary key nonclustered (ID_EVENTO)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   '1 = CAMINO A
   2 = EN
   3 = DE VUELTA DE',
   'user', @CurrentUser, 'table', 'TBL_EVENTO', 'column', 'OCURRIO'
go

/*==============================================================*/
/* Table: TBL_EVENTO_DATO                                       */
/*==============================================================*/
create table TBL_EVENTO_DATO (
   ID_INFORME           int                  not null,
   ID_TIPO_EVENTO       int                  not null,
   ESTADO               bit                  null,
   constraint PK_TBL_EVENTO_DATO primary key nonclustered (ID_INFORME, ID_TIPO_EVENTO)
)
go

/*==============================================================*/
/* Table: TBL_EVENTO_EMPRESA                                    */
/*==============================================================*/
create table TBL_EVENTO_EMPRESA (
   ID_EVENTO_EMPRESA    int                  identity,
   ID_EVENTO            int                  null,
   ID_EMPRESA           int                  null,
   DESCRIPCION          text                 null,
   ESTADO               bit                  null,
   constraint PK_TBL_EVENTO_EMPRESA primary key nonclustered (ID_EVENTO_EMPRESA)
)
go

/*==============================================================*/
/* Table: TBL_EVENTO_TRABAJADOR                                 */
/*==============================================================*/
create table TBL_EVENTO_TRABAJADOR (
   ID_EVENTO_TRABAJADOR int                  identity,
   ID_EVENTO_EMPRESA    int                  null,
   ID_TRABAJADOR        int                  null,
   ID_MATRIZ            int                  null,
   FECHA_PRESENTACION_HOSPITAL datetime             null,
   FECHA_ALTA_MEDICA    datetime             null,
   TIPO_LESION          int                  null,
   constraint PK_TBL_EVENTO_TRABAJADOR primary key nonclustered (ID_EVENTO_TRABAJADOR)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   '1=Musculares: Contracturas, desgarros, calambres, contusiones y hematomas, entre otras.
   2=Tendones: Tendinopat�as y tendinosis, por ejemplo.
   3=Articulaciones: Lesiones ligamentosas, de cart�lagos, luxaciones y subluxaciones, meniscopat�as, bursitis, etc.
   4=Huesos: fracturas, fisuras, periostitis, entre otras.',
   'user', @CurrentUser, 'table', 'TBL_EVENTO_TRABAJADOR', 'column', 'TIPO_LESION'
go

/*==============================================================*/
/* Table: TBL_EVIDENCIA                                         */
/*==============================================================*/
create table TBL_EVIDENCIA (
   ID_EVIDENCIA         int                  identity,
   NOMBRE_EVIDENCIA     varchar(200)        NOT NULL UNIQUE,
   constraint PK_TBL_EVIDENCIA primary key nonclustered (ID_EVIDENCIA)
)
go

/*==============================================================*/
/* Table: TBL_GRUPO                                             */
/*==============================================================*/
create table TBL_GRUPO (
   ID_GRUPO             int                  identity,
   NOMBRE_GRUPO         varchar(50)          not null UNIQUE,
   DESCRIPCION_GRUPO    text                 null,
   constraint PK_TBL_GRUPO primary key nonclustered (ID_GRUPO)
)
go

/*==============================================================*/
/* Table: TBL_GRUPO_PRIVILEGIO                                  */
/*==============================================================*/
create table TBL_GRUPO_PRIVILEGIO (
   ID_GRUPO             int                  not null,
   PRIVILEGIO           int                  null
      constraint CKC_PRIVILEGIO_TBL_GRUP check (PRIVILEGIO is null or (PRIVILEGIO between 1 and 4 and PRIVILEGIO in (1,2,3,4))),
   ID_MODULO            int                  not null,
   ESTADO               bit                  null,
   constraint PK_TBL_GRUPO_PRIVILEGIO primary key nonclustered (ID_GRUPO, ID_MODULO)
)
go

/*==============================================================*/
/* Table: TBL_HISTORIAL_EMPRESA                                 */
/*==============================================================*/
create table TBL_HISTORIAL_EMPRESA (
   ID_HISTORIAL         int                  identity,
   ID_EMPRESA           int                  null,
   FECHA_CREACION       datetime             null,
   N_TRABAJADORES       int                  null,
   H_TRABAJADAS         int                  null,
   H_SOBRETIEMPO        int                  null,
   constraint PK_TBL_HISTORIAL_EMPRESA primary key nonclustered (ID_HISTORIAL)
)
go

/*==============================================================*/
/* Table: TBL_MATRIZ                                            */
/*==============================================================*/
create table TBL_MATRIZ (
   ID_MATRIZ            int                  identity,
   ID_USUARIO           varchar(200)         null,
   FECHA_CREACION       datetime             null,
   ESTADO               bit                  null,
   constraint PK_TBL_MATRIZ primary key nonclustered (ID_MATRIZ)
)
go


/*==============================================================*/
/* Table: TBL_MATRIZ_ACTIVIDAD                                  */
/*==============================================================*/
create table TBL_MATRIZ_ACTIVIDAD (
   ID_MATRIZ            int                  not null,
   ID_ACTIVIDAD_EVALUADA int                  not null,
   FECHA_CREACION       datetime             null,
   constraint PK_TBL_MATRIZ_ACTIVIDAD primary key nonclustered (ID_MATRIZ, ID_ACTIVIDAD_EVALUADA)
)
go

/*==============================================================*/
/* Table: TBL_MEDIDA_DE_CONTROL                                 */
/*==============================================================*/
create table TBL_MEDIDA_DE_CONTROL (
   ID_MEDIDAS_DE_CONTROL int                  identity,
   NOM_MEDIDA_DE_CONTROL varchar(255)         NOT null UNIQUE,
   ESTADO               bit                  null,
   constraint PK_TBL_MEDIDA_DE_CONTROL primary key nonclustered (ID_MEDIDAS_DE_CONTROL)
)
go

/*==============================================================*/
/* Table: TBL_MODULO                                            */
/*==============================================================*/
create table TBL_MODULO (
   ID_MODULO            int                  identity,
   NOMBRE_MODULO        varchar(100)         NOT null UNIQUE,
   DESCRIPCION_MODULO   text                 null,
   URL_MODULO           varchar(255)         null,
   ESTADO               bit                  null,
   constraint PK_TBL_MODULO primary key nonclustered (ID_MODULO)
)
go

/*==============================================================*/
/* Table: TBL_ORGANIZACION                                      */
/*==============================================================*/
create table TBL_ORGANIZACION (
   ID_ORGANIZACION      int                  identity,
   NOMBRE_ORGANIZACION  varchar(100)         NOT null UNIQUE,
   constraint PK_TBL_ORGANIZACION primary key nonclustered (ID_ORGANIZACION)
)
go

/*==============================================================*/
/* Table: TBL_PARTE_CORPORAL                                    */
/*==============================================================*/
create table TBL_PARTE_CORPORAL (
   ID_PARTE_CORPORAL    int                  identity,
   NOMBRE_PARTE_CORPORAL varchar(100)         NOT null UNIQUE,
   constraint PK_TBL_PARTE_CORPORAL primary key nonclustered (ID_PARTE_CORPORAL)
)
go

/*==============================================================*/
/* Table: TBL_PARTE_CORPORAL_TRABAJADOR                         */
/*==============================================================*/
create table TBL_PARTE_CORPORAL_TRABAJADOR (
   ID_PARTE_CORPORAL    int                  not null,
   ID_EVENTO_TRABAJADOR int                  not null,
   constraint PK_TBL_PARTE_CORPORAL_TRABAJAD primary key nonclustered (ID_PARTE_CORPORAL, ID_EVENTO_TRABAJADOR)
)
go

/*==============================================================*/
/* Table: TBL_PELIGRO                                           */
/*==============================================================*/
create table TBL_PELIGRO (
   ID_PELIGRO           int                  identity,
   NOM_PELIGRO          varchar(200)        NOT null UNIQUE,
   constraint PK_TBL_PELIGRO primary key nonclustered (ID_PELIGRO)
)
go

/*==============================================================*/
/* Table: TBL_PELIGRO_CONSECUENCIA                              */
/*==============================================================*/
create table TBL_PELIGRO_CONSECUENCIA (
   ID_PELIGRO           int                  not null,
   ID_CONSECUENCIA      int                  not null,
   constraint PK_TBL_PELIGRO_CONSECUENCIA primary key (ID_PELIGRO, ID_CONSECUENCIA)
)
go

/*==============================================================*/
/* Table: TBL_PELIGRO_MEDIDA                                    */
/*==============================================================*/
create table TBL_PELIGRO_MEDIDA (
   ID_MEDIDAS_DE_CONTROL int                  not null,
   ID_ACTIVIDAD_EVALUADA int                  not null,
   FECHA_CREACION       datetime             null,
   constraint PK_TBL_PELIGRO_MEDIDA primary key nonclustered (ID_MEDIDAS_DE_CONTROL, ID_ACTIVIDAD_EVALUADA)
)
go

/*==============================================================*/
/* Table: TBL_PROGRAMA_ACTIVIDAD                                */
/*==============================================================*/
create table TBL_PROGRAMA_ACTIVIDAD (
   ID_PROGRAMA_ACTIVIDAD int                  identity,
   ID_PROGRAMA_ANUAL    int                  null,
   NOMBRE_PROGRAMA_ACTIVIDAD varchar(200)         NOT null UNIQUE,
   constraint PK_TBL_PROGRAMA_ACTIVIDAD primary key nonclustered (ID_PROGRAMA_ACTIVIDAD)
)
go

/*==============================================================*/
/* Table: TBL_PROGRAMA_ANUAL                                    */
/*==============================================================*/
create table TBL_PROGRAMA_ANUAL (
   ID_PROGRAMA_ANUAL    int                  identity,
   OBJETIVO             text                 null,
   META                 text                 null,
   FECHA_CREACION       datetime             null,
   constraint PK_TBL_PROGRAMA_ANUAL primary key nonclustered (ID_PROGRAMA_ANUAL)
)
go

/*==============================================================*/
/* Table: TBL_PUNTO_GEOGRAFICO                                  */
/*==============================================================*/
create table TBL_PUNTO_GEOGRAFICO (
   ID_PUNTO_GEOGRAFICA  int                  identity,
   ID_DEPARTAMENTO_ORGANIZACION int                  not null,
   LAT_PUNTO            double precision     null,
   LNG_PUNTO            double precision     null,
   constraint PK_TBL_PUNTO_GEOGRAFICO primary key nonclustered (ID_PUNTO_GEOGRAFICA)
)
go

/*==============================================================*/
/* Table: TBL_RECURSO_COMPROMETIDO                              */
/*==============================================================*/
create table TBL_RECURSO_COMPROMETIDO (
   ID_RECURSO_COMPROMETIDO int                  identity,
   NOMBRE_RECURSO       varchar(150)         NOT null UNIQUE,
   DESCRIPCION          text                 null,
   constraint PK_TBL_RECURSO_COMPROMETIDO primary key nonclustered (ID_RECURSO_COMPROMETIDO)
)
go

/*==============================================================*/
/* Table: TBL_SUB_ACTIVIDAD                                     */
/*==============================================================*/
create table TBL_SUB_ACTIVIDAD (
   ID_SUB_ACTIVIDAD     int                  identity,
   ID_EVIDENCIA         int                  null,
   ID_PROGRAMA_ACTIVIDAD int                  null,
   NOMBRE_SUB_ACTIVIDAD varchar(200)         NOT null UNIQUE,
   TIPO_FRECUENCIA      int                  null,
   CANTIDAD_ACTIVIDADES varchar(200)         null,
   constraint PK_TBL_SUB_ACTIVIDAD primary key nonclustered (ID_SUB_ACTIVIDAD)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   '�ste campo podra tener los siguientes valores:
   1=Diario
   2=Semanal
   3=Mensual
   4=Anual
   5=Semestral
   6=Trimestral
   7=Cuando Aplique
   8=Permanente',
   'user', @CurrentUser, 'table', 'TBL_SUB_ACTIVIDAD', 'column', 'TIPO_FRECUENCIA'
go

/*==============================================================*/
/* Table: TBL_TRABAJADOR                                        */
/*==============================================================*/
create table TBL_TRABAJADOR (
   RUT_TRABAJADOR       varchar(12)          not null,
   NOMBRES              varchar(200)         null,
   APELLIDO_MATERNO     varchar(200)         null,
   APELLIDO_PATERNO     varchar(200)         null,
   TELEFONO             varchar(20)          null,
   ANOS_EXPERIENCIA     int                  null,
   ID_TRABAJADOR        int                  identity,
   ID_CARGO             int                  null,
   constraint PK_TBL_TRABAJADOR primary key nonclustered (ID_TRABAJADOR)
)
go

/*==============================================================*/
/* Table: TBL_USUARIO                                           */
/*==============================================================*/
create table TBL_USUARIO (
   PASSWORD             varchar(32)          null,
   EMAIL                varchar(150)         null,
   ESTADO               bit                  null,
   ID_USUARIO           varchar(200)         not null,
   ID_EMPRESA           int                  null,
   RUT_TRABAJADOR       varchar(12)          null,
   NOMBRES              varchar(200)         null,
   APELLIDO_MATERNO     varchar(200)         null,
   APELLIDO_PATERNO     varchar(200)         null,
   TELEFONO             varchar(20)          null,
   ANOS_EXPERIENCIA     int                  null,
   constraint PK_TBL_USUARIO primary key nonclustered (ID_USUARIO)
)
go

/*==============================================================*/
/* Table: TBL_USUARIO_GRUPO                                     */
/*==============================================================*/
create table TBL_USUARIO_GRUPO (
   ID_GRUPO             int                  not null,
   ID_USUARIO           varchar(200)         not null,
   GRUPO_ADMIN          bit                  null,
   constraint PK_TBL_USUARIO_GRUPO primary key nonclustered (ID_GRUPO,ID_USUARIO)
)
go

alter table E006_3
   add constraint FK_E006_3_INCORPORA_TBL_EVEN foreign key (ID_EVENTO_EMPRESA)
      references TBL_EVENTO_EMPRESA (ID_EVENTO_EMPRESA)
go

alter table E006_4
   add constraint FK_E006_4_RELATIONS_E006_3 foreign key (E00_ID_INFORME)
      references E006_3 (ID_INFORME)
go

alter table HISTORIAL_INFORME
   add constraint FK_HISTORIA_NECESITA_E006_3 foreign key (ID_INFORME)
      references E006_3 (ID_INFORME)
go

alter table MATRIZ_EMPRESA
   add constraint FK_MATRIZ_E_EMPRESA_M_TBL_EMPR foreign key (ID_EMPRESA)
      references TBL_EMPRESA (ID_EMPRESA)
go

alter table MATRIZ_EMPRESA
   add constraint "FK_MATRIZ_E_MATRIZ-MA_TBL_MATR" foreign key (ID_MATRIZ)
      references TBL_MATRIZ (ID_MATRIZ)
go

alter table MATRIZ_HISTORIAL
   add constraint FK_MATRIZ_H_MATRIZ_HI_TBL_MATR foreign key (ID_MATRIZ)
      references TBL_MATRIZ (ID_MATRIZ)
go

alter table TBL_ACCION_CORRECTIVA
   add constraint FK_TBL_ACCI_ACCION_CO_E006_3 foreign key (ID_INFORME)
      references E006_3 (ID_INFORME)
go

alter table TBL_ACCION_CORRECTIVA
   add constraint FK_TBL_ACCI_REFERENCE_TBL_USUA foreign key (ID_USUARIO)
      references TBL_USUARIO (ID_USUARIO)
go

alter table TBL_ACCION_CORRECTIVA
   add constraint FK_TBL_ACCI_TIENE_TBL_ACCI foreign key (ID_ACCION)
      references TBL_ACCION (ID_ACCION)
go

alter table TBL_ACCION_CORRECTIVA_RECURSO
   add constraint FK_TBL_ACCI_TBL_ACCIO_TBL_ACCI foreign key (ID_ACCION_CORRECTIVA)
      references TBL_ACCION_CORRECTIVA (ID_ACCION_CORRECTIVA)
go

alter table TBL_ACCION_CORRECTIVA_RECURSO
   add constraint FK_TBL_ACCI_TBL_ACCIO_TBL_RECU foreign key (ID_RECURSO_COMPROMETIDO)
      references TBL_RECURSO_COMPROMETIDO (ID_RECURSO_COMPROMETIDO)
go

alter table TBL_ACTIVIDAD_EVALUADA
   add constraint FK_TBL_ACTI_ASOCIA_TBL_PELI foreign key (ID_PELIGRO)
      references TBL_PELIGRO (ID_PELIGRO)
go

alter table TBL_ACTIVIDAD_EVALUADA
   add constraint FK_TBL_ACTI_ASOCIADA_TBL_ACTI foreign key (ID_ACTIVIDAD_GENERAL)
      references TBL_ACTIVIDAD_GENERAL (ID_ACTIVIDAD_GENERAL)
go

alter table TBL_ACTIVIDAD_EVALUADA
   add constraint FK_TBL_ACTI_CARGO_ACT_TBL_CARG foreign key (ID_CARGO)
      references TBL_CARGO (ID_CARGO)
go

alter table TBL_ACTIVIDAD_EVALUADA
   add constraint FK_TBL_ACTI_DIVISION__TBL_DIVI foreign key (ID_DIVISION)
      references TBL_DIVISION (ID_DIVISION)
go

alter table TBL_ACTIVIDAD_EVALUADA
   add constraint FK_TBL_ACTI_DPTO_ORGA_TBL_DEPA foreign key (ID_DEPARTAMENTO_ORGANIZACION)
      references TBL_DEPARTAMENTO_ORGANIZACION (ID_DEPARTAMENTO_ORGANIZACION)
go

alter table TBL_ACTIVIDAD_EVALUADA
   add constraint FK_TBL_ACTI_INBOLUCRA_TBL_AREA foreign key (ID_AREA)
      references TBL_AREA (ID_AREA)
go

alter table TBL_ACTIVIDAD_EVALUADA
   add constraint FK_TBL_ACTI_INVOLUCRA_TBL_ACTI foreign key (ID_ACTIVIDAD_ESPECIFICA)
      references TBL_ACTIVIDAD_ESPECIFICA (ID_ACTIVIDAD_ESPECIFICA)
go

alter table TBL_ACTIVIDAD_RESPONSABLE
   add constraint FK_TBL_ACTI_TBL_ACTIV_TBL_CARG foreign key (ID_CARGO)
      references TBL_CARGO (ID_CARGO)
go

alter table TBL_ACTIVIDAD_RESPONSABLE
   add constraint FK_TBL_ACTI_TBL_ACTIV_TBL_SUB_ foreign key (ID_SUB_ACTIVIDAD)
      references TBL_SUB_ACTIVIDAD (ID_SUB_ACTIVIDAD)
go

alter table TBL_ACTIVIDAD_TRABAJADOR_REALIZADA
   add constraint FK_TBL_ACTI_TBL_ACTIV_TBL_ACTI foreign key (ID_ACTIVIDAD_TRABAJADOR)
      references TBL_ACTIVIDAD_TRABAJADOR (ID_ACTIVIDAD_TRABAJADOR)
go

alter table TBL_ACTIVIDAD_TRABAJADOR_REALIZADA
   add constraint FK_TBL_ACTI_TBL_ACTIV_TBL_TRAB foreign key (ID_TRABAJADOR)
      references TBL_TRABAJADOR (ID_TRABAJADOR)
go

alter table TBL_ARCHIVO
   add constraint FK_TBL_ARCH_ARCHIVO_E_E006_3 foreign key (ID_INFORME)
      references E006_3 (ID_INFORME)
go

alter table TBL_AREA
   add constraint FK_TBL_AREA_INMERSA_TBL_DIVI foreign key (ID_DIVISION)
      references TBL_DIVISION (ID_DIVISION)
go

alter table TBL_CAUSA
   add constraint FK_TBL_CAUS_PERTENECE_E006_4 foreign key (ID_INFORME)
      references E006_4 (ID_INFORME)
go

alter table TBL_CAUSA_MEDIDA_DE_CONTROL
   add constraint FK_TBL_CAUS_TBL_CAUSA_TBL_CAUS foreign key (ID_CAUSA)
      references TBL_CAUSA (ID_CAUSA)
go

alter table TBL_CAUSA_MEDIDA_DE_CONTROL
   add constraint FK_TBL_CAUS_TBL_CAUSA_TBL_MEDI foreign key (ID_MEDIDAS_DE_CONTROL)
      references TBL_MEDIDA_DE_CONTROL (ID_MEDIDAS_DE_CONTROL)
go

alter table TBL_DEPARTAMENTO_ORGANIZACION
   add constraint FK_TBL_DEPA_ESTA_EN_TBL_DEPA foreign key (ID_DEPARTAMENTO)
      references TBL_DEPARTAMENTO (ID_DEPARTAMENTO)
go

alter table TBL_DEPARTAMENTO_ORGANIZACION
   add constraint FK_TBL_DEPA_REFERENCE_TBL_ORGA foreign key (ID_ORGANIZACION)
      references TBL_ORGANIZACION (ID_ORGANIZACION)
go

alter table TBL_DIVISION
   add constraint FK_TBL_DIVI_DEPARTAME_TBL_DEPA foreign key (ID_DEPARTAMENTO_ORGANIZACION)
      references TBL_DEPARTAMENTO_ORGANIZACION (ID_DEPARTAMENTO_ORGANIZACION)
go

alter table TBL_EVALUACION_MENSUAL
   add constraint FK_TBL_EVAL_ENLAZA_TBL_SUB_ foreign key (ID_SUB_ACTIVIDAD)
      references TBL_SUB_ACTIVIDAD (ID_SUB_ACTIVIDAD)
go

alter table TBL_EVENTO
   add constraint FK_TBL_EVEN_EVENTO_DP_TBL_DEPA foreign key (ID_DEPARTAMENTO_ORGANIZACION)
      references TBL_DEPARTAMENTO_ORGANIZACION (ID_DEPARTAMENTO_ORGANIZACION)
go

alter table TBL_EVENTO_DATO
   add constraint FK_TBL_EVEN_DATO_EVEN_TBL_DATO foreign key (ID_TIPO_EVENTO)
      references TBL_DATO_EVENTO (ID_TIPO_EVENTO)
go

alter table TBL_EVENTO_DATO
   add constraint "FK_TBL_EVEN_E006-3-EV_E006_3" foreign key (ID_INFORME)
      references E006_3 (ID_INFORME)
go

alter table TBL_EVENTO_EMPRESA
   add constraint FK_TBL_EVEN_AFECTA_TBL_EVEN foreign key (ID_EVENTO)
      references TBL_EVENTO (ID_EVENTO)
go

alter table TBL_EVENTO_EMPRESA
   add constraint FK_TBL_EVEN_EMPRESA_E_TBL_EMPR foreign key (ID_EMPRESA)
      references TBL_EMPRESA (ID_EMPRESA)
go

alter table TBL_EVENTO_TRABAJADOR
   add constraint FK_TBL_EVEN_EVENTO_TR_TBL_TRAB foreign key (ID_TRABAJADOR)
      references TBL_TRABAJADOR (ID_TRABAJADOR)
go

alter table TBL_EVENTO_TRABAJADOR
   add constraint FK_TBL_EVEN_REALIZA_TBL_MATR foreign key (ID_MATRIZ)
      references TBL_MATRIZ (ID_MATRIZ)
go

alter table TBL_EVENTO_TRABAJADOR
   add constraint FK_TBL_EVEN_REFERENCE_TBL_EVEN foreign key (ID_EVENTO_EMPRESA)
      references TBL_EVENTO_EMPRESA (ID_EVENTO_EMPRESA)
go

alter table TBL_GRUPO_PRIVILEGIO
   add constraint FK_TBL_GRUP_GRUPO_GRU_TBL_GRUP foreign key (ID_GRUPO)
      references TBL_GRUPO (ID_GRUPO)
go

alter table TBL_GRUPO_PRIVILEGIO
   add constraint FK_TBL_GRUP_MODULO_GR_TBL_MODU foreign key (ID_MODULO)
      references TBL_MODULO (ID_MODULO)
go

alter table TBL_HISTORIAL_EMPRESA
   add constraint FK_TBL_HIST_REGISTRA_TBL_EMPR foreign key (ID_EMPRESA)
      references TBL_EMPRESA (ID_EMPRESA)
go

alter table TBL_MATRIZ
   add constraint FK_TBL_MATR_REFERENCE_TBL_USUA foreign key (ID_USUARIO)
      references TBL_USUARIO (ID_USUARIO)
go

alter table TBL_MATRIZ_ACTIVIDAD
   add constraint FK_TBL_MATR_CREAN_TBL_ACTI foreign key (ID_ACTIVIDAD_EVALUADA)
      references TBL_ACTIVIDAD_EVALUADA (ID_ACTIVIDAD_EVALUADA)
go

alter table TBL_MATRIZ_ACTIVIDAD
   add constraint FK_TBL_MATR_INCLUYE_TBL_MATR foreign key (ID_MATRIZ)
      references TBL_MATRIZ (ID_MATRIZ)
go

alter table TBL_PARTE_CORPORAL_TRABAJADOR
   add constraint FK_TBL_PART_INCORPORA_TBL_EVEN foreign key (ID_EVENTO_TRABAJADOR)
      references TBL_EVENTO_TRABAJADOR (ID_EVENTO_TRABAJADOR)
go

alter table TBL_PARTE_CORPORAL_TRABAJADOR
   add constraint FK_TBL_PART_INCORPORA_TBL_PART foreign key (ID_PARTE_CORPORAL)
      references TBL_PARTE_CORPORAL (ID_PARTE_CORPORAL)
go

alter table TBL_PELIGRO_CONSECUENCIA
   add constraint FK_TBL_PELI_REFERENCE_TBL_PELI foreign key (ID_PELIGRO)
      references TBL_PELIGRO (ID_PELIGRO)
go

alter table TBL_PELIGRO_CONSECUENCIA
   add constraint FK_TBL_PELI_REFERENCE_TBL_CONS foreign key (ID_CONSECUENCIA)
      references TBL_CONSECUENCIA (ID_CONSECUENCIA)
go

alter table TBL_PELIGRO_MEDIDA
   add constraint "FK_TBL_PELI_SE TOMAN_TBL_MEDI" foreign key (ID_MEDIDAS_DE_CONTROL)
      references TBL_MEDIDA_DE_CONTROL (ID_MEDIDAS_DE_CONTROL)
go

alter table TBL_PELIGRO_MEDIDA
   add constraint "FK_TBL_PELI_SE CONTRO_TBL_ACTI" foreign key (ID_ACTIVIDAD_EVALUADA)
      references TBL_ACTIVIDAD_EVALUADA (ID_ACTIVIDAD_EVALUADA)
go

alter table TBL_PROGRAMA_ACTIVIDAD
   add constraint FK_TBL_PROG_CORRESPON_TBL_PROG foreign key (ID_PROGRAMA_ANUAL)
      references TBL_PROGRAMA_ANUAL (ID_PROGRAMA_ANUAL)
go

alter table TBL_PUNTO_GEOGRAFICO
   add constraint FK_TBL_PUNT_UBICADO_E_TBL_DEPA foreign key (ID_DEPARTAMENTO_ORGANIZACION)
      references TBL_DEPARTAMENTO_ORGANIZACION (ID_DEPARTAMENTO_ORGANIZACION)
go

alter table TBL_SUB_ACTIVIDAD
   add constraint FK_TBL_SUB__CONTIENE_TBL_PROG foreign key (ID_PROGRAMA_ACTIVIDAD)
      references TBL_PROGRAMA_ACTIVIDAD (ID_PROGRAMA_ACTIVIDAD)
go

alter table TBL_SUB_ACTIVIDAD
   add constraint FK_TBL_SUB__EXISTE_TBL_EVID foreign key (ID_EVIDENCIA)
      references TBL_EVIDENCIA (ID_EVIDENCIA)
go

alter table TBL_TRABAJADOR
   add constraint FK_TBL_TRAB_TRABAJADO_TBL_CARG foreign key (ID_CARGO)
      references TBL_CARGO (ID_CARGO)
go

alter table TBL_USUARIO
   add constraint FK_TBL_USUA_CONTRATA_TBL_EMPR foreign key (ID_EMPRESA)
      references TBL_EMPRESA (ID_EMPRESA)
go

alter table TBL_USUARIO_GRUPO
   add constraint FK_TBL_USUA_REFERENCE_TBL_USUA foreign key (ID_USUARIO)
      references TBL_USUARIO (ID_USUARIO)
go

alter table TBL_USUARIO_GRUPO
   add constraint FK_TBL_USUA_TBL_USUAR_TBL_GRUP foreign key (ID_GRUPO)
      references TBL_GRUPO (ID_GRUPO)
go








/*
DATA
*/
/*
	TBL_ORGANIZACION
*/
Insert into TBL_ORGANIZACION ( nombre_organizacion) values('ENAP Biob�o');
Insert into TBL_ORGANIZACION ( nombre_organizacion) values('ENAP Magallanes');
Insert into TBL_ORGANIZACION ( nombre_organizacion) values('ENAP Aconcagua');
GO

/*
	TBL_DEPARTAMENTO
*/
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. De Personal.');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. Desarrollo Organizacional.');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. Gesti�n Medio Ambiente y Calidad.');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. Prevenci�n de Riesgos.');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. Control de Calidad.');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. Confiabilidad Operacional.');																																																					
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. de Producci�n.');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. de Almac. y Terminales.');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. Mantenci�n.');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. Ingenier�a de Plantas.');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. Ingenier�a y Const. Biob�o.');																																																																																						
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Direcci�n General de Proyectos.');
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
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(1,'Serv. M�dico');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(2,'Div. Desarrollo de las Personas');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(2,'Div. Desarrollo Organizacional');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(3,'Div. Aseguramiento de calidad');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(3,'Div. Medio Ambiente');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(4,'Div. Control de P�rdidas Biob�o');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(4,'Div. Respuesta a Emergencias');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(5,'Div. Optimizaci�n y control Anal�tico');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(5,'Div. Certificaci�n Calidad de Productos');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(7,'Div. Cracking Catal�tico y Reformaci�n Continua');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(7,'Div. Fraccionamiento y Visco Reducci�n');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(7,'Div. Etileno ');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(7,'Div. Coker');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(7,'Div. Hidrocraking');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(7,'Div. Suministros');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(7,'Div. Programaci�n de la Producci�n');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(7,'Div. Turnos');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(8,'Div. Movimiento de Productos ');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(8,'Div. Programaci�n y Terminales');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(9,'Director de Proyectos');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(9,'Div. Equipos Est�ticos ');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(9,'Div. Electricidad e Instrumentos ');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(9,'Div. Mec�nica ');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(9,'Div. Planificaci�n Mantenci�n ');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(9,'Div. Ingenier�a de Mantenci�n');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(9,'Div. Mant. Oleoducto y terminales');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(9,'Div. Servicios de Mantenci�n');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(10,'Div. Ingenier�a Plantas Biob�o');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(10,'Directores Proyectos de Estudios B�sicos');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(11,'Div. Ingenier�a ');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(11,'Div. Construcci�n');
Insert into TBL_DIVISION (id_departamento_organizacion, nombre_division) values(12,'Director de Proyectos');
go


/*
	TBL_AREA
*/
Insert into TBL_AREA (id_division, nombre_area) values (11,'Octano y Cetano');
Insert into TBL_AREA (id_division, nombre_area) values(11,'Analisadores en L�nea');
Insert into TBL_AREA (id_division, nombre_area) values(11,'TBP en Crudo');
Insert into TBL_AREA (id_division, nombre_area) values(12,'Laboratorio ensayos Qu�micos ');
Insert into TBL_AREA (id_division, nombre_area) values(12,'Laboratorio ensayos F�sicos');
Insert into TBL_AREA (id_division, nombre_area) values(12,'Laboratorio de Cromatograf�a');
Insert into TBL_AREA (id_division, nombre_area) values(13,'Convertidor Cracking Catal�tico');
Insert into TBL_AREA (id_division, nombre_area) values(13,'CCR');
Insert into TBL_AREA (id_division, nombre_area) values(13,'NHT');
Insert into TBL_AREA (id_division, nombre_area) values(13,'URL 1');
Insert into TBL_AREA (id_division, nombre_area) values(13,'URL 2');
Insert into TBL_AREA (id_division, nombre_area) values(13,'HDG');
Insert into TBL_AREA (id_division, nombre_area) values(13,'Fraccionamiento');
Insert into TBL_AREA (id_division, nombre_area) values(13,'Sala de Control TDC');
Insert into TBL_AREA (id_division, nombre_area) values(14,'Toping y Vac�o 1');
Insert into TBL_AREA (id_division, nombre_area) values(14,'Toping y Vac�o 2');
Insert into TBL_AREA (id_division, nombre_area) values(14,'HDS 1');
Insert into TBL_AREA (id_division, nombre_area) values(14,'HDS 2');
Insert into TBL_AREA (id_division, nombre_area) values(14,'Isomerizacion');
Insert into TBL_AREA (id_division, nombre_area) values(14,'Visbreaker');
Insert into TBL_AREA (id_division, nombre_area) values(14,'Hornos y Antorcha');
Insert into TBL_AREA (id_division, nombre_area) values(14,'Sala de Control TDC');
Insert into TBL_AREA (id_division, nombre_area) values(15,'Area 1 Hornos');
Insert into TBL_AREA (id_division, nombre_area) values(15,'Area 2 Fraccionamiento Primario');
Insert into TBL_AREA (id_division, nombre_area) values(15,'Area 3 Compresores');
Insert into TBL_AREA (id_division, nombre_area) values(15,'Area 4 Zona Fr�a');
Insert into TBL_AREA (id_division, nombre_area) values(15,'Area 5 Tranes y Gasolina');
Insert into TBL_AREA (id_division, nombre_area) values(15,'Area 6 HMAPD y STP');
Insert into TBL_AREA (id_division, nombre_area) values(16,'Coker 1 C�mara');
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
Insert into TBL_AREA (id_division, nombre_area) values(24,'Equipos Est�ticos �rea 1');
Insert into TBL_AREA (id_division, nombre_area) values(24,'Equipos Est�ticos �rea 2');
Insert into TBL_AREA (id_division, nombre_area) values(24,'Equipos Est�ticos �rea 3');
Insert into TBL_AREA (id_division, nombre_area) values(24,'Apoyo Contrato E. Est�ticos');
Insert into TBL_AREA (id_division, nombre_area) values(24,'Mantencion Civil Biob�o');
Insert into TBL_AREA (id_division, nombre_area) values(24,'Contratos Equipos Est�ticos');
Insert into TBL_AREA (id_division, nombre_area) values(25,'Electricidad Biob�o �rea 1');
Insert into TBL_AREA (id_division, nombre_area) values(25,'Electricidad Biob�o �rea 2');
Insert into TBL_AREA (id_division, nombre_area) values(25,'Apoyo contratos El�ctricos');
Insert into TBL_AREA (id_division, nombre_area) values(25,'Electronica Biob�o');
Insert into TBL_AREA (id_division, nombre_area) values(25,'Apoyo Contratos Electr�nicos');
Insert into TBL_AREA (id_division, nombre_area) values(25,'Instrumentos Biob�o �rea 1');
Insert into TBL_AREA (id_division, nombre_area) values(25,'Instrumentos Biob�o �rea 2');
Insert into TBL_AREA (id_division, nombre_area) values(25,'Apoyo Contrato Instrumentos');
Insert into TBL_AREA (id_division, nombre_area) values(26,'Mecanica Biob�o 1');
Insert into TBL_AREA (id_division, nombre_area) values(26,'Mecanica Biob�o 2');
Insert into TBL_AREA (id_division, nombre_area) values(26,'Apoyo Contratos Mec�nicos');
Insert into TBL_AREA (id_division, nombre_area) values(26,'Lubricador');
Insert into TBL_AREA (id_division, nombre_area) values(26,'Apoyo Contrato Lubricaci�n');
Insert into TBL_AREA (id_division, nombre_area) values(26,'Maestranza');
Insert into TBL_AREA (id_division, nombre_area) values(26,'Maniobras');
Insert into TBL_AREA (id_division, nombre_area) values(26,'Apoyo Contrato Maestranza');
Insert into TBL_AREA (id_division, nombre_area) values(27,'lanificacion Biob�o');
Insert into TBL_AREA (id_division, nombre_area) values(28,'Predictiva Est�tica Biob�o');
Insert into TBL_AREA (id_division, nombre_area) values(28,'Analisis de Fallos');
GO






/*
	TBL_CONSECUENCIA
*/
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Desmembramiento, traumatismo');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Contusiones, heridas, politraumatismo');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Contusiones, heridas, traumatismo');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesiones, enfermedad, compromiso vital');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesiones, Compromiso Vital');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Shock el�ctrico, muerte');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Quemaduras, lesiones a la piel');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Cortes, magulladuras');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Cortes, heridas profundas');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Erosiones a la piel, quemaduras, irritaci�n');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Politraumatismo, asfixia, muerte');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesiones a la piel');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesiones a la piel, deshidrataci�n');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Hipotermia');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Irritaci�n a las v�as respiratorias altas, intoxicaci�n aguda, asfixia');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Irritaci�n, lesiones pulmonares');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Irritaci�n a las v�as respiratorias altas, intoxicaci�n aguda');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesiones pulmonares');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesiones vasculares');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesiones al o�do');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('trastornos m�sculo esquel�ticos');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Quemaduras, asfixia, muerte');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesi�n pulmonar, muerte');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesi�n aguda al sistema digestivo');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Trastorno m�sculo esquel�tico');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Trastorno Ps�quico');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Trastornos m�sculo esquel�tico');
GO


/*
	TBL_ACTIVIDAD_GENERAL
*/
Insert into TBL_ACTIVIDAD_GENERAL(Nom_Actividad_General) values('Mantenci�n');
Insert into TBL_ACTIVIDAD_GENERAL(Nom_Actividad_General) values('Operaci�n en Terreno');
Insert into TBL_ACTIVIDAD_GENERAL(Nom_Actividad_General) values('An�lisis de Laboratorio');
Insert into TBL_ACTIVIDAD_GENERAL(Nom_Actividad_General) values('Administrativo');
Insert into TBL_ACTIVIDAD_GENERAL(Nom_Actividad_General) values('Recepci�n de Buques');
GO

/*
	TBL_PELIGRO
*/

Insert into TBL_PELIGRO (Nom_Peligro ) values('1: Atrapamiento entre objetos en movimiento o fijo y movimiento');
Insert into TBL_PELIGRO (Nom_Peligro ) values('2: Atrapamiento por Objeto fijo o en movimiento');
Insert into TBL_PELIGRO (Nom_Peligro ) values('3: Atropello');
Insert into TBL_PELIGRO (Nom_Peligro ) values('4: Ca�da a diferente Nivel');
Insert into TBL_PELIGRO (Nom_Peligro ) values('5: Ca�da al mismo nivel ');
Insert into TBL_PELIGRO (Nom_Peligro ) values('6: Causado por animal o insecto');
Insert into TBL_PELIGRO (Nom_Peligro ) values('7: Causado por terceras personas');
Insert into TBL_PELIGRO (Nom_Peligro ) values('8:  Choque contra elementos m�viles');
Insert into TBL_PELIGRO (Nom_Peligro ) values('9:  Choque contra objetos o estructura fija');
Insert into TBL_PELIGRO (Nom_Peligro ) values('10: Choque por otro veh�culo');
Insert into TBL_PELIGRO (Nom_Peligro ) values('11: Contacto con electricidad');
Insert into TBL_PELIGRO (Nom_Peligro ) values('12:  Contacto con fuego');
Insert into TBL_PELIGRO (Nom_Peligro ) values('13:  Contacto con Objetos Calientes');
Insert into TBL_PELIGRO (Nom_Peligro ) values('14:  Contacto con Objetos Cortantes');
Insert into TBL_PELIGRO (Nom_Peligro ) values('15:  Contacto con Objetos Punzantes');
Insert into TBL_PELIGRO (Nom_Peligro ) values('16:  Contacto con sustancias qu�micas');
Insert into TBL_PELIGRO (Nom_Peligro ) values('17:  Explosi�n');
Insert into TBL_PELIGRO (Nom_Peligro ) values('18:  Exposici�n  a radiaciones ultravioletas');
Insert into TBL_PELIGRO (Nom_Peligro ) values('19:  Exposici�n a agentes biol�gicos (bacterias, hongos, etc.)');
Insert into TBL_PELIGRO (Nom_Peligro ) values('20:  Exposici�n a calor');
Insert into TBL_PELIGRO (Nom_Peligro ) values('21:  Exposici�n a fr�o');
Insert into TBL_PELIGRO (Nom_Peligro ) values('22:  Exposici�n a gases');
Insert into TBL_PELIGRO (Nom_Peligro ) values('23:  Exposici�n a humos met�licos');
Insert into TBL_PELIGRO (Nom_Peligro ) values('24:  Exposici�n a nieblas');
Insert into TBL_PELIGRO (Nom_Peligro ) values('25:  Exposici�n a Polvo');
Insert into TBL_PELIGRO (Nom_Peligro ) values('26:  Exposici�n a presiones anormales');
Insert into TBL_PELIGRO (Nom_Peligro ) values('27:  Exposici�n a radiaciones infrarrojas');
Insert into TBL_PELIGRO (Nom_Peligro ) values('28:  Exposici�n a radiaciones �onizantes');
Insert into TBL_PELIGRO (Nom_Peligro ) values('29:  Exposici�n a roc�os');
Insert into TBL_PELIGRO (Nom_Peligro ) values('30:  Exposici�n a ruido');
Insert into TBL_PELIGRO (Nom_Peligro ) values('31:  Exposici�n a vapores');
Insert into TBL_PELIGRO (Nom_Peligro ) values('32:  Exposici�n a vibraciones');
Insert into TBL_PELIGRO (Nom_Peligro ) values('33:  Golpeado con objeto o herramienta');
Insert into TBL_PELIGRO (Nom_Peligro ) values('34:  Golpeado contra objetos o equipos');
Insert into TBL_PELIGRO (Nom_Peligro ) values('35:  Golpeado por Objeto');
Insert into TBL_PELIGRO (Nom_Peligro ) values('36:  Incendio');
Insert into TBL_PELIGRO (Nom_Peligro ) values('37:  Inmersi�n');
Insert into TBL_PELIGRO (Nom_Peligro ) values('38:  Intoxicaci�n por alimentos');
Insert into TBL_PELIGRO (Nom_Peligro ) values('39:  Sobre carga f�sica');
Insert into TBL_PELIGRO (Nom_Peligro ) values('40:  Sobre tensi�n mental y psicol�gica');
Insert into TBL_PELIGRO (Nom_Peligro ) values('41:  Sobreesfuerzo por movimiento repetitivo');
Insert into TBL_PELIGRO (Nom_Peligro ) values('42:  Sobreesfuerzo por manejo manual de materiales');
GO


/* 

	PELIGRO CONSECUENCIA

*/
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(1,1);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(2,1);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(3,2);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(4,2);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(5,3);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(6,4);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(7,5);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(8,2);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(9,2);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(10,2);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(11,6);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(12,7);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(13,7);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(14,8);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(15,9);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(16,10);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(17,11);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(18,7);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(19,12);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(20,13);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(21,14);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(22,15);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(23,16);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(24,17);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(25,18);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(26,19);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(27,7);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(28,7);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(29,17);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(30,20);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(31,17);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(32,21);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(33,3);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(34,3);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(35,3);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(36,22);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(37,23);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(38,24);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(39,25);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(40,26);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(41,27);
INSERT INTO TBL_PELIGRO_CONSECUENCIA (ID_PELIGRO,ID_CONSECUENCIA) values(42,27);
/*
	TBL_PELIGRO

Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (1,'Atrapamiento entre objetos en movimiento o fijo y movimiento');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (2,'Atrapamiento por Objeto fijo o en movimiento');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (3,'Atropello');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (4,'Ca�da a diferente Nivel');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (5,'Ca�da al mismo nivel');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (6,'Causado por animal o insecto');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (7,'Causado por terceras personas');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (8,'Choque contra elementos m�viles');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (9,'Choque contra objetos o estructura fija');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (10,'Choque por otro veh�culo');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (11,'Contacto con electricidad');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (12,'Contacto con fuego');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (13,'Contacto con Objetos Calientes');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (14,'Contacto con Objetos Cortantes');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (15,'Contacto con Objetos Punzantes');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (16,'Contacto con sustancias qu�micas');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (17,'Explosi�n');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (18,'Exposici�n  a radiaciones ultravioletas');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (19,'Exposici�n a agentes biol�gicos (bacterias, hongos, etc.)');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (20,'Exposici�n a calor');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (21,'Exposici�n a fr�o');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (22,'Exposici�n a gases');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (23,'Exposici�n a humos met�licos');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (24,'Exposici�n a nieblas');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (25,'Exposici�n a Polvo');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (26,'Exposici�n a presiones anormales');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (27,'Exposici�n a radiaciones infrarrojas');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (28,'Exposici�n a radiaciones �onizantes');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (29,'Exposici�n a roc�os');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (30,'Exposici�n a ruido');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (31,'Exposici�n a vapores');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (32,'Exposici�n a vibraciones');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (33,'Golpeado con objeto o herramienta');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (34,'Golpeado contra objetos o equipos');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (35,'Golpeado por Objeto');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (36,'Incendio');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (37,'Inmersi�n');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (38,'Intoxicaci�n por alimentos');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (39,'Sobre carga f�sica');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (40,'Sobre tensi�n mental y psicol�gica');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (41,'Sobreesfuerzo por movimiento repetitivo');
Insert into TBL_PELIGRO (id_consecuencia,Nom_Peligro ) values (42,'Sobreesfuerzo por manejo manual de materiales');
GO
*/
/*
	TBL_CARGO
*/
Insert into TBL_CARGO (NOMBRE_CARGO) values('Gerente de Refiner�a');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Gerentes');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Jefe Departamento');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Jefe De Divisi�n');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Supervisor');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Ingenieros');
Insert into TBL_CARGO (NOMBRE_CARGO) values('T�cnicos');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Secretarias');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Supervisor de Operaciones');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Operador Jefe');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Supervisor de terreno');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Operador TDC');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Operador Terreno');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Operador Entrenamiento');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Ingeniero Analista');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Ingeniero en Mantenci�n');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Supervisor de Mantenci�n');
Insert into TBL_CARGO (NOMBRE_CARGO) values('T�cnico de Mantenci�n');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Jefe de Laboratorio Servicio');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Qu�mico Jefe');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Qu�mico Especialista');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Qu�mico Poli-funcional');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Qu�mico Analista');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Especialista');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Qu�mico');
GO
/*
	TBL_CARGO

Insert into TBL_CARGO (NOMBRE_CARGO) values('Gerente de Refiner�a');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Gerentes');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Jefe Departamento');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Jefe De Divisi�n');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Supervisor');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Ingenieros');
Insert into TBL_CARGO (NOMBRE_CARGO) values('T�cnicos');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Secretarias');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Jede Departamento');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Jefe de Divisi�n');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Supervisor de Operaciones');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Operador Jefe');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Supervisor de terreno');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Operador TDC');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Operador Terreno');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Operador Entrenamiento');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Ingeniero Analista');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Ingeniero en Mantenci�n');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Supervisor de Mantenci�n');
Insert into TBL_CARGO (NOMBRE_CARGO) values('T�cnico de Mantenci�n');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Jefe de Laboratorio Servicio');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Qu�mico Jefe');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Qu�mico Especialista');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Qu�mico Poli-funcional');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Qu�mico Analista');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Especialista');
Insert into TBL_CARGO (NOMBRE_CARGO) values('Qu�mico');
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

Insert into TBL_VALORACION_CONSECUENCIA (Nom_Consecuencia) values ('Ligeramente Da�ino');
Insert into TBL_VALORACION_CONSECUENCIA (Nom_Consecuencia) values ('Da�ino');
Insert into TBL_VALORACION_CONSECUENCIA (Nom_Consecuencia) values ('Extremadamente Da�ino');
GO
*/

/*
	TBL_MEDIDA_DE_CONTROL
*/
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Conocer y aplicar E-022 (Sistema de Bloqueo y Tarjetas de Seguridad).');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Mantener atenci�n a las zonas de tr�nsito vehicular.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Utilizar arn�s de seguridad');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Utilizar absorbedor de impacto');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Mantener atenci�n a las zonas de tr�nsito peatonal');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Usar pasos habilitados para cruzar calles');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Inspeccionar los lugares con posible presencia de animales o insectos antes de ingresar o manipular.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Informar inmediatamente a Servicio de Seguridad ante presencia de persona o evento extra�a');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Chequear los elementos del vehiculo (luces, extintor, etc.)');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Asegurar que no exista tensi�n el�ctrica');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Evaluar la deficiencia de ox�geno en los espacios confinados');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Evaluar nivel de agentes t�xicos previamente.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Evaluar nivel de explosividad previo a ejecuci�n de trabajo en caliente');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Utilizar ropa de algod�n para efectuar tareas (E-014)');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Utilizar EPP apropiados para la tarea (Casco, Zapatos, Guantes, Lentes)');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Utilizar EPP especiales (Mascaras para gases, polvo, niebla, trajes, guantes  E-014)');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Utilizar vestimenta manga larga y bloqueador solar');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('No beber agua de la red contra incendio.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Mantener hidrataci�n y rotaci�n');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Usar ropa t�rmica de abrigo ');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Utilizar detector de H2S calibrado');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Aplicar conceptos de Autocuidado');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Poseer licencia para el transporte de mercanc�as peligrosa.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Poseer licencia de conducir maquinar�a pesada vigente');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Poseer licencia de conducir vigente');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Poseer curso de Conductor Defensivo ');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Utilizar equipo de respiraci�n aut�nomo o aire en l�nea.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Se�alizar o delimitar el �rea ');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Mantener puesta a tierra para zonas con posible fuga de corriente');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Mantener extintor en el �rea');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Encapsular el �rea y retirar los materiales combustibles');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Instalar arpillera h�meda en alcantarillas o canaletas');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Velocidad m�xima 30Km. (E-015)');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Conocer y aplicar Est�ndar Corporativo de Trabajo en Altura');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Revisar los andamios armados.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Inspecci�n y certificaci�n de equipos y herramientas el�ctricas (E-011-1)');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Conocer Hoja de Dato de Seguridad ');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Participar en la elaboraci�n del An�lisis Sistem�tico de Riesgo (A.S.R, E-007) ');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Conocer y Aplicar procedimiento especifico de trabajo');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Conocer y Aplicar procedimiento E-019 sobre radiaciones ionizante');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Poseer autorizaci�n para la operaci�n de equipos emisores de radiaci�n ionizante.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Revisar los equipos emisores de radiaciones ionizantes peri�dicamente');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Aplicar t�cnica de levantamiento de materiales');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Utilizar equipo de respiraci�n aut�noma');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Solicitar el Permiso de trabajo escrito respectivo.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Conocer y aplicar est�ndar E-001(P.G.E.) y lo establecido en P.L.E del �rea.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Asegurar que el calzado de seguridad mantiene  su sistema de tracci�n y agarre en buen estado');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Interpretar correctamente las se�alizaciones de advertencia como: Rombo NFPA otros.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Revisar que el o los equipos a utilizar en la evaluaci�n ambiental posean calibraci�n vigente.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Poseer capacitaci�n de supervivencia en el mar, uso de salvavidas.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('No utilizar elementos �gneos en el �rea.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Realizar charla de cinco minutos previo a la tarea');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Determinar los puntos de encuentro, frente a emergencias.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Inspecci�n regular y certificaci�n de equipos y herramientas.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Mantener un almacenamiento adecuado de qu�micos.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Mantener un almacenamiento adecuado de cilindros de gases comprimidos.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Poseer certificaci�n de operaci�n de aire en l�nea.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Poseer aptitud f�sica compatible con la tarea.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Poseer certificaci�n para realizar la tarea.');
Insert into TBL_MEDIDA_DE_CONTROL (Nom_Medida_de_Control) Values ('Coordinar tarea previamente con la l�nea de supervisi�n');
GO



/* DATOS DE PERSONA */
INSERT INTO TBL_DATO_EVENTO VALUES('Choque contra objetos o estructura fija',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Choque por otro veh�culo',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Contacto con electricidad',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Contacto con fuego',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Contacto con Objetos Calientes',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Contacto con Objetos Cortantes',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Contacto con Objetos Punzantes',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Contacto con sustancias qu�micas',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Explosi�n',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposici�n a radiaciones ultravioletas',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposici�n a agentes biol�gicos (bacterias, hongos, etc.)',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposici�n a calor',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposici�n a fr�o',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposici�n a gases',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposici�n a humos met�licos',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposici�n a nieblas',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposici�n a Polvo',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposici�n a presiones anormales',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposici�n a radiaciones infrarrojas',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposici�n a radiaciones ionizantes',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposici�n a roc�os',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposici�n a ruido',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposici�n a vapores',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposici�n a vibraciones',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Golpeado con objeto o herramienta',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Golpeado contra objetos o equipos',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Golpeado por objeto',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Incendio',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Inmersi�n',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Intoxicaci�n por alimentos',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Sobre carga f�sica',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Sobre tensi�n mental y psicol�gica',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Sobreesfuerzo por movimiento repetitivo',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Sobreesfuerzo por manejo manual de materiales',1);


/* DATOS DE PATRIMONIO, PROCESOS, MEDIO AMBIENTE */
INSERT INTO TBL_DATO_EVENTO VALUES('Incendio',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Derrame',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Fuga',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Filtraci�n',2);
INSERT INTO TBL_DATO_EVENTO VALUES('P�rdida de Energ�a',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Reactividad Qu�mica',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Explosi�n',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Rotura',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Contaminaci�n producto',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Contaminaci�n ambiental',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Emisiones',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Corto circuito',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Atentado',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Volcamiento/Choque',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Evento Natural',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Falla sistema control',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Desgaste o corrosi�n acelerada',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Sobre presi�n en equipo o sistema',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Sobre temperatura en el equipo sistema',2);


GO

/*
	Busqueda de matriz
*/
DROP PROCEDURE sp_get_matriz_by_id;
DROP PROCEDURE sp_search_actividad_evaluada;
GO
CREATE PROCEDURE sp_search_actividad_evaluada 
	@ID_ORGANIZACION   int = 0,
	@ID_DEPARTAMENTO_ORGANIZACION int = 0,
	@ID_DIVISION int = 0,
	@ID_AREA int = 0,
	@ID_ACTIVIDAD_GENERAL int = 0,
	@NOMBRE_ACTIVIDAD_ESPECIFICA nvarchar(100) = null,
	@ID_CARGO int = 0,
	@CONDICION int = 0,
	@FECHA_INICIO datetime = null,
	@FECHA_TERMINO datetime = null,
	@ID_USUARIO varchar(200) = null
AS
DECLARE @sql nvarchar(4000)

	SELECT @sql = 	' SELECT AEV.*, MA.ID_MATRIZ,AE.NOM_ACTIVIDAD_ESPECIFICA,  ''[''+CAST(MA.ID_MATRIZ AS VARCHAR)+''] ''+ DP.NOMBRE_DEPARTAMENTO +'' - ''+AG.NOM_ACTIVIDAD_GENERAL AS NOMBRE_MATRIZ ' +
					' FROM TBL_MATRIZ_ACTIVIDAD MA ' +
					' INNER JOIN TBL_MATRIZ MAT '+
					'	ON MA.ID_MATRIZ = MAT.ID_MATRIZ ' +
					' INNER JOIN TBL_ACTIVIDAD_EVALUADA AEV '+
					'	ON MA.ID_ACTIVIDAD_EVALUADA = AEV.ID_ACTIVIDAD_EVALUADA ' +
					' INNER JOIN TBL_DEPARTAMENTO_ORGANIZACION  DOR ' +
					'	ON AEV.ID_DEPARTAMENTO_ORGANIZACION = DOR.ID_DEPARTAMENTO_ORGANIZACION ' +
					' INNER JOIN TBL_ACTIVIDAD_ESPECIFICA AE ON AEV.ID_ACTIVIDAD_ESPECIFICA = AE.ID_ACTIVIDAD_ESPECIFICA ' +
					' INNER JOIN TBL_DEPARTAMENTO DP ON DOR.ID_DEPARTAMENTO = DP.ID_DEPARTAMENTO ' +
					' INNER JOIN TBL_ACTIVIDAD_GENERAL AG ON AG.ID_ACTIVIDAD_GENERAL = AEV.ID_ACTIVIDAD_GENERAL ' +
					' WHERE 1 = 1  '
	IF @ID_ORGANIZACION <> 0
	   SELECT @sql = @sql + ' AND DOR.ID_ORGANIZACION = @ID_ORGANIZACION '
	IF @ID_DEPARTAMENTO_ORGANIZACION <> 0
	   SELECT @sql = @sql + ' AND DOR.ID_DEPARTAMENTO_ORGANIZACION = @ID_DEPARTAMENTO_ORGANIZACION '
	IF @ID_DIVISION <> 0
	   SELECT @sql = @sql + ' AND AEV.ID_DIVISION = @ID_DIVISION ' 
	IF @ID_AREA <> 0
	   SELECT @sql = @sql + ' AND AEV.ID_AREA = @ID_AREA '
	IF @ID_ACTIVIDAD_GENERAL <> 0
	   SELECT @sql = @sql + ' AND AEV.ID_ACTIVIDAD_GENERAL = @ID_ACTIVIDAD_GENERAL '
	IF @NOMBRE_ACTIVIDAD_ESPECIFICA IS NOT NULL
	   SELECT @sql = @sql + ' AND AE.NOM_ACTIVIDAD_ESPECIFICA LIKE ''%''+@NOMBRE_ACTIVIDAD_ESPECIFICA+''%'' '
	IF @ID_CARGO <> 0
	   SELECT @sql = @sql + ' AND AEV.ID_CARGO = @ID_CARGO '
	IF @CONDICION <> 0
	   SELECT @sql = @sql + ' AND AEV.CONDICION = @CONDICION '
	IF @FECHA_INICIO IS NOT NULL AND @FECHA_TERMINO IS NOT NULL
	   SELECT @sql = @sql + ' AND AEV.FECHA_CREACION BETWEEN @FECHA_INICIO AND @FECHA_TERMINO '
	IF @ID_USUARIO IS NOT NULL
		SELECT @sql = @sql + ' AND MAT.ID_USUARIO = @ID_USUARIO '
	SELECT @sql = @sql + ' ORDER BY MA.ID_MATRIZ DESC '
	EXEC sp_executesql @sql, N'@ID_ORGANIZACION INT, @ID_DEPARTAMENTO_ORGANIZACION INT, @ID_DIVISION INT, @ID_AREA INT, @ID_ACTIVIDAD_GENERAL INT, @NOMBRE_ACTIVIDAD_ESPECIFICA nvarchar(100), @ID_CARGO INT, @CONDICION INT, @FECHA_INICIO datetime, @FECHA_TERMINO datetime,@ID_USUARIO varchar(200)',
					   @ID_ORGANIZACION, @ID_DEPARTAMENTO_ORGANIZACION, @ID_DIVISION, @ID_AREA, @ID_ACTIVIDAD_GENERAL, @NOMBRE_ACTIVIDAD_ESPECIFICA, @ID_CARGO, @CONDICION, @FECHA_INICIO, @FECHA_TERMINO, @ID_USUARIO
GO


/* 
	Busqueda de MATRICEZ

*/

CREATE PROCEDURE sp_get_matriz_by_id
	@ID_MATRIZ   int = 0
AS
	IF @ID_MATRIZ <> 0
		SELECT 	MZ.ID_MATRIZ,
				AG.NOM_ACTIVIDAD_GENERAL, 
				AES.NOM_ACTIVIDAD_ESPECIFICA,
				CG.NOMBRE_CARGO,
				CASE WHEN AE.CONDICION=1 THEN 'Rutinaria' WHEN AE.CONDICION=2 THEN 'No Rutinaria' WHEN AE.CONDICION=3 THEN 'En Emergencia' END AS CONDICION,
				PE.NOM_PELIGRO,
				C.NOMBRE_CONSECUENCIA,
				CASE 
					WHEN AE.VALORACION_CONSECUENCIA=1 THEN
						'Ligeramente Da�ino'
					WHEN AE.VALORACION_CONSECUENCIA=3 THEN
						'Extremadamente Da�ino'
					ELSE
						'Da�ino'
				END AS 'CONSECUENCIA',
				CASE 
					WHEN AE.VALORACION_PROBABILIDAD=1 THEN
						'Baja'
					WHEN AE.VALORACION_PROBABILIDAD=3 THEN
						'Alta'
					ELSE
						'Media'
				END AS 'PROBABILIDAD',
				CASE 
					WHEN (AE.VALORACION_CONSECUENCIA * AE.VALORACION_PROBABILIDAD)<3 THEN
						'Baja'
					WHEN (AE.VALORACION_CONSECUENCIA * AE.VALORACION_PROBABILIDAD)>5 THEN
						'Alta'
					ELSE
						'Media'
				END AS 'MRP',
				AE.VALORACION_CONSECUENCIA,
				AE.VALORACION_PROBABILIDAD,
				MC.NOM_MEDIDA_DE_CONTROL,
				CASE 
					WHEN AE.MEDIDA_VALORACION_CONSECUENCIA=1 THEN
						'Ligeramente Da�ino'
					WHEN AE.MEDIDA_VALORACION_CONSECUENCIA=3 THEN
						'Extremadamente Da�ino'
					ELSE
						'Da�ino'
				END AS 'MEDIDA_CONSECUENCIA',
				CASE 
					WHEN AE.MEDIDA_VALORACION_PROBABILIDAD=1 THEN
						'Baja'
					WHEN AE.MEDIDA_VALORACION_PROBABILIDAD=3 THEN
						'Alta'
					ELSE
						'Media'
				END AS 'MEDIDA_PROBABILIDAD',
				CASE 
					WHEN (AE.MEDIDA_VALORACION_CONSECUENCIA * AE.MEDIDA_VALORACION_PROBABILIDAD)<3 THEN
						'Baja'
					WHEN (AE.MEDIDA_VALORACION_CONSECUENCIA * AE.MEDIDA_VALORACION_PROBABILIDAD)>5 THEN
						'Alta'
					ELSE
						'Media'
				END AS 'MRCC',
				AE.MEDIDA_VALORACION_CONSECUENCIA,
				AE.MEDIDA_VALORACION_PROBABILIDAD,
				ORG.NOMBRE_ORGANIZACION,
				DEP.NOMBRE_DEPARTAMENTO,
				DIV.NOMBRE_DIVISION
		FROM TBL_MATRIZ MZ 
				INNER JOIN TBL_MATRIZ_ACTIVIDAD MA ON MZ.ID_MATRIZ = MA.ID_MATRIZ
				INNER JOIN TBL_ACTIVIDAD_EVALUADA AE ON MA.ID_ACTIVIDAD_EVALUADA = AE.ID_ACTIVIDAD_EVALUADA
				INNER JOIN TBL_ACTIVIDAD_ESPECIFICA AES ON AE.ID_ACTIVIDAD_ESPECIFICA = AES.ID_ACTIVIDAD_ESPECIFICA
				INNER JOIN TBL_ACTIVIDAD_GENERAL AG ON AE.ID_ACTIVIDAD_GENERAL = AG.ID_ACTIVIDAD_GENERAL
				INNER JOIN TBL_CARGO CG ON AE.ID_CARGO = CG.ID_CARGO
				INNER JOIN TBL_PELIGRO PE ON AE.ID_PELIGRO = PE.ID_PELIGRO
				INNER JOIN TBL_PELIGRO_MEDIDA PM ON AE.ID_ACTIVIDAD_EVALUADA = PM.ID_ACTIVIDAD_EVALUADA
				INNER JOIN TBL_MEDIDA_DE_CONTROL MC ON PM.ID_MEDIDAS_DE_CONTROL=MC.ID_MEDIDAS_DE_CONTROL
				INNER JOIN TBL_PELIGRO_CONSECUENCIA PC ON PE.ID_PELIGRO = PC.ID_PELIGRO
				INNER JOIN TBL_CONSECUENCIA C ON PC.ID_CONSECUENCIA = C.ID_CONSECUENCIA
				INNER JOIN TBL_DEPARTAMENTO_ORGANIZACION DOR ON AE.ID_DEPARTAMENTO_ORGANIZACION = DOR.ID_DEPARTAMENTO_ORGANIZACION
				INNER JOIN TBL_ORGANIZACION ORG ON DOR.ID_ORGANIZACION = ORG.ID_ORGANIZACION
				INNER JOIN TBL_DEPARTAMENTO DEP ON DOR.ID_DEPARTAMENTO = DEP.ID_DEPARTAMENTO
				INNER JOIN TBL_DIVISION DIV ON AE.ID_DIVISION = DIV.ID_DIVISION
		WHERE MZ.ID_MATRIZ = @ID_MATRIZ
		ORDER BY AE.ID_ACTIVIDAD_EVALUADA, PE.ID_PELIGRO
GO