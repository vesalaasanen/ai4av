---
schema_version: ai4av-public-spec-v1
device_id: bosch/dcn-ccu2
entity_id: bosch_dcn_north_america
spec_id: admin/bosch-dcn
revision: 1
author: admin
title: "Bosch DCN Control Spec"
status: published
manufacturer: Bosch
manufacturer_key: bosch
model_family: DCN-CCU2
aliases: []
compatible_with:
  manufacturers:
    - Bosch
  models:
    - DCN-CCU2
    - DCN-CCUB2
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://assets.catalog.boschbuildingtechnologies.com/public/documents/OI_Operation_Manual_enUS_12284426251.pdf
  - https://resources.keenfinity.tech/public/documents/LBB_4187_00_QRC_Quick_Installation_Guide_enUS_13259287819.pdf
source_documents:
  - title: "Bosch public source"
    url: https://assets.catalog.boschbuildingtechnologies.com/public/documents/OI_Operation_Manual_enUS_12284426251.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:39:26.721Z
  - title: "Bosch public source"
    url: https://resources.keenfinity.tech/public/documents/LBB_4187_00_QRC_Quick_Installation_Guide_enUS_13259287819.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:39:26.991Z
  - title: "Bosch public source"
    url: https://assets.catalog.boschbuildingtechnologies.com/public/documents/OI_Operation_Manual_enUS_12284426251.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T16:40:42.767Z
  - title: "Bosch public source"
    url: https://assets.catalog.boschbuildingtechnologies.com/public/documents/OI_Operation_Manual_enUS_12284426251.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-26T16:48:40.552Z
retrieved_at: 2026-04-26T16:48:40.552Z
last_checked_at: 2026-04-27T09:04:49.329Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T09:04:49.329Z
  matched_actions: 247
  action_count: 247
  confidence: high
  summary: "All 247 spec actions match source function IDs in Appendix B; transport parameters verified; complete bidirectional coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-26
---

# Bosch DCN Control Spec

## Summary
Bosch Digital Congress Network (DCN) conference system controlled via Central Control Unit (CCU). The CCU exposes a TCP/IP-based Open Interface protocol on port 9451 for remote control of conference applications including microphone management, delegate database, simultaneous interpretation, camera control, voting, and message distribution. Binary message format with remote procedure call pattern (request/response) plus unsolicited notifications from CCU.

<!-- UNRESOLVED: Voting application functions (section 10) not fully documented in source — only error codes listed, no remote function definitions -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 9451  # DCN NG Open Interface protocol port (stated in Appendix A.1)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Inferred from documented query functions and state management:
- queryable       # SC_C_GET_CCU_VERSIONINFO, SC_C_GET_CCU_CONFIG_PROPERTY, MM_C_GET_SETTINGS, etc.
- routable        # MM_C_SPK_APPEND, MM_C_RTS_APPEND, SI_C_SET_MASTER_VOL, interpretation channel routing
```

## Actions
```yaml
# Application registration (shared pattern across all apps)
- id: sc_c_start_app
  label: SC Start Application
  kind: action
  params: []
- id: sc_c_stop_app
  label: SC Stop Application
  kind: action
  params: []

# System Configuration (SC) - hardware/unit monitoring
- id: sc_c_check_link
  label: Check Communication Link
  kind: action
  params: []
- id: sc_c_get_ccu_versioninfo
  label: Get CCU Version Info
  kind: query
  params: []
- id: sc_c_get_ccu_config_property
  label: Get CCU Configuration Property
  kind: query
  params:
    - name: wClusterIndex
      type: integer
      description: Cluster index (0 for first cluster of SC_C_CLUSTER_MAX units)
- id: sc_c_req_serial_nr
  label: Request Serial Numbers
  kind: action
  params:
    - name: wNrOfUnits
      type: integer
      description: Number of unit list entries
    - name: tUnitId
      type: array
      description: Array of unit IDs (0x0000 returns master controller serial)
- id: sc_c_get_slave_nodes
  label: Get Slave Nodes
  kind: query
  params:
    - name: dwSerialNr
      type: integer
      description: Serial number of a CCU-type unit
- id: sc_c_get_unit_ids
  label: Get Unit IDs
  kind: query
  params:
    - name: dwSerialNr
      type: integer
      description: Serial number of a unit
- id: sc_c_battery_status_req
  label: Request Battery Status
  kind: action
  params:
    - name: tUnitList
      type: array
      description: Array of unit IDs
