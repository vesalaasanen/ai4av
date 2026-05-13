---
spec_id: admin/sennheiser-speechline-digital-wireless-v2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sennheiser SpeechLine Digital Wireless v2.0 Control Spec"
manufacturer: "Sennheiser electronic GmbH & Co. KG"
model_family: "SL Rack Receiver DW"
aliases: []
compatible_with:
  manufacturers:
    - "Sennheiser electronic GmbH & Co. KG"
  models:
    - "SL Rack Receiver DW"
    - "SL MCR 2 DW"
    - "SL MCR 4 DW"
    - "CHG 2N"
    - "CHG 4N"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.sennheiser.com
retrieved_at: 2026-05-07T06:17:53.500Z
last_checked_at: 2026-05-08T15:46:54.824Z
generated_at: 2026-05-08T15:46:54.824Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-08T15:46:54.824Z
  matched_actions: 125
  action_count: 125
  confidence: high
  summary: "All 125 spec actions matched to source SSC methods; transport port, protocol, and discovery mechanism verified verbatim from source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-06
---

# Sennheiser SpeechLine Digital Wireless v2.0 Control Spec

## Summary

Sennheiser SpeechLine Digital Wireless (SLDW) is a wireless microphone system comprising rack receivers, multi-channel receivers, and charging stations. Control uses the Sennheiser Sound Control Protocol (SSC), a JSON-over-UDP protocol with OSC-inspired addressing. All devices communicate on UDP port 45 (default) with DNS-SD discovery. This spec covers the SL Rack Receiver DW, SL MCR 2/4 DW multi-channel receivers, and CHG 2N/4N chargers.

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 45
  discovery:
    method: dns_sd
    service_type: _ssc._udp
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # device/standby, device/reset, device/restart, mates/tx1/power_down
  - queryable      # null-argument getter pattern for all properties
  - levelable      # audio gain_db, brightness, LED brightness
  - subscribable   # osc/state/subscribe with configurable lifetime
```

## Actions
```yaml
# ── OSC Meta ──

- id: osc_version_query
  label: Query SSC Version
  kind: action
  address: /osc/version
  params: []
  description: Reports SSC protocol version implemented by the server.
  example_tx: '{"osc":{"version":null}}'
  example_rx: '{"osc":{"version":"1.0"}}'

- id: interface_version_query
  label: Query Interface Version
  kind: action
  address: /interface/version
  params: []
  description: Reports SSC interface version.
  example_tx: '{"interface":{"version":null}}'
  example_rx: '{"interface":{"version":"1.2"}}'

- id: osc_schema_query
  label: Query Address Schema
  kind: action
  address: /osc/schema
  params:
    - name: path
      type: string
      description: Address path to query schema for (null for root).
  description: Query available address tree on the server.
  example_tx: '{"osc":{"schema":null}}'

- id: osc_limits_query
  label: Query Parameter Limits
  kind: action
  address: /osc/limits
  params:
    - name: address_tree
      type: object
      description: Address tree with null values at leaf positions to query.
  description: Query accepted value ranges for method parameters.
  example_tx: '{"osc":{"limits":[{"brightness":null}]}}'

- id: osc_xid
  label: Echo Transaction ID
  kind: action
  address: /osc/xid
  params:
    - name: xid
      type: number
      description: Arbitrary transaction ID echoed back by server.
  description: Reflected back in reply; may be bundled with other method calls.
  example_tx: '{"osc":{"xid":1234567890},"brightness":null}'

- id: osc_feature_subscription_query
  label: Query Subscription Support
  kind: action
  address: /osc/feature/subscription
  params: []
  description: Returns whether the server supports SSC subscriptions.

- id: osc_feature_pattern_query
  label: Query Pattern Matching Support
  kind: action
  address: /osc/feature/pattern
  params: []
  description: Returns pattern matching characters supported (e.g. "*?") or false.

- id: osc_feature_baseaddr_query
  label: Query Base Address Support
  kind: action
  address: /osc/feature/baseaddr
  params: []
  description: Returns whether the server supports base address shortening.

- id: osc_feature_timetag_query
  label: Query Timetag Support
  kind: action
  address: /osc/feature/timetag
  params: []
  description: Returns whether the server supports timed method execution.

- id: osc_state_close
  label: Close Connection
  kind: action
  address: /osc/state/close
  params:
    - name: close
      type: boolean
      description: Must be true.
  description: Server closes connection immediately after reply.
  example_tx: '{"osc":{"state":{"close":true}}}'

- id: osc_state_prettyprint_set
  label: Set Pretty Print
  kind: action
  address: /osc/state/prettyprint
  params:
    - name: enabled
      type: boolean
      description: true for formatted output, false for compact.
  description: Select formatting style for all SSC reply messages.

- id: osc_ping
  label: Ping Server
  kind: action
  address: /osc/ping
  params: []
  description: Keep-alive ping (MCR DW only).
  example_tx: '{"osc":{"ping":null}}'

# ── Subscriptions ──

