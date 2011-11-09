if exists (select 1
          from sysobjects
          where id = object_id('TRIG_UPDATE_NODE')
          and type = 'TR')
   drop trigger TRIG_UPDATE_NODE
go

if exists (select 1
          from sysobjects
          where id = object_id('TRIG_ADD_NODE')
          and type = 'TR')
   drop trigger TRIG_ADD_NODE
go

if exists (select 1
          from sysobjects
          where id = object_id('TRIG_INSERT_USUARIO')
          and type = 'TR')
   drop trigger TRIG_INSERT_USUARIO
go

if exists (select 1
          from sysobjects
          where id = object_id('TRIG_INSERT_USUARIO_BEFORE')
          and type = 'TR')
   drop trigger TRIG_INSERT_USUARIO_BEFORE
go

if exists (select 1
          from sysobjects
          where  id = object_id('FN_NODES_BY_PARENT')
          and type = 'P')
   drop procedure FN_NODES_BY_PARENT
go

if exists (select 1
          from sysobjects
          where  id = object_id('FN_RECURSIVE_NODE')
          and type = 'P')
   drop procedure FN_RECURSIVE_NODE
go

if exists (select 1
          from sysobjects
          where  id = object_id('SP_GET_MATRIZ_BY_ID')
          and type = 'P')
   drop procedure SP_GET_MATRIZ_BY_ID
go

if exists (select 1
          from sysobjects
          where  id = object_id('SP_GET_PRIVILEGIOS_BY_USUARIO')
          and type = 'P')
   drop procedure SP_GET_PRIVILEGIOS_BY_USUARIO
go

if exists (select 1
          from sysobjects
          where  id = object_id('SP_GET_PROGRAMAS_ANUALES')
          and type = 'P')
   drop procedure SP_GET_PROGRAMAS_ANUALES
go

if exists (select 1
          from sysobjects
          where  id = object_id('SP_GET_STORES_BY_NODO')
          and type = 'P')
   drop procedure SP_GET_STORES_BY_NODO
go

if exists (select 1
          from sysobjects
          where  id = object_id('SP_INDICADORES_ALL_PROGRAMA_ANUAL')
          and type = 'P')
   drop procedure SP_INDICADORES_ALL_PROGRAMA_ANUAL
go

if exists (select 1
          from sysobjects
          where  id = object_id('SP_INDICADORES_BY_PROGRAMA_ANUAL')
          and type = 'P')
   drop procedure SP_INDICADORES_BY_PROGRAMA_ANUAL
go

if exists (select 1
          from sysobjects
          where  id = object_id('SP_PRIVILEGIOS_USER')
          and type = 'P')
   drop procedure SP_PRIVILEGIOS_USER
go

if exists (select 1
          from sysobjects
          where  id = object_id('SP_SEARCH_ACTIVIDAD_EVALUADA')
          and type = 'P')
   drop procedure SP_SEARCH_ACTIVIDAD_EVALUADA
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
   where r.fkeyid = object_id('TBL_ACCION_CORRECTIVA') and o.name = 'FK_TBL_ACCI_REFERENCE_TBL_USUA')
alter table TBL_ACCION_CORRECTIVA
   drop constraint FK_TBL_ACCI_REFERENCE_TBL_USUA
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_ACCION_CORRECTIVA') and o.name = 'FK_TBL_ACCI_REFERENCE_TBL_I_PR')
alter table TBL_ACCION_CORRECTIVA
   drop constraint FK_TBL_ACCI_REFERENCE_TBL_I_PR
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
   where r.fkeyid = object_id('TBL_ACTIVIDAD') and o.name = 'FK_TBL_ACTI_EXISTE_TBL_EVID')
alter table TBL_ACTIVIDAD
   drop constraint FK_TBL_ACTI_EXISTE_TBL_EVID
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_ACTIVIDAD') and o.name = 'FK_TBL_ACTI_REFERENCE_TBL_PROG')
alter table TBL_ACTIVIDAD
   drop constraint FK_TBL_ACTI_REFERENCE_TBL_PROG
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_ACTIVIDAD') and o.name = 'FK_TBL_ACTI_REFERENCE_TBL_CARG')
alter table TBL_ACTIVIDAD
   drop constraint FK_TBL_ACTI_REFERENCE_TBL_CARG
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
   where r.fkeyid = object_id('TBL_ACTIVIDAD_EVALUADA') and o.name = 'FK_TBL_ACTIVIDAD_EVALUADA_REF_TBL_CARG')
alter table TBL_ACTIVIDAD_EVALUADA
   drop constraint FK_TBL_ACTIVIDAD_EVALUADA_REF_TBL_CARG
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
   where r.fkeyid = object_id('TBL_ARCHIVO') and o.name = 'FK_TBL_ARCH_ARCHIVO_E_TBL_I_PR')
alter table TBL_ARCHIVO
   drop constraint FK_TBL_ARCH_ARCHIVO_E_TBL_I_PR
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_AREA') and o.name = 'FK_TBL_AREA_INMERSA_TBL_DIVI')
alter table TBL_AREA
   drop constraint FK_TBL_AREA_INMERSA_TBL_DIVI
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_CAUSA_INFORME') and o.name = 'FK_TBL_CAUS_REFERENCE_TBL_CAUS')
alter table TBL_CAUSA_INFORME
   drop constraint FK_TBL_CAUS_REFERENCE_TBL_CAUS
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_CAUSA_INFORME') and o.name = 'FK_TBL_CAUS_REFERENCE_TBL_I_FI')
alter table TBL_CAUSA_INFORME
   drop constraint FK_TBL_CAUS_REFERENCE_TBL_I_FI
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
   where r.fkeyid = object_id('TBL_EVENTO') and o.name = 'FK_TBL_EVEN_EVENTO_DP_TBL_DEPA')
alter table TBL_EVENTO
   drop constraint FK_TBL_EVEN_EVENTO_DP_TBL_DEPA
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_EVENTO_DATO') and o.name = 'FK_TBL_EVEN_REFERENCE_TBL_I_PR')
alter table TBL_EVENTO_DATO
   drop constraint FK_TBL_EVEN_REFERENCE_TBL_I_PR
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_EVENTO_DATO') and o.name = 'FK_TBL_EVEN_DATO_EVEN_TBL_DATO')
alter table TBL_EVENTO_DATO
   drop constraint FK_TBL_EVEN_DATO_EVEN_TBL_DATO
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
   where r.fkeyid = object_id('TBL_GRUPO_PRIVILEGIO') and o.name = 'FK_TBL_GRUP_REFERENCE_TBL_NODO')
alter table TBL_GRUPO_PRIVILEGIO
   drop constraint FK_TBL_GRUP_REFERENCE_TBL_NODO
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_GRUPO_PRIVILEGIO') and o.name = 'FK_TBL_GRUP_GRUPO_GRU_TBL_GRUP')
alter table TBL_GRUPO_PRIVILEGIO
   drop constraint FK_TBL_GRUP_GRUPO_GRU_TBL_GRUP
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_HISTORIAL_EMPRESA') and o.name = 'FK_TBL_HIST_REGISTRA_TBL_EMPR')
alter table TBL_HISTORIAL_EMPRESA
   drop constraint FK_TBL_HIST_REGISTRA_TBL_EMPR
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_HISTORIAL_INFORME') and o.name = 'FK_TBL_HIST_REFERENCE_TBL_I_PR')
alter table TBL_HISTORIAL_INFORME
   drop constraint FK_TBL_HIST_REFERENCE_TBL_I_PR
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_I_FINAL') and o.name = 'FK_TBL_I_FI_REFERENCE_TBL_I_PR')
alter table TBL_I_FINAL
   drop constraint FK_TBL_I_FI_REFERENCE_TBL_I_PR
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_I_PRELIMINAR') and o.name = 'FK_TBL_I_PR_INCORPORA_TBL_EVEN')
alter table TBL_I_PRELIMINAR
   drop constraint FK_TBL_I_PR_INCORPORA_TBL_EVEN
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
   where r.fkeyid = object_id('TBL_MODULO_STORE') and o.name = 'FK_TBL_MODU_REFERENCE_TBL_NODO')
alter table TBL_MODULO_STORE
   drop constraint FK_TBL_MODU_REFERENCE_TBL_NODO
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_MODULO_STORE') and o.name = 'FK_TBL_MODU_REFERENCE_TBL_STOR')
alter table TBL_MODULO_STORE
   drop constraint FK_TBL_MODU_REFERENCE_TBL_STOR
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_NODO') and o.name = 'FK_TBL_NODO_REFERENCE_TBL_NODO')
alter table TBL_NODO
   drop constraint FK_TBL_NODO_REFERENCE_TBL_NODO
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
   where r.fkeyid = object_id('TBL_PROGRAMA_ANUAL') and o.name = 'FK_TBL_PROG_REFERENCE_TBL_DEPA')
alter table TBL_PROGRAMA_ANUAL
   drop constraint FK_TBL_PROG_REFERENCE_TBL_DEPA
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_PROGRAMA_ANUAL') and o.name = 'FK_TBL_PROG_REFERENCE_TBL_DIVI')
alter table TBL_PROGRAMA_ANUAL
   drop constraint FK_TBL_PROG_REFERENCE_TBL_DIVI
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_PUNTO_GEOGRAFICO') and o.name = 'FK_TBL_PUNT_UBICADO_E_TBL_DEPA')
alter table TBL_PUNTO_GEOGRAFICO
   drop constraint FK_TBL_PUNT_UBICADO_E_TBL_DEPA
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TBL_TRABAJADOR') and o.name = 'FK_TBL_TRAB_REFERENCE_TBL_CARG')
alter table TBL_TRABAJADOR
   drop constraint FK_TBL_TRAB_REFERENCE_TBL_CARG
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
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('THL_HERRAMIENTA_TRABAJADOR') and o.name = 'FK_THL_HERR_REFERENCE_TBL_TRAB')
alter table THL_HERRAMIENTA_TRABAJADOR
   drop constraint FK_THL_HERR_REFERENCE_TBL_TRAB
go

if exists (select 1
   from dbo.sysreferences r join dbo.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('THL_HERRAMIENTA_TRABAJADOR') and o.name = 'FK_THL_HERR_REFERENCE_TBL_HERR')
alter table THL_HERRAMIENTA_TRABAJADOR
   drop constraint FK_THL_HERR_REFERENCE_TBL_HERR
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
           where  id = object_id('TBL_ACTIVIDAD')
            and   type = 'U')
   drop table TBL_ACTIVIDAD
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
           where  id = object_id('TBL_CAUSA_INFORME')
            and   type = 'U')
   drop table TBL_CAUSA_INFORME
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
           where  id = object_id('TBL_HERRAMIENTA')
            and   type = 'U')
   drop table TBL_HERRAMIENTA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_HISTORIAL_EMPRESA')
            and   type = 'U')
   drop table TBL_HISTORIAL_EMPRESA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_HISTORIAL_INFORME')
            and   type = 'U')
   drop table TBL_HISTORIAL_INFORME
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_I_FINAL')
            and   type = 'U')
   drop table TBL_I_FINAL
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_I_PRELIMINAR')
            and   type = 'U')
   drop table TBL_I_PRELIMINAR
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
           where  id = object_id('TBL_MODULO_STORE')
            and   type = 'U')
   drop table TBL_MODULO_STORE
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TBL_NODO')
            and   type = 'U')
   drop table TBL_NODO
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
           where  id = object_id('TBL_STORE')
            and   type = 'U')
   drop table TBL_STORE
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

if exists (select 1
            from  sysobjects
           where  id = object_id('THL_HERRAMIENTA_TRABAJADOR')
            and   type = 'U')
   drop table THL_HERRAMIENTA_TRABAJADOR
go

if exists(select 1 from systypes where name='DOMAIN_9')
   execute sp_droptype DOMAIN_9
go

if exists(select 1 from systypes where name='MESES')
   execute sp_unbindrule MESES
go

if exists(select 1 from systypes where name='MESES')
   execute sp_droptype MESES
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

if exists(select 1 from systypes where name='TIPO_CAUSA')
   execute sp_unbindrule TIPO_CAUSA
go

if exists(select 1 from systypes where name='TIPO_CAUSA')
   execute sp_droptype TIPO_CAUSA
go

if exists(select 1 from systypes where name='TIPO_DISPLAY')
   execute sp_unbindrule TIPO_DISPLAY
go

if exists(select 1 from systypes where name='TIPO_DISPLAY')
   execute sp_droptype TIPO_DISPLAY
go

if exists(select 1 from systypes where name='TIPO_EVENTO')
   execute sp_unbindrule TIPO_EVENTO
go

if exists(select 1 from systypes where name='TIPO_EVENTO')
   execute sp_droptype TIPO_EVENTO
go

if exists(select 1 from systypes where name='TIPO_FRECUENCIA')
   execute sp_unbindrule TIPO_FRECUENCIA
go

if exists(select 1 from systypes where name='TIPO_FRECUENCIA')
   execute sp_droptype TIPO_FRECUENCIA
go

if exists(select 1 from systypes where name='TIPO_NODO')
   execute sp_unbindrule TIPO_NODO
go

if exists(select 1 from systypes where name='TIPO_NODO')
   execute sp_droptype TIPO_NODO
go

if exists(select 1 from systypes where name='TIPO_PELIGRO')
   execute sp_unbindrule TIPO_PELIGRO
go

if exists(select 1 from systypes where name='TIPO_PELIGRO')
   execute sp_droptype TIPO_PELIGRO
go

if exists(select 1 from systypes where name='TURNO')
   execute sp_unbindrule TURNO
go

if exists(select 1 from systypes where name='TURNO')
   execute sp_droptype TURNO
go

if exists (select 1 from sysobjects where id=object_id('R_MESES') and type='R')
   drop rule  R_MESES
go

if exists (select 1 from sysobjects where id=object_id('R_MOMENTO_OCURRIDO') and type='R')
   drop rule  R_MOMENTO_OCURRIDO
go

if exists (select 1 from sysobjects where id=object_id('R_TIPO_CAUSA') and type='R')
   drop rule  R_TIPO_CAUSA
go

if exists (select 1 from sysobjects where id=object_id('R_TIPO_DISPLAY') and type='R')
   drop rule  R_TIPO_DISPLAY
go

if exists (select 1 from sysobjects where id=object_id('R_TIPO_EVENTO') and type='R')
   drop rule  R_TIPO_EVENTO
go

if exists (select 1 from sysobjects where id=object_id('R_TIPO_FRECUENCIA') and type='R')
   drop rule  R_TIPO_FRECUENCIA
go

if exists (select 1 from sysobjects where id=object_id('R_TIPO_NODO') and type='R')
   drop rule  R_TIPO_NODO
go

if exists (select 1 from sysobjects where id=object_id('R_TIPO_PELIGRO') and type='R')
   drop rule  R_TIPO_PELIGRO
go

if exists (select 1 from sysobjects where id=object_id('R_TURNO') and type='R')
   drop rule  R_TURNO
go

create rule R_MESES as
      @column between 1 and 12 and @column in (1,2,3,4,5,6,7,8,9,10,11,12)
go

create rule R_MOMENTO_OCURRIDO as
      @column between 1 and 3 and @column in (1,2,3)
go

create rule R_TIPO_CAUSA as
      @column between 1 and 20
go

create rule R_TIPO_DISPLAY as
      @column between 1 and 3 and @column in (1,2,3)
go

create rule R_TIPO_EVENTO as
      @column between 1 and 6 and @column in (1,2,3,4,5,6)
go

create rule R_TIPO_FRECUENCIA as
      @column between 1 and 7 and @column in (1,2,3,4,5,6,7)
go

create rule R_TIPO_NODO as
      @column between 1 and 2 and @column in (1,2)
go

create rule R_TIPO_PELIGRO as
      @column between 1 and 2 and @column in (1,2)