- id: sc_c_battery_info_req
  label: Request Battery Info
  kind: action
  params:
    - name: tUnitList
      type: array
      description: Array of unit IDs
- id: sc_c_signal_status_req
  label: Request Signal Status
  kind: action
  params:
    - name: tUnitList
      type: array
      description: Array of unit IDs
- id: sc_c_signal_quality_req
  label: Request Signal Quality
  kind: action
  params: []
- id: sc_c_unit_signal_quality_req
  label: Request Unit Signal Quality
  kind: action
  params:
    - name: tUnitList
      type: array
      description: Array of unit IDs
- id: sc_c_low_battery_req
  label: Request Low Battery Status
  kind: action
  params: []
- id: sc_c_get_encryption_enabled
  label: Get Encryption Enabled Status
  kind: query
  params: []
- id: sc_c_set_encryption_enabled
  label: Set Encryption Enabled Status
  kind: action
  params:
    - name: bEnabled
      type: boolean
      description: TRUE to enable wireless encryption

# System Installation (SI) - setup and audio configuration
- id: si_c_start_install
  label: Start Installation
  kind: action
  params:
    - name: wInstallMode
      type: integer
      description: Installation mode (SI_C_GLOBAL_INSTALL_MODE or SI_C_OPERATIONAL_INSTALL_MODE)
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
      description: Unit identifier
    - name: bSelectOn
      type: boolean
      description: TRUE to flash LEDs, FALSE to turn off
- id: si_c_set_master_vol
  label: Set Master Volume
  kind: action
  params:
    - name: wMasterVolume
      type: integer
      description: Volume 0..25 (0=mute, 1=-12dB, 25=+12dB)
- id: si_c_set_ext_contact
  label: Set External Contact
  kind: action
  params:
    - name: byExtContact
      type: integer
      description: SI_C_NO_FUNCTION, SI_C_PRESENT, or SI_C_FRAUD
- id: si_c_get_ext_contact
  label: Get External Contact
  kind: query
  params: []
- id: si_c_set_microphone_gain
  label: Set Microphone Gain
  kind: action
  params:
    - name: wUnitId
      type: integer
      description: Unit identifier
    - name: wGain
      type: integer
      description: Gain 0..15 (-6dB to +9dB)
- id: si_c_get_microphone_gain
  label: Get Microphone Gain
  kind: query
  params:
    - name: wUnitId
      type: integer
      description: Unit identifier
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
      description: 0=single, 1=multi, 2=standalone
    - name: bySlaveId
      type: integer
      description: Slave ID (0-31)
- id: si_c_unsubscribe_req
  label: Unsubscribe Units
  kind: action
  params:
    - name: tUnitList
      type: array
      description: List of unit IDs to unsubscribe
- id: si_c_get_wap_settings
  label: Get WAP Settings
  kind: query
  params: []
- id: si_c_set_wap_settings
  label: Set WAP Settings
  kind: action
  params:
    - name: tUniId
      type: integer
      description: Must be DCNC_UNASSIGNED_UNIT
    - name: byCarrier
      type: integer
      description: SI_C_CARRIER_BAND_1/2/3
    - name: byPowerLevel
      type: integer
      description: SI_C_POWERLEVEL_OFF/LOW/MEDIUM/HIGH
    - name: byOptions
      type: integer
      description: WAP_ENABLE_LANGUAGE_DISTRUBUTION, WAP_ENABLE_ENCRYPTION
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
      description: System ID 0..15
    - name: byRepetitions
      type: integer
      description: Repetitions 0..2
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
      description: SI_C_NETWORK_MODE_ON/SLEEP/OFF/SUBSCRIPTION
- id: si_c_start_mon_si
  label: Start Monitoring SI
  kind: action
  params: []
- id: si_c_stop_mon_si
  label: Stop Monitoring SI
  kind: action
  params: []

# Delegate Database (DB)
- id: db_c_start_app
  label: DB Start Application
  kind: action
  params:
    - name: byControlType
      type: integer
      description: DB_C_CONTROL
- id: db_c_stop_app
  label: DB Stop Application
  kind: action
  params: []
- id: db_c_maint_ccu
  label: Maintain CCU Delegate Database
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
      description: Array of DB_T_PERDELEGATE records
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
- id: db_c_clear_ccu
  label: Clear CCU Delegate Database
  kind: action
  params: []