- id: osc_state_subscribe
  label: Subscribe to State Changes
  kind: action
  address: /osc/state/subscribe
  params:
    - name: address_tree
      type: array
      description: Array of address trees with null values at subscribe targets.
    - name: lifetime
      type: number
      description: Subscription lifetime in seconds. Default 10.
    - name: count
      type: number
      description: Max notifications before auto-terminate. Default 1000.
  description: Subscribe to value changes. Server sends initial value then notifies on changes. Terminates with error 310.
  example_tx: '{"osc":{"state":{"subscribe":[{"#":{"lifetime":2000},"brightness":null}]}}}'

# ── Device Management (common) ──

- id: device_name_get_set
  label: Get/Set Device Name
  kind: action
  address: /device/name
  params:
    - name: name
      type: string
      description: "Device name (max 29 chars MCR, otherwise per-device). Pass null to query."
  description: User-settable persistent device name.
  example_tx: '{"device":{"name":null}}'

- id: device_group_get_set
  label: Get/Set Device Group
  kind: action
  address: /device/group
  params:
    - name: group
      type: string
      description: "Group name up to 8 chars (letters, digits, -, _). Pass null to query."
  description: Group name for device organization (Rack DW, CHG only).

- id: device_language_get_set
  label: Get/Set Language
  kind: action
  address: /device/language
  params:
    - name: language
      type: string
      description: "Locale code (e.g. en_GB). Pass null to query."
  description: Language for server-returned values. Default en_GB.

- id: device_location_get_set
  label: Get/Set Location
  kind: action
  address: /device/location
  params:
    - name: location
      type: string
      description: Location description string. Pass null to query.
  description: Device location name.

- id: device_identity_product_query
  label: Query Product ID
  kind: action
  address: /device/identity/product
  params: []
  description: Product identification string (e.g. SLDW, SLDW4CH, CHG2N).

- id: device_identity_version_query
  label: Query Firmware Version
  kind: action
  address: /device/identity/version
  params: []
  description: Device firmware version string.

- id: device_identity_serial_query
  label: Query Serial Number
  kind: action
  address: /device/identity/serial
  params: []
  description: Unique product serial number.

- id: device_identity_vendor_query
  label: Query Vendor Name
  kind: action
  address: /device/identity/vendor
  params: []
  description: Returns "Sennheiser electronic GmbH & Co. KG".

- id: device_state_query
  label: Query Device State
  kind: action
  address: /device/state
  params: []
  description: "Rack DW: 0=Normal, 1=Pairing, 2=Rcvr Update, 3=TX Update, 4=TX Update Confirm, 5=TX Update Failed. MCR DW: NORMAL, UPDATE, UPDATE_FAILED, ERROR. CHG: 0=Normal, 1=FWU."

- id: device_reset
  label: Soft Reset Device
  kind: action
  address: /device/reset
  params:
    - name: reset
      type: boolean
      description: Must be true.
  description: Soft reset for configuration changes to take effect.

- id: device_factory_reset
  label: Factory Reset
  kind: action
  address: /device/factory_reset
  params:
    - name: factory_reset
      type: boolean
      description: Must be true.
  description: Reconfigure device with factory defaults and restart.

# ── Device Management (MCR DW only) ──

- id: device_restart
  label: Restart Device
  kind: action
  address: /device/restart
  params:
    - name: restart
      type: boolean
      description: Must be true.
  description: Restart the SL MCR DW.

- id: device_standby
  label: Standby Device
  kind: action
  address: /device/standby
  params:
    - name: standby
      type: boolean
      description: Must be true.
  description: Put device in standby. Wake via WakeOnLAN.

- id: device_restore
  label: Restore Defaults
  kind: action
  address: /device/restore
  params:
    - name: option
      type: string
      description: "FACTORY_DEFAULTS or AUDIO_DEFAULTS."
  description: Restore factory or audio defaults.
  example_tx: '{"device":{"restore":"AUDIO_DEFAULTS"}}'

- id: device_update_enable
  label: Trigger Firmware Update
  kind: action
  address: /device/update/enable
  params:
    - name: enable
      type: boolean
      description: Must be true.
  description: Trigger device firmware update (MCR DW).

- id: device_update_progress_query
  label: Query Update Progress
  kind: action
  address: /device/update/progress
  params: []
  description: Firmware update progress in percent (MCR DW, state=UPDATE).

- id: device_identification_visual
  label: Visual Identify Device
  kind: action
  address: /device/identification/visual
  params:
    - name: visual
      type: boolean
      description: true to trigger visual identification.
  description: Trigger visual identification on the MCR DW device.

- id: device_led_brightness_get_set
  label: Get/Set LED Brightness
  kind: action
  address: /device/led/brightness
  params:
    - name: brightness
      type: integer
      description: "Range 0..5. Pass null to query."
  description: LED brightness level (MCR DW only).

- id: device_dante_name_get_set
  label: Get/Set Dante Name
  kind: action
  address: /device/dante/name
  params:
    - name: name
      type: string
      description: "Dante network name, max 16 chars. Pass null to query."
  description: Dante network identification name (MCR DW only).

- id: device_position_get_set
  label: Get/Set Position
  kind: action
  address: /device/position
  params:
    - name: position
      type: string
      description: Position description. Pass null to query.
  description: Device position (MCR DW only).

