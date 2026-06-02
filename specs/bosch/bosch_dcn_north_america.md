---
spec_id: admin/bosch-dcn-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bosch DCN-CCU2 / DCN-CCUB2 (DCN NG) Open Interface Control Spec"
manufacturer: Bosch
model_family: DCN-CCU2
aliases: []
compatible_with:
  manufacturers:
    - Bosch
  models:
    - DCN-CCU2
    - DCN-CCUB2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.catalog.boschbuildingtechnologies.com
  - resources.keenfinity.tech
source_urls:
  - https://assets.catalog.boschbuildingtechnologies.com/public/documents/OI_Operation_Manual_enUS_12284426251.pdf
  - https://resources.keenfinity.tech/public/documents/LBB_4187_00_QRC_Quick_Installation_Guide_enUS_13259287819.pdf
retrieved_at: 2026-04-26T16:48:40.552Z
last_checked_at: 2026-06-02T17:21:45.991Z
generated_at: 2026-06-02T17:21:45.991Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - SC_C_GET_CCU_CONFIG
  - MM_C_RTS_INSERT
  - IN_C_ASSIGN_UNIT
  - IN_C_UNASSIGN_UNIT
  - "voting chapter (§8) not present in refined excerpt; only Appendix B function IDs available. DCNC_APP_VT, SC, SI, etc. application-name mapping provided. Source is the \"Open Interface\" generic spec — individual application manuals describe per-function parameter structures."
  - "MESSAGETYPE_OIP_Dcn constant value not stated in source (only KeepAlive=0x00447027 and ResponseProtocolError=0x00447020 given)."
  - "MESSAGETYPE_OIP_Dcn value not stated; other OIP types in 0x00447xxx range"
  - "detailed parameters not in source excerpt"
  - "detailed voting flow not in source excerpt"
  - "no safety-critical confirmation steps in source"
  - "Application manual cross-references for parameter struct semantics (e.g. exact `SC_C_SET_ENCRYPTION_ENABLED` parameter list, full `VT_C_*` parameter sets, full `AT_C_*` parameter sets, full `LD_C_*` parameter sets, full `IC_C_*` parameter sets) — this generic Open Interface spec only provides the function IDs and high-level descriptions; the per-application manuals (referenced but not present in this refined excerpt) carry the full C struct definitions."
  - "Voting chapter (§8) not present in this refined excerpt; VT function IDs are listed in Appendix B but per-function parameter structures are not in the source. The DCNC_APP_VT value (1) is given but per-action `params` blocks are not populated."
  - "Cable pinout / RS-232 handshaking — the RS-232 signal definitions table in §1.3 is a generic reference table; the Open Interface itself is TCP/IP only."
  - "Hardware specifications (voltage, current, power consumption, dimensions, weight) — not in this protocol spec; product datasheet would carry these."
  - "Firmware version compatibility ranges — the OMF (executable downloaded into CCU ROM) version is reported via `szSWRelNum` and `byMajorVersionOfDownloadedSw/MinorVersionOfDownloadedSw`, but no compatibility matrix is stated in the source."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:45.991Z
  matched_actions: 138
  action_count: 138
  confidence: medium
  summary: "All 138 spec action wFnId hex values confirmed via MKWORD calculations in Appendix B; transport port 9451 confirmed; 4 callable source functions absent from spec but coverage ratio 138/142 = 0.97 exceeds 0.9 floor. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Bosch DCN-CCU2 / DCN-CCUB2 (DCN NG) Open Interface Control Spec

## Summary
This spec covers the Bosch DCN NG (Digital Congress Network Next Generation) Open Interface, a binary message-based remote-control protocol exposed by the DCN-CCU2 and DCN-CCUB2 Central Control Units over TCP/IP on port 9451. Third-party controllers issue `remote function` calls to manage congress hardware (delegate/chairman units, microphones, voting, interpretation booths, cameras, attendance registration, intercom, message distribution, text displays) and receive asynchronous update notifications. The interface must be licensed (LBB4187/00) and enabled via the `Download and Licensing Tool` shipped on the DCN DVD.

<!-- UNRESOLVED: voting chapter (§8) not present in refined excerpt; only Appendix B function IDs available. DCNC_APP_VT, SC, SI, etc. application-name mapping provided. Source is the "Open Interface" generic spec — individual application manuals describe per-function parameter structures. -->
<!-- UNRESOLVED: MESSAGETYPE_OIP_Dcn constant value not stated in source (only KeepAlive=0x00447027 and ResponseProtocolError=0x00447020 given). -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 9451
  # UNRESOLVED: MESSAGETYPE_OIP_Dcn value not stated; other OIP types in 0x00447xxx range
  framing: binary_little_endian
  max_message_bytes: 8000
  min_message_bytes: 8
serial: null  # N/A: TCP only
auth:
  type: none  # inferred: no auth/login procedure in source
heartbeat:
  transmit_interval_seconds: 5
  check_timeout_seconds: 15
  max_command_response_seconds: 10
```

**Notes:** UTP/STP cable; max ~100m between CCU and remote controller (repeater for longer). 16-byte heartbeat frame (MESSAGETYPE_OIP_KeepAlive 0x00447027). Error response frame is 24 bytes (MESSAGETYPE_OIP_ResponseProtocolError 0x00447020).

## Traits
```yaml
# - queryable       (many GET functions: SC_C_GET_CCU_VERSIONINFO, MM_C_GET_SETTINGS, SI_C_GET_EXT_CONTACT, etc.)
# - routable        (MM_C_SET_MICRO_ON_OFF, IN_C_DESK_UPDATE, CC_C_SET_CAMERA_ASSIGNMENT - input/output routing)
# - levelable       (SI_C_SET_MASTER_VOL 0..25, SI_C_SET_MICROPHONE_GAIN 0..15)
queryable: true
routable: true
levelable: true
```

## Actions
```yaml
# Each action corresponds to one Remote Function defined in the source.
# `command` is the 16-bit wFnId documented in Appendix B of the source, expressed as
# a hex WORD. On-wire payload additionally uses byDcnMsgType=0x03 (MDSC_REMOTEPROCEDURE_REQ)
# and byMessageTypeHeader=0x43 per §2.2.3.3. Parameter `params` mirror the C struct
# fields documented in the corresponding section.

# ---------------------------------------------------------------------------
# Infrastructure
# ---------------------------------------------------------------------------
- id: oip_keepalive
  label: OIP KeepAlive
  kind: action
  command: "0x00447027"  # MESSAGETYPE_OIP_KeepAlive; transmit every 5s when idle
  params: []
- id: sc_check_link
  label: SC_C_CHECK_LINK
  kind: query
  command: "0x1012"  # wFnId (MKWORD(18, DCNC_APP_SC=16))
  params: []

# ---------------------------------------------------------------------------
# System Configuration (SC) - app 0x10
# ---------------------------------------------------------------------------
- id: sc_start_app
  label: SC_C_START_APP
  kind: action
  command: "0x1007"
  params: []
- id: sc_stop_app
  label: SC_C_STOP_APP
  kind: action
  command: "0x1008"
  params: []
- id: sc_get_ccu_versioninfo
  label: SC_C_GET_CCU_VERSIONINFO
  kind: query
  command: "0x1006"
  params: []
- id: sc_get_ccu_config_property
  label: SC_C_GET_CCU_CONFIG_PROPERTY
  kind: query
  command: "0x1033"
  params:
    - name: wClusterIndex
      type: integer
      description: 0-based cluster index; 0 = first SC_C_CLUSTER_MAX units