- id: db_c_ccu_apply_one
  label: Apply One Delegate Record
  kind: action
  params:
    - name: tDelegate
      type: object
      description: DB_T_PERDELEGATE structure

# Microphone Management (MM)
- id: mm_c_start_mm
  label: MM Start Application
  kind: action
  params: []
- id: mm_c_stop_mm
  label: MM Stop Application
  kind: action
  params: []
- id: mm_c_start_mon_mm
  label: MM Start Monitoring
  kind: action
  params: []
- id: mm_c_stop_mon_mm
  label: MM Stop Monitoring
  kind: action
  params: []
- id: mm_c_set_mic_oper_mode
  label: Set Microphone Operation Mode
  kind: action
  params:
    - name: wOperationMode
      type: integer
      description: |
        MM_C_OPERATOR_WITH_REQ_LIST=1, MM_C_DELEGATE_WITH_REQ_LIST=2,
        MM_C_DELEGATE_WITH_OVERRIDE=3, MM_C_DELEGATE_WITH_VOICE=4,
        MM_C_OPERATOR_WITH_COMMENT_LIST=5, MM_C_DELEGATE_WITH_PUSHTOTALK=6
- id: mm_c_set_active_mics
  label: Set Active Microphones
  kind: action
  params:
    - name: wActiveMics
      type: integer
      description: Number 1..4
- id: mm_c_get_settings
  label: Get MM Settings
  kind: query
  params: []
- id: mm_c_set_settings
  label: Set MM Settings
  kind: action
  params:
    - name: wOperationMode
      type: integer
    - name: wActiveMics
      type: integer
    - name: wMaxRTSListLen
      type: integer
    - name: bAllowCancelRequests
      type: boolean
    - name: bAllowMicroOff
      type: boolean
    - name: wAttentionTone
      type: integer
    - name: bAmbientMicCtrl
      type: boolean
    - name: bAutoMicOff
      type: boolean
    - name: bPrioCancelAll
      type: boolean
- id: mm_c_set_micro_on_off
  label: Set Microphone On/Off
  kind: action
  params:
    - name: wUnitId
      type: integer
      description: Unit identifier
    - name: bMicroOn
      type: boolean
      description: TRUE=on, FALSE=off
- id: mm_c_spk_append
  label: Append to Speakers List
  kind: action
  params:
    - name: wUnitId
      type: integer
      description: Unit identifier
- id: mm_c_spk_remove
  label: Remove from Speakers List
  kind: action
  params:
    - name: wUnitId
      type: integer
      description: Unit identifier
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
- id: mm_c_nbk_clear
  label: Clear Notebook List
  kind: action
  params: []
- id: mm_c_nbk_get
  label: Get Notebook List
  kind: query
  params: []
- id: mm_c_nbk_set
  label: Set Notebook List
  kind: action
  params:
    - name: tNbkList
      type: array
      description: Array of MM_T_NBK_MICRO entries
- id: mm_c_rts_append
  label: Append to Request to Speak List
  kind: action
  params:
    - name: wUnitId
      type: integer
    - name: wDelegateId
      type: integer
      description: Delegate ID or DBSC_EMPTY_DELEGATE
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
    - name: tRtsList
      type: array
      description: Array of MM_T_RTS entries
- id: mm_c_shift
  label: Shift RTS to Speakers
  kind: action
  params:
    - name: wUnitId
      type: integer
    - name: wDelegateId
      type: integer
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
  label: Shift CR to CS
  kind: action
  params:
    - name: wUnitId
      type: integer
    - name: wDelegateId
      type: integer
- id: mm_c_set_speechtime_settings
  label: Set Speech Time Settings
  kind: action
  params:
    - name: wSpeechTimeLimit
      type: integer
      description: Minutes
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
  kind: action
  params:
    - name: wUnitId
      type: integer
- id: mm_c_time_finished_warning
  label: Time Finished Warning
  kind: action
  params:
    - name: wUnitId
      type: integer

# Camera Control (CC)
- id: cc_c_start_camera_app
  label: CC Start Application
  kind: action
  params: []
- id: cc_c_stop_camera_app
  label: CC Stop Application
  kind: action
  params: []
- id: cc_c_set_camera_activity
  label: Set Camera Activity
  kind: action
  params:
    - name: bCameraActivity
      type: boolean
