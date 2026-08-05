---
spec_id: admin/bosch-dcn-ng-open-interface
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bosch DCN Next Generation Open Interface Control Spec"
manufacturer: Bosch
model_family: "DCN Next Generation"
aliases: []
compatible_with:
  manufacturers:
    - Bosch
  models:
    - "DCN Next Generation"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.catalog.boschbuildingtechnologies.com
  - iprobesolutions.com
  - mvi-audiovisual.com
  - usermanual.wiki
source_urls:
  - https://assets.catalog.boschbuildingtechnologies.com/public/documents/LBB_4187_00_Operation_Manual_enUS_18014411768759563.pdf
  - https://iprobesolutions.com/docs/manual-configuration-en-us-bosch-dicentis-wireless.pdf
  - https://www.mvi-audiovisual.com/wp-content/uploads/2020/09/ENG-EasyConf-Bosch-Dicentis-Wireless.pdf
  - https://iprobesolutions.com/docs/manual-installation-en-us-bosch-dicentis-wireless.pdf
  - https://usermanual.wiki/Bosch-Security-Systems/DCNMWAP-2631365.pdf
retrieved_at: 2026-05-14T21:13:43.738Z
last_checked_at: 2026-07-12T08:55:41.228Z
generated_at: 2026-07-12T08:55:41.228Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "compatible_with.models should be verified against actual product name — source describes DCN NG system; input specified DCMNWAP which may be a different variant"
  - "remove section if not applicable"
  - "no explicit multi-step macros described - remove section if not applicable"
  - "safety warnings/interlocks not found in source - Open Interface license (LBB4187/00) required per source §1.2"
  - "compatible_with.models — source is \"DCN Next Generation\" not \"DCMNWAP\"; actual model match unknown"
  - "RS-232 serial transport — source mentions RS-232 signal definitions in table but only describes TCP/IP Ethernet control — no serial configuration stated"
  - "auth credentials — Open Interface license required but no password/token described in source"
verification:
  verdict: verified
  checked_at: 2026-07-12T08:55:41.228Z
  matched_actions: 142
  action_count: 142
  confidence: medium
  summary: "Every SC/SI/DB/MM/CC/IN/VT/AT/LD/MD/IC action and feedback in the spec maps 1:1 to a documented remote function or notification (and matching Appendix B define) with matching parameter shapes; transport port 9451 confirmed verbatim. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Bosch DCN Next Generation Open Interface Control Spec

## Summary
Bosch DCN Next Generation (DCN NG) congress management system. Control via Ethernet TCP/IP — the CCU (Central Control Unit) listens on port 9451. Binary message protocol with request/response and unsolicited notifications. Requires Open Interface license (LBB4187/00). No login/password described in source.

<!-- UNRESOLVED: compatible_with.models should be verified against actual product name — source describes DCN NG system; input specified DCMNWAP which may be a different variant -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 9451  # stated: "TCP/IP Port 9451 DCN NG Open Interface protocol port number" (Appendix A.1)
auth:
  type: none  # inferred: no auth/login procedure described in source
```

## Traits
```yaml
# Inferred from command set breadth:
- queryable      # version info, config, status queries present
- routable       # expander routing, channel routing commands present
- levelable      # master volume, microphone gain, expander gain present
```

## Actions
```yaml
# System Configuration (SC) - functions
- id: sc_c_check_link
  label: SC Check Link
  kind: action
  params: []
  description: Validates communication link. Returns immediately.

- id: sc_c_start_app
  label: SC Start App
  kind: action
  params:
    - name: wNrOfInstances
      type: integer
      description: Update use count for SC application

- id: sc_c_stop_app
  label: SC Stop App
  kind: action
  params: []

- id: sc_c_get_ccu_versioninfo
  label: Get CCU Version Info
  kind: query
  params: []
  description: Returns CCU version, operating mode, system mode, CCU type, software/hardware info

- id: sc_c_get_ccu_config
  label: Get CCU Config (deprecated)
  kind: query
  params:
    - name: wClusterIndex
      type: integer
      description: Cluster index (0 = first cluster)
  description: "Deprecated - use SC_C_GET_CCU_CONFIG_PROPERTY. Returns unit-number and type per connected unit (no wUnitProperties). Source §3.2.6."

- id: sc_c_get_ccu_config_property
  label: Get CCU Config Property
  kind: query
  params:
    - name: wClusterIndex
      type: integer
      description: Cluster index (0 = first cluster)

- id: sc_c_req_serial_nr
  label: Request Serial Numbers
  kind: query
  params:
    - name: wNrOfUnits
      type: integer
    - name: tUnitId
      type: array
      items:
        type: integer
      description: Unit identifiers (0x1023 = master controller)

- id: sc_c_get_slave_nodes
  label: Get Slave Nodes
  kind: query
  params:
    - name: wNrOfSerialNrs
      type: integer
    - name: dwSerialNr
      type: array
      items:
        type: integer

- id: sc_c_get_unit_ids
  label: Get Unit IDs
  kind: query
  params:
    - name: dwSerialNr
      type: integer
      description: Serial number to look up

- id: sc_c_battery_status_req
  label: Battery Status Request
  kind: query
  params:
    - name: wNrOfUnits
      type: integer
    - name: tUnitList
      type: array
      items:
        type: integer

- id: sc_c_battery_info_req
  label: Battery Info Request
  kind: query
  params:
    - name: wNrOfUnits
      type: integer
    - name: tUnitList
      type: array
      items:
        type: integer

- id: sc_c_signal_status_req
  label: Signal Status Request
  kind: query
  params:
    - name: wNrOfUnits
      type: integer
    - name: tUnitList
      type: array
      items:
        type: integer

- id: sc_c_signal_quality_req
  label: Signal Quality Request
  kind: query
  params:
    - name: wNrOfUnits
      type: integer
    - name: tUnitList
      type: array
      items:
        type: integer