- id: sc_req_serial_nr
  label: SC_C_REQ_SERIAL_NR
  kind: action
  command: "0x1035"
  params:
    - name: wNrOfUnits
      type: integer
    - name: tUnitId
      type: word[]
      description: List of unit IDs (0x0000 = master controller)
- id: sc_get_slave_nodes
  label: SC_C_GET_SLAVE_NODES
  kind: query
  command: "0x1036"
  params:
    - name: dwSerialNr
      type: dword
- id: sc_get_unit_ids
  label: SC_C_GET_UNIT_IDS
  kind: query
  command: "0x1037"
  params:
    - name: dwSerialNr
      type: dword
- id: sc_battery_status_req
  label: SC_C_BATTERY_STATUS_REQ
  kind: action
  command: "0x1027"
  params:
    - name: tUnitList
      type: word[]
- id: sc_battery_info_req
  label: SC_C_BATTERY_INFO_REQ
  kind: action
  command: "0x1028"
  params:
    - name: tUnitList
      type: word[]
- id: sc_signal_status_req
  label: SC_C_SIGNAL_STATUS_REQ
  kind: action
  command: "0x1029"
  params:
    - name: tUnitList
      type: word[]
- id: sc_signal_quality_req
  label: SC_C_SIGNAL_QUALITY_REQ
  kind: action
  command: "0x102A"
  params: []
- id: sc_unit_signal_quality_req
  label: SC_C_UNIT_SIGNAL_QUALITY_REQ
  kind: action
  command: "0x1039"
  params:
    - name: wNrOfUnits
      type: integer
    - name: tUnitList
      type: word[]
- id: sc_low_battery_req
  label: SC_C_LOW_BATTERY_REQ
  kind: action
  command: "0x1045"
  params: []
- id: sc_get_encryption_enabled
  label: SC_C_GET_ENCRYPTION_ENABLED
  kind: query
  command: "0x1040"
  params: []
- id: sc_set_encryption_enabled
  label: SC_C_SET_ENCRYPTION_ENABLED
  kind: action
  command: "0x103F"
  params:
    - name: bEnabled
      type: boolean

# ---------------------------------------------------------------------------
# System Installation (SI) - app 0x11
# ---------------------------------------------------------------------------
- id: si_start_install
  label: SI_C_START_INSTALL
  kind: action
  command: "0x1104"
  params:
    - name: wInstallMode
      type: integer
      description: SI_C_GLOBAL_INSTALL_MODE or SI_C_OPERATIONAL_INSTALL_MODE
- id: si_stop_install
  label: SI_C_STOP_INSTALL
  kind: action
  command: "0x1105"
  params: []
- id: si_select_unit
  label: SI_C_SELECT_UNIT
  kind: action
  command: "0x1101"
  params:
    - name: wUnitId
      type: word
    - name: bSelectOn
      type: boolean
      description: TRUE: all LEDs flash; FALSE: LEDs off
- id: si_set_master_vol
  label: SI_C_SET_MASTER_VOL
  kind: action
  command: "0x110A"
  params:
    - name: wMasterVolume
      type: integer
      description: 0..25 (0=mute all delegate loudspeakers; 1..25 = -12dB..+12dB in 1dB steps)
- id: si_set_ext_contact
  label: SI_C_SET_EXT_CONTACT
  kind: action
  command: "0x110D"
  params:
    - name: byExtContact
      type: byte
      description: SI_C_NO_FUNCTION, SI_C_PRESENT, or SI_C_FRAUD
- id: si_get_ext_contact
  label: SI_C_GET_EXT_CONTACT
  kind: query
  command: "0x110E"
  params: []
- id: si_set_microphone_gain
  label: SI_C_SET_MICROPHONE_GAIN
  kind: action
  command: "0x110F"
  params:
    - name: wUnitId
      type: word
    - name: wGain
      type: integer
      description: 0..15 (-6dB..+9dB in 1dB steps)
- id: si_get_microphone_gain
  label: SI_C_GET_MICROPHONE_GAIN
  kind: query
  command: "0x1110"
  params:
    - name: wUnitId
      type: word
- id: si_reset_microphone_gain
  label: SI_C_RESET_MICROPHONE_GAIN
  kind: action
  command: "0x1111"
  params: []
- id: si_deinitialize_all
  label: SI_C_DEINITIALIZE_ALL
  kind: action
  command: "0x111E"
  params: []
- id: si_get_operation_mode
  label: SI_C_GET_OPERATION_MODE
  kind: query
  command: "0x111F"
  params: []
- id: si_set_operation_mode
  label: SI_C_SET_OPERATION_MODE
  kind: action
  command: "0x1120"
  params:
    - name: byStartupMode
      type: byte
      description: 0=single, 1=multi, 2=standalone
    - name: bySlaveId
      type: byte
      description: 0..31
- id: si_unsubscribe_req
  label: SI_C_UNSUBSCRIBE_REQ
  kind: action
  command: "0x111D"
  params:
    - name: wNrOfUnits
      type: integer
    - name: tUnitList
      type: word[]
- id: si_get_wap_settings
  label: SI_C_GET_WAP_SETTINGS
  kind: query
  command: "0x1112"
  params: []
- id: si_set_wap_settings
  label: SI_C_SET_WAP_SETTINGS
  kind: action
  command: "0x1113"
  params:
    - name: tWapSettings
      type: SI_T_WAP_SETTINGS
- id: si_get_wireless_settings
  label: SI_C_GET_WIRELESS_SETTINGS
  kind: query
  command: "0x1114"
  params: []
- id: si_set_wireless_settings
  label: SI_C_SET_WIRELESS_SETTINGS
  kind: action
  command: "0x1115"
  params:
    - name: tWirelessSettings
      type: SI_T_WIRELESS_SETTINGS
- id: si_get_network_mode
  label: SI_C_GET_NETWORK_MODE
  kind: query
  command: "0x1116"
  params: []
- id: si_set_network_mode
  label: SI_C_SET_NETWORK_MODE
  kind: action
  command: "0x1117"
  params:
    - name: tMode
      type: SI_T_NETWORK_MODE
      description: SI_C_NETWORK_MODE_ON, _SLEEP, _OFF, or _SUBSCRIPTION
- id: si_start_mon_si
  label: SI_C_START_MON_SI
  kind: action
  command: "0x111B"
  params: []
- id: si_stop_mon_si
  label: SI_C_STOP_MON_SI
  kind: action
  command: "0x111C"
  params: []

# ---------------------------------------------------------------------------
# Delegate Database (DB) - app 0x03
# ---------------------------------------------------------------------------
- id: db_start_app
  label: DB_C_START_APP
  kind: action
  command: "0x0301"
  params:
    - name: byControlType
      type: byte
      description: DB_C_CONTROL
- id: db_stop_app
  label: DB_C_STOP_APP
  kind: action
  command: "0x0302"
  params: []
- id: db_maint_ccu
  label: DB_C_MAINT_CCU
  kind: action
  command: "0x0303"
  params:
    - name: bFirstCluster
      type: boolean
    - name: bLastCluster
      type: boolean
    - name: byPinSize
      type: byte
    - name: DelCluster
      type: DB_T_PERDELEGATE[]
- id: db_download_ccu
  label: DB_C_DOWNLOAD_CCU
  kind: action
  command: "0x0306"
  params:
    - name: tCcuMainRec
      type: DB_T_CCUMAINREC
- id: db_clear_ccu
  label: DB_C_CLEAR_CCU
  kind: action
  command: "0x0304"
  params: []
- id: db_ccu_apply_one
  label: DB_C_CCU_APPLY_ONE
  kind: action
  command: "0x0305"
  params:
    - name: tDelegate
      type: DB_T_PERDELEGATE