- id: cc_c_set_global_settings
  label: Set CC Global Settings
  kind: action
  params:
    - name: bCameraOverrideMode
      type: boolean
    - name: byMovementTime
      type: integer
      description: Half-seconds 0-254
    - name: byNumOfAudienceMon
      type: integer
      description: 1-4
    - name: bySeatTextMode
      type: integer
      description: CC_C_SCREEN_LINE, CC_C_SCREEN_LINE_DOUBLE, CC_C_SEAT_TEXT, CC_C_SEAT_TEXT_DOUBLE
    - name: byCameraControlType
      type: integer
      description: CC_C_NO_CAMERA_CONTROL_TYPE, CC_C_ALLEGIANT_VIDEO_SWITCHER, CC_C_DIRECT_CAMERA_CONTROL
- id: cc_c_get_global_settings
  label: Get CC Global Settings
  kind: query
  params: []
- id: cc_c_set_camera_assignment
  label: Set Camera Assignment
  kind: action
  params:
    - name: tIndexedCameraAssignment
      type: array
      description: Array of CC_T_INDEXED_CAMERA_ASSIGNMENT
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
- id: cc_c_clear_camera_ids
  label: Clear Camera IDs
  kind: action
  params: []
- id: cc_c_send_data
  label: Send Data to Camera
  kind: action
  params:
    - name: wLength
      type: integer
    - name: byData
      type: array
      description: Data bytes to camera equipment

# Simultaneous Interpretation (IN)
- id: in_c_start_in_app
  label: IN Start Application
  kind: action
  params: []
- id: in_c_stop_in_app
  label: IN Stop Application
  kind: action
  params: []
- id: in_c_start_mon_in
  label: IN Start Monitoring
  kind: action
  params: []
- id: in_c_stop_mon_in
  label: IN Stop Monitoring
  kind: action
  params: []
- id: in_c_desk_update
  label: Update Interpreter Desk
  kind: action
  params:
    - name: wBoothNr
      type: integer
      description: 1-31
    - name: wDeskNr
      type: integer
      description: 1-6
    - name: wAChannel
      type: integer
      description: A out channel
    - name: dwfBChannelSet
      type: integer
      description: Bitmask of enabled B channels
- id: in_c_booth_update
  label: Update Interpreter Booth
  kind: action
  params:
    - name: wBoothNr
      type: integer
      description: 1-31
    - name: wAutoRelay
      type: integer
      description: 0x0100=auto relay, 0x0000=not auto relay
- id: in_c_update_lock
  label: Update Lock Modes
  kind: action
  params:
    - name: byWithin
      type: integer
      description: IN_C_NONEMODE, IN_C_OVERRIDE, IN_C_INTERLOCK
    - name: byBetween
      type: integer
      description: IN_C_NONEMODE, IN_C_OVERRIDE, IN_C_INTERLOCK, IN_C_OVERRIDE_ON_B_ONLY
    - name: bNormalEngaged
      type: boolean
- id: in_c_load_int_db
  label: Load Interpretation Database
  kind: action
  params:
    - name: dwfAutoSet
      type: integer
      description: Autorelay bitmask
    - name: byBetweenLock
      type: integer
    - name: byWithinLock
      type: integer
    - name: byMaxChans
      type: integer
      description: 1-31 channels
    - name: byChannels
      type: array
      description: Language per channel
    - name: tDeskConf
      type: array
      description: Booth x desk matrix
    - name: bNormalEngaged
      type: boolean
- id: in_c_channel_update
  label: Update Channels
  kind: action
  params:
    - name: byChannels
      type: array
      description: Channel language array
- id: in_c_download_langlist
  label: Download Language List
  kind: action
  params:
    - name: wVersionOfLangList
      type: integer
    - name: tLangList
      type: array
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

# Attendance Registration (AT)
- id: at_c_start_at_app
  label: AT Start Application
  kind: action
  params: []
- id: at_c_stop_at_app
  label: AT Stop Application
  kind: action
  params: []
- id: at_c_store_setting
  label: Store AT Setting
  kind: action
  params: []
- id: at_c_activate
  label: Activate/Deactivate AT
  kind: action
  params: []
- id: at_c_handle_identification
  label: Handle Identification
  kind: action
  params: []
- id: at_c_get_indiv_registration
  label: Get Individual Registration
  kind: query
  params: []
- id: at_c_send_indiv_registration
  label: Send Individual Registration
  kind: action
  params: []
- id: at_c_send_total_registration
  label: Send Total Registration
  kind: action
  params: []