- id: device_system_get_set
  label: Get/Set System Name
  kind: action
  address: /device/system
  params:
    - name: system
      type: string
      description: System name. Pass null to query.
  description: System name (MCR DW only).

- id: device_date_query
  label: Query Device Date
  kind: action
  address: /device/date
  params: []
  description: Current device time as formatted string (MCR DW only).

- id: device_time_get_set
  label: Get/Set Device Time
  kind: action
  address: /device/time
  params:
    - name: time
      type: number
      description: Seconds since 2000-01-01. Pass null to query.
  description: Device time (MCR DW only).

- id: device_timeprecision_query
  label: Query Time Precision
  kind: action
  address: /device/timeprecision
  params: []
  description: Always returns 1 (MCR DW only).

- id: device_warnings_query
  label: Query Device Warnings
  kind: action
  address: /device/warnings
  params: []
  description: "MCR: NONE, HW_FAILURE, MIXERDSP_FAILURE, SETTINGS_SAVE_FAILED, UPDATE_FAILED, SETTINGS_DEFAULTD. CHG: array of warning strings."

# ── Receiver Channel (Rack DW: /rx1, MCR DW: /rx1../rx4) ──

- id: rx_identify
  label: Identify Receiver Channel
  kind: action
  address: /rx1/identify
  params:
    - name: identify
      type: boolean
      description: true to start, false to stop.
  description: Start/stop identify mode on receiver channel (Rack DW).

- id: rx_pair
  label: Pair Transmitter
  kind: action
  address: /rx1/pair
  params:
    - name: pair
      type: boolean
      description: true to start pairing, false to stop.
  description: Start/stop pairing mode (Rack DW).

- id: rx_pair_enable
  label: Enable Pairing
  kind: action
  address: /rx1/pair/enable
  params:
    - name: enable
      type: boolean
      description: true to start, false to stop.
  description: Start/stop pairing mode on channel (MCR DW).

- id: rx_pair_progress_query
  label: Query Pairing Progress
  kind: action
  address: /rx1/pair/progress
  params: []
  description: Pairing countdown in seconds (120..0). MCR DW only, state=PAIRING.

- id: rx_rf_quality_query
  label: Query RF Quality
  kind: action
  address: /rx1/rf_quality
  params: []
  description: RF quality in percentage (0..100). Subscribe-able.

- id: rx_walktest
  label: Walk Test Mode
  kind: action
  address: /rx1/walktest
  params:
    - name: walktest
      type: boolean
      description: true to start, false to stop.
  description: Start/stop walk-test mode.

- id: rx_mute_switch_active
  label: Enable/Disable Mute Switch
  kind: action
  address: /rx1/mute_switch_active
  params:
    - name: active
      type: boolean
      description: Enable or disable mute switch on transmitter.
  description: Control mute switch functionality (Rack DW).

- id: rx_mute_mode_get_set
  label: Get/Set Mute Mode
  kind: action
  address: /rx1/mute_mode
  params:
    - name: mode
      type: integer
      description: "Rack DW: 0=Deactivated, 1=Active, 2=PushToTalk, 3=PushToMute, 4=LocationBasedMute. MCR DW: OFF, ON, PUSH_TO_TALK, PUSH_TO_MUTE, ROOM_MUTE."
  description: Configure mute mode on connected transmitter.

- id: rx_mute_state_get_set
  label: Get/Set Mute State
  kind: action
  address: /rx1/mute_state
  params:
    - name: muted
      type: boolean
      description: true=muted, false=unmuted. Pass null to query.
  description: Mute state of connected transmitter.

- id: rx_sync_info_query
  label: Query Sync Info
  kind: action
  address: /rx1/sync_info
  params: []
  description: "Rack DW: 0=Unknown, 1=Master, 2=Follower, 3=Unsync'd Follower."

- id: rx_master_follower_sync_info_query
  label: Query Master/Follower Sync
  kind: action
  address: /rx1/master_follower/sync_info
  params: []
  description: "MCR DW: NOT_SYNCED, MASTER, FOLLOWER, UNSYNCED_FOLLOWER."

- id: rx_rfpi_query
  label: Query RFPI
  kind: action
  address: /rx1/rfpi
  params: []
  description: RFPI identifier string of the receiver channel. Subscribe-able.

- id: rx_last_paired_ipei_query
  label: Query Last Paired IPEI
  kind: action
  address: /rx1/last_paired_ipei
  params: []
  description: IPEI of last connected portable device.

- id: rx_autolock_get_set
  label: Get/Set Autolock
  kind: action
  address: /rx1/autolock
  params:
    - name: autolock
      type: boolean
      description: Pass null to query.
  description: Auto-lock state of the receiver channel (Rack DW).

- id: rx_warnings_query
  label: Query Receiver Warnings
  kind: action
  address: /rx1/warnings
  params: []
  description: "Warnings: empty string (none), HW Failure, Bad Link, No Link, No FW Image, TX OTA FWU failed."