# ---------------------------------------------------------------------------
# Microphone Management (MM) - app 0x0A
# ---------------------------------------------------------------------------
- id: mm_start_mm
  label: MM_C_START_MM
  kind: action
  command: "0x0A1E"
  params: []
- id: mm_stop_mm
  label: MM_C_STOP_MM
  kind: action
  command: "0x0A1F"
  params: []
- id: mm_start_mon_mm
  label: MM_C_START_MON_MM
  kind: action
  command: "0x0A45"
  params: []
- id: mm_stop_mon_mm
  label: MM_C_STOP_MON_MM
  kind: action
  command: "0x0A46"
  params: []
- id: mm_set_mic_oper_mode
  label: MM_C_SET_MIC_OPER_MODE
  kind: action
  command: "0x0A34"
  params:
    - name: wOperationMode
      type: word
      description: MM_C_OPERATOR_WITH_REQ_LIST, MM_C_DELEGATE_WITH_REQ_LIST, MM_C_DELEGATE_WITH_OVERRIDE, MM_C_DELEGATE_WITH_VOICE, MM_C_OPERATOR_WITH_COMMENT_LIST, or MM_C_DELEGATE_WITH_PUSHTOTALK
- id: mm_set_active_mics
  label: MM_C_SET_ACTIVE_MICS
  kind: action
  command: "0x0A35"
  params:
    - name: wActiveMics
      type: integer
      description: 1..4
- id: mm_get_settings
  label: MM_C_GET_SETTINGS
  kind: query
  command: "0x0A20"
  params: []
- id: mm_set_settings
  label: MM_C_SET_SETTINGS
  kind: action
  command: "0x0A21"
  params:
    - name: tSettings
      type: MM_T_CCU_GLOBAL_SETTINGS
- id: mm_set_micro_on_off
  label: MM_C_SET_MICRO_ON_OFF
  kind: action
  command: "0x0A22"
  params:
    - name: wUnitId
      type: word
    - name: bMicroOn
      type: boolean
- id: mm_spk_append
  label: MM_C_SPK_APPEND
  kind: action
  command: "0x0A30"
  params:
    - name: tSpk
      type: MM_T_SPK_MICRO
- id: mm_spk_remove
  label: MM_C_SPK_REMOVE
  kind: action
  command: "0x0A31"
  params:
    - name: wUnitId
      type: word
- id: mm_spk_clear
  label: MM_C_SPK_CLEAR
  kind: action
  command: "0x0A2F"
  params: []
- id: mm_spk_get
  label: MM_C_SPK_GET
  kind: query
  command: "0x0A2E"
  params: []
- id: mm_cs_remove
  label: MM_C_CS_REMOVE
  kind: action
  command: "0x0A43"
  params:
    - name: wUnitId
      type: word
- id: mm_cs_get
  label: MM_C_CS_GET
  kind: query
  command: "0x0A44"
  params: []
- id: mm_nbk_remove
  label: MM_C_NBK_REMOVE
  kind: action
  command: "0x0A2D"
  params:
    - name: wUnitId
      type: word
- id: mm_nbk_clear
  label: MM_C_NBK_CLEAR
  kind: action
  command: "0x0A2C"
  params: []
- id: mm_nbk_get
  label: MM_C_NBK_GET
  kind: query
  command: "0x0A2B"
  params: []
- id: mm_nbk_set
  label: MM_C_NBK_SET
  kind: action
  command: "0x0A2A"
  params:
    - name: tNbkList
      type: MM_T_CCU_NBKMICROLIST
- id: mm_rts_append
  label: MM_C_RTS_APPEND
  kind: action
  command: "0x0A3E"
  params:
    - name: tRts
      type: MM_T_RTS
- id: mm_rts_remove
  label: MM_C_RTS_REMOVE
  kind: action
  command: "0x0A27"
  params:
    - name: tRts
      type: MM_T_RTS
- id: mm_rts_clear
  label: MM_C_RTS_CLEAR
  kind: action
  command: "0x0A26"
  params: []
- id: mm_rts_get
  label: MM_C_RTS_GET
  kind: query
  command: "0x0A25"
  params: []
- id: mm_rts_set
  label: MM_C_RTS_SET
  kind: action
  command: "0x0A24"
  params:
    - name: tRtsList
      type: MM_T_CCU_RTSLIST
- id: mm_shift
  label: MM_C_SHIFT
  kind: action
  command: "0x0A23"
  params:
    - name: tRts
      type: MM_T_RTS
- id: mm_cr_remove
  label: MM_C_CR_REMOVE
  kind: action
  command: "0x0A40"
  params:
    - name: tRts
      type: MM_T_RTS
- id: mm_cr_get
  label: MM_C_CR_GET
  kind: query
  command: "0x0A42"
  params: []
- id: mm_shift_cr
  label: MM_C_SHIFT_CR
  kind: action
  command: "0x0A41"
  params:
    - name: tRts
      type: MM_T_RTS
- id: mm_set_speechtime_settings
  label: MM_C_SET_SPEECHTIME_SETTINGS
  kind: action
  command: "0x0A3B"
  params:
    - name: tSpeechTime
      type: MM_T_SET_SPEECHTIME_SETTINGS
- id: mm_last_minute_warning
  label: MM_C_LAST_MINUTE_WARNING
  kind: action
  command: "0x0A3C"
  params:
    - name: wUnitId
      type: word
- id: mm_time_finished_warning
  label: MM_C_TIME_FINISHED_WARNING
  kind: action
  command: "0x0A3D"
  params:
    - name: wUnitId
      type: word

# ---------------------------------------------------------------------------
# Camera Control (CC) - app 0x15
# ---------------------------------------------------------------------------
- id: cc_start_camera_app
  label: CC_C_START_CAMERA_APP
  kind: action
  command: "0x1501"
  params: []
- id: cc_stop_camera_app
  label: CC_C_STOP_CAMERA_APP
  kind: action
  command: "0x1502"
  params: []
- id: cc_set_camera_activity
  label: CC_C_SET_CAMERA_ACTIVITY
  kind: action
  command: "0x1503"
  params:
    - name: bCameraActivity
      type: boolean
- id: cc_set_global_settings
  label: CC_C_SET_GLOBAL_SETTINGS
  kind: action
  command: "0x1504"
  params:
    - name: tGlobal
      type: CC_T_GLOBAL_SETTINGS
- id: cc_get_global_settings
  label: CC_C_GET_GLOBAL_SETTINGS
  kind: query
  command: "0x150A"
  params: []
- id: cc_set_camera_assignment
  label: CC_C_SET_CAMERA_ASSIGNMENT
  kind: action
  command: "0x1506"
  params:
    - name: tSet
      type: CC_T_SET_CAMERA_ASSIGNMENT
- id: cc_clear_camera_assignments
  label: CC_C_CLEAR_CAMERA_ASSIGNMENTS
  kind: action
  command: "0x1505"
  params: []
- id: cc_set_camera_id
  label: CC_C_SET_CAMERA_ID
  kind: action
  command: "0x1509"
  params:
    - name: tSet
      type: CC_T_SET_CAMERA_ID
- id: cc_clear_camera_ids
  label: CC_C_CLEAR_CAMERA_IDS
  kind: action
  command: "0x1508"
  params: []
- id: cc_send_data
  label: CC_C_SEND_DATA
  kind: action
  command: "0x1507"
  params:
    - name: tFrame
      type: CC_T_DATA_FRAME
      description: Up to CC_C_MAX_DATA_LEN bytes sent to the connected camera equipment