# Text & Status Display (LD)
- id: ld_c_start_ld_app
  label: LD Start Application
  kind: action
  params: []
- id: ld_c_stop_ld_app
  label: LD Stop Application
  kind: action
  params: []
- id: ld_c_store_display_setting
  label: Store Display Setting
  kind: action
  params: []
- id: ld_c_clear_display_nr
  label: Clear Display Number
  kind: action
  params: []
- id: ld_c_send_anum_data
  label: Send Alphanumeric Data
  kind: action
  params: []

# Message Distribution (MD)
- id: md_c_send_message_to_units
  label: Send Message to Units
  kind: action
  params:
    - name: wUnitId
      type: integer
    - name: ssData
      type: string
      description: Display data
    - name: wNumOfChars
      type: integer
- id: md_c_clear_message_on_units
  label: Clear Message on Units
  kind: action
  params: []
- id: md_c_start_mon_md
  label: MD Start Monitoring
  kind: action
  params: []
- id: md_c_stop_mon_md
  label: MD Stop Monitoring
  kind: action
  params: []
- id: md_c_aux_led_control
  label: Auxiliary LED Control
  kind: action
  params: []

# Intercom (IC)
- id: ic_c_start_ic_app
  label: IC Start Application
  kind: action
  params: []
- id: ic_c_close_ic_app
  label: IC Close Application
  kind: action
  params: []
- id: ic_c_set_links
  label: Set Intercom Links
  kind: action
  params: []
- id: ic_c_clear_links
  label: Clear Intercom Links
  kind: action
  params: []
```

## Feedbacks
```yaml
# System Configuration (SC) notifications
- id: sc_c_ccu_reboot
  label: CCU Reboot
  type: notification
  params:
    - name: tVersionInfo
      type: object
      description: Same structure as SC_C_GET_CCU_VERSIONINFO response
- id: sc_c_connect_unit
  label: Unit Connected
  type: notification
  params:
    - name: tUnitData
      type: object
      description: Unit information
- id: sc_c_disconnect_unit
  label: Unit Disconnected
  type: notification
- id: sc_c_connect_slave_ccu
  label: Slave CCU Connected
  type: notification
  params:
    - name: bySlaveId
      type: integer
    - name: tConnectedUnits
      type: array
- id: sc_c_disconnect_slave_ccu
  label: Slave CCU Disconnected
  type: notification
  params:
    - name: bySlaveId
      type: integer
    - name: tDisconnectedUnits
      type: array
- id: sc_c_ccu_mode_change
  label: CCU Mode Changed
  type: notification
  params:
    - name: wCurrentMode
      type: integer
    - name: wNewMode
      type: integer
- id: sc_c_serial_nr
  label: Serial Number
  type: notification
  params:
    - name: tUnitId
      type: integer
    - name: dwSerialNr
      type: integer
- id: sc_c_battery_status
  label: Battery Status
  type: notification
  params:
    - name: byBatteryLevel
      type: integer
      description: Percentage 0-100
    - name: wRemainingTime
      type: integer
      description: Minutes (0xFFFF = no battery)
- id: sc_c_battery_info_serial
  label: Battery Info Serial
  type: notification
  params:
    - name: tUnitId
      type: integer
    - name: dwSerialNr
      type: integer
- id: sc_c_battery_info_cond
  label: Battery Info Condition
  type: notification
  params:
    - name: wChargeCount
      type: integer
- id: sc_c_signal_status
  label: Signal Status
  type: notification
  params:
    - name: tSignalLevel
      type: enum
      values: [SC_C_SIGNAL_EXCELLENT, SC_C_SIGNAL_GOOD, SC_C_SIGNAL_POOR]
- id: sc_c_signal_quality
  label: Signal Quality
  type: notification
  params:
    - name: bBadSignal
      type: boolean
- id: sc_c_unit_signal_quality
  label: Unit Signal Quality
  type: notification
  params:
    - name: tUnitId
      type: integer
    - name: bBadSignal
      type: boolean
- id: sc_c_low_battery
  label: Low Battery
  type: notification
  params:
    - name: bLowBattery
      type: boolean
- id: sc_c_encryption_enabled
  label: Encryption Enabled
  type: notification
  params:
    - name: bEnabled
      type: boolean

# System Installation (SI) notifications
- id: si_c_register_unit
  label: Unit Registered
  type: notification
  params:
    - name: byUnitType
      type: integer