go

create rule R_TURNO as
      @column in ('A','B','C','D')
go

/*==============================================================*/
/* Domain: DOMAIN_9                                             */
/*==============================================================*/
execute sp_addtype DOMAIN_9, 'char(10)'
go

/*==============================================================*/
/* Domain: MESES                                                */
/*==============================================================*/
execute sp_addtype MESES, 'int'
go

execute sp_bindrule R_MESES, MESES
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
/* Domain: TIPO_CAUSA                                           */
/*==============================================================*/
execute sp_addtype TIPO_CAUSA, 'int'
go

execute sp_bindrule R_TIPO_CAUSA, TIPO_CAUSA
go

/*==============================================================*/
/* Domain: TIPO_DISPLAY                                         */
/*==============================================================*/
execute sp_addtype TIPO_DISPLAY, 'int'
go

execute sp_bindrule R_TIPO_DISPLAY, TIPO_DISPLAY
go

/*==============================================================*/
/* Domain: TIPO_EVENTO                                          */
/*==============================================================*/
execute sp_addtype TIPO_EVENTO, 'int'
go

execute sp_bindrule R_TIPO_EVENTO, TIPO_EVENTO
go

/*==============================================================*/
/* Domain: TIPO_FRECUENCIA                                      */
/*==============================================================*/
execute sp_addtype TIPO_FRECUENCIA, 'int'
go

execute sp_bindrule R_TIPO_FRECUENCIA, TIPO_FRECUENCIA
go

/*==============================================================*/
/* Domain: TIPO_NODO                                            */
/*==============================================================*/
execute sp_addtype TIPO_NODO, 'int'
go

execute sp_bindrule R_TIPO_NODO, TIPO_NODO
go

/*==============================================================*/
/* Domain: TIPO_PELIGRO                                         */
/*==============================================================*/
execute sp_addtype TIPO_PELIGRO, 'int'
go

execute sp_bindrule R_TIPO_PELIGRO, TIPO_PELIGRO
go

/*==============================================================*/
/* Domain: TURNO                                                */
/*==============================================================*/
execute sp_addtype TURNO, 'char(1)'
go