- id: sc_c_unit_signal_quality_req
  label: Unit Signal Quality Request
  kind: query
  params:
    - name: wNrOfUnits
      type: integer
    - name: tUnitList
      type: array
      items:
        type: integer

- id: sc_c_low_battery_req
  label: Low Battery Request
  kind: query
  params: []
  description: Request global low battery status of the system (source §3.2.16)

- id: sc_c_get_encryption_enabled
  label: Get Encryption Enabled
  kind: query
  params: []

- id: sc_c_set_encryption_enabled
  label: Set Encryption Enabled
  kind: action
  params:
    - name: bEnabled
      type: boolean

- id: sc_c_set_expander_routing
  label: Set Expander Routing
  kind: action
  params:
    - name: dwSerialNr
      type: integer
      description: Serial number of interface device
    - name: byPort
      type: integer
      description: Port identifier (1-16 for 16OMI16; 1-4 for other devices)
    - name: bOutput
      type: boolean
      description: "false = input, true = output"
    - name: byChannelId
      type: integer
      description: "SC_C_FLOOR_CHANNEL(0), 1- interpreter channels, SC_C_OR_CHANNEL(32) PA, SC_C_EMPTY_CHANNEL(0xFF) off, SC_C_QUERY_CHANNEL(0xFE) query"

- id: sc_c_set_expander_agc
  label: Set Expander AGC
  kind: action
  params:
    - name: dwSerialNr
      type: integer
    - name: byPort
      type: integer
    - name: bOutput
      type: boolean
    - name: byEnable
      type: integer
      description: "0=disable, 1=enable, SC_C_QUERY_CHANNEL(0xFE)=query"

- id: sc_c_set_expander_gain
  label: Set Expander Gain
  kind: action
  params:
    - name: dwSerialNr
      type: integer
    - name: byPort
      type: integer
    - name: bOutput
      type: boolean
    - name: byGain
      type: integer
      description: "Range 0-24, maps to -12dB to +12dB in 1dB steps"

# System Installation (SI) - functions
- id: si_c_start_install
  label: Start Installation
  kind: action
  params:
    - name: wInstallMode
      type: integer
      description: "SI_C_GLOBAL_INSTALL_MODE(0) or SI_C_OPERATIONAL_INSTALL_MODE(1)"

- id: si_c_stop_install
  label: Stop Installation
  kind: action
  params: []

- id: si_c_select_unit
  label: Select Unit
  kind: action
  params:
    - name: wUnitId
      type: integer
    - name: bSelectOn
      type: boolean
      description: Flash unit LEDs

- id: si_c_set_master_vol
  label: Set Master Volume
  kind: action
  params:
    - name: wMasterVolume
      type: integer
      description: "0=mute, 1-25 maps to -12dB to +12dB in 1dB steps"

- id: si_c_set_ext_contact
  label: Set External Contact
  kind: action
  params:
    - name: byExtContact
      type: integer
      description: "SI_C_NO_FUNCTION(0), SI_C_PRESENT(1), SI_C_FRAUD(2)"

- id: si_c_get_ext_contact
  label: Get External Contact
  kind: query
  params:
    - name: tUnitId
      type: integer

- id: si_c_set_microphone_gain
  label: Set Microphone Gain
  kind: action
  params:
    - name: wUnitId
      type: integer
    - name: wGain
      type: integer
      description: "Range 0-15, maps to -6dB to +9dB in 1dB steps"

- id: si_c_get_microphone_gain
  label: Get Microphone Gain
  kind: query
  params:
    - name: wUnitId
      type: integer

- id: si_c_reset_microphone_gain
  label: Reset Microphone Gain
  kind: action
  params: []

- id: si_c_deinitialize_all
  label: Deinitialize All
  kind: action
  params: []

- id: si_c_get_operation_mode
  label: Get Operation Mode
  kind: query
  params: []

- id: si_c_set_operation_mode
  label: Set Operation Mode
  kind: action
  params:
    - name: byStartupMode
      type: integer
      description: "0=single, 1=multi, 2=standalone"
    - name: bySlaveId
      type: integer
      description: "0-31"

- id: si_c_unsubscribe_req
  label: Unsubscribe Request
  kind: action
  params:
    - name: wNrOfUnits
      type: integer
    - name: tUnitList
      type: array
      items:
        type: integer

- id: si_c_get_wap_settings
  label: Get WAP Settings
  kind: query
  params:
    - name: tUnitId
      type: integer

- id: si_c_set_wap_settings
  label: Set WAP Settings
  kind: action
  params:
    - name: tUnitId
      type: integer
    - name: byCarrier
      type: integer
      description: "SI_C_CARRIER_BAND_1(0), BAND_2(1), BAND_3(2)"
    - name: byPowerLevel
      type: integer
      description: "SI_C_POWERLEVEL_OFF(0), LOW(1), MEDIUM(2), HIGH(3)"
    - name: byOptions
      type: integer
      description: "WAP_ENABLE_LANGUAGE_DISTRIBUTION(0x01), WAP_ENABLE_ENCRYPTION(0x02)"

- id: si_c_get_wireless_settings
  label: Get Wireless Settings
  kind: query
  params: []

- id: si_c_set_wireless_settings
  label: Set Wireless Settings
  kind: action
  params:
    - name: bySystemId
      type: integer
      description: Range 0-15
    - name: byRepetitions
      type: integer
      description: Range 0-2

- id: si_c_get_network_mode
  label: Get Network Mode
  kind: query
  params: []

- id: si_c_set_network_mode
  label: Set Network Mode
  kind: action
  params:
    - name: tMode
      type: integer
      description: "SI_C_NETWORK_MODE_ON(0), SLEEP(1), OFF(2), SUBSCRIPTION(3)"

- id: si_c_start_mon_si
  label: Start SI Monitoring
  kind: action
  params:
    - name: wNrOfInstances
      type: integer
      description: Update use count for SI application monitoring (source §3.4.21)