- id: rx_update_confirmation
  label: Confirm/Reject TX Update
  kind: action
  address: /rx1/update/confirmation
  params:
    - name: confirm
      type: boolean
      description: true=approve, false=reject.
  description: Approve or reject transmitter firmware update. Rejecting removes TX from pairing list.

- id: rx_update_progress_query
  label: Query TX Update Progress
  kind: action
  address: /rx1/update/progress
  params: []
  description: Transmitter firmware update progress in percent (MCR DW, state=FWU_OTA).

- id: rx_state_query
  label: Query Channel State
  kind: action
  address: /rx1/state
  params: []
  description: "MCR DW: NOT_CONNECTED, CONNECTED, PAIRING, FWU_OTA, FWU_OTA_CONFIRMATION, TRANSMITTER_UPDATE_FAILED, WALKTEST."

- id: rx_identification_visual
  label: Visual Identify Channel
  kind: action
  address: /rx1/identification/visual
  params:
    - name: visual
      type: boolean
      description: true to trigger identification.
  description: Trigger visual identification on MCR DW channel.

- id: rx_name_get_set
  label: Get/Set Channel Name
  kind: action
  address: /rx1/name
  params:
    - name: name
      type: string
      description: "Channel name up to 8 chars. Pass null to query."
  description: User-settable persistent channel name (MCR DW).

- id: rx_mates_query
  label: Query Active Transmitters
  kind: action
  address: /rx1/mates
  params: []
  description: Returns array of active transmitter paths (MCR DW). Subscribe-able.

- id: rx_progress_query
  label: Query Progress Bar
  kind: action
  address: /device/progress
  params: []
  description: Progress bar value 0..100 for pairing/update states (Rack DW, CHG).

# ── Transmitter / Mates (common across receivers) ──

- id: mates_active_query
  label: Query Active Mates
  kind: action
  address: /mates/active
  params: []
  description: "Rack DW: returns ['tx1'] or []. MCR DW: use /rx1/mates."

- id: mates_tx1_device_type_query
  label: Query Transmitter Type
  kind: action
  address: /mates/tx1/device_type
  params: []
  description: "Rack DW: 0=Handheld, 1=Bodypack, 2=Tablestand, 3=Boundary. MCR DW: HANDHELD, BODYPACK, TABLE-STAND, BOUNDARY."

- id: mates_tx1_acoustic_query
  label: Query Acoustic Input Type
  kind: action
  address: /mates/tx1/acoustic
  params: []
  description: "Returns capsule/input type: Mic, Line, MME865, MD42, MMD945, etc. INCOMPATIBLE or empty string."

- id: mates_tx1_agc_get_set
  label: Get/Set TX Audio Sensitivity
  kind: action
  address: /mates/tx1/agc
  params:
    - name: agc
      type: integer
      description: "Rack DW: 0=Auto, 1=0dB, 2=-6dB, 3=-12dB, 4=-18dB, 5=-24dB, 6=-30dB. MCR DW: AUTOMATIC, LEVEL1_0DB..LEVEL6_30DB."
  description: Transmitter audio sensitivity / gain control.

- id: mates_tx1_power_lock_get_set
  label: Get/Set Power Lock
  kind: action
  address: /mates/tx1/power_lock
  params:
    - name: locked
      type: boolean
      description: true to disable power button. Pass null to query.
  description: Enable/disable the power button on transmitter.

- id: mates_tx1_power_down
  label: Power Down Transmitter
  kind: action
  address: /mates/tx1/power_down
  params:
    - name: power_down
      type: boolean
      description: Must be true.
  description: Remotely power down the transmitter.

- id: mates_tx1_pairing_lock_get_set
  label: Get/Set Pairing Lock
  kind: action
  address: /mates/tx1/pairing_lock
  params:
    - name: locked
      type: boolean
      description: true to disable pairing button. Pass null to query.
  description: Enable/disable the pairing button on transmitter (Rack DW).

- id: mates_tx1_pairing_button_lock_get_set
  label: Get/Set Pairing Button Lock
  kind: action
  address: /mates/tx1/pairing_button_lock
  params:
    - name: locked
      type: boolean
      description: true to disable. Pass null to query.
  description: Enable/disable pairing button (MCR DW).

- id: mates_tx1_auto_power_off_get_set
  label: Get/Set Auto Power Off
  kind: action
  address: /mates/tx1/auto_power_off
  params:
    - name: mode
      type: integer
      description: "Rack DW: 0=Off, 1=10min, 2=20min, 3=30min. MCR DW: OFF, 10MIN, 20MIN, 30MIN."
  description: Configure automatic power down timer on transmitter.

- id: mates_tx1_led_active_get_set
  label: Get/Set LED Active
  kind: action
  address: /mates/tx1/led_active
  params:
    - name: active
      type: boolean
      description: true=LED on, false=LED off. Pass null to query.
  description: Enable/disable LED on handheld or bodypack transmitter.

- id: mates_tx1_switch1_state_query
  label: Query Switch State
  kind: action
  address: /mates/tx1/switch1/state
  params: []
  description: Get the mute switch state on the transmitter.

- id: mates_tx1_switch1_label_query
  label: Query Switch Label
  kind: action
  address: /mates/tx1/switch1/label
  params: []
  description: Get the switch1 label (typically "Mute").