execute sp_bindrule R_TURNO, TURNO
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
   ID_ACCION            int                  null,
   ID_USUARIO           varchar(200)         null,
   ID_INFORME_PRELIMINAR int                  null,
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
/* Table: TBL_ACTIVIDAD                                         */
/*==============================================================*/
create table TBL_ACTIVIDAD (
   ID_ACTIVIDAD         int                  identity,
   ID_EVIDENCIA         int                  null,
   ID_PROGRAMA_ANUAL    int                  null,
   ID_CARGO             int                  null,
   NOMBRE_ACTIVIDAD     varchar(200)         null,
   TIPO_FRECUENCIA      int                  null
      constraint CKC_TIPO_FRECUENCIA_TBL_ACTI check (TIPO_FRECUENCIA is null or (TIPO_FRECUENCIA between 1 and 7 and TIPO_FRECUENCIA in (1,2,3,4,5,6,7))),
   CANTIDAD_FRECUENCIA  int                  null,
   ENERO_P              int                  null default 0
      constraint CKC_ENERO_P_TBL_ACTI check (ENERO_P is null or (ENERO_P between 0 and 100)),
   ENERO_R              int                  null default 0
      constraint CKC_ENERO_R_TBL_ACTI check (ENERO_R is null or (ENERO_R between 0 and 100)),
   ENERO_E              bit                  null default 1,
   FEBRERO_P            int                  null default 0
      constraint CKC_FEBRERO_P_TBL_ACTI check (FEBRERO_P is null or (FEBRERO_P between 0 and 100)),
   FEBRERO_R            int                  null default 0
      constraint CKC_FEBRERO_R_TBL_ACTI check (FEBRERO_R is null or (FEBRERO_R between 0 and 100)),
   FEBRERO_E            bit                  null default 1,
   MARZO_P              int                  null default 0
      constraint CKC_MARZO_P_TBL_ACTI check (MARZO_P is null or (MARZO_P between 0 and 100)),
   MARZO_R              int                  null default 0
      constraint CKC_MARZO_R_TBL_ACTI check (MARZO_R is null or (MARZO_R between 0 and 100)),
   MARZO_E              bit                  null default 1,
   ABRIL_P              int                  null default 0
      constraint CKC_ABRIL_P_TBL_ACTI check (ABRIL_P is null or (ABRIL_P between 0 and 100)),
   ABRIL_R              int                  null default 0
      constraint CKC_ABRIL_R_TBL_ACTI check (ABRIL_R is null or (ABRIL_R between 0 and 100)),
   ABRIL_E              bit                  null default 1,
   MAYO_P               int                  null default 0
      constraint CKC_MAYO_P_TBL_ACTI check (MAYO_P is null or (MAYO_P between 0 and 100)),
   MAYO_R               int                  null default 0
      constraint CKC_MAYO_R_TBL_ACTI check (MAYO_R is null or (MAYO_R between 0 and 100)),
   MAYO_E               bit                  null,
   JUNIO_P              int                  null default 0
      constraint CKC_JUNIO_P_TBL_ACTI check (JUNIO_P is null or (JUNIO_P between 0 and 100)),
   JUNIO_R              int                  null default 0
      constraint CKC_JUNIO_R_TBL_ACTI check (JUNIO_R is null or (JUNIO_R between 0 and 100)),
   JUNIO_E              bit                  null default 1,
   JULIO_P              int                  null default 0
      constraint CKC_JULIO_P_TBL_ACTI check (JULIO_P is null or (JULIO_P between 0 and 100)),
   JULIO_R              int                  null default 0
      constraint CKC_JULIO_R_TBL_ACTI check (JULIO_R is null or (JULIO_R between 0 and 100)),
   JULIO_E              bit                  null default 1,
   AGOSTO_P             int                  null default 0
      constraint CKC_AGOSTO_P_TBL_ACTI check (AGOSTO_P is null or (AGOSTO_P between 0 and 100)),
   AGOSTO_R             int                  null default 0
      constraint CKC_AGOSTO_R_TBL_ACTI check (AGOSTO_R is null or (AGOSTO_R between 0 and 100)),
   AGOSTO_E             bit                  null default 1,
   SEPTIEMBRE_P         int                  null default 0
      constraint CKC_SEPTIEMBRE_P_TBL_ACTI check (SEPTIEMBRE_P is null or (SEPTIEMBRE_P between 0 and 100)),
   SEPTIEMBRE_R         int                  null default 0
      constraint CKC_SEPTIEMBRE_R_TBL_ACTI check (SEPTIEMBRE_R is null or (SEPTIEMBRE_R between 0 and 100)),
   SEPTIEMBRE_E         bit                  null default 1,
   OCTUBRE_P            int                  null default 0
      constraint CKC_OCTUBRE_P_TBL_ACTI check (OCTUBRE_P is null or (OCTUBRE_P between 0 and 100)),
   OCTUBRE_R            int                  null default 0
      constraint CKC_OCTUBRE_R_TBL_ACTI check (OCTUBRE_R is null or (OCTUBRE_R between 0 and 100)),
   OCTUBRE_E            bit                  null default 1,
   NOVIEMBRE_P          int                  null default 0
      constraint CKC_NOVIEMBRE_P_TBL_ACTI check (NOVIEMBRE_P is null or (NOVIEMBRE_P between 0 and 100)),
   NOVIEMBRE_R          int                  null default 0
      constraint CKC_NOVIEMBRE_R_TBL_ACTI check (NOVIEMBRE_R is null or (NOVIEMBRE_R between 0 and 100)),
   NOVIEMBRE_E          bit                  null default 1,
   DICIEMBRE_P          int                  null default 0
      constraint CKC_DICIEMBRE_P_TBL_ACTI check (DICIEMBRE_P is null or (DICIEMBRE_P between 0 and 100)),
   DICIEMBRE_R          int                  null default 0
      constraint CKC_DICIEMBRE_R_TBL_ACTI check (DICIEMBRE_R is null or (DICIEMBRE_R between 0 and 100)),
   DICIEMBRE_E          bit                  null default 1,
   TURNO                char(1)              null
      constraint CKC_TURNO_TBL_ACTI check (TURNO is null or (TURNO in ('A','B','C','D','0'))),
   MES_INICIO           int                  null
      constraint CKC_MES_INICIO_TBL_ACTI check (MES_INICIO is null or (MES_INICIO between 1 and 12 and MES_INICIO in (1,2,3,4,5,6,7,8,9,10,11,12))),
   constraint PK_TBL_ACTIVIDAD primary key nonclustered (ID_ACTIVIDAD)
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
   'user', @CurrentUser, 'table', 'TBL_ACTIVIDAD', 'column', 'TIPO_FRECUENCIA'
go

/*==============================================================*/
/* Table: TBL_ACTIVIDAD_ESPECIFICA                              */
/*==============================================================*/
create table TBL_ACTIVIDAD_ESPECIFICA (
   ID_ACTIVIDAD_ESPECIFICA int                  identity,
   NOM_ACTIVIDAD_ESPECIFICA varchar(200)         not null,
   constraint PK_TBL_ACTIVIDAD_ESPECIFICA primary key nonclustered (ID_ACTIVIDAD_ESPECIFICA),
   constraint UK_TBL_ACTIVIDAD_ESPECIFICA unique (NOM_ACTIVIDAD_ESPECIFICA)
)
go

/*==============================================================*/
/* Table: TBL_ACTIVIDAD_EVALUADA                                */
/*==============================================================*/
create table TBL_ACTIVIDAD_EVALUADA (
   ID_ACTIVIDAD_EVALUADA int                  identity,
   ID_ACTIVIDAD_GENERAL int                  null,
   ID_DIVISION          int                  null,
   ID_ACTIVIDAD_ESPECIFICA int                  null,
   ID_DEPARTAMENTO_ORGANIZACION int                  null,
   ID_PELIGRO           int                  null,
   ID_AREA              int                  null,
   ID_CARGO             int                  null,
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
   NOM_ACTIVIDAD_GENERAL varchar(200)         not null,
   constraint PK_TBL_ACTIVIDAD_GENERAL primary key nonclustered (ID_ACTIVIDAD_GENERAL),
   constraint UK_TBL_ACTIVIDAD_GENERAL unique (NOM_ACTIVIDAD_GENERAL)
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
   NOMBRE_AREA          varchar(200)         not null,
   constraint PK_TBL_AREA primary key nonclustered (ID_AREA)
)
go

/*==============================================================*/
/* Table: TBL_CARGO                                             */
/*==============================================================*/
create table TBL_CARGO (
   ID_CARGO             int                  identity,
   NOMBRE_CARGO         varchar(200)         not null,
   constraint PK_TBL_CARGO primary key (ID_CARGO),
   constraint AK_KEY_1_TBL_CARG unique (NOMBRE_CARGO)
)
go

/*==============================================================*/
/* Table: TBL_CAUSA                                             */
/*==============================================================*/
create table TBL_CAUSA (
   ID_CAUSA             int                  identity,
   DESCRIPCION          text                 null,
   TIPO_CAUSA           int                  null
      constraint CKC_TIPO_CAUSA_TBL_CAUS check (TIPO_CAUSA is null or (TIPO_CAUSA between 1 and 20)),
   constraint PK_TBL_CAUSA primary key nonclustered (ID_CAUSA)
)
go

/*==============================================================*/
/* Table: TBL_CAUSA_INFORME                                     */
/*==============================================================*/
create table TBL_CAUSA_INFORME (
   ID_CAUSA             int                  not null,
   ID_INFORME_FINAL     int                  not null,
   constraint PK_TBL_CAUSA_INFORME primary key (ID_CAUSA, ID_INFORME_FINAL)
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
   NOMBRE_CONSECUENCIA  varchar(200)         not null,
   constraint PK_TBL_CONSECUENCIA primary key nonclustered (ID_CONSECUENCIA),
   constraint UK_TBL_CONSECUENCIA unique (NOMBRE_CONSECUENCIA)
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
   NOMBRE_DIVISION      varchar(150)         not null,
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
/* Table: TBL_EVENTO                                            */
/*==============================================================*/
create table TBL_EVENTO (
   ID_EVENTO            int                  identity,
   ID_DEPARTAMENTO_ORGANIZACION int                  null,
   FECHA_HORA_EVENTO    datetime             null,
   FECHA_INGRESO        datetime             null,
   LAT_EVENTO           double precision     null,
   LNG_EVENTO           double precision     null,
   LUGAR_EXACTO         varchar(200)         null,
   DESCRIPCION_GENERAL  text                 null,
   constraint PK_TBL_EVENTO primary key nonclustered (ID_EVENTO)
)
go


/*==============================================================*/
/* Table: TBL_EVENTO_DATO                                       */
/*==============================================================*/
create table TBL_EVENTO_DATO (
   ID_TIPO_EVENTO       int                  not null,
   ID_INFORME_PRELIMINAR int                  not null,
   ESTADO               bit                  null,
   constraint PK_TBL_EVENTO_DATO primary key nonclustered (ID_TIPO_EVENTO, ID_INFORME_PRELIMINAR)
)
go

/*==============================================================*/
/* Table: TBL_EVENTO_EMPRESA                                    */
/*==============================================================*/
create table TBL_EVENTO_EMPRESA (
   ID_EVENTO_EMPRESA    int                  identity,
   ID_EVENTO            int                  null,
   ID_EMPRESA           int                  null,
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
   constraint PK_TBL_EVIDENCIA primary key nonclustered (ID_EVIDENCIA),
   constraint UK_TBL_EVIDENCIA unique (NOMBRE_EVIDENCIA)
)
go

/*==============================================================*/
/* Table: TBL_GRUPO                                             */
/*==============================================================*/
create table TBL_GRUPO (
   ID_GRUPO             int                  identity,
   NOMBRE_GRUPO         varchar(50)          null,
   DESCRIPCION_GRUPO    text                 null,
   constraint PK_TBL_GRUPO primary key nonclustered (ID_GRUPO),
   constraint AK_KEY_2_TBL_GRUP unique (NOMBRE_GRUPO)
)
go

/*==============================================================*/
/* Table: TBL_GRUPO_PRIVILEGIO                                  */
/*==============================================================*/
create table TBL_GRUPO_PRIVILEGIO (
   ID_GRUPO             int                  not null,
   ID_NODO              int                  not null,
   ESTADO               bit                  null,
   ALLOW_READ           bit                  null,
   ALLOW_WRITE          bit                  null,
   ALLOW_EDIT           bit                  null,
   ALLOW_DELETE         bit                  null,
   ALLOW_PRINT          bit                  null,
   ALLOW_CRUD           bit                  null,
   constraint PK_TBL_GRUPO_PRIVILEGIO primary key nonclustered (ID_GRUPO, ID_NODO)
)
go

/*==============================================================*/
/* Table: TBL_HERRAMIENTA                                       */
/*==============================================================*/
create table TBL_HERRAMIENTA (
   ID_HERRAMIENTA       int                  identity,
   NOMBRE_HERRAMIENTA   varchar(200)         null,
   constraint PK_TBL_HERRAMIENTA primary key (ID_HERRAMIENTA),
   constraint AK_KEY_2_TBL_HERR unique (NOMBRE_HERRAMIENTA)
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
/* Table: TBL_HISTORIAL_INFORME                                 */
/*==============================================================*/
create table TBL_HISTORIAL_INFORME (
   ID_HISTORIAL_INFORME int                  identity,
   ID_INFORME_PRELIMINAR int                  null,
   FECHA_MODIFICACION   datetime             null,
   DESCRIPCION_MODIFICACION text                 null,
   constraint PK_TBL_HISTORIAL_INFORME primary key nonclustered (ID_HISTORIAL_INFORME)
)
go

/*==============================================================*/
/* Table: TBL_I_FINAL                                           */
/*==============================================================*/
create table TBL_I_FINAL (
   ID_INFORME_FINAL     int                  not null,
   ID_INFORME_PRELIMINAR int                  null,
   DESCRIPCION_INCIDENTE text                 null,
   ANTECEDENTES         text                 null,
   RELATO_DE_HECHO      text                 null,
   COMENTARIO           text                 null,
   FECHA_CREACION       datetime             null,
   constraint PK_TBL_I_FINAL primary key nonclustered (ID_INFORME_FINAL)
)
go

/*==============================================================*/
/* Table: TBL_I_PRELIMINAR                                      */
/*==============================================================*/
create table TBL_I_PRELIMINAR (
   ID_INFORME_PRELIMINAR int                  identity,
   ID_EVENTO_EMPRESA    int                  null,
   FECHA_INGRESO        datetime             null,
   CLASIFICACION        int                  null
      constraint CKC_CLASIFICACION_TBL_I_PR check (CLASIFICACION is null or (CLASIFICACION between 1 and 6 and CLASIFICACION in (1,2,3,4,5,6))),
   constraint PK_TBL_I_PRELIMINAR primary key nonclustered (ID_INFORME_PRELIMINAR)
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
   NOM_MEDIDA_DE_CONTROL varchar(255)         not null,
   ESTADO               bit                  null,
   constraint PK_TBL_MEDIDA_DE_CONTROL primary key nonclustered (ID_MEDIDAS_DE_CONTROL),
   constraint AK_KEY_2_TBL_MEDI unique (NOM_MEDIDA_DE_CONTROL)
)
go

/*==============================================================*/
/* Table: TBL_MODULO_STORE                                      */
/*==============================================================*/
create table TBL_MODULO_STORE (
   ID_STORE             int                  not null,
   ID_NODO              int                  not null,
   constraint PK_TBL_MODULO_STORE primary key (ID_STORE, ID_NODO)
)
go

/*==============================================================*/
/* Table: TBL_NODO                                              */
/*==============================================================*/
create table TBL_NODO (
   ID_NODO              int                  identity,
   NODO_PADRE           int                  null,
   NOMBRE_MODULO        varchar(100)         null,
   ID_COMPONENTE        varchar(200)         null,
   ESTADO               bit                  null,
   TIPO_NODO            int                  null
      constraint CKC_TIPO_NODO_TBL_NODO check (TIPO_NODO is null or (TIPO_NODO between 1 and 2 and TIPO_NODO in (1,2))),
   ICONCLS              varchar(100)         null,
   N_ORDER              int                  null,
   TIPO_DISPLAY         int                  null
      constraint CKC_TIPO_DISPLAY_TBL_NODO check (TIPO_DISPLAY is null or (TIPO_DISPLAY between 1 and 3 and TIPO_DISPLAY in (1,2,3))),
   GROUP_ID             varchar(100)         null,
   SHOW_ON_LOGUED       bit                  null,
   SHOW_ON_NOLOGUED     bit                  null,
   constraint PK_TBL_NODO primary key nonclustered (ID_NODO),
   constraint AK_KEY_2_TBL_NODO unique (NOMBRE_MODULO)
)
go

/*==============================================================*/
/* Table: TBL_ORGANIZACION                                      */
/*==============================================================*/
create table TBL_ORGANIZACION (
   ID_ORGANIZACION      int                  identity,
   NOMBRE_ORGANIZACION  varchar(100)         null,
   constraint PK_TBL_ORGANIZACION primary key nonclustered (ID_ORGANIZACION),
   constraint UK_TBL_ORGANIZACION unique (NOMBRE_ORGANIZACION)
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
   NOM_PELIGRO          varchar(200)         not null,
   TIPO_PELIGRO         int                  null
      constraint CKC_TIPO_PELIGRO_TBL_PELI check (TIPO_PELIGRO is null or (TIPO_PELIGRO between 1 and 2 and TIPO_PELIGRO in (1,2,3))),
   constraint PK_TBL_PELIGRO primary key nonclustered (ID_PELIGRO),
   constraint UK_TBL_PELIGRO unique (NOM_PELIGRO)
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
/* Table: TBL_PROGRAMA_ANUAL                                    */
/*==============================================================*/
create table TBL_PROGRAMA_ANUAL (
   ID_PROGRAMA_ANUAL    int                  identity,
   ID_DEPARTAMENTO_ORGANIZACION int                  null,
   ID_DIVISION          int                  null,
   OBJETIVO             text                 null,
   META                 text                 null,
   FECHA_CREACION       datetime             null,
   NOMBRE_PROGRAMA      varchar(255)         null,
   MES_INICIO           int                  null
      constraint CKC_MES_INICIO_TBL_PROG check (MES_INICIO is null or (MES_INICIO between 1 and 12 and MES_INICIO in (1,2,3,4,5,6,7,8,9,10,11,12))),
   ANO_INICIO           int                  null,
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
/* Table: TBL_STORE                                             */
/*==============================================================*/
create table TBL_STORE (
   ID_STORE             int                  identity,
   NOMBRE_STORE         varchar(200)         not null,
   constraint PK_TBL_STORE primary key (ID_STORE),
   constraint AK_KEY_2_TBL_STOR unique (NOMBRE_STORE)
)
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
   ID_TRABAJADOR        int                  identity,
   ID_CARGO             int                  null,
   ANOS_EXPERIENCIA_CARGO int                  null,
   ANOS_EXPERIENCIA_LABORAL int                  null,
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
   IS_LOGUED            bit                  null,
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
   constraint PK_TBL_USUARIO_GRUPO primary key nonclustered (ID_GRUPO, ID_USUARIO)
)
go

/*==============================================================*/
/* Table: THL_HERRAMIENTA_TRABAJADOR                            */
/*==============================================================*/
create table THL_HERRAMIENTA_TRABAJADOR (
   ID_HERRAMIENTA       int                  not null,
   ID_TRABAJADOR        int                  not null,
   constraint PK_THL_HERRAMIENTA_TRABAJADOR primary key (ID_HERRAMIENTA, ID_TRABAJADOR)
)
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
   add constraint FK_TBL_ACCI_REFERENCE_TBL_USUA foreign key (ID_USUARIO)
      references TBL_USUARIO (ID_USUARIO)
go

alter table TBL_ACCION_CORRECTIVA
   add constraint FK_TBL_ACCI_REFERENCE_TBL_I_PR foreign key (ID_INFORME_PRELIMINAR)
      references TBL_I_PRELIMINAR (ID_INFORME_PRELIMINAR)
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

alter table TBL_ACTIVIDAD
   add constraint FK_TBL_ACTI_EXISTE_TBL_EVID foreign key (ID_EVIDENCIA)
      references TBL_EVIDENCIA (ID_EVIDENCIA)
go

alter table TBL_ACTIVIDAD
   add constraint FK_TBL_ACTI_REFERENCE_TBL_PROG foreign key (ID_PROGRAMA_ANUAL)
      references TBL_PROGRAMA_ANUAL (ID_PROGRAMA_ANUAL)
go

alter table TBL_ACTIVIDAD
   add constraint FK_TBL_ACTI_REFERENCE_TBL_CARG foreign key (ID_CARGO)
      references TBL_CARGO (ID_CARGO)
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

alter table TBL_ACTIVIDAD_EVALUADA
   add constraint FK_TBL_ACTIVIDAD_EVALUADA_REF_TBL_CARG foreign key (ID_CARGO)
      references TBL_CARGO (ID_CARGO)
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
   add constraint FK_TBL_ARCH_ARCHIVO_E_TBL_I_PR foreign key (ID_INFORME)
      references TBL_I_PRELIMINAR (ID_INFORME_PRELIMINAR)
go

alter table TBL_AREA
   add constraint FK_TBL_AREA_INMERSA_TBL_DIVI foreign key (ID_DIVISION)
      references TBL_DIVISION (ID_DIVISION)
go

alter table TBL_CAUSA_INFORME
   add constraint FK_TBL_CAUS_REFERENCE_TBL_CAUS foreign key (ID_CAUSA)
      references TBL_CAUSA (ID_CAUSA)
go

alter table TBL_CAUSA_INFORME
   add constraint FK_TBL_CAUS_REFERENCE_TBL_I_FI foreign key (ID_INFORME_FINAL)
      references TBL_I_FINAL (ID_INFORME_FINAL)
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

alter table TBL_EVENTO
   add constraint FK_TBL_EVEN_EVENTO_DP_TBL_DEPA foreign key (ID_DEPARTAMENTO_ORGANIZACION)
      references TBL_DEPARTAMENTO_ORGANIZACION (ID_DEPARTAMENTO_ORGANIZACION)
go

alter table TBL_EVENTO_DATO
   add constraint FK_TBL_EVEN_REFERENCE_TBL_I_PR foreign key (ID_INFORME_PRELIMINAR)
      references TBL_I_PRELIMINAR (ID_INFORME_PRELIMINAR)
go

alter table TBL_EVENTO_DATO
   add constraint FK_TBL_EVEN_DATO_EVEN_TBL_DATO foreign key (ID_TIPO_EVENTO)
      references TBL_DATO_EVENTO (ID_TIPO_EVENTO)
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
   add constraint FK_TBL_GRUP_REFERENCE_TBL_NODO foreign key (ID_NODO)
      references TBL_NODO (ID_NODO)
go

alter table TBL_GRUPO_PRIVILEGIO
   add constraint FK_TBL_GRUP_GRUPO_GRU_TBL_GRUP foreign key (ID_GRUPO)
      references TBL_GRUPO (ID_GRUPO)
go

alter table TBL_HISTORIAL_EMPRESA
   add constraint FK_TBL_HIST_REGISTRA_TBL_EMPR foreign key (ID_EMPRESA)
      references TBL_EMPRESA (ID_EMPRESA)
go

alter table TBL_HISTORIAL_INFORME
   add constraint FK_TBL_HIST_REFERENCE_TBL_I_PR foreign key (ID_INFORME_PRELIMINAR)
      references TBL_I_PRELIMINAR (ID_INFORME_PRELIMINAR)
go

alter table TBL_I_FINAL
   add constraint FK_TBL_I_FI_REFERENCE_TBL_I_PR foreign key (ID_INFORME_PRELIMINAR)
      references TBL_I_PRELIMINAR (ID_INFORME_PRELIMINAR)
go

alter table TBL_I_PRELIMINAR
   add constraint FK_TBL_I_PR_INCORPORA_TBL_EVEN foreign key (ID_EVENTO_EMPRESA)
      references TBL_EVENTO_EMPRESA (ID_EVENTO_EMPRESA)
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

alter table TBL_MODULO_STORE
   add constraint FK_TBL_MODU_REFERENCE_TBL_NODO foreign key (ID_NODO)
      references TBL_NODO (ID_NODO)
go

alter table TBL_MODULO_STORE
   add constraint FK_TBL_MODU_REFERENCE_TBL_STOR foreign key (ID_STORE)
      references TBL_STORE (ID_STORE)
go

alter table TBL_NODO
   add constraint FK_TBL_NODO_REFERENCE_TBL_NODO foreign key (NODO_PADRE)
      references TBL_NODO (ID_NODO)
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

alter table TBL_PROGRAMA_ANUAL
   add constraint FK_TBL_PROG_REFERENCE_TBL_DEPA foreign key (ID_DEPARTAMENTO_ORGANIZACION)
      references TBL_DEPARTAMENTO_ORGANIZACION (ID_DEPARTAMENTO_ORGANIZACION)
go

alter table TBL_PROGRAMA_ANUAL
   add constraint FK_TBL_PROG_REFERENCE_TBL_DIVI foreign key (ID_DIVISION)
      references TBL_DIVISION (ID_DIVISION)
go

alter table TBL_PUNTO_GEOGRAFICO
   add constraint FK_TBL_PUNT_UBICADO_E_TBL_DEPA foreign key (ID_DEPARTAMENTO_ORGANIZACION)
      references TBL_DEPARTAMENTO_ORGANIZACION (ID_DEPARTAMENTO_ORGANIZACION)
go

alter table TBL_TRABAJADOR
   add constraint FK_TBL_TRAB_REFERENCE_TBL_CARG foreign key (ID_CARGO)
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

alter table THL_HERRAMIENTA_TRABAJADOR
   add constraint FK_THL_HERR_REFERENCE_TBL_TRAB foreign key (ID_TRABAJADOR)
      references TBL_TRABAJADOR (ID_TRABAJADOR)
go

alter table THL_HERRAMIENTA_TRABAJADOR
   add constraint FK_THL_HERR_REFERENCE_TBL_HERR foreign key (ID_HERRAMIENTA)
      references TBL_HERRAMIENTA (ID_HERRAMIENTA)
go

CREATE FUNCTION fn_nodes_by_parent (@ID_NODO INT)
RETURNS @nodes TABLE 
(
	ID_NODO INT,
	NOMBRE_MODULO VARCHAR(200),
	ALLOW_READ BIT,
	ALLOW_WRITE BIT,
	ALLOW_EDIT BIT,
	ALLOW_DELETE BIT,
	ALLOW_PRINT BIT,
	ALLOW_CRUD BIT
)
AS
BEGIN
WITH NODESBYPARENT (ID_NODO,
	NOMBRE_MODULO,
	ALLOW_READ,
	ALLOW_WRITE,
	ALLOW_EDIT,
	ALLOW_DELETE,
	ALLOW_PRINT,
	ALLOW_CRUD)
AS
(
	SELECT 	
		CHILD_ROW.ID_NODO,
			CHILD_ROW.NOMBRE_MODULO,
			GP.ALLOW_READ,
			GP.ALLOW_WRITE,
			GP.ALLOW_EDIT,
			GP.ALLOW_DELETE,
			GP.ALLOW_PRINT,
			GP.ALLOW_CRUD
	FROM TBL_NODO AS CURRENT_ROW
		INNER JOIN TBL_NODO AS CHILD_ROW ON CURRENT_ROW.ID_NODO = CHILD_ROW.NODO_PADRE
		INNER JOIN TBL_GRUPO_PRIVILEGIO GP ON GP.ID_NODO = CHILD_ROW.NODO_PADRE
	WHERE CURRENT_ROW.ID_NODO=@ID_NODO AND GP.ALLOW_READ=1
)
	INSERT @nodes
   SELECT ID_NODO,
			NOMBRE_MODULO,
			ALLOW_READ,
			ALLOW_WRITE,
			ALLOW_EDIT,
			ALLOW_DELETE,
			ALLOW_PRINT,
			ALLOW_CRUD
   FROM NODESBYPARENT
   RETURN
END; 
GO
CREATE FUNCTION fn_recursive_node ()
RETURNS @nodes TABLE 
(
    NODO_PADRE INT,
    ID_NODO INT,
    LEVEL INT
)
AS
BEGIN
WITH GetTree (NODO_PADRE, ID_NODO,Level)
AS
(
-- Anchor member definition
    SELECT e.NODO_PADRE, e.ID_NODO,0 AS Level
    FROM TBL_NODO AS e
    WHERE e.NODO_PADRE IS NULL
    UNION ALL
-- Recursive member definition
    SELECT e.NODO_PADRE, e.ID_NODO,Level + 1
    FROM TBL_NODO AS e
    INNER JOIN GetTree AS d
        ON e.NODO_PADRE = d.ID_NODO
)
	INSERT @nodes
   SELECT NODO_PADRE, ID_NODO,Level
   FROM GetTree
   RETURN
END; 
GO
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
						'Ligeramente Dañino'
					WHEN AE.VALORACION_CONSECUENCIA=3 THEN
						'Extremadamente Dañino'
					ELSE
						'Dañino'
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
						'Ligeramente Dañino'
					WHEN AE.MEDIDA_VALORACION_CONSECUENCIA=3 THEN
						'Extremadamente Dañino'
					ELSE
						'Dañino'
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
CREATE PROCEDURE sp_get_privilegios_by_usuario
	@ID_USUARIO  VARCHAR(200) = ''
AS
SELECT	ND.*,
		GP.ALLOW_READ,
		GP.ALLOW_WRITE,
		GP.ALLOW_EDIT,
		GP.ALLOW_DELETE,
		GP.ALLOW_PRINT,
		GP.ALLOW_CRUD
FROM TBL_GRUPO_PRIVILEGIO GP
	INNER JOIN TBL_NODO ND ON GP.ID_NODO = ND.ID_NODO
WHERE ((GP.ID_GRUPO IN (SELECT UG.ID_GRUPO 
							FROM TBL_USUARIO U
								INNER JOIN TBL_USUARIO_GRUPO UG ON U.ID_USUARIO=UG.ID_USUARIO  
							WHERE U.ID_USUARIO=@ID_USUARIO) OR GP.ID_GRUPO=1))
		AND GP.ALLOW_READ=1
ORDER BY ND.NODO_PADRE, ND.N_ORDER, ND.ID_NODO,GROUP_ID,TIPO_DISPLAY ASC;
GO
CREATE PROCEDURE sp_get_programas_anuales
AS
	SELECT PA.ID_PROGRAMA_ANUAL,
		PA.ID_DEPARTAMENTO_ORGANIZACION,
		PA.NOMBRE_PROGRAMA,
		D.ID_DIVISION,
		D.NOMBRE_DIVISION,
		PA.OBJETIVO,
		PA.META,
		PA.FECHA_CREACION,
		PA.MES_INICIO,
		PA.ANO_INICIO
	FROM TBL_PROGRAMA_ANUAL PA
		INNER JOIN TBL_DIVISION D ON PA.ID_DIVISION = D.ID_DIVISION;
GO
CREATE PROCEDURE sp_get_stores_by_nodo
	@ID_NODO  INT
AS
	SELECT * 
	FROM TBL_MODULO_STORE MS 
		INNER JOIN TBL_STORE ST ON MS.ID_STORE = ST.ID_STORE
	WHERE MS.ID_NODO=@ID_NODO;
GO
CREATE PROCEDURE sp_indicadores_all_programa_anual
AS
SELECT
		ROUND (ISNULL((((SUM(CASE 
			WHEN AC.ENERO_P = 0  THEN
				CASE
					WHEN AC.ENERO_E = 0 THEN
						100
					ELSE
						0
				END
			ELSE
				((CAST(AC.ENERO_R AS DECIMAL)/CAST(AC.ENERO_P AS DECIMAL))*100)
		END)/COUNT(*)) + (SUM(CASE 
			WHEN AC.FEBRERO_P = 0 THEN
				CASE
					WHEN AC.FEBRERO_E = 0 THEN
						100
					ELSE
						0
				END
			ELSE
				((CAST(AC.FEBRERO_R AS DECIMAL)/CAST(AC.FEBRERO_P AS DECIMAL))*100)
		END)/COUNT(*))+ (SUM(CASE 
			WHEN AC.MARZO_P = 0 THEN
				CASE
					WHEN AC.MARZO_E = 0 THEN
						100
					ELSE
						0
				END
			ELSE
				((CAST(AC.MARZO_R AS DECIMAL)/CAST(AC.MARZO_P AS DECIMAL))*100)
		END)/COUNT(*))+ (SUM(CASE 
			WHEN AC.ABRIL_P = 0 THEN
				CASE
					WHEN AC.ABRIL_E = 0 THEN
						100
					ELSE
						0
				END
			ELSE
				((CAST(AC.ABRIL_R AS DECIMAL)/CAST(AC.ABRIL_P AS DECIMAL))*100)
		END)/COUNT(*)) + (SUM(CASE 
			WHEN AC.MAYO_P = 0 THEN
				CASE
					WHEN AC.MAYO_E = 0 THEN
						100
					ELSE
						0
				END
			ELSE
				((CAST(AC.MAYO_R AS DECIMAL)/CAST(AC.MAYO_P AS DECIMAL))*100)
		END)/COUNT(*)) + (SUM(CASE 
			WHEN AC.JUNIO_P = 0 THEN
				CASE
					WHEN AC.JUNIO_E = 0 THEN
						100
					ELSE
						0
				END
			ELSE
				((CAST(AC.JUNIO_R AS DECIMAL)/CAST(AC.JUNIO_P AS DECIMAL))*100)
		END)/COUNT(*))+ (SUM(CASE 
			WHEN AC.JULIO_P = 0 THEN
				CASE
					WHEN AC.JULIO_E = 0 THEN
						100
					ELSE
						0
				END
			ELSE
				((CAST(AC.JULIO_R AS DECIMAL)/CAST(AC.JULIO_P AS DECIMAL))*100)
		END)/COUNT(*))+ (SUM(CASE 
			WHEN AC.AGOSTO_P = 0 THEN
				CASE
					WHEN AC.AGOSTO_E = 0 THEN
						100
					ELSE
						0
				END
			ELSE
				((CAST(AC.AGOSTO_R AS DECIMAL)/CAST(AC.AGOSTO_P AS DECIMAL))*100)
		END)/COUNT(*)) + (SUM(CASE 
			WHEN AC.SEPTIEMBRE_P = 0 THEN
				CASE
					WHEN AC.SEPTIEMBRE_E = 0 THEN
						100
					ELSE
						0
				END
			ELSE
				((CAST(AC.SEPTIEMBRE_R AS DECIMAL)/CAST(AC.SEPTIEMBRE_P AS DECIMAL))*100)
		END)/COUNT(*)) + (SUM(CASE 
			WHEN AC.OCTUBRE_P = 0 THEN
				CASE
					WHEN AC.OCTUBRE_E = 0 THEN
						100
					ELSE
						0
				END
			ELSE
				((CAST(AC.OCTUBRE_R AS DECIMAL)/CAST(AC.OCTUBRE_P AS DECIMAL))*100)
		END)/COUNT(*))+ (SUM(CASE 
			WHEN AC.NOVIEMBRE_P = 0 THEN
				CASE
					WHEN AC.NOVIEMBRE_E = 0 THEN
						100
					ELSE
						0
				END
			ELSE
				((CAST(AC.NOVIEMBRE_R AS DECIMAL)/CAST(AC.NOVIEMBRE_P AS DECIMAL))*100)
		END)/COUNT(*))+ (SUM(CASE 
			WHEN AC.DICIEMBRE_P = 0 THEN
				CASE
					WHEN AC.DICIEMBRE_E = 0 THEN
						100
					ELSE
						0
				END
			ELSE
				((CAST(AC.DICIEMBRE_R AS DECIMAL)/CAST(AC.DICIEMBRE_P AS DECIMAL))*100)
		END)/COUNT(*)))/12),0),2) AS 'PERCENT_TOTAL', PA.ID_PROGRAMA_ANUAL, PA.NOMBRE_PROGRAMA
	FROM TBL_ACTIVIDAD AC
		INNER JOIN TBL_PROGRAMA_ANUAL PA ON AC.ID_PROGRAMA_ANUAL=PA.ID_PROGRAMA_ANUAL
	GROUP BY PA.ID_PROGRAMA_ANUAL,PA.NOMBRE_PROGRAMA
GO
CREATE PROCEDURE sp_indicadores_by_programa_anual
	@ID_PROGRAMA   int = 0
AS
	DECLARE @ROW_COUNT INT
		SELECT @ROW_COUNT = COUNT(*)
		FROM TBL_ACTIVIDAD
		WHERE ID_PROGRAMA_ANUAL=@ID_PROGRAMA;
	SELECT
		(SUM(CASE 
			WHEN AC.ENERO_P = 0 THEN
				0
			ELSE
				((CAST(AC.ENERO_R AS DECIMAL)/CAST(AC.ENERO_P AS DECIMAL))*100)
		END)/@ROW_COUNT) AS 'ENERO', --Enero
		(SUM(CASE 
			WHEN AC.FEBRERO_P = 0 THEN
				0
			ELSE
				((CAST(AC.FEBRERO_R AS DECIMAL)/CAST(AC.FEBRERO_P AS DECIMAL))*100)
		END)/@ROW_COUNT) AS 'FEBRERO', --Febrero
		(SUM(CASE 
			WHEN AC.MARZO_P = 0 THEN
				0
			ELSE
				((CAST(AC.MARZO_R AS DECIMAL)/CAST(AC.MARZO_P AS DECIMAL))*100)
		END)/@ROW_COUNT) AS 'MARZO', --Marzo
		(SUM(CASE 
			WHEN AC.ABRIL_P = 0 THEN
				0
			ELSE
				((CAST(AC.ABRIL_R AS DECIMAL)/CAST(AC.ABRIL_P AS DECIMAL))*100)
		END)/@ROW_COUNT) AS 'ABRIL', --Abril
		(SUM(CASE 
			WHEN AC.MAYO_P = 0 THEN
				0
			ELSE
				((CAST(AC.MAYO_R AS DECIMAL)/CAST(AC.MAYO_P AS DECIMAL))*100)
		END)/@ROW_COUNT) AS 'MAYO', --Mayo
		(SUM(CASE 
			WHEN AC.JUNIO_P = 0 THEN
				0
			ELSE
				((CAST(AC.JUNIO_R AS DECIMAL)/CAST(AC.JUNIO_P AS DECIMAL))*100)
		END)/@ROW_COUNT) AS 'JUNIO', --Junio
		(SUM(CASE 
			WHEN AC.JULIO_P = 0 THEN
				0
			ELSE
				((CAST(AC.JULIO_R AS DECIMAL)/CAST(AC.JULIO_P AS DECIMAL))*100)
		END)/@ROW_COUNT) AS 'JULIO', --Julio
		(SUM(CASE 
			WHEN AC.AGOSTO_P = 0 THEN
				0
			ELSE
				((CAST(AC.AGOSTO_R AS DECIMAL)/CAST(AC.AGOSTO_P AS DECIMAL))*100)
		END)/@ROW_COUNT) AS 'AGOSTO', --Agosto
		(SUM(CASE 
			WHEN AC.SEPTIEMBRE_P = 0 THEN
				0
			ELSE
				((CAST(AC.SEPTIEMBRE_R AS DECIMAL)/CAST(AC.SEPTIEMBRE_P AS DECIMAL))*100)
		END)/@ROW_COUNT) AS 'SEPTIEMBRE', --Septiembre
		(SUM(CASE 
			WHEN AC.OCTUBRE_P = 0 THEN
				0
			ELSE
				((CAST(AC.OCTUBRE_R AS DECIMAL)/CAST(AC.OCTUBRE_P AS DECIMAL))*100)
		END)/@ROW_COUNT) AS 'OCTUBRE', --Octubre
		(SUM(CASE 
			WHEN AC.NOVIEMBRE_P = 0 THEN
				0
			ELSE
				((CAST(AC.NOVIEMBRE_R AS DECIMAL)/CAST(AC.NOVIEMBRE_P AS DECIMAL))*100)
		END)/@ROW_COUNT) AS 'NOVIEMBRE', --Noviembre
		(SUM(CASE 
			WHEN AC.DICIEMBRE_P = 0 THEN
				0
			ELSE
				((CAST(AC.DICIEMBRE_R AS DECIMAL)/CAST(AC.DICIEMBRE_P AS DECIMAL))*100)
		END)/@ROW_COUNT) AS 'DICIEMBRE' --Diciembre
	FROM TBL_ACTIVIDAD AC
		INNER JOIN TBL_PROGRAMA_ANUAL PA ON AC.ID_PROGRAMA_ANUAL=PA.ID_PROGRAMA_ANUAL
	WHERE PA.ID_PROGRAMA_ANUAL=@ID_PROGRAMA 
	GROUP BY PA.ID_PROGRAMA_ANUAL
GO
CREATE PROCEDURE sp_privilegios_user
	@ID_USUARIO VARCHAR(200)
AS
	SELECT	ND.ID_NODO,
		ND.NODO_PADRE,
		ND.NOMBRE_MODULO,
		GP.*
	FROM TBL_GRUPO_PRIVILEGIO GP
		INNER JOIN TBL_NODO ND ON GP.ID_NODO = ND.ID_NODO
	WHERE ((GP.ID_GRUPO IN (SELECT UG.ID_GRUPO 
								FROM TBL_USUARIO U
									INNER JOIN TBL_USUARIO_GRUPO UG ON U.ID_USUARIO=UG.ID_USUARIO  
								WHERE U.ID_USUARIO=@ID_USUARIO) OR GP.ID_GRUPO=1))
			AND GP.ALLOW_READ=1
	ORDER BY ND.NODO_PADRE, ND.ID_NODO,GROUP_ID,TIPO_DISPLAY ASC
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

CREATE TRIGGER TRIG_UPDATE_NODE ON TBL_GRUPO_PRIVILEGIO
AFTER INSERT, UPDATE
AS

	DECLARE @ID_NODO AS INT;
	DECLARE @ID_GRUPO AS INT;
	DECLARE @ALLOW_READ AS BIT;
	DECLARE @ALLOW_WRITE AS BIT;
	DECLARE @ALLOW_EDIT AS BIT;
	DECLARE @ALLOW_DELETE AS BIT;
	DECLARE @ALLOW_PRINT AS BIT;
	DECLARE @ALLOW_CRUD AS BIT;
	
	 SELECT @ID_NODO = ID_NODO,
			@ID_GRUPO = ID_GRUPO,
			@ALLOW_READ = ALLOW_READ,
			@ALLOW_WRITE = ALLOW_WRITE,
			@ALLOW_EDIT = ALLOW_EDIT,
			@ALLOW_DELETE = ALLOW_DELETE,
			@ALLOW_PRINT = ALLOW_PRINT,
			@ALLOW_CRUD = ALLOW_CRUD
			FROM inserted;
			
	INSERT INTO TBL_GRUPO_PRIVILEGIO(ID_NODO,ID_GRUPO,ALLOW_READ,ALLOW_WRITE,ALLOW_EDIT,ALLOW_DELETE,ALLOW_PRINT,ALLOW_CRUD,ESTADO)
	SELECT ND.ID_NODO , 
			@ID_GRUPO, 
			@ALLOW_READ,
			@ALLOW_WRITE,
			@ALLOW_EDIT,
			@ALLOW_DELETE,
			@ALLOW_PRINT,
			@ALLOW_CRUD,
			1
		FROM fn_recursive_node() G
			INNER JOIN TBL_NODO ND ON G.ID_NODO=ND.ID_NODO
		where nd.NODO_PADRE=@ID_NODO AND NOT EXISTS (SELECT * FROM TBL_GRUPO_PRIVILEGIO GP
              WHERE ND.ID_NODO = GP.ID_NODO AND GP.ID_GRUPO = @ID_GRUPO)
	/*SELECT ND.ID_NODO , @ID_GRUPO, @ALLOW_READ,
			@ALLOW_WRITE,
			@ALLOW_EDIT,
			@ALLOW_DELETE,
			@ALLOW_PRINT,
			@ALLOW_CRUD,
			1
		FROM fn_recursive_node() G
			INNER JOIN TBL_NODO ND ON G.ID_NODO=ND.NODO_PADRE
	WHERE G.ID_NODO=@ID_NODO AND NOT EXISTS (SELECT * FROM TBL_NODO N
              WHERE ND.ID_NODO = N.ID_NODO)
	*/
	 UPDATE TBL_GRUPO_PRIVILEGIO
		SET ALLOW_READ = @ALLOW_READ,
			ALLOW_WRITE = @ALLOW_WRITE,
			ALLOW_EDIT = @ALLOW_EDIT,
			ALLOW_DELETE = @ALLOW_DELETE,
			ALLOW_PRINT = @ALLOW_PRINT,
			ALLOW_CRUD = @ALLOW_CRUD
	 WHERE ID_NODO IN (SELECT ND.ID_NODO 
							FROM fn_recursive_node() G
								INNER JOIN TBL_NODO ND ON G.ID_NODO=ND.NODO_PADRE 
						WHERE G.ID_NODO=@ID_NODO) AND ID_GRUPO=@ID_GRUPO;
GO


CREATE TRIGGER TRIG_ADD_NODE
ON TBL_NODO
AFTER INSERT
AS
	DECLARE @NODO_PADRE AS INT
	DECLARE @ID_NODO AS INT
	SELECT 	@NODO_PADRE = NODO_PADRE,
			@ID_NODO = ID_NODO
	FROM INSERTED;
	INSERT INTO TBL_GRUPO_PRIVILEGIO(ID_GRUPO,ID_NODO,ESTADO,ALLOW_READ,ALLOW_WRITE,ALLOW_EDIT,ALLOW_DELETE,ALLOW_PRINT,ALLOW_CRUD) 
		SELECT ID_GRUPO,@ID_NODO,ESTADO,ALLOW_READ,ALLOW_WRITE,ALLOW_EDIT,ALLOW_DELETE,ALLOW_PRINT,ALLOW_CRUD
		FROM TBL_GRUPO_PRIVILEGIO
		WHERE ID_NODO = @NODO_PADRE
GO


CREATE TRIGGER TRIG_INSERT_USUARIO ON TBL_USUARIO
AFTER INSERT
AS

	DECLARE @ID_USUARIO AS VARCHAR(200);
	SELECT @ID_USUARIO = ID_USUARIO
    FROM inserted;
    -- Usuario Normal
	--INSERT INTO TBL_USUARIO_GRUPO(ID_GRUPO,ID_USUARIO,GRUPO_ADMIN) VALUES(3,@ID_USUARIO,0);
go


CREATE TRIGGER TRIG_INSERT_USUARIO_BEFORE ON TBL_USUARIO
INSTEAD OF INSERT
AS
	INSERT INTO TBL_USUARIO(ID_USUARIO,
            RUT_TRABAJADOR,
            NOMBRES,
            APELLIDO_PATERNO,
            APELLIDO_MATERNO,
            ESTADO,
            EMAIL,
            PASSWORD)
       SELECT ID_USUARIO,
            RUT_TRABAJADOR,
            NOMBRES,
            APELLIDO_PATERNO,
            APELLIDO_MATERNO,
            ESTADO,
            EMAIL,
            SUBSTRING(sys.fn_sqlvarbasetostr(HASHBYTES('MD5', PASSWORD)),3,32)
       FROM inserted;
go
CREATE PROCEDURE sp_search_point
	@PointLat decimal(10, 7),
	@PointLng decimal(10, 7),
	@intRadius decimal(10, 7)
AS
	DECLARE @intMilesModifier int;
	SET @intMilesModifier = 6371;

	SELECT  E.ID_EVENTO,
			E.LAT_EVENTO,
			E.LNG_EVENTO,
			E.LUGAR_EXACTO,
			E.DESCRIPCION_GENERAL,
			CONVERT(VARCHAR(5),E.FECHA_HORA_EVENTO,108) AS 'HORA_EVENTO',
			CONVERT(VARCHAR(8),E.FECHA_HORA_EVENTO,101) AS 'FECHA_HORA_EVENTO',
			E.ID_DEPARTAMENTO_ORGANIZACION,
			D.NOMBRE_DEPARTAMENTO,
		  (@intMilesModifier*acos(cos(radians(@PointLat))*cos(radians(LAT_EVENTO))*cos(radians(LNG_EVENTO)-
		   radians(@PointLng))+sin(radians(@PointLat))*sin(radians(LAT_EVENTO)))) AS 'DISTANCE'
	FROM TBL_EVENTO E
			INNER JOIN TBL_DEPARTAMENTO_ORGANIZACION DO ON E.ID_DEPARTAMENTO_ORGANIZACION = DO.ID_DEPARTAMENTO_ORGANIZACION
			INNER JOIN TBL_DEPARTAMENTO D ON DO.ID_DEPARTAMENTO=D.ID_DEPARTAMENTO
	WHERE (@intMilesModifier*acos(cos(radians(@PointLat))*cos(radians(E.LAT_EVENTO))*cos(radians(E.LNG_EVENTO)-
		   radians(@PointLng))+sin(radians(@PointLat))*sin(radians(E.LAT_EVENTO)))) < @intRadius
	ORDER BY E.ID_EVENTO DESC;
GO




























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
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. De Personal.');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. Desarrollo Organizacional.');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. Gestión Medio Ambiente y Calidad.');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. Prevención de Riesgos.');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. Control de Calidad.');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. Confiabilidad Operacional.');																																																					
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. de Producción.');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. de Almac. y Terminales.');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. Mantención.');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. Ingeniería de Plantas.');
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Depto. Ingeniería y Const. Biobío.');																																																																																						
Insert into TBL_DEPARTAMENTO (nombre_departamento) values('Dirección General de Proyectos.');
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
GO