- id: si_c_stop_mon_si
  label: Stop SI Monitoring
  kind: action
  params: []
  description: Stop monitoring behavior of the SI application (source §3.4.22)

# Delegate Database (DB) - functions
- id: db_c_start_app
  label: Start Delegate Database App
  kind: action
  params:
    - name: byControlType
      type: integer
      description: "DB_C_CONTROL(1) - remote controller takes control of the CCU delegate database"
  description: Indicates remote controller wants to communicate with the delegate database in the CCU (source §4.2.1)

- id: db_c_stop_app
  label: Stop Delegate Database App
  kind: action
  params: []
  description: Indicate CCU that remote controller no longer requires database access. Does not clear the database (source §4.2.2)

- id: db_c_maint_ccu
  label: Maintain CCU Delegate Database
  kind: action
  params:
    - name: bFirstCluster
      type: boolean
      description: Indicates if this block is the first cluster
    - name: bLastCluster
      type: boolean
      description: Indicates if this block is the last cluster
    - name: byPinSize
      type: integer
      description: "Current pin code size. Possible values 3, 4, 5"
    - name: DelCluster
      type: array
      items:
        type: object
        properties:
          lDelId:
            type: integer
            description: "Delegate ID, range 1..DBSC_MAX_DELEGATE"
          lCard:
            type: integer
            description: "Delegate card code, 1..MAX_CARD_CODE or DB_C_NO_CARD"
          lPin:
            type: integer
            description: "PIN code base-6 (digits 1-5), range matches byPinSize"
          wUnitNr:
            type: integer
            description: Default unit number assigned to delegate
          byDeskLang:
            type: integer
            description: "Display language (0=English, 1-5 configurable)"
          lVWeight:
            type: integer
            description: "Vote weight, 1..MAX_VOTE_WEIGHT"
          bMicAut:
            type: boolean
          bVotingAut:
            type: boolean
          bInterAut:
            type: boolean
          szSLine:
            type: string
            description: Delegate screen line
  description: Change the delegate database in the CCU (source §4.2.3). Available in congress mode.

- id: db_c_download_ccu
  label: Download CCU Delegate Database
  kind: action
  params:
    - name: bFirstCluster
      type: boolean
    - name: bLastCluster
      type: boolean
    - name: byPinSize
      type: integer
    - name: DelCluster
      type: array
      items:
        type: object
  description: Fill the delegate database in the CCU. Same structure as DB_C_MAINT_CCU (source §4.2.4)

- id: db_c_clear_ccu
  label: Clear CCU Delegate Database
  kind: action
  params: []
  description: Clears the delegate database in the CCU (source §4.2.5). Returns DB_E_DELEGATE_DATA_BLOCKED if another app is using the database.

- id: db_c_ccu_apply_one
  label: Apply One Delegate Record
  kind: action
  params:
    - name: tDelegate
      type: object
      description: DB_T_PERDELEGATE structure (see DB_C_MAINT_CCU). Adds if delegateId absent, updates if present.
  description: Add or update a single record in the CCU delegate database (source §4.2.6)

# Microphone Management (MM) - functions
- id: mm_c_start_mm
  label: Start Microphone Management
  kind: action
  params:
    - name: wNrOfInstances
      type: integer

- id: mm_c_stop_mm
  label: Stop Microphone Management
  kind: action
  params: []

- id: mm_c_start_mon_mm
  label: Start Monitor Microphone Management
  kind: action
  params:
    - name: wNrOfInstances
      type: integer

- id: mm_c_stop_mon_mm
  label: Stop Monitor Microphone Management
  kind: action
  params: []
  description: Stop monitoring behavior of the Microphone Management application (source §5.2.2.4)

- id: mm_c_set_mic_oper_mode
  label: Set Microphone Operation Mode
  kind: action
  params:
    - name: wOperationMode
      type: integer
      description: "MM_C_OPERATOR_WITH_REQ_LIST(0), MM_C_DELEGATE_WITH_REQ_LIST(1), MM_C_DELEGATE_WITH_OVERRIDE(2), MM_C_DELEGATE_WITH_VOICE(3), MM_C_OPERATOR_WITH_COMMENT_LIST(4), MM_C_DELEGATE_WITH_PUSHTOTALK(5)"

- id: mm_c_set_active_mics
  label: Set Active Microphones
  kind: action
  params:
    - name: wActiveMics
      type: integer
      description: "Range 1-25 (max 1 for MM_C_OPERATOR_WITH_COMMENT_LIST)"

- id: mm_c_get_settings
  label: Get Microphone Settings
  kind: query
  params: []

- id: mm_c_set_settings
  label: Set Microphone Settings
  kind: action
  params:
    - name: wOperationMode
      type: integer
    - name: wActiveMics
      type: integer
    - name: wMaxRTSListLen
      type: integer
      description: "Range 0-100"
    - name: bAllowCancelRequests
      type: boolean
    - name: bAllowMicroOff
      type: boolean
    - name: wAttentionTone
      type: integer
      description: "MM_C_ATTENTION_OFF(0), TONE1(1), TONE2(2), TONE3(3)"
    - name: bAmbientMicCtrl
      type: boolean
    - name: bPrioCancelAll
      type: boolean

- id: mm_c_set_micro_on_off
  label: Set Microphone On/Off
  kind: action
  params:
    - name: wUnitId
      type: integer
    - name: bMicroOn
      type: boolean

- id: mm_c_spk_append
  label: Append to Speakers List
  kind: action
  params:
    - name: wUnitId
      type: integer

- id: mm_c_spk_remove
  label: Remove from Speakers List
  kind: action
  params:
    - name: wUnitId
      type: integer

- id: mm_c_spk_clear
  label: Clear Speakers List
  kind: action
  params: []

- id: mm_c_spk_get
  label: Get Speakers List
  kind: query
  params: []

- id: mm_c_cs_remove
  label: Remove from Comment Speakers List
  kind: action
  params:
    - name: wUnitId
      type: integer