- id: mates_tx1_gooseneck_state_query
  label: Query Gooseneck State
  kind: action
  address: /mates/tx1/gooseneck_state
  params: []
  description: Returns true if gooseneck attached to tablestand. Pre-condition: device_type must be TABLE-STAND.

- id: mates_tx1_warnings_query
  label: Query Transmitter Warnings
  kind: action
  address: /mates/tx1/warnings
  params: []
  description: "Returns array: empty string (none) or Low Bat."

- id: mates_tx1_active_query
  label: Query Mate Active State
  kind: action
  address: /mates/tx1/active
  params: []
  description: Returns true if link established (MCR DW). Subscribe-able.

# ── Battery (mates/tx1) ──

- id: mates_tx1_bat_type_query
  label: Query Battery Type
  kind: action
  address: /mates/tx1/bat_type
  params: []
  description: "Rack DW: 0=Battery, 1=Rechargeable. MCR DW: BATTERY, RECHARGEABLE."

- id: mates_tx1_bat_state_query
  label: Query Battery State
  kind: action
  address: /mates/tx1/bat_state
  params: []
  description: Returns bat_gauge or bat_lifetime depending on battery type.

- id: mates_tx1_bat_gauge_query
  label: Query Battery Gauge
  kind: action
  address: /mates/tx1/bat_gauge
  params: []
  description: Battery capacity percentage (0..100).

- id: mates_tx1_bat_lifetime_query
  label: Query Battery Lifetime
  kind: action
  address: /mates/tx1/bat_lifetime
  params: []
  description: Remaining battery lifetime in seconds (rechargeable only).

- id: mates_tx1_bat_bars_query
  label: Query Battery Bars
  kind: action
  address: /mates/tx1/bat_bars
  params: []
  description: Battery bars displayed on receiver homescreen.

- id: mates_tx1_bat_health_query
  label: Query Battery Health
  kind: action
  address: /mates/tx1/bat_health
  params: []
  description: Battery health percentage (rechargeable only).

- id: mates_tx1_bat_cycles_query
  label: Query Battery Cycles
  kind: action
  address: /mates/tx1/bat_cycles
  params: []
  description: Battery charging cycle count (rechargeable only).

- id: mates_tx1_bat_charging_query
  label: Query Charging Status
  kind: action
  address: /mates/tx1/bat_charging
  params: []
  description: Whether the battery is currently charging (tablestand/boundary with rechargeable).

# ── Audio (Rack DW) ──

- id: audio_out1_gain_db_get_set
  label: Get/Set Output Gain
  kind: action
  address: /audio/out1/gain_db
  params:
    - name: gain_index
      type: integer
      description: "0=-24dB, 1=-18dB, 2=-12dB, 3=-6dB, 4=0dB, 5=+6dB, 6=+12dB. Pass null to query."
  description: Analog output gain level (Rack DW).

- id: audio_out1_level_db_query
  label: Query Output Level
  kind: action
  address: /audio/out1/level_db
  params: []
  description: Actual output level in dB (-60..0). Subscribe-able.

- id: audio_out1_label_query
  label: Query Output Label
  kind: action
  address: /audio/out1/label
  params: []
  description: Output label string(s).

- id: audio_equalizer_preset_get_set
  label: Get/Set EQ Preset
  kind: action
  address: /audio/equalizer/preset
  params:
    - name: preset
      type: integer
      description: "Rack DW: 0=Off, 1=Female Speech, 2=Male Speech, 3=Media, 4=Custom. MCR DW uses string options."
  description: Equalizer preset selection (Rack DW).

- id: audio_low_cut_get_set
  label: Get/Set Low Cut
  kind: action
  address: /audio/low_cut
  params:
    - name: enabled
      type: boolean
      description: Pass null to query.
  description: Enable/disable low cut filter (Rack DW).

- id: audio_effects_reset
  label: Reset Audio Effects
  kind: action
  address: /audio/effects_reset
  params:
    - name: reset
      type: boolean
      description: Must be true.
  description: Restore audio effects to default settings (Rack DW).

# ── Audio (MCR DW) ──

- id: audio_rx_gain_get_set
  label: Get/Set Channel Gain
  kind: action
  address: /audio/rx1/gain
  params:
    - name: gain
      type: integer
      description: "Range -24..12, increment 6 dB. Pass null to query."
  description: Channel gain in dB (MCR DW). Subscribe-able.

- id: audio_rx_equalizer_preset_get_set
  label: Get/Set Channel EQ Preset
  kind: action
  address: /audio/rx1/equalizer/preset
  params:
    - name: preset
      type: string
      description: "OFF, FEMALE_SPEECH, MALE_SPEECH, MEDIA, CUSTOM. Pass null to query."
  description: Equalizer preset for the channel (MCR DW). Subscribe-able.

- id: audio_rx_low_cut_get_set
  label: Get/Set Channel Low Cut
  kind: action
  address: /audio/rx1/low_cut
  params:
    - name: enabled
      type: boolean
      description: Pass null to query.
  description: Low cut filter for the channel (MCR DW).