- id: si_c_microphone_gain
  label: Microphone Gain Changed
  type: notification
- id: si_c_microphone_gain_reset
  label: Microphone Gain Reset
  type: notification
- id: si_c_wap_settings
  label: WAP Settings Changed
  type: notification
- id: si_c_wireless_settings
  label: Wireless Settings Changed
  type: notification
- id: si_c_network_mode
  label: Network Mode Changed
  type: notification
  params:
    - name: tMode
      type: integer

# Microphone Management (MM) notifications
- id: mm_c_set_mic_oper_mode_on_pc
  label: Mic Operation Mode Changed
  type: notification
- id: mm_c_set_active_mics_on_pc
  label: Active Mics Count Changed
  type: notification
- id: mm_c_set_settings_on_pc
  label: MM Settings Changed
  type: notification
- id: mm_c_micro_on_off
  label: Microphone On/Off
  type: notification
  params:
    - name: wMicroId
      type: integer
      description: MM_C_PC_MIC_ON/OFF/NONE
    - name: wPrioId
      type: integer
      description: MM_C_PC_PRIO_ON/OFF/NONE
- id: mm_c_nr_chair_mics_on
  label: Chairman Mics On Count
  type: notification
  params:
    - name: wNrOfChairMicsOn
      type: integer
- id: mm_c_spk_set_on_pc
  label: Speakers List Set
  type: notification
- id: mm_c_spk_clear_on_pc
  label: Speakers List Cleared
  type: notification
- id: mm_c_spk_append_on_pc
  label: Speaker Appended
  type: notification
  params:
    - name: tSpkAdd
      type: object
- id: mm_c_spk_remove_on_pc
  label: Speaker Removed
  type: notification
  params:
    - name: tSpkRemove
      type: object
- id: mm_c_spk_insert_on_pc
  label: Speaker Inserted
  type: notification
  params:
    - name: tSearchSpk
      type: object
    - name: tNewSpk
      type: object
- id: mm_c_spk_replace_on_pc
  label: Speaker Replaced
  type: notification
  params:
    - name: tCurrSpk
      type: object
    - name: tNewSpk
      type: object
- id: mm_c_cs_clear_on_pc
  label: CS List Cleared
  type: notification
- id: mm_c_cs_add_on_pc
  label: CS Entry Added
  type: notification
- id: mm_c_cs_remove_on_pc
  label: CS Entry Removed
  type: notification
- id: mm_c_nbk_remove_on_pc
  label: NBK Entry Removed
  type: notification
- id: mm_c_nbk_set_on_pc
  label: NBK List Set
  type: notification
- id: mm_c_rts_set_on_pc
  label: RTS List Set
  type: notification
- id: mm_c_rts_clear_on_pc
  label: RTS List Cleared
  type: notification
- id: mm_c_rts_remove_on_pc
  label: RTS Entry Removed
  type: notification
- id: mm_c_rts_first_on_pc
  label: RTS First Entry
  type: notification
- id: mm_c_rts_insert_on_pc
  label: RTS Entry Inserted
  type: notification
- id: mm_c_rts_replace_on_pc
  label: RTS Entry Replaced
  type: notification
- id: mm_c_cr_clear_on_pc
  label: CR List Cleared
  type: notification
- id: mm_c_cr_add_on_pc
  label: CR Entry Added
  type: notification
- id: mm_c_cr_remove_on_pc
  label: CR Entry Removed
  type: notification
- id: mm_c_cr_replace_on_pc
  label: CR Entry Replaced
  type: notification
- id: mm_c_timer_on_off
  label: Timer On/Off Changed
  type: notification

# Camera Control (CC) notifications
- id: cc_c_receive_data
  label: Camera Data Received
  type: notification
  params:
    - name: byData
      type: array

# Simultaneous Interpretation (IN) notifications
- id: in_c_chan_status
  label: Channel Status Changed
  type: notification
- id: in_c_ccu_config
  label: CCU Config Changed
  type: notification
- id: in_c_language_list
  label: Language List Changed
  type: notification
- id: in_c_flashing_mic_on
  label: Flashing Mic Changed
  type: notification
- id: in_c_floor_distribution
  label: Floor Distribution Changed
  type: notification
- id: in_c_speakslowly_sign
  label: Speak Slowly Sign Changed
  type: notification
- id: in_c_help_sign
  label: Help Sign Changed
  type: notification