- id: mm_c_cs_get
  label: Get Comment Speakers List
  kind: query
  params: []

- id: mm_c_nbk_remove
  label: Remove from Notebook List
  kind: action
  params:
    - name: wUnitId
      type: integer
      description: Unit identifier of notebook entry to remove (source §5.2.5.1, uses MM_T_NBK structure)

- id: mm_c_nbk_clear
  label: Clear Notebook List
  kind: action
  params: []
  description: Clear the complete contents of the Notebook list (source §5.2.5.2)

- id: mm_c_nbk_get
  label: Get Notebook List
  kind: query
  params: []

- id: mm_c_nbk_set
  label: Set Notebook List
  kind: action
  params:
    - name: wNrOfNbk
      type: integer
    - name: tNbkList
      type: array
      items:
        type: object
        properties:
          wUnitId:
            type: integer
          wMicroType:
            type: integer

- id: mm_c_rts_append
  label: Append to Request to Speak List
  kind: action
  params:
    - name: wUnitId
      type: integer
    - name: wDelegateId
      type: integer

- id: mm_c_rts_remove
  label: Remove from Request to Speak List
  kind: action
  params:
    - name: wUnitId
      type: integer
    - name: wDelegateId
      type: integer

- id: mm_c_rts_clear
  label: Clear Request to Speak List
  kind: action
  params: []

- id: mm_c_rts_get
  label: Get Request to Speak List
  kind: query
  params: []

- id: mm_c_rts_set
  label: Set Request to Speak List
  kind: action
  params:
    - name: wNrOfRts
      type: integer
    - name: tRtsList
      type: array
      items:
        type: object
        properties:
          wUnitId:
            type: integer
          wDelegateId:
            type: integer

- id: mm_c_shift
  label: Shift RTS to Speakers
  kind: action
  params: []

- id: mm_c_cr_remove
  label: Remove from Comment Request List
  kind: action
  params:
    - name: wUnitId
      type: integer
    - name: wDelegateId
      type: integer

- id: mm_c_cr_get
  label: Get Comment Request List
  kind: query
  params: []

- id: mm_c_shift_cr
  label: Shift CR to Comment Speakers
  kind: action
  params: []

- id: mm_c_set_speechtime_settings
  label: Set Speech Time Settings
  kind: action
  params:
    - name: wSpeechTimeLimit
      type: integer
    - name: bTimerOn
      type: boolean
    - name: bHoldOnChairPriority
      type: boolean
    - name: bShowRemainingTime
      type: boolean
    - name: bLedFollowMicLed
      type: boolean

- id: mm_c_last_minute_warning
  label: Last Minute Warning
  kind: event
  params:
    - name: wUnitId
      type: integer

- id: mm_c_time_finished_warning
  label: Time Finished Warning
  kind: event
  params:
    - name: wUnitId
      type: integer

# Camera Control (CC) - functions
- id: cc_c_start_camera_app
  label: Start Camera App
  kind: action
  params: []

- id: cc_c_stop_camera_app
  label: Stop Camera App
  kind: action
  params: []

- id: cc_c_set_camera_activity
  label: Set Camera Activity
  kind: action
  params:
    - name: bCameraActivity
      type: boolean

- id: cc_c_set_global_settings
  label: Set Camera Global Settings
  kind: action
  params:
    - name: bCameraOverrideMode
      type: boolean
    - name: byMovementTime
      type: integer
      description: "0-254 (0-127 seconds); 255 = error"
    - name: byNumOfAudienceMon
      type: integer
      description: "1-4"
    - name: bySeatTextMode
      type: integer
      description: "CC_C_SCREEN_LINE(0), SCREEN_LINE_DOUBLE(1), SEAT_TEXT(2), SEAT_TEXT_DOUBLE(3)"
    - name: byCameraControlType
      type: integer
      description: "CC_C_NO_CAMERA_CONTROL_TYPE(0), ALLEGIANT_VIDEO_SWITCHER(1), DIRECT_CAMERA_CONTROL(2)"

- id: cc_c_get_global_settings
  label: Get Camera Global Settings
  kind: query
  params: []

- id: cc_c_set_camera_assignment
  label: Set Camera Assignment
  kind: action
  params:
    - name: tIndexedCameraAssignment
      type: array
      items:
        type: object
        properties:
          wUnitId:
            type: integer
          tCameraAssignment:
            type: object
            properties:
              wCameraNumber:
                type: integer
                description: "1-DBSC_MAX_CAMERA"
              byPreposNumber:
                type: integer
                description: "0-DBSC_MAX_PREPOSITION or DBSC_EMPTY_PREPOS"
              szSeatText_1:
                type: string
              szSeatText_2:
                type: string

- id: cc_c_clear_camera_assignments
  label: Clear Camera Assignments
  kind: action
  params: []

- id: cc_c_set_camera_id
  label: Set Camera ID
  kind: action
  params:
    - name: tIndexedCameraID
      type: array
      items:
        type: object
        properties:
          wCameraNumber:
            type: integer
          tCameraID:
            type: object
            properties:
              szCameraID:
                type: string

- id: cc_c_clear_camera_ids
  label: Clear Camera IDs
  kind: action
  params: []

- id: cc_c_send_data
  label: Send Camera Data
  kind: action
  params:
    - name: wLength
      type: integer
    - name: byData
      type: array
      items:
        type: integer

# Simultaneous Interpretation (IN) - functions
- id: in_c_signal_ccu
  label: Signal CCU (deprecated)
  kind: action
  params:
    - name: wDummy
      type: integer
      description: Dummy value, not used
    - name: wPCActive
      type: integer
      description: "Controller state (8-bit left shift of IN_C_STANDALONE or IN_C_WITHPC)"
  description: "Deprecated - exported for compatibility only. Use IN_C_START_IN_APP / IN_C_STOP_IN_APP instead. Will not be supported from version 3.0 (source §7.2.3.1)"