- id: audio_rx_restore
  label: Restore Channel Audio Defaults
  kind: action
  address: /audio/rx1/restore
  params:
    - name: restore
      type: boolean
      description: Must be true.
  description: Restore default audio settings for the channel (MCR DW).

- id: audio_out1_mixer_gain_query
  label: Query Output Mixer Gain
  kind: action
  address: /audio/out1/mixer/gain
  params: []
  description: "Analog output mixer gain in dB, range -24..12, increment 6 (MCR DW). Read only, subscribe-able."

- id: audio_dante_mixer_gain_query
  label: Query Dante Mixer Gain
  kind: action
  address: /audio/dante/mixer/gain
  params: []
  description: "Dante output mixer gain in dB, range -24..12, increment 6 (MCR DW)."

- id: audio_out1_desc_query
  label: Query Output Description
  kind: action
  address: /audio/out1/desc
  params: []
  description: Description of audio output (MCR DW).

# ── Monitoring (MCR DW) ──

- id: m_mixer_level_query
  label: Query Mixer Level
  kind: action
  address: /m/mixer/level
  params: []
  description: Incoming audio level on mixed channels (-60..0).

- id: m_rx_level_query
  label: Query Channel Input Level
  kind: action
  address: /m/rx1/level
  params: []
  description: Incoming audio level / transmitter gain per channel (-60..0).

- id: m_rx_channel_level_query
  label: Query Channel Post-Gain Level
  kind: action
  address: /m/rx1/channel_level
  params: []
  description: Audio level after first gain stage (-60..0).

# ── Display ──

- id: brightness_get_set
  label: Get/Set Display Brightness
  kind: action
  address: /brightness
  params:
    - name: brightness
      type: integer
      description: "Range 0..100 percent. Pass null to query."
  description: OLED display brightness (Rack DW only).

# ── Charger (CHG 2N / CHG 4N) ──

- id: bays_active_query
  label: Query Active Bays
  kind: action
  address: /bays/active
  params: []
  description: Array of booleans indicating inserted devices per bay. Subscribe-able.

- id: bays_device_type_query
  label: Query Bay Device Types
  kind: action
  address: /bays/device_type
  params: []
  description: "Array: 0=empty, 1=pTXh (handheld), 2=pTXb (bodypack)."

- id: bays_serial_query
  label: Query Bay Serial Numbers
  kind: action
  address: /bays/serial
  params: []
  description: Array of serial number strings per bay. Subscribe-able.

- id: bays_version_query
  label: Query Bay Firmware Versions
  kind: action
  address: /bays/version
  params: []
  description: Array of firmware version strings per bay. Subscribe-able.

- id: bays_linkdate_query
  label: Query Bay Link Dates
  kind: action
  address: /bays/linkdate
  params: []
  description: Array of firmware link dates per bay. Subscribe-able.

- id: bays_charging_query
  label: Query Charging Status
  kind: action
  address: /bays/charging
  params: []
  description: Array of booleans: true=charging, false=empty or fully charged. Subscribe-able.

- id: bays_bat_gauge_query
  label: Query Bay Battery Gauge
  kind: action
  address: /bays/bat_gauge
  params: []
  description: Array of remaining capacity percentages per bay. Subscribe-able.

- id: bays_bat_timetofull_query
  label: Query Time to Full Charge
  kind: action
  address: /bays/bat_timetofull
  params: []
  description: Array of remaining minutes until fully charged per bay. Subscribe-able.

- id: bays_bat_bars_query
  label: Query Bay Battery Bars
  kind: action
  address: /bays/bat_bars
  params: []
  description: Array of battery bar counts per bay (0..6). Subscribe-able.

- id: bays_bat_health_query
  label: Query Bay Battery Health
  kind: action
  address: /bays/bat_health
  params: []
  description: Array of battery health percentages per bay. Subscribe-able.

- id: bays_bat_cycles_query
  label: Query Bay Battery Cycles
  kind: action
  address: /bays/bat_cycles
  params: []
  description: Array of charging cycle counts per bay. Subscribe-able.

- id: bays_identify
  label: Identify Bay Slots
  kind: action
  address: /bays/identify
  params:
    - name: slots
      type: array
      description: "Array of booleans (CHG 2N: 2, CHG 4N: 4). true=flash LEDs, false=off, null=no change. Held for 10s."
  description: Flash LEDs on selected charger bay slots.
  example_tx: '{"bays":{"identify":[true,false,false,false]}}'

- id: bays_state_query
  label: Query Bay States
  kind: action
  address: /bays/state
  params: []
  description: "Two arrays: state array (0=Normal, 1=Update, 2=Error) and error bitmap array (bit0=comm error, bit1=update error, bit2=overcurrent, bit3=5V missing)."

- id: device_ptxversion_sl_query
  label: Query Stored SL PTX Version
  kind: action
  address: /device/ptxversion_sl
  params: []
  description: Version of stored SpeechLine portable transmitter firmware image.

- id: device_ptxversion_d1_query
  label: Query Stored D1 PTX Version
  kind: action
  address: /device/ptxversion_d1
  params: []
  description: Version of stored ewd1 portable transmitter firmware image.