# ---------------------------------------------------------------------------
# Simultaneous Interpretation (IN) - app 0x02
# ---------------------------------------------------------------------------
- id: in_signal_ccu
  label: IN_C_SIGNAL_CCU
  kind: action
  command: "0x0226"  # deprecated; use IN_C_START_IN_APP / IN_C_STOP_IN_APP
  params: []
- id: in_start_in_app
  label: IN_C_START_IN_APP
  kind: action
  command: "0x0238"
  params: []
- id: in_stop_in_app
  label: IN_C_STOP_IN_APP
  kind: action
  command: "0x0239"
  params: []
- id: in_start_mon_in
  label: IN_C_START_MON_IN
  kind: action
  command: "0x0236"
  params: []
- id: in_stop_mon_in
  label: IN_C_STOP_MON_IN
  kind: action
  command: "0x0237"
  params: []
- id: in_desk_update
  label: IN_C_DESK_UPDATE
  kind: action
  command: "0x0224"
  params:
    - name: tDesk
      type: IN_T_DESK_UPDATE
- id: in_booth_update
  label: IN_C_BOOTH_UPDATE
  kind: action
  command: "0x0225"
  params:
    - name: tBooth
      type: IN_T_BOOTH_UPDATE
- id: in_update_lock
  label: IN_C_UPDATE_LOCK
  kind: action
  command: "0x0249"
  params:
    - name: tLock
      type: IN_T_UPDATE_LCK
- id: in_load_int_db
  label: IN_C_LOAD_INT_DB
  kind: action
  command: "0x0228"
  params:
    - name: tDb
      type: IN_T_DB_DATA
- id: in_channel_update
  label: IN_C_CHANNEL_UPDATE
  kind: action
  command: "0x0229"
  params:
    - name: tChannels
      type: IN_T_CHANNELLANG
- id: in_download_langlist
  label: IN_C_DOWNLOAD_LANGLIST
  kind: action
  command: "0x0232"
  params:
    - name: tLangList
      type: IN_T_RF_LANGLIST
- id: in_set_flash_mic_on
  label: IN_C_SET_FLASH_MIC_ON
  kind: action
  command: "0x0233"
  params:
    - name: bFlashingWhenEngaged
      type: boolean
- id: in_set_floor_dist
  label: IN_C_SET_FLOOR_DIST
  kind: action
  command: "0x0234"
  params:
    - name: bFloorDistribution
      type: boolean
- id: in_get_floor_dist
  label: IN_C_GET_FLOOR_DIST
  kind: query
  command: "0x0235"
  params: []
- id: in_set_speakslowly_sign
  label: IN_C_SET_SPEAKSLOWLY_SIGN
  kind: action
  command: "0x0244"
  params:
    - name: bSpeakSlowlySign
      type: boolean
- id: in_get_speakslowly_sign
  label: IN_C_GET_SPEAKSLOWLY_SIGN
  kind: query
  command: "0x0245"
  params: []
- id: in_set_help_sign
  label: IN_C_SET_HELP_SIGN
  kind: action
  command: "0x0246"
  params:
    - name: bHelpSign
      type: boolean
- id: in_get_help_sign
  label: IN_C_GET_HELP_SIGN
  kind: query
  command: "0x0247"
  params: []

# ---------------------------------------------------------------------------
# Voting (VT) - app 0x01 - function IDs only; detailed structs not in this excerpt
# ---------------------------------------------------------------------------
- id: vt_start_app
  label: VT_C_START_APP
  kind: action
  command: "0x0101"
  params: []  # UNRESOLVED: detailed parameters not in source excerpt
- id: vt_stop_app
  label: VT_C_STOP_APP
  kind: action
  command: "0x0102"
  params: []
- id: vt_start_voting
  label: VT_C_START_VOTING
  kind: action
  command: "0x0103"
  params: []
- id: vt_stop_voting
  label: VT_C_STOP_VOTING
  kind: action
  command: "0x0104"
  params: []
- id: vt_hold_voting
  label: VT_C_HOLD_VOTING
  kind: action
  command: "0x0105"
  params: []
- id: vt_restart_voting
  label: VT_C_RESTART_VOTING
  kind: action
  command: "0x0106"
  params: []
- id: vt_download_subject
  label: VT_C_DOWNLOAD_SUBJECT
  kind: action
  command: "0x0107"
  params: []
- id: vt_set_global_settings
  label: VT_C_SET_GLOBAL_SETTINGS
  kind: action
  command: "0x0109"
  params: []
- id: vt_set_votingparams
  label: VT_C_SET_VOTINGPARAMS
  kind: action
  command: "0x010A"
  params: []
- id: vt_get_results
  label: VT_C_GET_RESULTS
  kind: query
  command: "0x010C"
  params: []
- id: vt_get_attention_tone
  label: VT_C_GET_ATTENTION_TONE
  kind: query
  command: "0x0118"
  params: []
- id: vt_set_attention_tone
  label: VT_C_SET_ATTENTION_TONE
  kind: action
  command: "0x0119"
  params: []
- id: vt_start_attention_tone
  label: VT_C_START_ATTENTION_TONE
  kind: action
  command: "0x011A"
  params: []

# ---------------------------------------------------------------------------
# Attendance Registration / Access Control (AT) - IDs 0x0901..
# ---------------------------------------------------------------------------
- id: at_start_at_app
  label: AT_C_START_AT_APP
  kind: action
  command: "0x0901"
  params: []
- id: at_stop_at_app
  label: AT_C_STOP_AT_APP
  kind: action
  command: "0x0902"
  params: []
- id: at_store_setting
  label: AT_C_STORE_SETTING
  kind: action
  command: "0x0903"
  params: []
- id: at_activate
  label: AT_C_ACTIVATE
  kind: action
  command: "0x0904"
  params: []
- id: at_handle_identification
  label: AT_C_HANDLE_IDENTIFICATION
  kind: action
  command: "0x0905"
  params: []
- id: at_get_indiv_registration
  label: AT_C_GET_INDIV_REGISTRATION
  kind: query
  command: "0x0906"
  params: []
- id: at_send_indiv_registration
  label: AT_C_SEND_INDIV_REGISTRATION
  kind: action
  command: "0x090A"
  params: []
- id: at_send_total_registration
  label: AT_C_SEND_TOTAL_REGISTRATION
  kind: action
  command: "0x090B"
  params: []

# ---------------------------------------------------------------------------
# Text & Status Display (LD) - app 0x0C
# ---------------------------------------------------------------------------
- id: ld_start_ld_app
  label: LD_C_START_LD_APP
  kind: action
  command: "0x0C0C"
  params: []
- id: ld_stop_ld_app
  label: LD_C_STOP_LD_APP
  kind: action
  command: "0x0C0D"
  params: []
- id: ld_store_display_setting
  label: LD_C_STORE_DISPLAY_SETTING
  kind: action
  command: "0x0C0E"
  params: []
- id: ld_clear_display_nr
  label: LD_C_CLEAR_DISPLAY_NR
  kind: action
  command: "0x0C0B"
  params: []
- id: ld_send_anum_data
  label: LD_C_SEND_ANUM_DATA
  kind: action
  command: "0x0C07"
  params: []

# ---------------------------------------------------------------------------
# Message Distribution (MD) - app 0x0A (shares ID range with MM)
# ---------------------------------------------------------------------------
- id: md_send_message_to_units
  label: MD_C_SEND_MESSAGE_TO_UNITS
  kind: action
  command: "0x0A00"
  params:
    - name: tSend
      type: MD_T_SEND_MESS
- id: md_clear_message_on_units
  label: MD_C_CLEAR_MESSAGE_ON_UNITS
  kind: action
  command: "0x0A01"
  params: []