- id: in_c_start_in_app
  label: Start Interpretation App
  kind: action
  params:
    - name: wNrOfInstances
      type: integer

- id: in_c_stop_in_app
  label: Stop Interpretation App
  kind: action
  params: []

- id: in_c_start_mon_in
  label: Start Monitor Interpretation
  kind: action
  params: []

- id: in_c_stop_mon_in
  label: Stop Monitor Interpretation
  kind: action
  params: []

- id: in_c_desk_update
  label: Desk Update
  kind: action
  params:
    - name: wBoothNr
      type: integer
      description: "1-31"
    - name: wDeskNr
      type: integer
      description: "1-6"
    - name: wAChannel
      type: integer
    - name: dwfBChannelSet
      type: integer
      description: "32-bit bitmask of enabled B out channels"

- id: in_c_booth_update
  label: Booth Update
  kind: action
  params:
    - name: wBoothNr
      type: integer
    - name: wAutoRelay
      type: integer
      description: "High byte non-zero = auto relay booth"

- id: in_c_update_lock
  label: Update Lock
  kind: action
  params:
    - name: byWithin
      type: integer
      description: "IN_C_NONEMODE(0), IN_C_OVERRIDE(1), IN_C_INTERLOCK(2)"
    - name: byBetween
      type: integer
      description: "Same as byWithin plus IN_C_OVERRIDE_ON_B_ONLY(3)"
    - name: bNormalEngaged
      type: boolean

- id: in_c_load_int_db
  label: Load Interpretation Database
  kind: action
  params:
    - name: dwfAutoSet
      type: integer
    - name: byBetweenLock
      type: integer
    - name: byWithinLock
      type: integer
    - name: byMaxChans
      type: integer
    - name: byChannels
      type: array
      items:
        type: integer
    - name: tDeskConf
      type: array
    - name: bNormalEngaged
      type: boolean

- id: in_c_channel_update
  label: Channel Update
  kind: action
  params:
    - name: tChannelLang
      type: array
      items:
        type: integer
      description: "Array terminated by IN_C_NOMORE_CHANNELS"

- id: in_c_download_langlist
  label: Download Language List
  kind: action
  params:
    - name: wVersionOfLangList
      type: integer
    - name: tLangList
      type: array
      items:
        type: object
        properties:
          wAudioLangId:
            type: integer
          szLangName:
            type: string
          szLangAbbr:
            type: string

- id: in_c_set_flash_mic_on
  label: Set Flash Mic On
  kind: action
  params:
    - name: bFlashingWhenEngaged
      type: boolean

- id: in_c_set_floor_dist
  label: Set Floor Distribution
  kind: action
  params:
    - name: bFloorDistribution
      type: boolean

- id: in_c_get_floor_dist
  label: Get Floor Distribution
  kind: query
  params: []

- id: in_c_set_speakslowly_sign
  label: Set Speak Slowly Sign
  kind: action
  params:
    - name: bSpeakSlowlySign
      type: boolean

- id: in_c_get_speakslowly_sign
  label: Get Speak Slowly Sign
  kind: query
  params: []

- id: in_c_set_help_sign
  label: Set Help Sign
  kind: action
  params:
    - name: bHelpSign
      type: boolean

- id: in_c_get_help_sign
  label: Get Help Sign
  kind: query
  params: []

- id: in_c_assign_unit
  label: Assign Unit to Booth
  kind: action
  params:
    - name: wNrOfUnits
      type: integer
    - name: tUnitAssignList
      type: array
      items:
        type: object
        properties:
          tUnitId:
            type: integer
          byBooth:
            type: integer
          byDesk:
            type: integer

- id: in_c_unassign_unit
  label: Unassign Unit
  kind: action
  params:
    - name: wNrOfUnits
      type: integer
    - name: tUnitList
      type: array
      items:
        type: integer

- id: in_c_set_expander_input
  label: Set Expander Input
  kind: action
  params:
    - name: dwSerialNr
      type: integer
    - name: byPort
      type: integer
    - name: byEnable
      type: integer
      description: "IN_C_EXPANDER_INOUT_DISABLE(0), ENABLE(1), QUERY(2)"

- id: in_c_set_expander_output
  label: Set Expander Output
  kind: action
  params:
    - name: dwSerialNr
      type: integer
    - name: byPort
      type: integer
    - name: byEnable
      type: integer

# Voting (VT) - functions
- id: vt_c_start_app
  label: Start Voting App
  kind: action
  params:
    - name: bResultNotify
      type: boolean
      description: "Send result update notifications"
    - name: wViewTimeAfterStop
      type: integer
      description: "Range 0-200 seconds"

- id: vt_c_stop_app
  label: Stop Voting App
  kind: action
  params: []

- id: vt_c_start_voting
  label: Start Voting
  kind: action
  params: []

- id: vt_c_stop_voting
  label: Stop Voting
  kind: action
  params:
    - name: bShowResults
      type: boolean

- id: vt_c_hold_voting
  label: Hold Voting
  kind: action
  params: []

- id: vt_c_restart_voting
  label: Restart Voting
  kind: action
  params: []

- id: vt_c_download_subject
  label: Download Voting Subject
  kind: action
  params:
    - name: wVotingNumber
      type: integer
      description: "Range 1-9999 (VT_C_STANDALONE_VOTING reserved)"
    - name: szVotingSubject
      type: string
    - name: szLegendSubject
      type: string

- id: vt_c_set_votingparams
  label: Set Voting Parameters
  kind: action
  params:
    - name: wVotingMenu
      type: integer
      description: "VT_C_MENU_YES_NO, YES_NO_ABSTAIN, FOR_AGAINST, AUDIENCE_RESPONSE, 123, ABC, CBA, YES_NO_ABSTAIN_NPPV"
    - name: wNrOfAnswerOptions
      type: integer
    - name: bOpenVoting
      type: boolean
    - name: wInterimResultType
      type: integer
    - name: bCompressedResults
      type: boolean