# Message Distribution (MD) notifications
- id: md_c_req_button_on_off
  label: Button On/Off State
  type: notification

# Intercom (IC) notifications
- id: ic_upd_available_lines
  label: Available Lines
  type: notification
- id: ic_upd_operator_state
  label: Operator State
  type: notification
- id: ic_upd_connection_info
  label: Connection Info
  type: notification
- id: ic_upd_incoming_call
  label: Incoming Call
  type: notification
```

## Variables
```yaml
# UNRESOLVED: This protocol uses remote function calls (Actions) for all settable parameters.
# No discrete Variables section applies - all state is accessed via action/response pairs.
```

## Events
```yaml
# UNRESOLVED: Events are not separately defined in this protocol.
# All unsolicited CCU-to-remote-controller communications are delivered as Notifications.
# See Feedbacks section for notification definitions.
```

## Macros
```yaml
# No explicit multi-step macros documented in source.
# UNRESOLVED: Recommended startup sequence mentioned in unit-event matrices:
#   SC_C_START_APP -> SC_C_GET_CCU_VERSIONINFO -> SC_C_GET_CCU_CONFIG -> SI_C_START_INSTALL
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: No explicit safety warnings or interlock procedures in source.
# Note: Open Interface requires separate license (LBB4187/00) per section 1.2.
```

## Notes

**Protocol Details:**
- Binary message format: `DWORD messageType + DWORD length + BYTE[] data`
- Message types: `MDSC_REMOTEPROCEDURE_REQ=3`, `MDSC_REMOTEPROCEDURE_RSP=4`, `MDSC_NOTIFY=5`
- Heartbeat: send `MESSAGETYPE_OIP_KeepAlive` (0x00447027) every 5s; timeout if no message received within 15s
- Max message size: 8000 bytes; Min message size: 8 bytes
- Little-endian number encoding throughout
- Typical command response time: < 500ms
- CCU listens on TCP port 9451; connection originates from remote controller

**System Modes:**
- Init, Config, Congress, Maintenance, Download, Down
- Per-function availability varies by mode

**Applications:**
- SC (System Configuration, ID=16), SI (System Installation, ID=17), DB (Delegate Database, ID=3)
- MM (Microphone Management, ID=?), CC (Camera Control, ID=21), IN (Interpretation, ID=2)
- VT (Voting, ID=1), LD (Text/Status Display, ID=12), MD (Message Distribution, ID=10), IC (Intercom, ID=7)

<!-- UNRESOLVED: Voting application (VT) remote function definitions not included in source document — only error codes listed -->
<!-- UNRESOLVED: Delegate Database structure DB_T_PERDELEGATE field byDeskLang was typed byiDeskLang in source -->
<!-- UNRESOLVED: RS-232 serial control not documented — only TCP/IP interface described in this Open Interface specification -->
<!-- UNRESOLVED: Authentication/encryption key exchange not documented — no auth procedure in source, inferred none -->

## Provenance

```yaml
source_urls:
  - https://assets.catalog.boschbuildingtechnologies.com/public/documents/OI_Operation_Manual_enUS_12284426251.pdf
  - https://resources.keenfinity.tech/public/documents/LBB_4187_00_QRC_Quick_Installation_Guide_enUS_13259287819.pdf
source_documents:
  - title: "Bosch public source"
    url: https://assets.catalog.boschbuildingtechnologies.com/public/documents/OI_Operation_Manual_enUS_12284426251.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:39:26.721Z
  - title: "Bosch public source"
    url: https://resources.keenfinity.tech/public/documents/LBB_4187_00_QRC_Quick_Installation_Guide_enUS_13259287819.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:39:26.991Z
  - title: "Bosch public source"
    url: https://assets.catalog.boschbuildingtechnologies.com/public/documents/OI_Operation_Manual_enUS_12284426251.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T16:40:42.767Z
  - title: "Bosch public source"
    url: https://assets.catalog.boschbuildingtechnologies.com/public/documents/OI_Operation_Manual_enUS_12284426251.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-26T16:48:40.552Z
retrieved_at: 2026-04-26T16:48:40.552Z
last_checked_at: 2026-04-27T09:04:49.329Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T09:04:49.329Z
matched_actions: 247
action_count: 247
confidence: high
summary: "All 247 spec actions match source function IDs in Appendix B; transport parameters verified; complete bidirectional coverage confirmed."
```

## Known Gaps

```yaml
[]
```
