if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('E006_3') and o.name = 'FK_E006_3_INCORPORA_TBL_EVEN')
alter table E006_3
   drop constraint FK_E006_3_INCORPORA_TBL_EVEN
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('E006_3') and o.name = 'FK_E006_3_RELATIONS_E006_4')
alter table E006_3
   drop constraint FK_E006_3_RELATIONS_E006_4
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
   where r.fkeyid = object_id('TBL_ACCION_CORRECTIVA') and o.name = 'FK_TBL_ACCI_POSEE_TBL_USUA')
alter table TBL_ACCION_CORRECTIVA
   drop constraint FK_TBL_ACCI_POSEE_TBL_USUA
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
   where r.fkeyid = object_id('TBL_CONSECUENCIA') and o.name = 'FK_TBL_CONS_PROVOCA_TBL_PELI')
alter table TBL_CONSECUENCIA
   drop constraint FK_TBL_CONS_PROVOCA_TBL_PELI
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
   where r.fkeyid = object_id('TBL_GRUPO_PRIVILEGIO') and o.name = 'FK_TBL_GRUP_PRIVILEGI_TBL_PRIV')
alter table TBL_GRUPO_PRIVILEGIO
   drop constraint FK_TBL_GRUP_PRIVILEGI_TBL_PRIV
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_HISTORIAL_EMPRESA') and o.name = 'FK_TBL_HIST_REGISTRA_TBL_EMPR')
alter table TBL_HISTORIAL_EMPRESA
   drop constraint FK_TBL_HIST_REGISTRA_TBL_EMPR
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_MATRIZ') and o.name = 'FK_TBL_MATR_HACE_TBL_USUA')
alter table TBL_MATRIZ
   drop constraint FK_TBL_MATR_HACE_TBL_USUA
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
   where r.fkeyid = object_id('TBL_USUARIO_GRUPO') and o.name = 'FK_TBL_USUA_TBL_USUAR_TBL_GRUP')
alter table TBL_USUARIO_GRUPO
   drop constraint FK_TBL_USUA_TBL_USUAR_TBL_GRUP
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_USUARIO_GRUPO') and o.name = 'FK_TBL_USUA_TBL_USUAR_TBL_USUA')
alter table TBL_USUARIO_GRUPO
   drop constraint FK_TBL_USUA_TBL_USUAR_TBL_USUA
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
           where  id = object_id('TBL_PELIGRO_MEDIDA')
            and   type = 'U')
   drop table TBL_PELIGRO_MEDIDA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_PRIVILEGIO')
            and   type = 'U')
   drop table TBL_PRIVILEGIO
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
            from  sysobjects
           where  id = object_id('TBL_USUARIO_GRUPO')
            and   type = 'U')
   drop table TBL_USUARIO_GRUPO
go

/*==============================================================*/
/* Table: E006_3                                                */
/*==============================================================*/
create table E006_3 (
   ID_INFORME           int                  identity,
   E00_ID_INFORME       int                  not null,
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
   NOMBRE_ACCION        varchar(200)         null,
   constraint PK_TBL_ACCION primary key nonclustered (ID_ACCION)
)
go

/*==============================================================*/
/* Table: TBL_ACCION_CORRECTIVA                                 */
/*==============================================================*/
create table TBL_ACCION_CORRECTIVA (
   ID_ACCION_CORRECTIVA int                  identity,
   ID_USUARIO           int                  null,
   ID_INFORME           int                  not null,
   ID_ACCION            int                  null,
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
   NOM_ACTIVIDAD_ESPECIFICA varchar(100)         null,
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
   1 = LIGERAMENTE DAÑINO
   2 = DAÑINO
   3 = EXTREMADAMENTE DAÑINO',
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
   NOM_ACTIVIDAD_GENERAL varchar(100)         null,
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
   NOMBRE_ACTIVIDAD_TRABAJADOR varchar(200)         null,
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
   NOMBRE_AREA          varchar(200)         null,
   constraint PK_TBL_AREA primary key nonclustered (ID_AREA)
)
go