- id: vt_c_set_global_settings
  label: Set Voting Global Settings
  kind: action
  params:
    - name: wVotingLedMode
      type: integer
    - name: wPresentVotes
      type: integer
    - name: bShowVoteTimer
      type: boolean
    - name: wVoteTimerLimit
      type: integer
      description: "Range 0-3600 seconds"
    - name: bAutoAbstain
      type: boolean
    - name: bVoteWeightingOn
      type: boolean
    - name: bFirstVoteCount
      type: boolean

- id: vt_c_get_results
  label: Get Voting Results
  kind: query
  params: []

- id: vt_c_get_attention_tone
  label: Get Attention Tone
  kind: query
  params: []

- id: vt_c_set_attention_tone
  label: Set Attention Tone
  kind: action
  params:
    - name: byAttentionTone
      type: integer
      description: "VT_C_ATTENTION_TONE_OFF(0), TONE_1(1), TONE_2(2), TONE_3(3)"

- id: vt_c_start_attention_tone
  label: Start Attention Tone
  kind: action
  params: []

# Attendance Registration (AT) - functions
- id: at_c_start_at_app
  label: Start Attendance App
  kind: action
  params:
    - name: byRemoteControlType
      type: integer
      description: "AT_C_APP_CONTROL(1), AT_C_APP_MONITOR(2)"

- id: at_c_stop_at_app
  label: Stop Attendance App
  kind: action
  params: []

- id: at_c_store_setting
  label: Store Attendance Setting
  kind: action
  params:
    - name: bySeatAttend
      type: integer
      description: "AT_C_SEAT(0), AT_C_ENTRANCE_EXIT(1)"
    - name: bySeatAccess
      type: integer
      description: "AT_C_ANY_SEAT(0), AT_C_ONE_SEAT(1)"
    - name: byControlType
      type: integer
      description: "AT_C_PRESENTKEY, AT_C_PRESENTCONTACT, AT_C_PINCODE, AT_C_IDCARD, AT_C_IDCARD_PINCODE"

- id: at_c_activate
  label: Activate Attendance
  kind: action
  params:
    - name: bAttendanceOn
      type: boolean
    - name: bAccessOn
      type: boolean

- id: at_c_handle_identification
  label: Handle Identification
  kind: action
  params:
    - name: wEvent
      type: integer
      description: "ACSC_EVENT_INSERT_CARD_ENTRANCE, ACSC_EVENT_INSERT_CARD_EXIT"
    - name: tDelIdentification
      type: array
      items:
        type: object
        properties:
          dwCardCode:
            type: integer
          wPinCode:
            type: integer

- id: at_c_get_indiv_registration
  label: Get Individual Registration
  kind: query
  params:
    - name: wClusterIndex
      type: integer

# Text/Status Display (LD) - functions
- id: ld_c_start_ld_app
  label: Start Display App
  kind: action
  params: []

- id: ld_c_stop_ld_app
  label: Stop Display App
  kind: action
  params: []

- id: ld_c_store_display_setting
  label: Store Display Setting
  kind: action
  params:
    - name: wDisplayId
      type: integer
      description: "LD_C_DISPLAY_ONE(0), TWO(1), THREE(2), FOUR(3)"
    - name: wFlags
      type: integer
      description: "LD_C_VT_FLAG_DISPLAY, LD_C_MM_FLAG_DISPLAY, LD_C_MD_FLAG_DISPLAY"
    - name: wNrOfSpeakerLines
      type: integer
    - name: wNrOfRequestLines
      type: integer

- id: ld_c_clear_display_nr
  label: Clear Display
  kind: action
  params:
    - name: wDisplayId
      type: integer

# Message Distribution (MD) - functions
- id: md_c_start_mon_md
  label: Start Monitor Message Distribution
  kind: action
  params: []

- id: md_c_stop_mon_md
  label: Stop Monitor Message Distribution
  kind: action
  params: []

- id: md_c_send_message_to_units
  label: Send Message to Units
  kind: action
  params:
    - name: tText
      type: object
    - name: wRcvType
      type: integer
      description: "MD_C_RCV_DELEGATE, MD_C_RCV_INTERPRETER, MD_C_RCV_HALL"
    - name: wDuration
      type: integer
    - name: wNumOfUnits
      type: integer
    - name: wUnitList
      type: array
      items:
        type: integer

- id: md_c_clear_message_on_units
  label: Clear Message on Units
  kind: action
  params:
    - name: wRcvType
      type: integer

- id: md_c_aux_led_control
  label: Aux LED Control
  kind: action
  params:
    - name: wUnitId
      type: integer
    - name: byLedMask
      type: integer
      description: "MD_C_IN_NOTEBOOK_LED(0x1), MD_C_MICRO_LED(0x2), MD_C_RTS_LED(0x4), MD_C_ALL_LEDS_OFF(0x0)"

# Intercom (IC) - functions
- id: ic_c_start_ic_app
  label: Start Intercom App
  kind: action
  params: []

- id: ic_c_close_ic_app
  label: Close Intercom App
  kind: action
  params: []

- id: ic_c_set_links
  label: Set Intercom Links
  kind: action
  params:
    - name: tList
      type: array
      items:
        type: object
        properties:
          wSourceId:
            type: integer
          wDestId:
            type: integer

- id: ic_c_clear_links
  label: Clear Intercom Links
  kind: action
  params: []
```

## Feedbacks
```yaml
# Unsolicited notifications from CCU to remote controller.
# CCU sends these without request; remote controller registers via *_START_APP

# System Configuration (SC) notifications
- id: sc_c_ccu_reboot
  type: object
  description: CCU restarted - same structure as SC_C_GET_CCU_VERSIONINFO response

- id: sc_c_connect_unit
  type: object
  description: Unit connected

- id: sc_c_disconnect_unit
  type: object
  description: Unit disconnected

- id: sc_c_connect_slave_ccu
  type: object
  description: Slave CCU connected