# ── Network Configuration (common) ──

- id: device_network_ether_interfaces_query
  label: Query Ethernet Interfaces
  kind: action
  address: /device/network/ether/interfaces
  params: []
  description: Array of Ethernet interface names.

- id: device_network_ether_macs_query
  label: Query MAC Addresses
  kind: action
  address: /device/network/ether/macs
  params: []
  description: Array of MAC address strings.

- id: device_network_ipv4_ipaddr_query
  label: Query IPv4 Addresses
  kind: action
  address: /device/network/ipv4/ipaddr
  params: []
  description: Array of current IPv4 addresses.

- id: device_network_ipv4_netmask_query
  label: Query IPv4 Netmasks
  kind: action
  address: /device/network/ipv4/netmask
  params: []
  description: Array of current IPv4 netmasks.

- id: device_network_ipv4_gateway_query
  label: Query IPv4 Gateways
  kind: action
  address: /device/network/ipv4/gateway
  params: []
  description: Array of IPv4 gateways.

- id: device_network_ipv4_auto_get_set
  label: Get/Set DHCP/ZeroConf
  kind: action
  address: /device/network/ipv4/auto
  params:
    - name: auto
      type: array
      description: Array of booleans per interface. Change takes effect after reset.
  description: Enable/disable automatic IPv4 configuration via DHCP.

- id: device_network_mdns_get_set
  label: Get/Set mDNS
  kind: action
  address: /device/network/mdns_responder
  params:
    - name: enabled
      type: boolean
      description: Pass null to query.
  description: Enable/disable mDNS responder. Change takes effect after restart.

- id: device_network_interface_mapping_get_set
  label: Get/Set Network Config
  kind: action
  address: /device/network/interface_mapping
  params:
    - name: config
      type: string
      description: "CONFIG1=Single cable, CONFIG2=Audio redundancy, CONFIG3=Split mode. Pass null to query."
  description: Network interface configuration (MCR DW). Triggers automatic reboot on change.

# ── Dante Network (MCR DW) ──

- id: audio_out2_identity_version_query
  label: Query Dante Interface Version
  kind: action
  address: /audio/out2/identity/version
  params: []
  description: Dante interface software version (MCR DW).

- id: audio_out2_network_ipv4_ipaddr_query
  label: Query Dante IPv4 Addresses
  kind: action
  address: /audio/out2/network/ipv4/ipaddr
  params: []
  description: Current IPv4 addresses of Dante interfaces (MCR DW).
```

## Feedbacks
```yaml
# ── Device-level feedbacks ──

- id: device_state
  type: enum
  values:
    - name: Rack DW
      options: [Normal, Pairing, Receiver Update, Transmitter Update, TX Update Confirmation, TX Update Failed]
    - name: MCR DW
      options: [NORMAL, UPDATE, UPDATE_FAILED, ERROR]
    - name: CHG
      options: [Normal, FWU]
  description: Current operating state of the device.

- id: device_warnings
  type: enum
  description: Active device warnings. Content varies by device type.

- id: device_update_progress
  type: number
  min: 0
  max: 100
  description: Firmware update progress percentage.

# ── Receiver channel feedbacks ──

- id: rx_rf_quality
  type: number
  min: 0
  max: 100
  description: RF signal quality percentage.
  subscribeable: true

- id: rx_state
  type: enum
  values: [NOT_CONNECTED, CONNECTED, PAIRING, FWU_OTA, FWU_OTA_CONFIRMATION, TRANSMITTER_UPDATE_FAILED, WALKTEST]
  description: Receiver channel state (MCR DW).

- id: rx_warnings
  type: array
  description: Active receiver warnings (e.g. Bad Link, No Link, No FW Image).

- id: rx_pair_progress
  type: number
  min: 0
  max: 120
  description: Pairing countdown in seconds (MCR DW).

# ── Transmitter feedbacks ──

- id: tx_bat_gauge
  type: number
  min: 0
  max: 100
  description: Battery remaining capacity percentage.
  subscribeable: true

- id: tx_bat_lifetime
  type: number
  description: Remaining battery lifetime in seconds (rechargeable only).
  subscribeable: true

- id: tx_bat_health
  type: number
  min: 0
  max: 100
  description: Battery health percentage.

- id: tx_warnings
  type: array
  description: Transmitter warnings (e.g. Low Bat).

- id: tx_mute_state
  type: boolean
  description: Current mute state of the transmitter.

# ── Audio feedbacks ──

- id: audio_out1_level
  type: number
  min: -60
  max: 0
  description: Actual output level in dB (Rack DW).

- id: audio_rx1_gain
  type: number
  min: -24
  max: 12
  description: Channel gain in dB (MCR DW).

- id: m_mixer_level
  type: number
  min: -60
  max: 0
  description: Mixed audio input level (MCR DW).

- id: m_rx_level
  type: number
  min: -60
  max: 0
  description: Per-channel transmitter gain level (MCR DW).

# ── Charger feedbacks ──

- id: bays_active
  type: array
  description: Boolean array of which bays have devices inserted.
  subscribeable: true