/*
	TBL_CONSECUENCIA
*/
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Desmembramiento, traumatismo');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Contusiones, heridas, politraumatismo');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Contusiones, heridas, traumatismo');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesiones, enfermedad, compromiso vital');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesiones, Compromiso Vital');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Shock eléctrico, muerte');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Quemaduras, lesiones a la piel');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Cortes, magulladuras');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Cortes, heridas profundas');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Erosiones a la piel, quemaduras, irritación');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Politraumatismo, asfixia, muerte');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesiones a la piel');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesiones a la piel, deshidratación');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Hipotermia');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Irritación a las vías respiratorias altas, intoxicación aguda, asfixia');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Irritación, lesiones pulmonares');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Irritación a las vías respiratorias altas, intoxicación aguda');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesiones pulmonares');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesiones vasculares');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesiones al oído');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('trastornos músculo esqueléticos');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Quemaduras, asfixia, muerte');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesión pulmonar, muerte');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Lesión aguda al sistema digestivo');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Trastorno músculo esquelético');
Insert into TBL_CONSECUENCIA (nombre_consecuencia) values('Trastorno Psíquico');
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

Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro) values('1: Atrapamiento entre objetos en movimiento o fijo y movimiento',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro) values('2: Atrapamiento por Objeto fijo o en movimiento',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('3: Atropello',1);
Insert into TBL_PELIGRO (Nom_Peligro ,tipo_peligro) values('4: Caída a diferente Nivel',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('5: Caída al mismo nivel ',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('6: Causado por animal o insecto',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('7: Causado por terceras personas',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('8:  Choque contra elementos móviles',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('9:  Choque contra objetos o estructura fija',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('10: Choque por otro vehículo',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('11: Contacto con electricidad',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('12:  Contacto con fuego',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('13:  Contacto con Objetos Calientes',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('14:  Contacto con Objetos Cortantes',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('15:  Contacto con Objetos Punzantes',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('16:  Contacto con sustancias químicas',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('17:  Explosión',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('18:  Exposición  a radiaciones ultravioletas',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('19:  Exposición a agentes biológicos (bacterias, hongos, etc.)',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('20:  Exposición a calor',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('21:  Exposición a frío',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('22:  Exposición a gases',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('23:  Exposición a humos metálicos',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('24:  Exposición a nieblas',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('25:  Exposición a Polvo',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('26:  Exposición a presiones anormales',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('27:  Exposición a radiaciones infrarrojas',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('28:  Exposición a radiaciones íonizantes',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('29:  Exposición a rocíos',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('30:  Exposición a ruido',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('31:  Exposición a vapores',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('32:  Exposición a vibraciones',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('33:  Golpeado con objeto o herramienta',1);
Insert into TBL_PELIGRO (Nom_Peligro ,tipo_peligro) values('34:  Golpeado contra objetos o equipos',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('35:  Golpeado por Objeto',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('36:  Incendio',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('37:  Inmersión',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('38:  Intoxicación por alimentos',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('39:  Sobre carga física',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('40:  Sobre tensión mental y psicológica',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('41:  Sobreesfuerzo por movimiento repetitivo',1);
Insert into TBL_PELIGRO (Nom_Peligro,tipo_peligro ) values('42:  Sobreesfuerzo por manejo manual de materiales',1);
GO

insert into TBL_PELIGRO values ('Incendio', 2);
insert into TBL_PELIGRO values ('Derrame', 2);
insert into TBL_PELIGRO values ('Fuga', 2);
insert into TBL_PELIGRO values ('Filtración', 2);
insert into TBL_PELIGRO values ('Pérdida de Energía', 2);
insert into TBL_PELIGRO values ('Reactividad Química', 2);
insert into TBL_PELIGRO values ('Explosión', 2);
insert into TBL_PELIGRO values ('Rotura', 2);
insert into TBL_PELIGRO values ('Contaminación producto', 2);
insert into TBL_PELIGRO values ('Contaminación ambiental', 2);
insert into TBL_PELIGRO values ('Emisiones', 2);
insert into TBL_PELIGRO values ('Corto circuito', 2);
insert into TBL_PELIGRO values ('Atentado', 2);
insert into TBL_PELIGRO values ('Volcamiento/Choque', 2);
insert into TBL_PELIGRO values ('Evento Natural', 2);
insert into TBL_PELIGRO values ('Falla sistema control', 2);
insert into TBL_PELIGRO values ('Desgaste o corrosión acelerada', 2);
insert into TBL_PELIGRO values ('Sobre presión en equipo o sistema', 2) ;
insert into TBL_PELIGRO values ('Sobre temperatura en el equipo sistema', 2);
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



/* DATOS DE PERSONA */
INSERT INTO TBL_DATO_EVENTO VALUES('Choque contra objetos o estructura fija',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Choque por otro vehículo',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Contacto con electricidad',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Contacto con fuego',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Contacto con Objetos Calientes',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Contacto con Objetos Cortantes',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Contacto con Objetos Punzantes',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Contacto con sustancias químicas',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Explosión',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposición a radiaciones ultravioletas',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposición a agentes biológicos (bacterias, hongos, etc.)',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposición a calor',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposición a frío',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposición a gases',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposición a humos metálicos',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposición a nieblas',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposición a Polvo',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposición a presiones anormales',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposición a radiaciones infrarrojas',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposición a radiaciones ionizantes',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposición a rocíos',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposición a ruido',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposición a vapores',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Exposición a vibraciones',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Golpeado con objeto o herramienta',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Golpeado contra objetos o equipos',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Golpeado por objeto',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Incendio',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Inmersión',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Intoxicación por alimentos',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Sobre carga física',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Sobre tensión mental y psicológica',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Sobreesfuerzo por movimiento repetitivo',1);
INSERT INTO TBL_DATO_EVENTO VALUES('Sobreesfuerzo por manejo manual de materiales',1);


/* DATOS DE PATRIMONIO, PROCESOS, MEDIO AMBIENTE */
INSERT INTO TBL_DATO_EVENTO VALUES('Incendio',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Derrame',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Fuga',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Filtración',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Pérdida de Energía',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Reactividad Química',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Explosión',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Rotura',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Contaminación producto',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Contaminación ambiental',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Emisiones',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Corto circuito',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Atentado',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Volcamiento/Choque',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Evento Natural',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Falla sistema control',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Desgaste o corrosión acelerada',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Sobre presión en equipo o sistema',2);
INSERT INTO TBL_DATO_EVENTO VALUES('Sobre temperatura en el equipo sistema',2);
GO

SET IDENTITY_INSERT TBL_STORE ON
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(1,'dsAccion');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(2,'dsAccionCorrectiva');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(3,'dsActividadEspecifica');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(4,'dsActividadEspecificaMatriz');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(5,'dsActividadEvaluada');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(6,'dsActividadGeneral');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(7,'dsActividadProgramaAnualPrevencion');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(8,'dsActividadResponsable');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(9,'dsActividadTrabajador');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(10,'dsArchivo');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(11,'dsArea');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(12,'dsAreaGeografica');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(13,'dsBuscaMatriz');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(14,'dsCalificacion');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(15,'dsCargo');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(16,'dsCausa');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(17,'dsCondicion');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(18,'dsConsecuencia');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(19,'dsConsecuencias');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(20,'dsdatoEvento');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(21,'dsDepartamento');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(22,'dsDepartamentoOrganizacion');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(23,'dsDivision');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(24,'dse0063');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(25,'dse0064');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(26,'dsEmpresa');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(27,'dsEvaluacionMensual');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(28,'dsEvento');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(29,'dsEventoCalificacion');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(30,'dsEventoEmpresa');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(31,'dsEventoTrabajador');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(32,'dsEvidencia');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(33,'dsFrecuencia');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(34,'dsGrupo');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(35,'dsHerramientaPreventiva');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(36,'dsHistorialEmpresa');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(37,'dshistorialInforme');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(38,'dsImagenes');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(39,'dsInvestigacionAccionCorrectiva');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(40,'dsMatriz');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(41,'dsmatrizHistorial');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(42,'dsMatrizRiesgo');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(43,'dsMatrizRiesgoIdentificado');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(44,'dsMedidaDeControl');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(45,'dsMedidasDeControl');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(46,'dsModulo');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(47,'dsOrganizacion');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(48,'dsParteCorporal');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(49,'dsPeligro');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(50,'dsPeligroDetalle');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(51,'dsPeligroMedida');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(52,'dsPrivilegio');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(53,'dsProgramaActividad');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(54,'dsProgramaAnual');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(55,'dsPuntoGeografico');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(56,'dsRecursoComprometido');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(57,'dsRol');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(58,'dsSubActividad');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(59,'dsTempActividadEvaluada');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(60,'dsTrabajador');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(61,'dsUsuario');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(62,'dsValoracionConsecuencia');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(63,'dsValoracionProbabilidad');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(64,'dsStores');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(65,'dsNodes');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(66,'dsNode');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(67,'dsGrupoPrivilegio');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(68,'dsHerramienta');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(69,'dsGraphAvanceProgramaAnual');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(70,'dsMeses');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(71,'dsSearchMarker');
INSERT INTO TBL_STORE(ID_STORE,NOMBRE_STORE) VALUES(72,'dsGraphEventosOrganizacion');
GO

INSERT INTO TBL_EMPRESA(NOMBRE_EMPRESA,DIRECCION_EMPRESA,FONO_EMPRESA,EMAIL_EMPRESA,NOMBRE_CONTRATO) 
	VALUES('ENAP Refinería Bio Bio','Camino a Lenga 2001',NULL,NULL,NULL);
/* 
	MODULOS
*/
SET IDENTITY_INSERT TBL_STORE OFF
GO
SET IDENTITY_INSERT TBL_GRUPO ON
INSERT INTO TBL_GRUPO(ID_GRUPO,NOMBRE_GRUPO,DESCRIPCION_GRUPO) VALUES(1,'Invitado','Grupo que tiene acceso limitado');
INSERT INTO TBL_GRUPO(ID_GRUPO,NOMBRE_GRUPO,DESCRIPCION_GRUPO) VALUES(2,'Administrador','Grupo que tiene acceso Total');
INSERT INTO TBL_GRUPO(ID_GRUPO,NOMBRE_GRUPO,DESCRIPCION_GRUPO) VALUES(3,'Usuario Normal','Grupo al que pertenecen todos los usuarios registrados');
SET IDENTITY_INSERT TBL_GRUPO OFF
GO

INSERT INTO TBL_USUARIO(ID_USUARIO,NOMBRES,ESTADO,PASSWORD)  VALUES('admin','Administrador',1,'admin');
INSERT INTO TBL_USUARIO_GRUPO(ID_GRUPO,ID_USUARIO,GRUPO_ADMIN) VALUES(2,'admin',1);
GO
SET IDENTITY_INSERT TBL_NODO ON
GO
INSERT INTO TBL_NODO(ID_NODO,NODO_PADRE,NOMBRE_MODULO,ID_COMPONENTE,ESTADO,TIPO_NODO,ICONCLS,N_ORDER,TIPO_DISPLAY,GROUP_ID,SHOW_ON_LOGUED,SHOW_ON_NOLOGUED) VALUES(1,NULL,'.',null,1,1,NULL,1,3,NULL,1,1);
INSERT INTO TBL_GRUPO_PRIVILEGIO(ID_NODO,ID_GRUPO,ALLOW_READ,ALLOW_WRITE,ALLOW_EDIT,ALLOW_DELETE,ALLOW_PRINT,ALLOW_CRUD,ESTADO)
	VALUES(1,1,1,1,0,0,0,0,1) -- Lectura Nodo Padre
	INSERT INTO TBL_NODO(ID_NODO,NODO_PADRE,NOMBRE_MODULO,ID_COMPONENTE,ESTADO,TIPO_NODO,ICONCLS,N_ORDER,TIPO_DISPLAY,GROUP_ID,SHOW_ON_LOGUED,SHOW_ON_NOLOGUED) VALUES(2,1,'Administración',NULL,1,1,'administracion-icon',5,3,NULL,1,0);
		INSERT INTO TBL_NODO(ID_NODO,NODO_PADRE,NOMBRE_MODULO,ID_COMPONENTE,ESTADO,TIPO_NODO,ICONCLS,N_ORDER,TIPO_DISPLAY,GROUP_ID,SHOW_ON_LOGUED,SHOW_ON_NOLOGUED) VALUES(3,2,'Menu Generador','MenuGenerator',1,2,'generator-editor-icon',1,1,NULL,1,0);
		INSERT INTO TBL_NODO(ID_NODO,NODO_PADRE,NOMBRE_MODULO,ID_COMPONENTE,ESTADO,TIPO_NODO,ICONCLS,N_ORDER,TIPO_DISPLAY,GROUP_ID,SHOW_ON_LOGUED,SHOW_ON_NOLOGUED) VALUES(4,2,'Grupos','Grupo',1,2,'grupo-icon',2,1,NULL,1,0);
		INSERT INTO TBL_NODO(ID_NODO,NODO_PADRE,NOMBRE_MODULO,ID_COMPONENTE,ESTADO,TIPO_NODO,ICONCLS,N_ORDER,TIPO_DISPLAY,GROUP_ID,SHOW_ON_LOGUED,SHOW_ON_NOLOGUED) VALUES(5,2,'Usuarios','Usuario',1,2,'user-icon',3,1,NULL,1,0);
	INSERT INTO TBL_NODO(ID_NODO,NODO_PADRE,NOMBRE_MODULO,ID_COMPONENTE,ESTADO,TIPO_NODO,ICONCLS,N_ORDER,TIPO_DISPLAY,GROUP_ID,SHOW_ON_LOGUED,SHOW_ON_NOLOGUED) VALUES(6,1,'Eventos',NULL,1,1,'evento-icon',1,1,NULL,1,0);
		INSERT INTO TBL_NODO(ID_NODO,NODO_PADRE,NOMBRE_MODULO,ID_COMPONENTE,ESTADO,TIPO_NODO,ICONCLS,N_ORDER,TIPO_DISPLAY,GROUP_ID,SHOW_ON_LOGUED,SHOW_ON_NOLOGUED) 
		VALUES(7, /* ID_NODO */
			6, /* NODO_PADRE */
			'Lista Eventos', /* NOMBRE_MODULO */
			'EventoList', /* ID_COMPONENTE */
			1, /* ESTADO */
			2, /* TIPO_NODO */
			'generator-editor-icon', /* ICONCLS */
			1, /* N_ORDER */
			1, /* TIPO_DISPLAY */
			NULL, /* GROUP_ID */
			1, /* SHOW_ON_LOGUED */
			0 /* SHOW_ON_NOLOGUED */
		);
		INSERT INTO TBL_NODO(ID_NODO,NODO_PADRE,NOMBRE_MODULO,ID_COMPONENTE,ESTADO,TIPO_NODO,ICONCLS,N_ORDER,TIPO_DISPLAY,GROUP_ID,SHOW_ON_LOGUED,SHOW_ON_NOLOGUED) 
		VALUES(8, /* ID_NODO */
			6, /* NODO_PADRE */
			'Ingreso de Evento', /* NOMBRE_MODULO */
			'e0063', /* ID_COMPONENTE */
			1, /* ESTADO */
			2, /* TIPO_NODO */
			'add-evento-icon', /* ICONCLS */
			2, /* N_ORDER */
			1, /* TIPO_DISPLAY */
			NULL, /* GROUP_ID */
			1, /* SHOW_ON_LOGUED */
			0 /* SHOW_ON_NOLOGUED */
		);
		INSERT INTO TBL_NODO(ID_NODO,NODO_PADRE,NOMBRE_MODULO,ID_COMPONENTE,ESTADO,TIPO_NODO,ICONCLS,N_ORDER,TIPO_DISPLAY,GROUP_ID,SHOW_ON_LOGUED,SHOW_ON_NOLOGUED) 
		VALUES(9, /* ID_NODO */
			6, /* NODO_PADRE */
			'Seguimiento', /* NOMBRE_MODULO */
			'SeguimientoEvento', /* ID_COMPONENTE */
			1, /* ESTADO */
			2, /* TIPO_NODO */
			'seguimiento-icon', /* ICONCLS */
			3, /* N_ORDER */
			1, /* TIPO_DISPLAY */
			NULL, /* GROUP_ID */
			1, /* SHOW_ON_LOGUED */
			0 /* SHOW_ON_NOLOGUED */
		);
		INSERT INTO TBL_NODO(ID_NODO,NODO_PADRE,NOMBRE_MODULO,ID_COMPONENTE,ESTADO,TIPO_NODO,ICONCLS,N_ORDER,TIPO_DISPLAY,GROUP_ID,SHOW_ON_LOGUED,SHOW_ON_NOLOGUED) 
		VALUES(10, /* ID_NODO */
			6, /* NODO_PADRE */
			'Busqueda', /* NOMBRE_MODULO */
			'BusquedaEvento', /* ID_COMPONENTE */
			1, /* ESTADO */
			2, /* TIPO_NODO */
			'buscar-icon', /* ICONCLS */
			4, /* N_ORDER */
			1, /* TIPO_DISPLAY */
			NULL, /* GROUP_ID */
			1, /* SHOW_ON_LOGUED */
			0 /* SHOW_ON_NOLOGUED */
		);
	INSERT INTO TBL_NODO(ID_NODO,NODO_PADRE,NOMBRE_MODULO,ID_COMPONENTE,ESTADO,TIPO_NODO,ICONCLS,N_ORDER,TIPO_DISPLAY,GROUP_ID,SHOW_ON_LOGUED,SHOW_ON_NOLOGUED) VALUES(11,1,'Programa Anual',NULL,1,1,'programa-icon',2,1,NULL,1,0);
		INSERT INTO TBL_NODO(ID_NODO,NODO_PADRE,NOMBRE_MODULO,ID_COMPONENTE,ESTADO,TIPO_NODO,ICONCLS,N_ORDER,TIPO_DISPLAY,GROUP_ID,SHOW_ON_LOGUED,SHOW_ON_NOLOGUED) 
		VALUES(12, /* ID_NODO */
			11, /* NODO_PADRE */
			'Listado de Programas', /* NOMBRE_MODULO */
			'ProgramaAnual', /* ID_COMPONENTE */
			1, /* ESTADO */
			2, /* TIPO_NODO */
			'add-programaanual-icon', /* ICONCLS */
			1, /* N_ORDER */
			1, /* TIPO_DISPLAY */
			NULL, /* GROUP_ID */
			1, /* SHOW_ON_LOGUED */
			0 /* SHOW_ON_NOLOGUED */
		);
		INSERT INTO TBL_NODO(ID_NODO,NODO_PADRE,NOMBRE_MODULO,ID_COMPONENTE,ESTADO,TIPO_NODO,ICONCLS,N_ORDER,TIPO_DISPLAY,GROUP_ID,SHOW_ON_LOGUED,SHOW_ON_NOLOGUED) 
		VALUES(13, /* ID_NODO */
			11, /* NODO_PADRE */
			'Busca Programa Anual', /* NOMBRE_MODULO */
			'BuscaProgramaAnual', /* ID_COMPONENTE */
			1, /* ESTADO */
			2, /* TIPO_NODO */
			'buscar-icon', /* ICONCLS */
			1, /* N_ORDER */
			1, /* TIPO_DISPLAY */
			NULL, /* GROUP_ID */
			1, /* SHOW_ON_LOGUED */
			0 /* SHOW_ON_NOLOGUED */
		);
	INSERT INTO TBL_NODO(ID_NODO,NODO_PADRE,NOMBRE_MODULO,ID_COMPONENTE,ESTADO,TIPO_NODO,ICONCLS,N_ORDER,TIPO_DISPLAY,GROUP_ID,SHOW_ON_LOGUED,SHOW_ON_NOLOGUED) VALUES(14,1,'Reportes',NULL,1,1,'reportes-icon',3,1,NULL,1,0);
	
	INSERT INTO TBL_NODO(ID_NODO,NODO_PADRE,NOMBRE_MODULO,ID_COMPONENTE,ESTADO,TIPO_NODO,ICONCLS,N_ORDER,TIPO_DISPLAY,GROUP_ID,SHOW_ON_LOGUED,SHOW_ON_NOLOGUED) VALUES(15,1,'Matriz de Riesgo',NULL,1,1,'matriz-icon',4,1,NULL,1,0);
		INSERT INTO TBL_NODO(ID_NODO,NODO_PADRE,NOMBRE_MODULO,ID_COMPONENTE,ESTADO,TIPO_NODO,ICONCLS,N_ORDER,TIPO_DISPLAY,GROUP_ID,SHOW_ON_LOGUED,SHOW_ON_NOLOGUED) 
		VALUES(16, /* ID_NODO */
			15, /* NODO_PADRE */
			'Crear Matriz de Riesgo', /* NOMBRE_MODULO */
			'EvaluaActividadEspecifica', /* ID_COMPONENTE */
			1, /* ESTADO */
			2, /* TIPO_NODO */
			'add-matriz-icon', /* ICONCLS */
			1, /* N_ORDER */
			1, /* TIPO_DISPLAY */
			NULL, /* GROUP_ID */
			1, /* SHOW_ON_LOGUED */
			0 /* SHOW_ON_NOLOGUED */
		);
		INSERT INTO TBL_NODO(ID_NODO,NODO_PADRE,NOMBRE_MODULO,ID_COMPONENTE,ESTADO,TIPO_NODO,ICONCLS,N_ORDER,TIPO_DISPLAY,GROUP_ID,SHOW_ON_LOGUED,SHOW_ON_NOLOGUED) 
		VALUES(17, /* ID_NODO */
			15, /* NODO_PADRE */
			'Busca Matriz de Riesgo', /* NOMBRE_MODULO */
			'BuscaMatrizRiesgo', /* ID_COMPONENTE */
			1, /* ESTADO */
			2, /* TIPO_NODO */
			'buscar-icon', /* ICONCLS */
			1, /* N_ORDER */
			1, /* TIPO_DISPLAY */
			NULL, /* GROUP_ID */
			1, /* SHOW_ON_LOGUED */
			0 /* SHOW_ON_NOLOGUED */
		);
UPDATE TBL_GRUPO_PRIVILEGIO SET ALLOW_READ=0,ALLOW_WRITE=0,ALLOW_EDIT=0,ALLOW_DELETE=0,ALLOW_PRINT=0,ALLOW_CRUD=0 WHERE ID_NODO=2 AND ID_GRUPO=1; -- NO ACCESO Administración
UPDATE TBL_GRUPO_PRIVILEGIO SET ALLOW_READ=0,ALLOW_WRITE=0,ALLOW_EDIT=0,ALLOW_DELETE=0,ALLOW_PRINT=0,ALLOW_CRUD=0 WHERE ID_NODO=6 AND ID_GRUPO=1; -- NO ACCESO Eventos
UPDATE TBL_GRUPO_PRIVILEGIO SET ALLOW_READ=0,ALLOW_WRITE=0,ALLOW_EDIT=0,ALLOW_DELETE=0,ALLOW_PRINT=0, ALLOW_CRUD=0 WHERE ID_NODO=11 AND ID_GRUPO=1; -- NO ACCESO Programa Anual
UPDATE TBL_GRUPO_PRIVILEGIO SET ALLOW_READ=0,ALLOW_WRITE=0,ALLOW_EDIT=0,ALLOW_DELETE=0,ALLOW_PRINT=0, ALLOW_CRUD=0 WHERE ID_NODO=14 AND ID_GRUPO=1; -- NO ACCESO Reportes
	
	INSERT INTO TBL_NODO(ID_NODO,NODO_PADRE,NOMBRE_MODULO,ID_COMPONENTE,ESTADO,TIPO_NODO,ICONCLS,N_ORDER,TIPO_DISPLAY,GROUP_ID,SHOW_ON_LOGUED,SHOW_ON_NOLOGUED) VALUES(18,1,'Login','Login',1,2,'login-icon',6,2,1,0,1);
	INSERT INTO TBL_NODO(ID_NODO,NODO_PADRE,NOMBRE_MODULO,ID_COMPONENTE,ESTADO,TIPO_NODO,ICONCLS,N_ORDER,TIPO_DISPLAY,GROUP_ID,SHOW_ON_LOGUED,SHOW_ON_NOLOGUED) VALUES(19,1,'Logout','Logout',1,2,'logout-icon',7,3,1,1,0);
	
	INSERT INTO TBL_GRUPO_PRIVILEGIO(ID_NODO,ID_GRUPO,ALLOW_READ,ALLOW_WRITE,ALLOW_EDIT,ALLOW_DELETE,ALLOW_PRINT,ALLOW_CRUD,ESTADO)
	VALUES(2,2,1,1,1,1,1,1,1) -- ADMIN -> ACCESO ADMINISTRACIÓN
	INSERT INTO TBL_GRUPO_PRIVILEGIO(ID_NODO,ID_GRUPO,ALLOW_READ,ALLOW_WRITE,ALLOW_EDIT,ALLOW_DELETE,ALLOW_PRINT,ALLOW_CRUD,ESTADO)
	VALUES(6,2,1,1,1,1,1,1,1) -- ADMIN -> ACCESO nodos de Eventos
	INSERT INTO TBL_GRUPO_PRIVILEGIO(ID_NODO,ID_GRUPO,ALLOW_READ,ALLOW_WRITE,ALLOW_EDIT,ALLOW_DELETE,ALLOW_PRINT,ALLOW_CRUD,ESTADO)
	VALUES(11,2,1,1,1,1,1,1,1) -- ADMIN -> ACCESO nodos de Programa Anual
	INSERT INTO TBL_GRUPO_PRIVILEGIO(ID_NODO,ID_GRUPO,ALLOW_READ,ALLOW_WRITE,ALLOW_EDIT,ALLOW_DELETE,ALLOW_PRINT,ALLOW_CRUD,ESTADO)
	VALUES(14,2,1,1,1,1,1,1,1) -- ADMIN -> ACCESO nodos de Reportes
GO
SET IDENTITY_INSERT TBL_NODO OFF
GO
--EVENTOS
	-- Lista Eventos
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(28,7);
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(71,7);
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(72,7);
	-- Agrega Evento
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(24,8);	--dse0063
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(26,8);	--dsEmpresa
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(49,8);	--dsPeligro
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(15,8);	--dsCargo
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(10,8);	--dsEventoEmpresa
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(47,8);	--dsOrganizacion
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(21,8);	--dsDepartamento
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(23,8);	--dsDivision
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(11,8);	--dsArea
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(60,8);	--dsTrabajador
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(34,8);	--dsGrupo
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(28,8);	--dsEvento
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(16,8);	--dsCausa
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(30,8);	--dsEventoEmpresa
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(44,8);	--dsMedidaDeControl
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(51,8);	--dsPeligroMedida
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(1,8);	--dsAccion
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(2,8);	--dsAccionCorrectiva
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(68,8);	--dsHerramienta
--PROGRAMA ANUAL
	--	Crea Programa 
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(54,12); --dsProgramaAnual
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(47,12); --dsOrganizacion
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(21,12); --dsOrganizacion
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(23,12); --dsDivision
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(15,12); --dsCargo
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(33,12); --dsFrecuencia
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(32,12); --dsEvidencia
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(7,12); --dsActividadProgramaAnualPrevencion
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(69,12); --dsGraphAvanceProgramaAnual
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(70,12); --dsMeses
--REPORTES

--MATRIZ DE RIESGO
	-- Crea Matriz de Riesgo
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(47,16); --dsOrganizacion
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(21,16); --dsDepartamento
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(23,16); --dsDivision
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(11,16); --dsArea
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(6,16); --dsActividadGeneral
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(15,16); --dsCargo
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(3,16); --dsActividadEspecifica
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(49,16); --dsPeligro
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(51,16); --dsPeligroMedida
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(44,16); --dsMedidaDeControl
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(59,16); --dsTempActividadEvaluada
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(5,16); --dsActividadEvaluada
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(42,16); --dsMatrizRiesgo
	-- Busca Matriz
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(42,17); --dsMatrizRiesgo
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(47,17); --dsOrganizacion
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(21,17); --dsDepartamento
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(23,17); --dsDivision
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(11,17); --dsArea
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(49,17); --dsPeligro
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(6,17); --dsActividadGeneral
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(15,17); --dsCargo
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(5,17); --dsActividadEvaluada
--ADMINISTRACIÓN
	-- Menu generador
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(64,3);
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(65,3);
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(66,3);
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(34,3);
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(67,3);
	-- Grupos
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(64,4);
	-- Usuarios
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(26,5);
	INSERT INTO TBL_MODULO_STORE (ID_STORE,ID_NODO)
		VALUES(61,5);

GO
SET IDENTITY_INSERT TBL_STORE OFF
GO

INSERT INTO TBL_CAUSA VALUES ('Desatención en zonas de tránsito', 2);
INSERT INTO TBL_CAUSA VALUES ('Errores en conducción de vehículo', 2);
INSERT INTO TBL_CAUSA VALUES ('Uso indebido de mano u otras partes del cuerpo', 2);
INSERT INTO TBL_CAUSA VALUES ('Operar o trabajar a velocidad insegura', 2);
INSERT INTO TBL_CAUSA VALUES ('No analizar el riesgo', 2);
INSERT INTO TBL_CAUSA VALUES ('Transgredir  un Estándar / Procedimiento', 2);
INSERT INTO TBL_CAUSA VALUES ('Operar equipos sin autorización', 2);
INSERT INTO TBL_CAUSA VALUES ('No señalar o advertir', 2);
INSERT INTO TBL_CAUSA VALUES ('Falla en asegurar adecuadamente', 2);
INSERT INTO TBL_CAUSA VALUES ('Operar a velocidad inadecuada', 2);
INSERT INTO TBL_CAUSA VALUES ('Dejar fuera de servicio los dispositivos de seguridad', 2);
INSERT INTO TBL_CAUSA VALUES ('Eliminar o retirar los dispositivos de seguridad', 2);
INSERT INTO TBL_CAUSA VALUES ('Usar equipo defectuoso', 2);
INSERT INTO TBL_CAUSA VALUES ('Usar los equipos de manera incorrecta', 2);
INSERT INTO TBL_CAUSA VALUES ('Emplear en forma inadecuada o no usar el equipo de protección personal', 2);
INSERT INTO TBL_CAUSA VALUES ('Instalar carga de manera incorrecta', 2);
INSERT INTO TBL_CAUSA VALUES ('Almacenar de manera incorrecta', 2);
INSERT INTO TBL_CAUSA VALUES ('Levantar objetos en forma incorrecta', 2);
INSERT INTO TBL_CAUSA VALUES ('Adoptar una posición inadecuada para hacer la tarea', 2);
INSERT INTO TBL_CAUSA VALUES ('Realizar mantenimiento de los equipos mientras se encuentran operando', 2);
INSERT INTO TBL_CAUSA VALUES ('Hacer bromas', 2);
INSERT INTO TBL_CAUSA VALUES ('Trabajar bajo la influencia del alcohol y/u otras drogas', 2);


INSERT INTO TBL_CAUSA VALUES ('Mantención inadecuada', 3);
INSERT INTO TBL_CAUSA VALUES ('Almacenamiento defectuoso', 3);
INSERT INTO TBL_CAUSA VALUES ('Fabricación o instalación defectuosa', 3);
INSERT INTO TBL_CAUSA VALUES ('Vestimenta  o equipos defectuosos', 3);
INSERT INTO TBL_CAUSA VALUES ('Dispositivo de seguridad en mal estado', 3);
INSERT INTO TBL_CAUSA VALUES ('Condición climáticas adversa', 3);
INSERT INTO TBL_CAUSA VALUES ('Protecciones y resguardos inadecuados', 3);
INSERT INTO TBL_CAUSA VALUES ('Equipos de protección inadecuados o insuficientes', 3);
INSERT INTO TBL_CAUSA VALUES ('Herramientas, equipos o materiales defectuosos', 3);
INSERT INTO TBL_CAUSA VALUES ('Espacio restringido o limitado para desenvolverse', 3);
INSERT INTO TBL_CAUSA VALUES ('Sistemas de advertencia insuficientes', 3);
INSERT INTO TBL_CAUSA VALUES ('Peligro de explosión o incendio', 3);
INSERT INTO TBL_CAUSA VALUES ('Orden y limpieza deficientes en el lugar de trabajo', 3);
INSERT INTO TBL_CAUSA VALUES ('Condiciones ambientales peligrosas: gases, polvos, humos, emanaciones metálicas, vapores', 3);
INSERT INTO TBL_CAUSA VALUES ('Exposiciones a ruido', 3);
INSERT INTO TBL_CAUSA VALUES ('Exposiciones a radiaciones', 3);
INSERT INTO TBL_CAUSA VALUES ('Exposiciones a temperaturas altas o bajas', 3);
INSERT INTO TBL_CAUSA VALUES ('Iluminación excesiva o deficiente', 3);
INSERT INTO TBL_CAUSA VALUES ('Ventilación insuficiente', 3);

INSERT INTO TBL_CAUSA VALUES ('Altura, peso, alcance, etc., inapropiados', 4);
INSERT INTO TBL_CAUSA VALUES ('Movimiento corporal limitado', 4);
INSERT INTO TBL_CAUSA VALUES ('Capacidad limitada para sostener posiciones corporales', 4);
INSERT INTO TBL_CAUSA VALUES ('Sensibilidades a sustancias o alergias', 4);
INSERT INTO TBL_CAUSA VALUES ('Sensibilidad a extremos sensoriales (temperatura, ruido, etc.,)', 4);
INSERT INTO TBL_CAUSA VALUES ('Deficiencia de visual', 4);
INSERT INTO TBL_CAUSA VALUES ('Deficiencia de auditiva', 4);
INSERT INTO TBL_CAUSA VALUES ('Otras deficiencias sensoriales (tacto, gusto, olfato, equilibrio)', 4);
INSERT INTO TBL_CAUSA VALUES ('Incapacidad respiratoria', 4);
INSERT INTO TBL_CAUSA VALUES ('Otras invalideces físicas permanentes', 4);
INSERT INTO TBL_CAUSA VALUES ('Incapacidades temporales', 4);

INSERT INTO TBL_CAUSA VALUES ('Temores y fobias', 5);
INSERT INTO TBL_CAUSA VALUES ('Problemas emocionales', 5);
INSERT INTO TBL_CAUSA VALUES ('Enfermedad mental', 5);
INSERT INTO TBL_CAUSA VALUES ('Nivel de inteligencia', 5);
INSERT INTO TBL_CAUSA VALUES ('Incapacidad de comprensión', 5);
INSERT INTO TBL_CAUSA VALUES ('Falta de juicio', 5);
INSERT INTO TBL_CAUSA VALUES ('Escasa coordinación', 5);
INSERT INTO TBL_CAUSA VALUES ('Reacción lenta / bajo tiempo de reacción', 5);
INSERT INTO TBL_CAUSA VALUES ('Aptitud mecánica deficiente', 5);
INSERT INTO TBL_CAUSA VALUES ('Baja aptitud de aprendizaje', 5);
INSERT INTO TBL_CAUSA VALUES ('Problemas  de memoria', 5);

INSERT INTO TBL_CAUSA VALUES ('Lesión o enfermedad', 6);
INSERT INTO TBL_CAUSA VALUES ('Fatiga por carga o duración de la tarea', 6);
INSERT INTO TBL_CAUSA VALUES ('Fatiga por falta de descanso', 6);
INSERT INTO TBL_CAUSA VALUES ('Fatiga por sobrecarga sensorial', 6);
INSERT INTO TBL_CAUSA VALUES ('Exposición a riesgos contra la salud', 6);
INSERT INTO TBL_CAUSA VALUES ('Exposición a temperaturas extremas', 6);
INSERT INTO TBL_CAUSA VALUES ('Insuficiencia de oxigeno', 6);
INSERT INTO TBL_CAUSA VALUES ('Variaciones en la presión atmosférica', 6);
INSERT INTO TBL_CAUSA VALUES ('Movimiento restringido', 6);
INSERT INTO TBL_CAUSA VALUES ('Insuficiencia de azúcar en la sangre', 6);
INSERT INTO TBL_CAUSA VALUES ('Ingestión de Drogas', 6);

INSERT INTO TBL_CAUSA VALUES ('Sobrecarga emocional', 7);
INSERT INTO TBL_CAUSA VALUES ('Fatiga por carga o velocidad de tarea mental', 7);
INSERT INTO TBL_CAUSA VALUES ('Obligaciones que exigen juicio o toma decisión extremas', 7);
INSERT INTO TBL_CAUSA VALUES ('Rutina, monotonía de trabajos no importantes', 7);
INSERT INTO TBL_CAUSA VALUES ('Exigencia de concentración y percepción profunda', 7);
INSERT INTO TBL_CAUSA VALUES ('Actividades “sin sentido” o "degradantes"', 7);
INSERT INTO TBL_CAUSA VALUES ('Direcciones y ordenes confusas', 7);
INSERT INTO TBL_CAUSA VALUES ('Peticiones o solicitudes conflictivas', 7);
INSERT INTO TBL_CAUSA VALUES ('Preocupación debido a problemas', 7);
INSERT INTO TBL_CAUSA VALUES ('Frustración', 7);
INSERT INTO TBL_CAUSA VALUES ('Enfermedad mental', 7);

INSERT INTO TBL_CAUSA VALUES ('Falta de experiencia', 8);
INSERT INTO TBL_CAUSA VALUES ('Orientación deficiente', 8);
INSERT INTO TBL_CAUSA VALUES ('Entrenamiento inicial inadecuado', 8);
INSERT INTO TBL_CAUSA VALUES ('Reentrenamiento insuficiente', 8);
INSERT INTO TBL_CAUSA VALUES ('Ordenes mal entendidas o interpretadas', 8);


INSERT INTO TBL_CAUSA VALUES ('Instrucción inicial deficiente', 9);
INSERT INTO TBL_CAUSA VALUES ('Práctica insuficiente', 9);
INSERT INTO TBL_CAUSA VALUES ('Ejecución poco frecuente o esporádica', 9);
INSERT INTO TBL_CAUSA VALUES ('Falta de preparación/asesoramiento', 9);
INSERT INTO TBL_CAUSA VALUES ('Revisión inadecuada de instrucciones', 9);


INSERT INTO TBL_CAUSA VALUES ('Permisividad (tolerancia) al desempeño inadecuado', 10);
INSERT INTO TBL_CAUSA VALUES ('El desempeño estándar causa desagrado', 10);
INSERT INTO TBL_CAUSA VALUES ('Falta de incentivos', 10);
INSERT INTO TBL_CAUSA VALUES ('Frustración excesiva', 10);
INSERT INTO TBL_CAUSA VALUES ('Falta de desafíos', 10);
INSERT INTO TBL_CAUSA VALUES ('Intento inapropiado de ahorrar tiempo o esfuerzo', 10);
INSERT INTO TBL_CAUSA VALUES ('Intento inapropiado de evitar la incomodidad', 10);
INSERT INTO TBL_CAUSA VALUES ('Sin interés de aprender', 10);
INSERT INTO TBL_CAUSA VALUES ('Disciplina inadecuada', 10);
INSERT INTO TBL_CAUSA VALUES ('Presión inapropiada de los compañeros', 10);
INSERT INTO TBL_CAUSA VALUES ('Ejemplo inadecuado de la supervisión', 10);
INSERT INTO TBL_CAUSA VALUES ('Retroalimentación deficiente en relación al desempeño', 10);
INSERT INTO TBL_CAUSA VALUES ('Refuerzo deficiente del comportamiento positivo', 10);
INSERT INTO TBL_CAUSA VALUES ('Falta de comprensión de los incentivos de producción ', 10);






INSERT INTO TBL_CAUSA VALUES ('Relaciones jerárquicas poco claras o conflictivas', 11);
INSERT INTO TBL_CAUSA VALUES ('Asignación de responsabilidades poco claras o conflictivas', 11);
INSERT INTO TBL_CAUSA VALUES ('Delegación inadecuada o insuficiente', 11);
INSERT INTO TBL_CAUSA VALUES ('Dar políticas, procedimientos, prácticas o pautas inadecuadas', 11);
INSERT INTO TBL_CAUSA VALUES ('Dar objetivos, metas o normas que ocasionan conflictos', 11);
INSERT INTO TBL_CAUSA VALUES ('Planificación o programación inadecuada del trabajo', 11);
INSERT INTO TBL_CAUSA VALUES ('Instrucciones, orientación y/o preparación insuficiente', 11);
INSERT INTO TBL_CAUSA VALUES ('Documentos de referencias, instrucciones y publicaciones de asesoramiento inadecuados', 11);
INSERT INTO TBL_CAUSA VALUES ('Identificación y evaluación deficiente de exposiciones a peligros', 11);
INSERT INTO TBL_CAUSA VALUES ('Conocimiento inadecuado del trabajo de supervisión/administración', 11);
INSERT INTO TBL_CAUSA VALUES ('Ubicación inadecuada del trabajador de acuerdo a sus cualidades y exigencias de la tarea', 11);
INSERT INTO TBL_CAUSA VALUES ('Medición y evaluación deficiente del desempeño', 11);
INSERT INTO TBL_CAUSA VALUES ('Retroinformación deficiente o incorrecta del desempeño', 11);

INSERT INTO TBL_CAUSA VALUES ('Valoración inadecuada de las exposiciones al peligro', 12);
INSERT INTO TBL_CAUSA VALUES ('Consideración deficiente de factores humanos y ergonómicos', 12);
INSERT INTO TBL_CAUSA VALUES ('Estándares y especificaciones y/o criterios de diseños deficientes', 12);
INSERT INTO TBL_CAUSA VALUES ('Control o inspección inadecuado de la construcción', 12);
INSERT INTO TBL_CAUSA VALUES ('Evaluación inadecuada de condiciones operacionales', 12);
INSERT INTO TBL_CAUSA VALUES ('Monitoreo u operación inicial inadecuada', 12);
INSERT INTO TBL_CAUSA VALUES ('Evaluación inadecuada del cambio', 12);


INSERT INTO TBL_CAUSA VALUES ('Especificaciones deficientes de ordenes y pedidos', 13);
INSERT INTO TBL_CAUSA VALUES ('Investigación inadecuada del materiales/equipos', 13);
INSERT INTO TBL_CAUSA VALUES ('Especificaciones inadecuadas a compradores', 13);
INSERT INTO TBL_CAUSA VALUES ('Modalidad o ruta de embarque inadecuada', 13);
INSERT INTO TBL_CAUSA VALUES ('Inspección de recepción deficiente', 13);
INSERT INTO TBL_CAUSA VALUES ('Comunicación inadecuada de la información de salud y seguridad', 13);
INSERT INTO TBL_CAUSA VALUES ('Manejo inadecuado de materiales', 13);
INSERT INTO TBL_CAUSA VALUES ('Almacenamiento inadecuado de materiales', 13);
INSERT INTO TBL_CAUSA VALUES ('Transporte inadecuado de materiales', 13);
INSERT INTO TBL_CAUSA VALUES ('Identificación deficiente de materiales peligrosos', 13);
INSERT INTO TBL_CAUSA VALUES ('Disposición inadecuada de residuos y desperdicios', 13);
INSERT INTO TBL_CAUSA VALUES ('Selección inadecuada de contratistas', 13);



INSERT INTO TBL_CAUSA VALUES ('Prevención inadecuada para evaluación de necesidades (lubricación, ajuste, limpieza)', 14);
INSERT INTO TBL_CAUSA VALUES ('Acciones correctivas deficientes (comunicación, programación, revisión, remplazo', 14);

INSERT INTO TBL_CAUSA VALUES ('Desarrollo inadecuado de normas (necesidades, coordinación, compromisos, inconsistencias)', 15);
INSERT INTO TBL_CAUSA VALUES ('Comunicación inadecuada de normas (publicación, distribución, entrenamiento)', 15);
INSERT INTO TBL_CAUSA VALUES ('Mantención inadecuada de normas (seguimiento de aplicación, actualización, control)', 15);

INSERT INTO TBL_CAUSA VALUES ('Evaluación deficiente de necesidades y los peligros', 16);
INSERT INTO TBL_CAUSA VALUES ('Consideración inadecuada de factores humanos y ergonómicos', 16);
INSERT INTO TBL_CAUSA VALUES ('Estándares o especificaciones inadecuados', 16);
INSERT INTO TBL_CAUSA VALUES ('Disponibilidad inadecuada', 16);
INSERT INTO TBL_CAUSA VALUES ('Ajuste/reparación/mantenimiento deficiente', 16);
INSERT INTO TBL_CAUSA VALUES ('Reparación y recuperación de materiales deficiente', 16);
INSERT INTO TBL_CAUSA VALUES ('Remoción y reemplazo de piezas defectuosas ', 16);

INSERT INTO TBL_CAUSA VALUES ('Planificación inadecuada de uso', 17);
INSERT INTO TBL_CAUSA VALUES ('Extensión inadecuada de la vida útil', 17);
INSERT INTO TBL_CAUSA VALUES ('Inspección y/o control deficiente', 17);
INSERT INTO TBL_CAUSA VALUES ('Sobre Carga o proporción de uso excesivo', 17);
INSERT INTO TBL_CAUSA VALUES ('Mantenimiento deficiente', 17);
INSERT INTO TBL_CAUSA VALUES ('Uso por personas no calificadas o entrenadas', 17);
INSERT INTO TBL_CAUSA VALUES ('Uso para otros propósito', 17);

INSERT INTO TBL_CAUSA VALUES ('Permitidos por conducta permisiva intencional de la supervisión', 18);
INSERT INTO TBL_CAUSA VALUES ('Permitidos por conducta permisiva no intencional de la supervisión', 18);

INSERT INTO TBL_CAUSA VALUES ('Prisa', 19);
INSERT INTO TBL_CAUSA VALUES ('Frustración', 19);
INSERT INTO TBL_CAUSA VALUES ('Fatiga', 19);
INSERT INTO TBL_CAUSA VALUES ('Complacencia', 19);

INSERT INTO TBL_CAUSA VALUES ('Ojos no en la tarea', 20);
INSERT INTO TBL_CAUSA VALUES ('Mente no en la tarea', 20);
INSERT INTO TBL_CAUSA VALUES ('Ojos y mente no en la tarea', 20);
INSERT INTO TBL_CAUSA VALUES ('Perdida de equilibrio, tracción o agarre', 20);
INSERT INTO TBL_CAUSA VALUES ('Línea de fuego', 20);


/*
INSERT INTO TBL_GRUPO_PRIVILEGIO(ID_GRUPO,PRIVILEGIO,ID_NODO,ESTADO,ALLOW) 
	VALUES(1,1,1,1,1) -- Lectura
INSERT INTO TBL_GRUPO_PRIVILEGIO(ID_GRUPO,PRIVILEGIO,ID_NODO,ESTADO,ALLOW) 
	VALUES(1,1,2,1,0) -- Lectura
-- INSERT INTO TBL_GRUPO_PRIVILEGIO VALUES(1,4,1,1) --Imprimir

	SELECT * FROM TBL_NODO ND
				INNER JOIN TBL_GRUPO_PRIVILEGIO GP ON ND.ID_NODO=GP.ID_NODO
				INNER JOIN TBL_GRUPO G ON G.ID_GRUPO = GP.ID_GRUPO
			WHERE G.NOMBRE_GRUPO='Invitado'
			ORDER BY ND.NODO_PADRE, ND.N_ORDER ASC
*/
GO


DECLARE @ID_USUARIO VARCHAR(200);
SELECT 
	@ID_USUARIO='cramirez';
EXEC sp_get_privilegios_by_usuario @ID_USUARIO;
SELECT e.NODO_PADRE, e.ID_NODO,0 AS Level
    FROM TBL_NODO AS e;
	
/*
	SELECT CHILD_ROW.ID_NODO
		FROM TBL_NODO AS CURRENT_ROW
		INNER JOIN TBL_NODO AS CHILD_ROW ON CURRENT_ROW.ID_NODO = CHILD_ROW.NODO_PADRE
		INNER JOIN TBL_GRUPO_PRIVILEGIO GP ON GP.ID_NODO = CHILD_ROW.NODO_PADRE
	WHERE CURRENT_ROW.ID_NODO=2

*/


/*
CREATE FUNCTION fn_nodes_by_parent (@ID_NODO INT)
RETURNS @nodes TABLE 
(
	ID_NODO INT,
	NOMBRE_MODULO VARCHAR(200),
	ALLOW_READ BIT,
	ALLOW_WRITE BIT,
	ALLOW_EDIT BIT,
	ALLOW_DELETE BIT,
	ALLOW_PRINT BIT,
	ALLOW_CRUD BIT
)
AS
BEGIN
WITH NODESBYPARENT (ID_NODO,
	NOMBRE_MODULO,
	ALLOW_READ,
	ALLOW_WRITE,
	ALLOW_EDIT,
	ALLOW_DELETE,
	ALLOW_PRINT,
	ALLOW_CRUD)
AS
(
	SELECT 	
		CHILD_ROW.ID_NODO,
			CHILD_ROW.NOMBRE_MODULO,
			GP.ALLOW_READ,
			GP.ALLOW_WRITE,
			GP.ALLOW_EDIT,
			GP.ALLOW_DELETE,
			GP.ALLOW_PRINT,
			GP.ALLOW_CRUD
	FROM TBL_NODO AS CURRENT_ROW
		INNER JOIN TBL_NODO AS CHILD_ROW ON CURRENT_ROW.ID_NODO = CHILD_ROW.NODO_PADRE
		INNER JOIN TBL_GRUPO_PRIVILEGIO GP ON GP.ID_NODO = CHILD_ROW.NODO_PADRE
	WHERE CURRENT_ROW.ID_NODO=@ID_NODO AND GP.ALLOW_READ=1
)
	INSERT @nodes
   SELECT ID_NODO,
			NOMBRE_MODULO,
			ALLOW_READ,
			ALLOW_WRITE,
			ALLOW_EDIT,
			ALLOW_DELETE,
			ALLOW_PRINT,
			ALLOW_CRUD
   FROM NODESBYPARENT
   RETURN
END; 
GO


SELECT	CHILD.ID_NODO,
		CHILD.NOMBRE_MODULO,
		CHILD.NODO_PADRE,
		GP.ALLOW_READ,
		GP.ALLOW_WRITE,
		GP.ALLOW_EDIT,
		GP.ALLOW_DELETE,
		GP.ALLOW_PRINT,
		GP.ALLOW_CRUD
FROM TBL_GRUPO_PRIVILEGIO GP
	INNER JOIN TBL_NODO ND ON GP.ID_NODO = ND.ID_NODO
	INNER JOIN fn_recursive_node() RN ON ND.ID_NODO= RN.NODO_PADRE
	INNER JOIN TBL_NODO CHILD ON RN.ID_NODO = CHILD.ID_NODO
WHERE (GP.ID_GRUPO=3 OR GP.ID_GRUPO=1) AND GP.ALLOW_READ=1
ORDER BY CHILD.NODO_PADRE ASC
*/


/*
SELECT	ND.ID_NODO,
		ND.NODO_PADRE,
		ND.NOMBRE_MODULO,
		GP.*
FROM TBL_GRUPO_PRIVILEGIO GP
	INNER JOIN TBL_NODO ND ON GP.ID_NODO = ND.ID_NODO
WHERE (((GP.ID_GRUPO IN (SELECT ID_GRUPO FROM TBL_USUARIO  WHERE ID_USUARIO='efuentealba') OR GP.ID_GRUPO=1)) OR GP.ID_GRUPO=3)
		AND GP.ALLOW_READ=1
ORDER BY ND.NODO_PADRE, ND.ID_NODO,GROUP_ID,TIPO_DISPLAY ASC;



SELECT	ND.ID_NODO,
		ND.NODO_PADRE,
		ND.NOMBRE_MODULO,
		GP.*
FROM TBL_GRUPO_PRIVILEGIO GP
	INNER JOIN TBL_NODO ND ON GP.ID_NODO = ND.ID_NODO
WHERE ((GP.ID_GRUPO IN (SELECT UG.ID_GRUPO 
							FROM TBL_USUARIO U
								INNER JOIN TBL_USUARIO_GRUPO UG ON U.ID_USUARIO=UG.ID_USUARIO  
							WHERE U.ID_USUARIO='efuentealba') OR GP.ID_GRUPO=1))
		AND GP.ALLOW_READ=1
ORDER BY ND.NODO_PADRE, ND.ID_NODO,GROUP_ID,TIPO_DISPLAY ASC;




--- TRABAJADORES POR EVENTO
SELECT * FROM TBL_EVENTO_TRABAJADOR;
INSERT INTO TBL_EVENTO_TRABAJADOR VALUES(1,
	1,
	NULL,
	GETDATE(),
	GETDATE(),
	1
);

-- group.png
DECLARE @p0 INT;
DECLARE @p1 INT;
SET @p0 = 20;
SET @p1 = 10;
SELECT [t2].*
FROM (
    SELECT [t1].*
    FROM (
		SELECT ROW_NUMBER() OVER (ORDER BY E.ID_EVENTO,E.LAT_EVENTO,E.LNG_EVENTO,E.LUGAR_EXACTO,E.ID_DEPARTAMENTO_ORGANIZACION,D.NOMBRE_DEPARTAMENTO) AS [ROW_NUMBER],
				E.ID_EVENTO,
				E.LAT_EVENTO,
				E.LNG_EVENTO,
				E.LUGAR_EXACTO,
				E.DESCRIPCION_GENERAL,
				CONVERT(VARCHAR(5),E.FECHA_HORA_EVENTO,108) AS 'HORA_EVENTO',
				CONVERT(VARCHAR(10),FECHA_HORA_EVENTO,120) AS 'FECHA_HORA_EVENTO',
				E.ID_DEPARTAMENTO_ORGANIZACION,
				D.NOMBRE_DEPARTAMENTO,
				(SELECT COUNT(ET.ID_EVENTO_EMPRESA)
					FROM TBL_EVENTO EV
						INNER JOIN TBL_EVENTO_EMPRESA EE ON EV.ID_EVENTO = EE.ID_EVENTO
						LEFT JOIN TBL_EVENTO_TRABAJADOR ET ON EE.ID_EVENTO_EMPRESA = ET.ID_EVENTO_EMPRESA
						WHERE EV.ID_EVENTO = E.ID_EVENTO
					GROUP BY EV.ID_EVENTO, ET.ID_EVENTO_EMPRESA) AS 'COUNT_TRABAJADORES',
				(SELECT COUNT(IP.ID_INFORME_PRELIMINAR)
					FROM TBL_EVENTO EV
						INNER JOIN TBL_EVENTO_EMPRESA EE ON EV.ID_EVENTO = EE.ID_EVENTO
						LEFT JOIN TBL_I_PRELIMINAR IP ON EE.ID_EVENTO_EMPRESA = IP.ID_EVENTO_EMPRESA
						WHERE EV.ID_EVENTO = E.ID_EVENTO
					GROUP BY EV.ID_EVENTO, IP.ID_INFORME_PRELIMINAR) AS 'COUNT_IPRELIMINAR'
		FROM TBL_EVENTO E
			INNER JOIN TBL_DEPARTAMENTO_ORGANIZACION DO ON E.ID_DEPARTAMENTO_ORGANIZACION = DO.ID_DEPARTAMENTO_ORGANIZACION
			INNER JOIN TBL_DEPARTAMENTO D ON DO.ID_DEPARTAMENTO=D.ID_DEPARTAMENTO
        ) AS [t1]
    WHERE [t1].[ROW_NUMBER] BETWEEN @p0 + 1 AND @p0 + @p1
    ) AS [t2]
ORDER BY [t2].[ROW_NUMBER]













CREATE PROCEDURE sp_get_eventos_departamento_by_organizacion
	@ID_ORGANIZACION INT,
	@ANO INT,
	@p0   INT = 0,
	@p1   INT
AS
	SELECT [t2].*
	FROM (
		SELECT [t1].*
		FROM (
			SELECT 	ROW_NUMBER() OVER (ORDER BY ISNULL(MONTH(E.FECHA_HORA_EVENTO),0), D.NOMBRE_DEPARTAMENTO, COUNT(E.ID_DEPARTAMENTO_ORGANIZACION)) AS [ROW_NUMBER],
					COUNT(E.ID_DEPARTAMENTO_ORGANIZACION) AS 'COUNT_EVENTOS', 
					D.NOMBRE_DEPARTAMENTO,
					ISNULL(MONTH(E.FECHA_HORA_EVENTO),0) AS 'MES'
			FROM TBL_DEPARTAMENTO_ORGANIZACION DO
				INNER JOIN TBL_DEPARTAMENTO D ON D.ID_DEPARTAMENTO = DO.ID_DEPARTAMENTO
				LEFT JOIN TBL_EVENTO E ON E.ID_DEPARTAMENTO_ORGANIZACION = DO.ID_DEPARTAMENTO_ORGANIZACION
			WHERE DO.ID_ORGANIZACION = @ID_ORGANIZACION 
				AND (ISNULL(CONVERT(VARCHAR(4),E.FECHA_HORA_EVENTO,120),1) = 1 
				OR YEAR(E.FECHA_HORA_EVENTO) = @ANO)
			GROUP BY MONTH(FECHA_HORA_EVENTO), E.ID_DEPARTAMENTO_ORGANIZACION,D.NOMBRE_DEPARTAMENTO
		) AS [t1]
		WHERE [t1].[ROW_NUMBER] BETWEEN @p0 + 1 AND @p0 + @p1
	) AS [t2]
	ORDER BY [t2].[ROW_NUMBER]
GO
*/