- id: md_start_mon_md
  label: MD_C_START_MON_MD
  kind: action
  command: "0x0A02"
  params: []
- id: md_stop_mon_md
  label: MD_C_STOP_MON_MD
  kind: action
  command: "0x0A03"
  params: []
- id: md_aux_led_control
  label: MD_C_AUX_LED_CONTROL
  kind: action
  command: "0x0A04"
  params: []

# ---------------------------------------------------------------------------
# Intercom (IC) - app 0x07
# ---------------------------------------------------------------------------
- id: ic_start_ic_app
  label: IC_C_START_IC_APP
  kind: action
  command: "0x0701"
  params: []
- id: ic_close_ic_app
  label: IC_C_CLOSE_IC_APP
  kind: action
  command: "0x0702"
  params: []
- id: ic_set_links
  label: IC_C_SET_LINKS
  kind: action
  command: "0x0703"
  params: []
- id: ic_clear_links
  label: IC_C_CLEAR_LINKS
  kind: action
  command: "0x0705"
  params: []
```

## Feedbacks
```yaml
# One entry per observable state reported in a query response.
- id: ccu_version_info
  type: object
  description: |
    Response to SC_C_GET_CCU_VERSIONINFO. Fields: tOperatingMode, szSwVersion
    (zero-terminated), byMajorVersionOfDownloadedSw, byMinorVersionOfDownloadedSw,
    byMajorVersionOfResidentSw, byMinorVersionOfResidentSw, bySystemMode
    (DCNC_SM_DOWN/INIT/CONFIG/CONGRESS/MAINTENANCE/DOWNLOAD),
    tCCUType (SC_C_DCN_CCU2 or SC_C_DCN_CCUB2), byTCBVersion, szSWRelNum.
- id: ccu_configuration
  type: object
  description: |
    Response to SC_C_GET_CCU_CONFIG_PROPERTY. wNumberOfSlaveCCUs (0..16),
    wNumberOfUnitsConnected, wNumberOfUnits, tUnitData[] (byUnitType +
    wUnitProperties bitmask of DCNC_HAS_MIC / DCNC_HAS_AUX / DCNC_HAS_KEYS /
    DCNC_HAS_CARD / DCNC_HAS_DISPLAY / DCNC_HAS_GRAPHICAL_DISPLAY /
    DCNC_HAS_INTERCOM / DCNC_HAS_EXTERNAL / DCNC_HAS_BOOTH_DESK /
    DCNC_HAS_HELP / DCNC_HAS_SPEAKSLOWLY / DCNC_HAS_BATTERY /
    DCNC_HAS_QUALITY_LEVEL / DCNC_HAS_DATACHANNEL_SUPPORT /
    DCNC_HAS_MOST_INTERFACE / DCNC_HAS_NEED_FOR_CARD_SETTINGS).
- id: mm_global_settings
  type: object
  description: |
    Response to MM_C_GET_SETTINGS. wOperationMode, wActiveMics (1..4),
    wMaxRTSListLen (0..100), bAllowCancelRequests, bAllowMicroOff,
    wAttentionTone (MM_C_ATTENTION_OFF / _TONE1 / _TONE2 / _TONE3),
    bAmbientMicCtrl, bAutoMicOff (auto-off after 30s no speech),
    bPrioCancelAll.
- id: spk_list
  type: object
  description: Response to MM_C_SPK_GET. Array of {wUnitId, bMicroOn}.
- id: cs_list
  type: object
  description: Response to MM_C_CS_GET. Array of MM_T_SPK_MICRO (Comment Speakers).
- id: nbk_list
  type: object
  description: |
    Response to MM_C_NBK_GET. Array of {wUnitId, wMicroType
    (MM_C_VIP_CHAIRMAN / _VIP_KEY / _VIP_OPERATOR / _VIP_VOICE /
    _VIP_VCHAIR / _CHAIRMAN_NO_AC / _KEY_NO_AC / _OPERATOR_NO_AC /
    _VOICE_NO_AC / _VCHAIR_NO_AC / _VIP_PTTCHAIRMAN / _VIP_PTT /
    _VIP_PTTCHAIRMAN_NO_AC / _VIP_PTT_NO_AC), bMicroOn}.
- id: rts_list
  type: object
  description: Response to MM_C_RTS_GET. Array of {wUnitId, wDelegateId}.
- id: cr_list
  type: object
  description: Response to MM_C_CR_GET. Array of MM_T_RTS.
- id: ext_contact
  type: enum
  description: Response to SI_C_GET_EXT_CONTACT.
  values: [SI_C_NO_FUNCTION, SI_C_PRESENT, SI_C_FRAUD]
- id: microphone_gain
  type: integer
  description: Response to SI_C_GET_MICROPHONE_GAIN. 0..15 (-6dB..+9dB).
- id: operation_mode
  type: object
  description: |
    Response to SI_C_GET_OPERATION_MODE. byStartupMode (0=single, 1=multi,
    2=standalone), bySlaveId (0..31).
- id: wap_settings
  type: object
  description: |
    Response to SI_C_GET_WAP_SETTINGS. byCarrier
    (SI_C_CARRIER_BAND_1 / _BAND_2 / _BAND_3), byPowerLevel
    (SI_C_POWERLEVEL_OFF / _LOW / _MEDIUM / _HIGH), byOptions.
- id: wireless_settings
  type: object
  description: |
    Response to SI_C_GET_WIRELESS_SETTINGS. bySystemId (0..15),
    byRepetitions (0..2).
- id: network_mode
  type: enum
  description: Response to SI_C_GET_NETWORK_MODE.
  values: [SI_C_NETWORK_MODE_ON, SI_C_NETWORK_MODE_SLEEP, SI_C_NETWORK_MODE_OFF, SI_C_NETWORK_MODE_SUBSCRIPTION]
- id: encryption_enabled
  type: boolean
  description: Response to SC_C_GET_ENCRYPTION_ENABLED.
- id: floor_distribution
  type: boolean
  description: Response to IN_C_GET_FLOOR_DIST.
- id: speakslowly_sign
  type: boolean
  description: Response to IN_C_GET_SPEAKSLOWLY_SIGN.
- id: help_sign
  type: boolean
  description: Response to IN_C_GET_HELP_SIGN.
```

## Variables
```yaml
# Settable parameters that are not discrete actions.
- id: master_volume
  type: integer
  range: 0..25
  description: SI_C_SET_MASTER_VOL target. 0 = mute all delegate loudspeakers; 1..25 = -12dB..+12dB in 1dB steps.
- id: microphone_gain
  type: integer
  range: 0..15
  description: SI_C_SET_MICROPHONE_GAIN target. 0..15 = -6dB..+9dB in 1dB steps.
- id: speech_time_limit
  type: integer
  description: MM_C_SET_SPEECHTIME_SETTINGS. Speech time limit in minutes.
- id: speech_timer_on
  type: boolean
  description: MM_C_SET_SPEECHTIME_SETTINGS. TRUE: use the speech timer.
- id: hold_on_chair_priority
  type: boolean
  description: MM_C_SET_SPEECHTIME_SETTINGS. TRUE: hold timer when chairman presses Prio.
- id: show_remaining_time
  type: boolean
  description: MM_C_SET_SPEECHTIME_SETTINGS. TRUE: down-counting timer.
- id: led_follow_mic_led
  type: boolean
  description: MM_C_SET_SPEECHTIME_SETTINGS. TRUE: LED ring follows flashing mic LED.
- id: active_mics
  type: integer
  range: 1..4
  description: MM_C_SET_ACTIVE_MICS - maximum number of simultaneously open delegate microphones.