- id: bays_charging
  type: array
  description: Boolean array of which bays are actively charging.
  subscribeable: true

- id: bays_bat_gauge
  type: array
  description: Battery capacity percentage per bay.
  subscribeable: true

- id: bays_state
  type: array
  description: "Two arrays: state (0=Normal, 1=Update, 2=Error) and error bitmap per bay."

- id: osc_error
  type: object
  description: Error response from server. Contains error codes (400, 404, 406, 454, etc.) mapped to failing addresses.
```

## Variables
```yaml
- id: brightness
  type: integer
  min: 0
  max: 100
  description: OLED display brightness percentage (Rack DW only).

- id: led_brightness
  type: integer
  min: 0
  max: 5
  description: LED brightness level (MCR DW only).

- id: audio_out1_gain_db
  type: integer
  options: [-24, -18, -12, -6, 0, 6, 12]
  description: Analog output gain in dB (Rack DW).

- id: audio_rx_gain
  type: integer
  min: -24
  max: 12
  step: 6
  description: Per-channel gain in dB (MCR DW).

- id: audio_out1_mixer_gain
  type: integer
  min: -24
  max: 12
  step: 6
  description: Analog output mixer gain in dB (MCR DW).

- id: audio_dante_mixer_gain
  type: integer
  min: -24
  max: 12
  step: 6
  description: Dante output mixer gain in dB (MCR DW).

- id: eq_preset
  type: enum
  options: [Off, Female Speech, Male Speech, Media, Custom]
  description: Equalizer preset selection.

- id: tx_agc
  type: enum
  options: [Automatic, 0 dB, -6 dB, -12 dB, -18 dB, -24 dB, -30 dB]
  description: Transmitter audio sensitivity.

- id: mute_mode
  type: enum
  options: [Deactivated, Active, Push To Talk, Push To Mute, Location Based Mute]
  description: Mute mode configuration.

- id: tx_auto_power_off
  type: enum
  options: [Off, 10min, 20min, 30min]
  description: Transmitter automatic power-off timer.

- id: subscription_lifetime
  type: number
  min: 1
  description: SSC subscription lifetime in seconds. Default 10, configurable per subscription.
```

## Events
```yaml
- id: subscription_notification
  description: Server pushes value changes for subscribed addresses during subscription lifetime.

- id: subscription_terminated
  description: Server sends error 310 when subscription lifetime or notification count expires.

- id: osc_error_event
  description: Server sends error response for faulty method calls (400, 404, 406, etc.).
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - action: rx_pair
    precondition: Receiver must not be in walk-test mode.
  - action: rx_walktest
    precondition: Channel must be connected and not in pairing or identify mode.
  - action: rx_update_confirmation
    precondition: Channel must be in FWU_OTA_CONFIRMATION state. Rejecting removes TX from pairing list.
  - action: mates_tx1_gooseneck_state
    precondition: Transmitter type must be TABLE-STAND.
  - action: mates_tx1_bat_lifetime
    precondition: Link must be established with rechargeable battery transmitter.
# UNRESOLVED: no explicit safety interlocks or power sequencing warnings found in source
```

## Notes

- **SSC protocol model**: JSON messages over UDP. Each message is a single JSON object. Getter methods use `null` as the argument value. The server adapts out-of-range values silently (clamps to nearest valid value).
- **Multi-channel addressing**: For MCR DW devices, replace `rx1`/`tx1` with the desired channel (rx1..rx4, tx1..tx4). The Rack DW uses only `rx1`/`tx1`.
- **Subscription lifecycle**: Default lifetime is 10 seconds. Client must renew or set a longer lifetime. Up to 8 concurrent subscription clients supported. Subscriptions terminate on connection close or lifetime/count expiry (error 310).
- **DNS-SD discovery**: Devices publish `_ssc._udp` service type. Service instance name matches `/device/name`. Clients should not rely on default port 45.
- **Error codes**: Follow HTTP-style three-digit codes. Common errors: 400 (bad JSON), 404 (address not found), 406 (wrong type/read-only), 454 (hidden address), 310 (subscription terminated).
- **Network config changes**: Many network settings require a device reset/restart to take effect (IPv4 auto, mDNS, interface mapping).
- **MCR DW channel conventions**: rx1..rx2 for SL MCR 2 DW, rx1..rx4 for SL MCR 4 DW. Corresponding tx1..tx4 for paired transmitters.

<!-- UNRESOLVED: No TCP transport details for devices that might support it (source says UDP-only for SLDW devices) -->
<!-- UNRESOLVED: Firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: Max concurrent client connections for non-subscription operations not stated -->
<!-- UNRESOLVED: UDP message size limits not explicitly stated (error 450 exists for response too long) -->

## Provenance

```yaml
source_domains:
  - assets.sennheiser.com
retrieved_at: 2026-05-07T06:17:53.500Z
last_checked_at: 2026-05-08T15:46:54.824Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-08T15:46:54.824Z
matched_actions: 125
action_count: 125
confidence: high
summary: "All 125 spec actions matched to source SSC methods; transport port, protocol, and discovery mechanism verified verbatim from source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