- id: sc_c_disconnect_slave_ccu
  type: object
  description: Slave CCU disconnected

- id: sc_c_ccu_mode_change
  type: object
  description: CCU system mode changed
  properties:
    wCurrentMode: integer
    wNewMode: integer

- id: sc_c_serial_nr
  type: object
  description: Serial number response
  properties:
    tUnitId: integer
    dwSerialNr: integer

- id: sc_c_battery_status
  type: object
  description: Battery status
  properties:
    byBatteryLevel: integer  # 0-100%
    wRemainingTime: integer  # minutes, 0xFFFF = no battery

- id: sc_c_battery_info_serial
  type: object

- id: sc_c_battery_info_cond
  type: object

- id: sc_c_signal_status
  type: object
  description: Signal status
  properties:
    tSignalLevel: integer  # SC_C_SIGNAL_EXCELLENT, GOOD, POOR

- id: sc_c_signal_quality
  type: boolean  # bBadSignal

- id: sc_c_unit_signal_quality
  type: object
  properties:
    tUnitId: integer
    bBadSignal: boolean

- id: sc_c_low_battery
  type: boolean  # bLowBattery

- id: sc_c_encryption_enabled
  type: boolean  # bEnabled

- id: sc_c_expander_routing_changed
  type: object

- id: sc_c_expander_agc_changed
  type: object

- id: sc_c_expander_gain_changed
  type: object

# System Installation (SI) notifications
- id: si_c_register_unit
  type: object
  properties:
    wUnitId: integer
    byUnitType: integer

- id: si_c_microphone_gain
  type: object
  properties:
    wUnitId: integer
    wGain: integer  # 0-15 (-6dB to 9dB)

- id: si_c_microphone_gain_reset
  type: object

- id: si_c_wap_settings
  type: object

- id: si_c_wireless_settings
  type: object

- id: si_c_network_mode
  type: object

# Microphone Management (MM) notifications
- id: mm_c_set_mic_oper_mode_on_pc
  type: integer

- id: mm_c_set_active_mics_on_pc
  type: integer

- id: mm_c_set_settings_on_pc
  type: object

- id: mm_c_micro_on_off
  type: object
  properties:
    wUnitId: integer
    wMicroId: integer
    wPrioId: integer

- id: mm_c_nr_chair_mics_on
  type: integer

- id: mm_c_spk_set_on_pc
  type: object

- id: mm_c_spk_append_on_pc
  type: object  # MM_T_SPK

- id: mm_c_spk_remove_on_pc
  type: object  # MM_T_SPK

- id: mm_c_spk_insert_on_pc
  type: object

- id: mm_c_spk_replace_on_pc
  type: object

- id: mm_c_spk_clear_on_pc
  type: object
  description: SPK list cleared notification (source §5.3.3.4)

- id: mm_c_cs_clear_on_pc
  type: object

- id: mm_c_cs_add_on_pc
  type: object

- id: mm_c_cs_remove_on_pc
  type: object

- id: mm_c_nbk_remove_on_pc
  type: object

- id: mm_c_nbk_set_on_pc
  type: object

- id: mm_c_nbk_clear_on_pc
  type: object
  description: Notebook list cleared notification (source §5.3.5 - MM_C_NBK_CLEAR_ON_PC define)

- id: mm_c_rts_set_on_pc
  type: object

- id: mm_c_rts_clear_on_pc
  type: object

- id: mm_c_rts_remove_on_pc
  type: object

- id: mm_c_rts_first_on_pc
  type: object  # MM_T_RTS

- id: mm_c_rts_insert_on_pc
  type: object

- id: mm_c_rts_replace_on_pc
  type: object

- id: mm_c_rts_clear_comment_on_pc
  type: object
  description: Comment request list cleared as side effect of MM_C_RTS_CLEAR (source §5.2.6.3)

- id: mm_c_cr_clear_on_pc
  type: object

- id: mm_c_cr_add_on_pc
  type: object

- id: mm_c_cr_remove_on_pc
  type: object

- id: mm_c_cr_replace_on_pc
  type: object

- id: mm_c_timer_on_off
  type: object

# Camera Control (CC) notifications
- id: cc_c_receive_data
  type: object
  properties:
    wLength: integer
    byData: array

# Simultaneous Interpretation (IN) notifications
- id: in_c_chan_status
  type: object

- id: in_c_ccu_config
  type: object

- id: in_c_flashing_mic_on
  type: boolean

- id: in_c_floor_distribution
  type: boolean

- id: in_c_language_list
  type: object

- id: in_c_speakslowly_sign
  type: boolean

- id: in_c_help_sign
  type: boolean

- id: in_c_expander_input_changed
  type: object

- id: in_c_expander_output_changed
  type: object

# Voting (VT) notifications
- id: vt_c_resultsnotify
  type: object
  properties:
    wVotingNumber: integer
    dwNrOfPresent: integer
    dwNrOfNotVoted: integer
    dwNrOfVotes: array
    bCompressed: boolean
    byDelegateVotes: array

# Attendance Registration (AT) notifications
- id: at_c_send_indiv_registration
  type: object

- id: at_c_send_total_registration
  type: object
  properties:
    wAttend: integer
    wLeave: integer

# Text/Status Display (LD) notifications
- id: ld_c_send_anum_data
  type: object
  properties:
    wDisplayId: integer
    szData: string
    wNumOfChars: integer

# Message Distribution (MD) notifications
- id: md_c_req_button_on_off
  type: object
  properties:
    wUnitId: integer
    byButtonType: integer  # MD_C_AUXILIARY_BUTTON, SPEAKSLOWLY_BUTTON, HELP_BUTTON, EXTERNAL_PRESENT_CONTACT
    bOn: boolean

# Intercom (IC) notifications
- id: ic_upd_available_lines
  type: integer  # byLines

- id: ic_upd_operator_state
  type: integer  # IC_C_NOT_PRESENT, IDLE, NO_OPER, CONNECTED, CONN_BREAK, NO_REQ, RECEIVING, DIALING, RETURN