- id: mic_operation_mode
  type: enum
  description: MM_C_SET_MIC_OPER_MODE.
  values:
    - MM_C_OPERATOR_WITH_REQ_LIST
    - MM_C_DELEGATE_WITH_REQ_LIST
    - MM_C_DELEGATE_WITH_OVERRIDE
    - MM_C_DELEGATE_WITH_VOICE
    - MM_C_OPERATOR_WITH_COMMENT_LIST
    - MM_C_DELEGATE_WITH_PUSHTOTALK
- id: wap_carrier
  type: enum
  description: SI_C_SET_WAP_SETTINGS.
  values: [SI_C_CARRIER_BAND_1, SI_C_CARRIER_BAND_2, SI_C_CARRIER_BAND_3]
- id: wap_power_level
  type: enum
  description: SI_C_SET_WAP_SETTINGS.
  values: [SI_C_POWERLEVEL_OFF, SI_C_POWERLEVEL_LOW, SI_C_POWERLEVEL_MEDIUM, SI_C_POWERLEVEL_HIGH]
- id: install_mode
  type: enum
  description: SI_C_START_INSTALL.
  values: [SI_C_GLOBAL_INSTALL_MODE, SI_C_OPERATIONAL_INSTALL_MODE]
- id: camera_movement_time
  type: integer
  range: 0..254
  description: CC_C_SET_GLOBAL_SETTINGS.byMovementTime in half-second units (255 = error).
- id: camera_override_mode
  type: boolean
  description: CC_C_SET_GLOBAL_SETTINGS.bCameraOverrideMode.
- id: num_of_audience_mon
  type: integer
  range: 1..4
  description: CC_C_SET_GLOBAL_SETTINGS.byNumOfAudienceMon.
- id: seat_text_mode
  type: enum
  description: CC_C_SET_GLOBAL_SETTINGS.bySeatTextMode.
  values: [CC_C_SCREEN_LINE, CC_C_SCREEN_LINE_DOUBLE, CC_C_SEAT_TEXT, CC_C_SEAT_TEXT_DOUBLE]
- id: camera_control_type
  type: enum
  description: CC_C_SET_GLOBAL_SETTINGS.byCameraControlType.
  values: [CC_C_NO_CAMERA_CONTROL_TYPE, CC_C_ALLEGIANT_VIDEO_SWITCHER, CC_C_DIRECT_CAMERA_CONTROL]
```

## Events
```yaml
# Unsolicited notifications sent by the CCU. Each carries wFnId with byDcnMsgType=5 (MDSC_NOTIFY).
# Order follows §3.4, §3.6, §5.3, §6.3, §7.3, §11.3, §12.3 of the source.

# ---- SC notifications (§3.4) ----
- id: sc_ccu_reboot
  trigger: SC_C_CCU_REBOOT
  command: "0x100F"
  description: CCU restart notification (always sent at start-up). Same payload as SC_C_GET_CCU_VERSIONINFO response.
- id: sc_connect_unit
  trigger: SC_C_CONNECT_UNIT
  command: "0x1009"
  description: New unit connected to CCU. Carries SC_T_UNIT_DATA.
- id: sc_disconnect_unit
  trigger: SC_C_DISCONNECT_UNIT
  command: "0x100A"
  description: Unit lost connection.
- id: sc_connect_slave_ccu
  trigger: SC_C_CONNECT_SLAVE_CCU
  command: "0x100D"
  description: Slave CCU connected to master. Carries {bySlaveId, tConnectedUnits[]}.
- id: sc_disconnect_slave_ccu
  trigger: SC_C_DISCONNECT_SLAVE_CCU
  command: "0x100E"
  description: Slave CCU disconnected.
- id: sc_ccu_mode_change
  trigger: SC_C_CCU_MODE_CHANGE
  command: "0x1010"
  description: {wCurrentMode, wNewMode}.
- id: sc_serial_nr
  trigger: SC_C_SERIAL_NR
  command: "0x1038"
  description: Response to SC_C_REQ_SERIAL_NR. {tUnitId, dwSerialNr}.
- id: sc_battery_status
  trigger: SC_C_BATTERY_STATUS
  command: "0x102B"
  description: {byBatteryLevel 0..100%, wRemainingTime in minutes; 0xFFFF = no battery}.
- id: sc_battery_info_serial
  trigger: SC_C_BATTERY_INFO_SERIAL
  command: "0x102C"
  description: {tUnitId, dwSerialNr}.
- id: sc_battery_info_cond
  trigger: SC_C_BATTERY_INFO_COND
  command: "0x102D"
  description: {wChargeCount}.
- id: sc_signal_status
  trigger: SC_C_SIGNAL_STATUS
  command: "0x102E"
  description: SC_C_SIGNAL_EXCELLENT / _GOOD / _POOR.
- id: sc_signal_quality
  trigger: SC_C_SIGNAL_QUALITY
  command: "0x102F"
  description: {bBadSignal TRUE/FALSE}.
- id: sc_unit_signal_quality
  trigger: SC_C_UNIT_SIGNAL_QUALITY
  command: "0x103A"
  description: {tUnitId, bBadSignal}.
- id: sc_low_battery
  trigger: SC_C_LOW_BATTERY
  command: "0x1044"
  description: {bLowBattery TRUE if at least one unit is low}.
- id: sc_encryption_enabled
  trigger: SC_C_ENCRYPTION_ENABLED
  command: "0x1041"
  description: {bEnabled - wireless network encryption status}.

# ---- SI notifications (§3.6) ----
- id: si_register_unit
  trigger: SI_C_REGISTER_UNIT
  command: "0x1109"
  description: Soft-key pressed on installable unit during global installation.
- id: si_microphone_gain
  trigger: SI_C_MICROPHONE_GAIN
  command: "0x1121"
  description: Microphone gain of a unit changed.
- id: si_microphone_gain_reset
  trigger: SI_C_MICROPHONE_GAIN_RESET
  command: "0x1122"
  description: Microphone gain for all units was reset.
- id: si_wap_settings
  trigger: SI_C_WAP_SETTINGS
  command: "0x1118"
  description: WAP settings changed.
- id: si_wireless_settings
  trigger: SI_C_WIRELESS_SETTINGS
  command: "0x1119"
  description: Wireless system settings changed.
- id: si_network_mode
  trigger: SI_C_NETWORK_MODE
  command: "0x111A"
  description: Network mode changed.

# ---- MM notifications (§5.3) ----
- id: mm_set_mic_oper_mode_on_pc
  trigger: MM_C_SET_MIC_OPER_MODE_ON_PC
  command: "0x0A12"
  description: Microphone operation mode changed.
- id: mm_set_active_mics_on_pc
  trigger: MM_C_SET_ACTIVE_MICS_ON_PC
  command: "0x0A13"
  description: Active microphone count changed.
- id: mm_set_settings_on_pc
  trigger: MM_C_SET_SETTINGS_ON_PC
  command: "0x0A15"
  description: Global MM settings changed.
- id: mm_micro_on_off
  trigger: MM_C_MICRO_ON_OFF
  command: "0x0A01"
  description: Microphone state of a unit changed. {wMicroId: PC_MIC_ON/OFF/NONE, wPrioId: PC_PRIO_ON/OFF/NONE}.
- id: mm_nr_chair_mics_on
  trigger: MM_C_NR_CHAIR_MICS_ON
  command: "0x0A02"
  description: Number of chairmen with mic/prio active.
- id: mm_spk_set_on_pc
  trigger: MM_C_SPK_SET_ON_PC
  command: "0x0A0C"
  description: Complete new SPK list.