/*==============================================================*/
/* Table: TBL_CARGO                                             */
/*==============================================================*/
create table TBL_CARGO (
   ID_CARGO             int                  identity,
   NOMBRE_CARGO         varchar(200)         null,
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
   ID_PELIGRO           int                  null,
   NOMBRE_CONSECUENCIA  varchar(150)         null,
   constraint PK_TBL_CONSECUENCIA primary key nonclustered (ID_CONSECUENCIA)
)
go

/*==============================================================*/
/* Table: TBL_DATO_EVENTO                                       */
/*==============================================================*/
create table TBL_DATO_EVENTO (
   ID_TIPO_EVENTO       int                  identity,
   NOMBRE_TIPO_EVENTO   varchar(200)         null,
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
   NOMBRE_DEPARTAMENTO  varchar(200)         null,
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
   NOMBRE_DIVISION      varchar(150)         null,
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
   OCURRIO              int                  null,
   FECHA_HORA_EVENTO    datetime             null,
   FECHA_INGRESO        datetime             null,
   LAT_EVENTO           double precision     null,
   LNG_EVENTO           double precision     null,
   TIPO_EVENTO          bit                  null,
   LUGAR_EXACTO         varchar(200)         null,
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
   2=Tendones: Tendinopatías y tendinosis, por ejemplo.
   3=Articulaciones: Lesiones ligamentosas, de cartílagos, luxaciones y subluxaciones, meniscopatías, bursitis, etc.
   4=Huesos: fracturas, fisuras, periostitis, entre otras.',
   'user', @CurrentUser, 'table', 'TBL_EVENTO_TRABAJADOR', 'column', 'TIPO_LESION'
go

/*==============================================================*/
/* Table: TBL_EVIDENCIA                                         */
/*==============================================================*/
create table TBL_EVIDENCIA (
   ID_EVIDENCIA         int                  identity,
   NOMBRE_EVIDENCIA     varchar(200)         null,
   constraint PK_TBL_EVIDENCIA primary key nonclustered (ID_EVIDENCIA)
)
go

/*==============================================================*/
/* Table: TBL_GRUPO                                             */
/*==============================================================*/
create table TBL_GRUPO (
   ID_GRUPO             int                  identity,
   NOMBRE_GRUPO         varchar(250)         null,
   DESCRIPCION_GRUPO    text                 null,
   constraint PK_TBL_GRUPO primary key nonclustered (ID_GRUPO)
)
go

/*==============================================================*/
/* Table: TBL_GRUPO_PRIVILEGIO                                  */
/*==============================================================*/
create table TBL_GRUPO_PRIVILEGIO (
   ID_GRUPO             int                  not null,
   ID_PRIVILEGIO        int                  not null,
   ID_MODULO            int                  not null,
   ESTADO               bit                  null,
   constraint PK_TBL_GRUPO_PRIVILEGIO primary key nonclustered (ID_GRUPO, ID_PRIVILEGIO, ID_MODULO)
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
   ID_USUARIO           int                  null,
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
   NOM_MEDIDA_DE_CONTROL varchar(200)         NOT null UNIQUE,
   ESTADO               bit                  null,
   constraint PK_TBL_MEDIDA_DE_CONTROL primary key nonclustered (ID_MEDIDAS_DE_CONTROL)
)
go

/*==============================================================*/
/* Table: TBL_MODULO                                            */
/*==============================================================*/
create table TBL_MODULO (
   ID_MODULO            int                  identity,
   NOMBRE_MODULO        varchar(100)         null,
   DESCRIPCION_MODULO   text                 null,
   URL_MODULO           varchar(250)         null,
   constraint PK_TBL_MODULO primary key nonclustered (ID_MODULO)
)
go

/*==============================================================*/
/* Table: TBL_ORGANIZACION                                      */
/*==============================================================*/
create table TBL_ORGANIZACION (
   ID_ORGANIZACION      int                  identity,
   NOMBRE_ORGANIZACION  varchar(100)         null,
   constraint PK_TBL_ORGANIZACION primary key nonclustered (ID_ORGANIZACION)
)
go

/*==============================================================*/
/* Table: TBL_PARTE_CORPORAL                                    */
/*==============================================================*/
create table TBL_PARTE_CORPORAL (
   ID_PARTE_CORPORAL    int                  identity,
   NOMBRE_PARTE_CORPORAL varchar(100)         null,
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
   NOM_PELIGRO          varchar(100)         null,
   constraint PK_TBL_PELIGRO primary key nonclustered (ID_PELIGRO)
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
/* Table: TBL_PRIVILEGIO                                        */
/*==============================================================*/
create table TBL_PRIVILEGIO (
   ID_PRIVILEGIO        int                  identity,
   NOMBRE_PRIVILEGIO    varchar(150)         null,
   ESTADO               bit                  null,
   constraint PK_TBL_PRIVILEGIO primary key nonclustered (ID_PRIVILEGIO)
)
go

/*==============================================================*/
/* Table: TBL_PROGRAMA_ACTIVIDAD                                */
/*==============================================================*/
create table TBL_PROGRAMA_ACTIVIDAD (
   ID_PROGRAMA_ACTIVIDAD int                  identity,
   ID_PROGRAMA_ANUAL    int                  null,
   NOMBRE_PROGRAMA_ACTIVIDAD varchar(200)         null,
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
   NOMBRE_RECURSO       varchar(150)         null,
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
   NOMBRE_SUB_ACTIVIDAD varchar(200)         null,
   TIPO_FRECUENCIA      int                  null,
   CANTIDAD_ACTIVIDADES varchar(200)         null,
   constraint PK_TBL_SUB_ACTIVIDAD primary key nonclustered (ID_SUB_ACTIVIDAD)
)
go

declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   'Éste campo podra tener los siguientes valores:
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
   ID_USUARIO           int                  identity,
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
   ID_USUARIO           int                  not null,
   ID_GRUPO             int                  not null,
   GRUPO_ADMIN          bit                  null,
   constraint PK_TBL_USUARIO_GRUPO primary key nonclustered (ID_USUARIO, ID_GRUPO)
)
go

alter table E006_3
   add constraint FK_E006_3_INCORPORA_TBL_EVEN foreign key (ID_EVENTO_EMPRESA)
      references TBL_EVENTO_EMPRESA (ID_EVENTO_EMPRESA)
go

alter table E006_3
   add constraint FK_E006_3_RELATIONS_E006_4 foreign key (E00_ID_INFORME)
      references E006_4 (ID_INFORME)
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
   add constraint FK_TBL_ACCI_POSEE_TBL_USUA foreign key (ID_USUARIO)
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

alter table TBL_CONSECUENCIA
   add constraint FK_TBL_CONS_PROVOCA_TBL_PELI foreign key (ID_PELIGRO)
      references TBL_PELIGRO (ID_PELIGRO)
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

alter table TBL_GRUPO_PRIVILEGIO
   add constraint FK_TBL_GRUP_PRIVILEGI_TBL_PRIV foreign key (ID_PRIVILEGIO)
      references TBL_PRIVILEGIO (ID_PRIVILEGIO)
go

alter table TBL_HISTORIAL_EMPRESA
   add constraint FK_TBL_HIST_REGISTRA_TBL_EMPR foreign key (ID_EMPRESA)
      references TBL_EMPRESA (ID_EMPRESA)
go

alter table TBL_MATRIZ
   add constraint FK_TBL_MATR_HACE_TBL_USUA foreign key (ID_USUARIO)
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
   add constraint FK_TBL_USUA_TBL_USUAR_TBL_GRUP foreign key (ID_GRUPO)
      references TBL_GRUPO (ID_GRUPO)
go

alter table TBL_USUARIO_GRUPO
   add constraint FK_TBL_USUA_TBL_USUAR_TBL_USUA foreign key (ID_USUARIO)
      references TBL_USUARIO (ID_USUARIO)
go



	  
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