- id: ic_upd_connection_info
  type: object
  properties:
    wCallerId: integer
    wReceiverId: integer
    bLinked: boolean

- id: ic_upd_incoming_call
  type: object
  properties:
    wUnitId: integer
    wUnitType: integer
```

## Variables
```yaml
# No standalone settable parameters outside action params - all are action parameters.
# UNRESOLVED: remove section if not applicable
```

## Events
```yaml
# Heartbeat / protocol-level events:
- id: oip_keepalive
  type: event
  description: "Heartbeat message. CCU expects message within 15s; send every 5s when idle. Struct: MESSAGETYPE_OIP_KeepAlive(0x00447027), length 16, reserved1=0, reserved2=0"

- id: oip_response_protocol_error
  type: event
  description: "Protocol error response. Returned when message size, string size, message-type, or login fails. Struct: MESSAGETYPE_OIP_ResponseProtocolError(0x00447020), length 24, errorCode, errorPosition."

- id: sc_c_ccu_reboot
  type: event
  description: CCU rebooted notification (also in Feedbacks)

- id: sc_c_ccu_mode_change
  type: event
  description: CCU system mode changed (also in Feedbacks)
```

## Macros
```yaml
# Multi-step sequences described in source:
# UNRESOLVED: no explicit multi-step macros described - remove section if not applicable
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings/interlocks not found in source - Open Interface license (LBB4187/00) required per source §1.2
```

## Notes
**Protocol:** Binary message stream over TCP. Message envelope: `DWORD messageType + DWORD length + BYTE[data]` (8-byte min, 8000-byte max). Three message types: `MDSM_REMOTEPROCEDURE_REQ(3)`, `MDSM_REMOTEPROCEDURE_RSP(4)`, `MDSM_NOTIFY(5)`.

**Heartbeat:** Send `MESSAGETYPE_OIP_KeepAlive` every 5s. If CCU sees no message for 15s, it closes connection.

**Timing:** Command response max 10s; typical <0.5s. Remote function request must wait for response before sending next request (CCU can handle 2 pending).

**System modes:** Init, Config, Congress, Maintenance, Download, Down — per-function availability varies.

**Error codes:** RFSE_BADFUNCTIONID(0x2A95), RFSE_ALLOCFAILED(0x2A98), RFSE_NOACCESSPERMISSION(0x2A9B) for RFS; app-specific codes in Appendix C.

**Upgrade pass additions:** Added missing Delegate Database (DB) chapter (DB_C_START_APP, DB_C_STOP_APP, DB_C_MAINT_CCU, DB_C_DOWNLOAD_CCU, DB_C_CLEAR_CCU, DB_C_CCU_APPLY_ONE), SI monitoring pair (SI_C_START_MON_SI, SI_C_STOP_MON_SI), MM_C_STOP_MON_MM, MM_C_NBK_REMOVE, MM_C_NBK_CLEAR, deprecated IN_C_SIGNAL_CCU, SC_C_GET_CCU_CONFIG (deprecated), SC_C_LOW_BATTERY_REQ, and feedbacks MM_C_SPK_CLEAR_ON_PC, MM_C_NBK_CLEAR_ON_PC, MM_C_RTS_CLEAR_COMMENT_ON_PC.

**Note:** Device name in input (DCMNWAP) does not match source (DCN NG). Source describes a congress/conference system with Central Control Unit. Compatible model should be confirmed against actual product listing.
<!-- UNRESOLVED: compatible_with.models — source is "DCN Next Generation" not "DCMNWAP"; actual model match unknown -->
<!-- UNRESOLVED: RS-232 serial transport — source mentions RS-232 signal definitions in table but only describes TCP/IP Ethernet control — no serial configuration stated -->
<!-- UNRESOLVED: auth credentials — Open Interface license required but no password/token described in source -->
````

Added 12 missing actions + 3 missing feedbacks. DB chapter was biggest gap (entire §4 of source absent). Preserved all existing IDs/shapes.

## Provenance

```yaml
source_domains:
  - assets.catalog.boschbuildingtechnologies.com
  - iprobesolutions.com
  - mvi-audiovisual.com
  - usermanual.wiki
source_urls:
  - https://assets.catalog.boschbuildingtechnologies.com/public/documents/LBB_4187_00_Operation_Manual_enUS_18014411768759563.pdf
  - https://iprobesolutions.com/docs/manual-configuration-en-us-bosch-dicentis-wireless.pdf
  - https://www.mvi-audiovisual.com/wp-content/uploads/2020/09/ENG-EasyConf-Bosch-Dicentis-Wireless.pdf
  - https://iprobesolutions.com/docs/manual-installation-en-us-bosch-dicentis-wireless.pdf
  - https://usermanual.wiki/Bosch-Security-Systems/DCNMWAP-2631365.pdf
retrieved_at: 2026-05-14T21:13:43.738Z
last_checked_at: 2026-07-12T08:55:41.228Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-12T08:55:41.228Z
matched_actions: 142
action_count: 142
confidence: medium
summary: "Every SC/SI/DB/MM/CC/IN/VT/AT/LD/MD/IC action and feedback in the spec maps 1:1 to a documented remote function or notification (and matching Appendix B define) with matching parameter shapes; transport port 9451 confirmed verbatim. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "compatible_with.models should be verified against actual product name — source describes DCN NG system; input specified DCMNWAP which may be a different variant"
- "remove section if not applicable"
- "no explicit multi-step macros described - remove section if not applicable"
- "safety warnings/interlocks not found in source - Open Interface license (LBB4187/00) required per source §1.2"
- "compatible_with.models — source is \"DCN Next Generation\" not \"DCMNWAP\"; actual model match unknown"
- "RS-232 serial transport — source mentions RS-232 signal definitions in table but only describes TCP/IP Ethernet control — no serial configuration stated"
- "auth credentials — Open Interface license required but no password/token described in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