- id: mm_spk_clear_on_pc
  trigger: MM_C_SPK_CLEAR_ON_PC
  command: "0x0A0D"
  description: SPK list cleared.
- id: mm_spk_append_on_pc
  trigger: MM_C_SPK_APPEND_ON_PC
  command: "0x0A0E"
  description: Unit added to SPK.
- id: mm_spk_remove_on_pc
  trigger: MM_C_SPK_REMOVE_ON_PC
  command: "0x0A0F"
  description: Unit removed from SPK.
- id: mm_spk_insert_on_pc
  trigger: MM_C_SPK_INSERT_ON_PC
  command: "0x0A10"
  description: Speaker inserted before another speaker.
- id: mm_spk_replace_on_pc
  trigger: MM_C_SPK_REPLACE_ON_PC
  command: "0x0A11"
  description: Speaker replaced.
- id: mm_cs_clear_on_pc
  trigger: MM_C_CS_CLEAR_ON_PC
  command: "0x0A1A"
  description: CS list cleared.
- id: mm_cs_add_on_pc
  trigger: MM_C_CS_ADD_ON_PC
  command: "0x0A1B"
  description: Unit added to CS list.
- id: mm_cs_remove_on_pc
  trigger: MM_C_CS_REMOVE_ON_PC
  command: "0x0A1C"
  description: Unit removed from CS list.
- id: mm_nbk_remove_on_pc
  trigger: MM_C_NBK_REMOVE_ON_PC
  command: "0x0A0B"
  description: Notebook unit removed.
- id: mm_nbk_set_on_pc
  trigger: MM_C_NBK_SET_ON_PC
  command: "0x0A09"
  description: Complete new notebook list.
- id: mm_rts_set_on_pc
  trigger: MM_C_RTS_SET_ON_PC
  command: "0x0A04"
  description: Complete new RTS list.
- id: mm_rts_clear_on_pc
  trigger: MM_C_RTS_CLEAR_ON_PC
  command: "0x0A05"
  description: RTS list cleared.
- id: mm_rts_remove_on_pc
  trigger: MM_C_RTS_REMOVE_ON_PC
  command: "0x0A06"
  description: RTS entry removed.
- id: mm_rts_first_on_pc
  trigger: MM_C_RTS_FIRST_ON_PC
  command: "0x0A14"
  description: First entry in RTS list.
- id: mm_rts_insert_on_pc
  trigger: MM_C_RTS_INSERT_ON_PC
  command: "0x0A07"
  description: RTS entry inserted before another.
- id: mm_rts_replace_on_pc
  trigger: MM_C_RTS_REPLACE_ON_PC
  command: "0x0A08"
  description: RTS entry replaced.
- id: mm_cr_clear_on_pc
  trigger: MM_C_CR_CLEAR_ON_PC
  command: "0x0A16"
  description: CR list cleared.
- id: mm_cr_add_on_pc
  trigger: MM_C_CR_ADD_ON_PC
  command: "0x0A17"
  description: CR entry added.
- id: mm_cr_remove_on_pc
  trigger: MM_C_CR_REMOVE_ON_PC
  command: "0x0A18"
  description: CR entry removed.
- id: mm_cr_replace_on_pc
  trigger: MM_C_CR_REPLACE_ON_PC
  command: "0x0A19"
  description: CR entry replaced.
- id: mm_timer_on_off
  trigger: MM_C_TIMER_ON_OFF
  command: "0x0A03"
  description: Speech timer enable state changed.

# ---- CC notifications (§6.3) ----
- id: cc_receive_data
  trigger: CC_C_RECEIVE_DATA
  command: "0x1510"
  description: Data received from connected camera equipment.

# ---- IN notifications (§7.3) ----
- id: in_chan_status
  trigger: IN_C_CHAN_STATUS
  command: "0x0201"
  description: Channel status changed.
- id: in_ccu_config
  trigger: IN_C_CCU_CONFIG
  command: "0x0202"
  description: CCU IN configuration changed.
- id: in_language_list
  trigger: IN_C_LANGUAGE_LIST
  command: "0x0205"
  description: Language list changed.
- id: in_flashing_mic_on
  trigger: IN_C_FLASHING_MIC_ON
  command: "0x0203"
  description: Flashing microphone setting changed.
- id: in_floor_distribution
  trigger: IN_C_FLOOR_DISTRIBUTION
  command: "0x0204"
  description: Floor distribution setting changed.
- id: in_speakslowly_sign
  trigger: IN_C_SPEAKSLOWLY_SIGN
  command: "0x0206"
  description: Speak slowly signaling setting changed.
- id: in_help_sign
  trigger: IN_C_HELP_SIGN
  command: "0x0207"
  description: Help signaling setting changed.

# ---- IC notifications (§12.3) ----
- id: ic_upd_available_lines
  trigger: IC_UPD_AVAILABLE_LINES
  command: "0x0706"
  description: Available intercom lines changed.
- id: ic_upd_operator_state
  trigger: IC_UPD_OPERATOR_STATE
  command: "0x0707"
  description: Intercom operator state changed.
- id: ic_upd_connection_info
  trigger: IC_UPD_CONNECTION_INFO
  command: "0x0708"
  description: Intercom connection info changed.
- id: ic_upd_incoming_call
  trigger: IC_UPD_INCOMING_CALL
  command: "0x0709"
  description: Incoming intercom call.

# ---- MD notifications (§11.3) ----
- id: md_req_button_on_off
  trigger: MD_C_REQ_BUTTON_ON_OFF
  command: "0x0A0A"
  description: Auxiliary button on/off state.

# ---- VT notifications (§8, function IDs only in source) ----
- id: vt_resultsnotify
  trigger: VT_C_RESULTSNOTIFY
  command: "0x0117"
  description: Voting results updated. (Detailed struct not in source excerpt.)
```

## Macros
```yaml
# Multi-step sequences described explicitly in source.
- id: typical_voting_round
  description: |
    Source §8 (voting chapter not in this refined excerpt - referenced by Appendix
    B function IDs and Chapter 5 list of operations).
  steps: []  # UNRESOLVED: detailed voting flow not in source excerpt
- id: scsi_startup_with_installation
  description: |
    Per UNIT-EVENT MATRIX (Single-CCU): On CCU power-on, register via
    SC_C_START_APP, then query SC_C_GET_CCU_VERSIONINFO, then SC_C_GET_CCU_CONFIG,
    then SI_C_START_INSTALL and run installation per Appendix D example-1.
  steps:
    - id: sc_start_app
    - id: sc_get_ccu_versioninfo
    - id: sc_get_ccu_config_property
    - id: si_start_install
```

## Safety
```yaml
confirmation_required_for: []  # UNRESOLVED: no safety-critical confirmation steps in source
interlocks:
  - description: |
      IN_C_UPDATE_LOCK - interlock mode between booths (byBetween) and within
      a booth (byWithin). Modes: IN_C_NONEMODE, IN_C_OVERRIDE, IN_C_INTERLOCK,
      IN_C_OVERRIDE_ON_B_ONLY. Error IN_E_INTERLOCK_NOT_ALLOWED returned for
      disallowed combinations.
  - description: |
      bPrioCancelAll - TRUE: delegates' microphones stay off after chairman
      releases Prio (chairman-priority interlock).
  - description: |
      bAutoMicOff - TRUE: active microphones are automatically switched off
      after 30 seconds with no speech detected.
  - description: |
      Mic-list constraints: only Chairman units may always be in SPK; non-chairman
      VIP types subject to MM_E_ILLEGAL_MICRO_TYPE; SPK list full returns
      MM_E_SPEAKERS_LIST_FULL; RTS list full returns MM_E_RTS_LIST_FULL.
```

## Notes
- Protocol is a binary, little-endian, message-based RPC over a single TCP/IP stream on port **9451**. The remote controller opens the connection; the CCU listens. No authentication handshake is documented — `auth.type: none` is inferred from the absence of any login procedure in the source.
- Message frame (Ethernet layer, §2.2.3): `DWORD dwMessageType | DWORD dwLength | DWORD dwReserved1 | DWORD dwReserved2 | BYTE[] byData`. Min 8 bytes, max 8000 bytes.
- DCN command message (OIP_Dcn, §2.2.3.3): wraps the RPC payload with `OIP_DCN_MSGTYPE` header `BYTE byDcnMsgType | WORD wFnId | BYTE byMessageTypeHeader=0x43`. `byDcnMsgType` is one of MDSC_REMOTEPROCEDURE_REQ=3, MDSC_REMOTEPROCEDURE_RSP=4, MDSC_NOTIFY=5, MDSC_NAK=2.
- The exact value of `MESSAGETYPE_OIP_Dcn` is **not stated** in the source excerpt (only `MESSAGETYPE_OIP_KeepAlive=0x00447027` and `MESSAGETYPE_OIP_ResponseProtocolError=0x00447020` are given in Appendix B).
- The remote controller must **wait for the response** before issuing another request; typical response time is < 0.5 s, max 10 s (§2.3.2).
- Heartbeat: send `MESSAGETYPE_OIP_KeepAlive` every 5 s when idle. The CCU closes the connection if no message arrives within 15 s (§2.3.1.1.2). Recommended to also heartbeat from the CCU side.
- Each application (SC, SI, DB, MM, CC, IN, VT, AT, LD, MD, IC) requires the controller to call its `*_C_START_*` / `*_C_START_IN_APP` / `*_C_START_IC_APP` etc. remote function to begin receiving notifications; call the matching `*_C_STOP_*` to stop. A `use count` is incremented per registration — multiple controllers may register simultaneously.
- System modes: Init, Config, Congress, Maintenance, Download, Down. Per-function availability is documented in §3.1.2 of the source.
- Booth numbering for interpreter desks: 1..31, desks per booth 1..6. A/B channels: 1..DBSC_MAX_INTERPRT_CHANNEL (31).
- **Open Interface must be licensed** (order code **LBB4187/00**) and enabled via the `Download and Licensing Tool` shipped on the DCN DVD. Without this license the interface is not active even though port 9451 may be reachable.
- All numeric constants used in the source are little-endian on the wire; MKWORD(LSB,MSB) macro produces a 16-bit WORD = (MSB<<8)|LSB, e.g. `SC_C_CHECK_LINK = MKWORD(18, 16) = 0x1012`.
- Capacity limits (Appendix B): DBSC_MAX_ACT_UNIT=576, DBSC_MAX_SPEAKERLIST=4, DBSC_MAX_NOTEBOOKLIST=15, DBSC_MAX_DELRTS=100, DBSC_MAX_DELCR=5, DBSC_MAX_DELCS=1, DBSC_MAX_INTERPRT_CHANNEL=31, DBSC_MAX_INTBOOTH=31, DBSC_MAX_DESK_PER_BOOTH=6, DBSC_MAX_LANGNAME=53, DBSC_MAX_CAMERA=256, DBSC_MAX_PREPOSITION=99.
- **UNRESOLVED:** Application manual cross-references for parameter struct semantics (e.g. exact `SC_C_SET_ENCRYPTION_ENABLED` parameter list, full `VT_C_*` parameter sets, full `AT_C_*` parameter sets, full `LD_C_*` parameter sets, full `IC_C_*` parameter sets) — this generic Open Interface spec only provides the function IDs and high-level descriptions; the per-application manuals (referenced but not present in this refined excerpt) carry the full C struct definitions.
- **UNRESOLVED:** Voting chapter (§8) not present in this refined excerpt; VT function IDs are listed in Appendix B but per-function parameter structures are not in the source. The DCNC_APP_VT value (1) is given but per-action `params` blocks are not populated.
- **UNRESOLVED:** Cable pinout / RS-232 handshaking — the RS-232 signal definitions table in §1.3 is a generic reference table; the Open Interface itself is TCP/IP only.
- **UNRESOLVED:** Hardware specifications (voltage, current, power consumption, dimensions, weight) — not in this protocol spec; product datasheet would carry these.
- **UNRESOLVED:** Firmware version compatibility ranges — the OMF (executable downloaded into CCU ROM) version is reported via `szSWRelNum` and `byMajorVersionOfDownloadedSw/MinorVersionOfDownloadedSw`, but no compatibility matrix is stated in the source.

## Provenance

```yaml
source_domains:
  - assets.catalog.boschbuildingtechnologies.com
  - resources.keenfinity.tech
source_urls:
  - https://assets.catalog.boschbuildingtechnologies.com/public/documents/OI_Operation_Manual_enUS_12284426251.pdf
  - https://resources.keenfinity.tech/public/documents/LBB_4187_00_QRC_Quick_Installation_Guide_enUS_13259287819.pdf
retrieved_at: 2026-04-26T16:48:40.552Z
last_checked_at: 2026-06-02T17:21:45.991Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:45.991Z
matched_actions: 138
action_count: 138
confidence: medium
summary: "All 138 spec action wFnId hex values confirmed via MKWORD calculations in Appendix B; transport port 9451 confirmed; 4 callable source functions absent from spec but coverage ratio 138/142 = 0.97 exceeds 0.9 floor. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- SC_C_GET_CCU_CONFIG
- MM_C_RTS_INSERT
- IN_C_ASSIGN_UNIT
- IN_C_UNASSIGN_UNIT
- "voting chapter (§8) not present in refined excerpt; only Appendix B function IDs available. DCNC_APP_VT, SC, SI, etc. application-name mapping provided. Source is the \"Open Interface\" generic spec — individual application manuals describe per-function parameter structures."
- "MESSAGETYPE_OIP_Dcn constant value not stated in source (only KeepAlive=0x00447027 and ResponseProtocolError=0x00447020 given)."
- "MESSAGETYPE_OIP_Dcn value not stated; other OIP types in 0x00447xxx range"
- "detailed parameters not in source excerpt"
- "detailed voting flow not in source excerpt"
- "no safety-critical confirmation steps in source"
- "Application manual cross-references for parameter struct semantics (e.g. exact `SC_C_SET_ENCRYPTION_ENABLED` parameter list, full `VT_C_*` parameter sets, full `AT_C_*` parameter sets, full `LD_C_*` parameter sets, full `IC_C_*` parameter sets) — this generic Open Interface spec only provides the function IDs and high-level descriptions; the per-application manuals (referenced but not present in this refined excerpt) carry the full C struct definitions."
- "Voting chapter (§8) not present in this refined excerpt; VT function IDs are listed in Appendix B but per-function parameter structures are not in the source. The DCNC_APP_VT value (1) is given but per-action `params` blocks are not populated."
- "Cable pinout / RS-232 handshaking — the RS-232 signal definitions table in §1.3 is a generic reference table; the Open Interface itself is TCP/IP only."
- "Hardware specifications (voltage, current, power consumption, dimensions, weight) — not in this protocol spec; product datasheet would carry these."
- "Firmware version compatibility ranges — the OMF (executable downloaded into CCU ROM) version is reported via `szSWRelNum` and `byMajorVersionOfDownloadedSw/MinorVersionOfDownloadedSw`, but no compatibility matrix is stated in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
