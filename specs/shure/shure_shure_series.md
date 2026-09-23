---
spec_id: admin/shure-ulxd
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shure ULX-D Control Spec"
manufacturer: Shure
model_family: ULXD4
aliases: []
compatible_with:
  manufacturers:
    - Shure
  models:
    - ULXD4
    - ULXD4D
    - ULXD4Q
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shure.com
source_urls:
  - https://www.shure.com/en-US/docs/commandstrings/ulxd
  - https://www.shure.com/en-US/docs/commandstrings/mxa710
  - https://www.shure.com/en-US/docs/commandstrings/mxw
  - https://www.shure.com/en-US/docs/commandstrings/mxa920
  - https://www.shure.com/en-US/docs/commandstrings/mxcwncs
retrieved_at: 2026-09-02T16:07:12.391Z
last_checked_at: 2026-09-21T22:17:09.480Z
generated_at: 2026-09-21T22:17:09.480Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is ULX-D Command Strings page only; no safety, fault, or firmware notes"
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements."
  - "power-on sequencing, fault recovery, voltage/current, max simultaneous clients, connection-loss behavior not stated in source."
verification:
  verdict: verified
  checked_at: 2026-09-21T22:17:09.480Z
  matched_actions: 64
  action_count: 64
  confidence: medium
  summary: "All 64 spec actions have literal wire-level matches in the source; transport port 2202 and TCP confirmed; bidirectional coverage complete. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Shure ULX-D Control Spec

## Summary
Shure ULX-D digital wireless receiver family (ULXD4 1-channel, ULXD4D 2-channel dual, ULXD4Q 4-channel quad). This spec covers the TCP/IP ASCII command-string control interface on port 2202, used by AMX/Crestron programmers for remote control and status reporting. Messages are angle-bracketed ASCII strings with GET, SET, REP, REP ERR, and SAMPLE verbs, and an `x` channel index in the range 0-4.

<!-- UNRESOLVED: source is ULX-D Command Strings page only; no safety, fault, or firmware notes -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 2202
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from FLASH, scan/sync lock, frequency/audio controls implying live device
- routable        # inferred from frequency and group/channel selection
- queryable       # inferred from GET commands returning REP
- levelable       # inferred from AUDIO_GAIN commands
```

## Actions
```yaml
# CRITICAL: every distinct command row in source is enumerated as a separate action.
# Channel-bearing commands are emitted with the x parameter; the spec covers one action per
# command row, parameterized where the source shows a value range.

# --- Device commands ---
- id: get_all
  label: GET ALL (discovery of all report strings)
  kind: query
  command: "< GET x ALL >"
  params:
    - name: x
      type: integer
      description: Channel index (0 = all channels, 1-4 = individual)

- id: audio_summing_mode_get
  label: GET AUDIO_SUMMING_MODE
  kind: query
  command: "< GET AUDIO_SUMMING_MODE >"
  params: []

- id: audio_summing_mode_set
  label: SET AUDIO_SUMMING_MODE
  kind: action
  command: "< SET AUDIO_SUMMING_MODE {value} >"
  params:
    - name: value
      type: string
      description: OFF | 1+2 | 3+4 | 1+2/3+4 (quad) | 1+2+3+4 (quad)

- id: device_id_get
  label: GET DEVICE_ID
  kind: query
  command: "< GET DEVICE_ID >"
  params: []

- id: device_id_set
  label: SET DEVICE_ID
  kind: action
  command: "< SET DEVICE_ID {yyyyyyyy} >"
  params:
    - name: yyyyyyyy
      type: string
      description: 8-character device ID (A-Z, a-z, 0-9, allowed punctuation, space)

- id: encryption_get
  label: GET ENCRYPTION
  kind: query
  command: "< GET ENCRYPTION >"
  params: []

- id: encryption_set
  label: SET ENCRYPTION
  kind: action
  command: "< SET ENCRYPTION {setting} >"
  params:
    - name: setting
      type: string
      description: OFF | AUTO | MANUAL

- id: encryption_regenerate_key_set
  label: SET ENCRYPTION_REGENERATE_KEY
  kind: action
  command: "< SET ENCRYPTION_REGENERATE_KEY {value} >"
  params:
    - name: value
      type: string
      description: REQUESTED (triggers regen). Device then REP COMPLETED, then REP INACTIVE.

- id: flash_set_device
  label: SET FLASH (device identify)
  kind: action
  command: "< SET FLASH {state} >"
  params:
    - name: state
      type: string
      description: ON | OFF

- id: flash_set_channel
  label: SET FLASH (channel identify)
  kind: action
  command: "< SET {x} FLASH {state} >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)
    - name: state
      type: string
      description: ON | OFF

- id: frequency_diversity_mode_get
  label: GET FREQUENCY_DIVERSITY_MODE
  kind: query
  command: "< GET FREQUENCY_DIVERSITY_MODE >"
  params: []

- id: frequency_diversity_mode_set
  label: SET FREQUENCY_DIVERSITY_MODE
  kind: action
  command: "< SET FREQUENCY_DIVERSITY_MODE {status} >"
  params:
    - name: status
      type: string
      description: OFF | 1+2 | 3+4 (quad) | 1+2/3+4 (quad)

- id: fw_ver_get
  label: GET FW_VER
  kind: query
  command: "< GET FW_VER >"
  params: []

- id: high_density_get
  label: GET HIGH_DENSITY
  kind: query
  command: "< GET HIGH_DENSITY >"
  params: []

- id: high_density_set
  label: SET HIGH_DENSITY
  kind: action
  command: "< SET HIGH_DENSITY {value} >"
  params:
    - name: value
      type: string
      description: OFF | ON

- id: model_get
  label: GET MODEL
  kind: query
  command: "< GET MODEL >"
  params: []

- id: na_device_name_get
  label: GET NA_DEVICE_NAME
  kind: query
  command: "< GET NA_DEVICE_NAME >"
  params: []

- id: scan_lock_get
  label: GET SCAN_LOCK
  kind: query
  command: "< GET SCAN_LOCK >"
  params: []

- id: scan_lock_set
  label: SET SCAN_LOCK
  kind: action
  command: "< SET SCAN_LOCK {state} >"
  params:
    - name: state
      type: string
      description: ON | OFF

- id: sync_lock_get
  label: GET SYNC_LOCK
  kind: query
  command: "< GET SYNC_LOCK >"
  params: []

- id: sync_lock_set
  label: SET SYNC_LOCK
  kind: action
  command: "< SET SYNC_LOCK {state} >"
  params:
    - name: state
      type: string
      description: ON | OFF

- id: net_settings_get
  label: GET NET_SETTINGS
  kind: query
  command: "< GET NET_SETTINGS {interface} >"
  params:
    - name: interface
      type: string
      description: SC (Shure Control) | D1 (Dante Primary) | D2 (Dante Secondary; Split/Redundant only). ULXD4 supports SC only.

- id: net_settings_set
  label: SET NET_SETTINGS
  kind: action
  command: "< SET NET_SETTINGS {interface} {ipMode} {ipAddr} {subnetMask} {gwAddr} >"
  params:
    - name: interface
      type: string
      description: SC | D1 | D2
    - name: ipMode
      type: string
      description: AUTO | MANUAL
    - name: ipAddr
      type: string
      description: aaa.aaa.aaa.aaa, or "na" when ipMode=AUTO
    - name: subnetMask
      type: string
      description: bbb.bbb.bbb.bbb, or "na" when ipMode=AUTO
    - name: gwAddr
      type: string
      description: ccc.ccc.ccc.ccc (000.000.000.000 = no gateway), or "na" when ipMode=AUTO

# --- Channel commands ---
- id: audio_gain_get
  label: GET channel AUDIO_GAIN
  kind: query
  command: "< GET {x} AUDIO_GAIN >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: audio_gain_set
  label: SET channel AUDIO_GAIN
  kind: action
  command: "< SET {x} AUDIO_GAIN {value} >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)
    - name: value
      type: integer
      description: 000-060 in steps of 1 (reported/set value; actual dB = value - 18; range -18 to +42 dB)

- id: audio_gain_inc
  label: SET channel AUDIO_GAIN INC
  kind: action
  command: "< SET {x} AUDIO_GAIN INC {step} >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)
    - name: step
      type: integer
      description: Increment amount in 1-dB steps

- id: audio_gain_dec
  label: SET channel AUDIO_GAIN DEC
  kind: action
  command: "< SET {x} AUDIO_GAIN DEC {step} >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)
    - name: step
      type: integer
      description: Decrement amount in 1-dB steps

- id: audio_mute_get
  label: GET channel AUDIO_MUTE
  kind: query
  command: "< GET {x} AUDIO_MUTE >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: audio_mute_on
  label: SET channel AUDIO_MUTE ON
  kind: action
  command: "< SET {x} AUDIO_MUTE ON >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: audio_mute_off
  label: SET channel AUDIO_MUTE OFF
  kind: action
  command: "< SET {x} AUDIO_MUTE OFF >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: audio_mute_toggle
  label: SET channel AUDIO_MUTE TOGGLE
  kind: action
  command: "< SET {x} AUDIO_MUTE TOGGLE >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: chan_name_get
  label: GET channel CHAN_NAME
  kind: query
  command: "< GET {x} CHAN_NAME >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: chan_name_set
  label: SET channel CHAN_NAME
  kind: action
  command: "< SET {x} CHAN_NAME {yyyyyyyy} >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)
    - name: yyyyyyyy
      type: string
      description: 8-character name; A-Z, a-z, 0-9, !"#$%&'()*+,-./:;<=>?@[\]^_`~ and space

- id: encryption_warning_get
  label: GET channel ENCRYPTION_WARNING
  kind: query
  command: "< GET {x} ENCRYPTION_WARNING >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: frequency_set
  label: SET channel FREQUENCY
  kind: action
  command: "< SET {x} FREQUENCY {######} >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)
    - name: ######
      type: string
      description: 6-digit frequency in KHz

- id: frequency_get
  label: GET channel FREQUENCY
  kind: query
  command: "< GET {x} FREQUENCY >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: group_chan_set
  label: SET channel GROUP_CHAN
  kind: action
  command: "< SET {x} GROUP_CHAN {gg},{cc} >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)
    - name: gg
      type: string
      description: Two-character group
    - name: cc
      type: string
      description: Two-character channel

- id: group_chan_get
  label: GET channel GROUP_CHAN
  kind: query
  command: "< GET {x} GROUP_CHAN >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: na_chan_name_get
  label: GET channel NA_CHAN_NAME
  kind: query
  command: "< GET {x} NA_CHAN_NAME >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: rf_int_det_get
  label: GET channel RF_INT_DET
  kind: query
  command: "< GET {x} RF_INT_DET >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

# --- Metering commands ---
- id: meter_rate_get
  label: GET channel METER_RATE
  kind: query
  command: "< GET {x} METER_RATE >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: meter_rate_set
  label: SET channel METER_RATE
  kind: action
  command: "< SET {x} METER_RATE {#####} >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)
    - name: #####
      type: integer
      description: Sample interval in ms (00100-99999). 00000 disables metering.

- id: sample_all
  label: SAMPLE ALL (metered attributes)
  kind: action
  command: "< SAMPLE {x} ALL {nn} {aaa} {eee} >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)
    - name: nn
      type: string
      description: Diversity LED state (see RF_ANTENNA)
    - name: aaa
      type: integer
      description: RF level on in-use antenna (see RX_RF_LVL)
    - name: eee
      type: integer
      description: Audio level 000-255 (see AUDIO_LVL)

- id: rf_antenna_get
  label: GET channel RF_ANTENNA
  kind: query
  command: "< GET {x} RF_ANTENNA >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: rx_rf_lvl_get
  label: GET channel RX_RF_LVL
  kind: query
  command: "< GET {x} RX_RF_LVL >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: audio_lvl_get
  label: GET channel AUDIO_LVL
  kind: query
  command: "< GET {x} AUDIO_LVL >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

# --- Side-channel (transmitter) commands ---
- id: batt_bars_get
  label: GET channel BATT_BARS
  kind: query
  command: "< GET {x} BATT_BARS >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: batt_charge_get
  label: GET channel BATT_CHARGE
  kind: query
  command: "< GET {x} BATT_CHARGE >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: batt_cycle_get
  label: GET channel BATT_CYCLE
  kind: query
  command: "< GET {x} BATT_CYCLE >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: batt_health_get
  label: GET channel BATT_HEALTH
  kind: query
  command: "< GET {x} BATT_HEALTH >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: batt_run_time_get
  label: GET channel BATT_RUN_TIME
  kind: query
  command: "< GET {x} BATT_RUN_TIME >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: batt_temp_c_get
  label: GET channel BATT_TEMP_C
  kind: query
  command: "< GET {x} BATT_TEMP_C >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: batt_temp_f_get
  label: GET channel BATT_TEMP_F
  kind: query
  command: "< GET {x} BATT_TEMP_F >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: batt_type_get
  label: GET channel BATT_TYPE
  kind: query
  command: "< GET {x} BATT_TYPE >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: tx_device_id_get
  label: GET channel TX_DEVICE_ID
  kind: query
  command: "< GET {x} TX_DEVICE_ID >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: tx_fw_ver_get
  label: GET channel TX_FW_VER
  kind: query
  command: "< GET {x} TX_FW_VER >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: tx_menu_lock_get
  label: GET channel TX_MENU_LOCK
  kind: query
  command: "< GET {x} TX_MENU_LOCK >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: tx_mute_button_status_get
  label: GET channel TX_MUTE_BUTTON_STATUS (ULXD6/ULXD8)
  kind: query
  command: "< GET {x} TX_MUTE_BUTTON_STATUS >"
  params:
    - name: x
      type: integer
      description: Channel index (1-4)

- id: tx_mute_status_get
  label: GET channel TX_MUTE_STATUS (ULXD6/ULXD8)
  kind: query
  command: "< GET {x} TX_MUTE_STATUS >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: tx_offset_get
  label: GET channel TX_OFFSET
  kind: query
  command: "< GET {x} TX_OFFSET >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: tx_power_source_get
  label: GET channel TX_POWER_SOURCE (ULXD6/ULXD8)
  kind: query
  command: "< GET {x} TX_POWER_SOURCE >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: tx_pwr_lock_get
  label: GET channel TX_PWR_LOCK
  kind: query
  command: "< GET {x} TX_PWR_LOCK >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: tx_rf_pwr_get
  label: GET channel TX_RF_PWR
  kind: query
  command: "< GET {x} TX_RF_PWR >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)

- id: tx_type_get
  label: GET channel TX_TYPE
  kind: query
  command: "< GET {x} TX_TYPE >"
  params:
    - name: x
      type: integer
      description: Channel number (1-4)
```

## Feedbacks
```yaml
# Each REP response from a GET/SET, and unsolicited reports from the device.
# Values listed per source.
- id: audio_summing_mode
  type: enum
  values: [OFF, "1+2", "3+4", "1+2/3+4", "1+2+3+4"]
- id: device_id
  type: string
  values: []  # 8-char string, blank = unknown
- id: encryption
  type: enum
  values: [OFF, AUTO, MANUAL]
- id: encryption_regenerate_key
  type: enum
  values: [REQUESTED, COMPLETED, INACTIVE]
- id: flash
  type: enum
  values: [ON, OFF]
- id: frequency_diversity_mode
  type: enum
  values: [OFF, "1+2", "3+4", "1+2/3+4"]
- id: fw_ver
  type: string
  values: []  # 24-char string, Maj.Min.Pack.Build; trailing * = incomplete prior update
- id: high_density
  type: enum
  values: [OFF, ON]
- id: model
  type: string
  values: []  # 32-char string
- id: na_device_name
  type: string
  values: []  # 31-char ID
- id: scan_lock
  type: enum
  values: [OFF, ON]
- id: sync_lock
  type: enum
  values: [OFF, ON]
- id: net_settings
  type: string
  values: []  # interface ipMode ipAddr subnetMask gwAddr macAddr
- id: audio_gain
  type: integer
  values: []  # 000-060 (reported), actual dB = reported - 18; range -18 to +42 dB
- id: audio_mute
  type: enum
  values: [ON, OFF]
- id: chan_name
  type: string
  values: []  # 8-char string
- id: encryption_warning
  type: enum
  values: [OFF, ON]
- id: frequency
  type: string
  values: []  # 6-digit KHz
- id: group_chan
  type: string
  values: []  # gg,cc; invalid reported as "--"
- id: na_chan_name
  type: string
  values: []  # 31-char Dante channel name
- id: rf_int_det
  type: enum
  values: [NONE, CRITICAL]
- id: meter_rate
  type: integer
  values: []  # 00100-99999 ms; 00000 = off
- id: rf_antenna
  type: enum
  values: [AX, XB, AB, XX]  # AB not possible on ULXD4
- id: rx_rf_lvl
  type: integer
  values: []  # 000-255 per antenna (3-char); actual dBm = reported - 128; range -128 to 127
- id: audio_lvl
  type: integer
  values: []  # 000-255 (3-char); actual dBFS = reported - 50
- id: batt_bars
  type: integer
  values: []  # 000-005, 255 = unknown
- id: batt_charge
  type: integer
  values: []  # 000-100 percent, 255 = unknown
- id: batt_cycle
  type: integer
  values: []  # 00000-65534 cycles, 65535 = unknown
- id: batt_health
  type: integer
  values: []  # 000-100 percent, 255 = unknown
- id: batt_run_time
  type: integer
  values: []  # 00000-65532 minutes; 65533=comm err, 65534=calculating, 65535=unknown/N/A
- id: batt_temp_c
  type: integer
  values: []  # 000-254; actual C = reported - 40; 255 = unknown/N/A
- id: batt_temp_f
  type: integer
  values: []  # 000-254; actual F = reported - 40; 255 = unknown/N/A
- id: batt_type
  type: enum
  values: [LION, ALKA, NIMH, LITH, WARN, UNKN]
- id: tx_device_id
  type: string
  values: []  # 8-char string; blank = unknown/N/A/no transmitter
- id: tx_fw_ver
  type: string
  values: []  # Maj.Min.Pack.Build; blank if unknown/no transmitter
- id: tx_menu_lock
  type: enum
  values: [ON, OFF, UNKN]
- id: tx_mute_button_status
  type: enum
  values: [PRESSED, RELEASED, UNKN]
- id: tx_mute_status
  type: enum
  values: [ON, OFF, UNKN]
- id: tx_offset
  type: integer
  values: []  # 000-033; actual dB = reported - 12; range -12 to +21 dB; 255 = unknown
- id: tx_power_source
  type: enum
  values: [BATTERY, EXTERNAL, UNKNOWN]
- id: tx_pwr_lock
  type: enum
  values: [ON, OFF, UNKN]
- id: tx_rf_pwr
  type: enum
  values: [LOW, NORMAL, HIGH, UNKN]
- id: tx_type
  type: enum
  values: [QLXD1, QLXD2, ULXD1, ULXD2, ULXD6, ULXD8, UNKN]
```

## Variables
```yaml
# Channel index `x` is the only universal variable; it ranges 0-4 with 0 = all.
- id: channel_index
  type: integer
  description: Channel index used in channel and side-channel commands (0=all, 1-4=individual)
  range: [0, 4]
```

## Events
```yaml
# Unsolicited device-emitted notifications.
# All non-metered properties generate a REP on value change (per source: "with the exception of
# the metered properties, the device sends a REPORT when a value changes"). Metered properties
# emit SAMPLE messages at the configured METER_RATE.
- id: property_report
  description: REP message sent automatically when any non-metered property changes value
  shape: "< REP ... >"
- id: sample_report
  description: SAMPLE message emitted periodically at METER_RATE for metered attributes
  shape: "< SAMPLE {x} ALL {nn} {aaa} {eee} >"
- id: report_error
  description: REP ERR emitted when a command is improperly formatted or values are out of range
  shape: "< REP ERR ... >"
- id: flash_complete
  description: REP FLASH OFF emitted by the device when an identify flash finishes
  shape: "< REP FLASH OFF >"
```

## Macros
```yaml
# Multi-step sequences explicitly described in source.
- id: encryption_regenerate_key_sequence
  description: Regenerate encryption key (only when ENCRYPTION=MANUAL). After SET, device emits three REPs in order: REQUESTED, COMPLETED, INACTIVE. Sync devices after.
  steps:
    - "< SET ENCRYPTION_REGENERATE_KEY REQUESTED >"
    - "< REP ENCRYPTION_REGENERATE_KEY REQUESTED >"  # accepted
    - "< REP ENCRYPTION_REGENERATE_KEY COMPLETED >"  # new key created
    - "< REP ENCRYPTION_REGENERATE_KEY INACTIVE >"   # ready for new request
  notes: Sync transmitters after completion (per source reminder).

- id: change_shure_control_to_manual
  description: Change Shure Control interface to MANUAL static IP (device does NOT auto-reboot for SC changes; client must reconnect at new IP).
  steps:
    - "< SET NET_SETTINGS SC MANUAL 192.168.1.123 255.255.255.0 192.168.1.1 >"
    - "Reconnect client to new IP"
    - "< GET NET_SETTINGS SC >"  # confirm

- id: change_shure_control_to_auto
  description: Change Shure Control interface to AUTO/DHCP.
  steps:
    - "< SET NET_SETTINGS SC AUTO na na na >"
    - "Reconnect client to new IP"
    - "< GET NET_SETTINGS SC >"  # confirm

- id: change_dante_primary_to_manual
  description: Change Dante Primary interface to MANUAL. Device reboots automatically; client must reconnect.
  steps:
    - "< SET NET_SETTINGS D1 MANUAL 10.10.1.15 255.255.255.0 10.10.1.1 >"
    - "Wait for device reboot"
    - "Reconnect client"
    - "< GET NET_SETTINGS D1 >"  # confirm

- id: enable_metering
  description: Start periodic SAMPLE streaming on a channel.
  steps:
    - "< SET {x} METER_RATE 01000 >"  # 1 second interval
- id: disable_metering
  description: Stop periodic SAMPLE streaming on a channel.
  steps:
    - "< SET {x} METER_RATE 00000 >"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
- Source document is "ULX-D Command Strings" from Shure pubs/commandstrings page; protocol is ASCII, angle-bracket delimited, over TCP/2202, no authentication.
- All ULXD4Q (quad) commands ignore 1+2/3+4 and 1+2+3+4 for AUDIO_SUMMING_MODE / FREQUENCY_DIVERSITY_MODE if invalid; device REP without applying change.
- `x` channel index: 0 = all channels, 1-4 = individual. ULXD4 has 1 channel; ULXD4D has 2; ULXD4Q has 4.
- `GET ALL` with x=0 returns device-specific REP plus ALL channel REPs (including metered); sent once per receipt, not on change.
- NET_SETTINGS: setting "SC" requires client reconnect at new IP; setting "D1"/"D2" triggers automatic device reboot.
- NET_SETTINGS: AUTO mode requires literal "na" for ipAddr/subnetMask/gwAddr.
- MAC address appears only in REP responses.
- FW_VER: 24-char string Maj.Min.Pack.Build. Trailing `*` = previous firmware update was incomplete; rerun via Shure Update Utility.
- Side-channel (transmitter) data: blank/padded REP means unknown, not applicable, or no transmitter present.
- TX_TYPE values listed also include QLXD1/QLXD2 — ULX-D receivers can report QLXD transmitters they receive.
- Companion/community modules (Bitfocus) cited port 2202 and angle-bracket syntax independently; primary source is Shure vendor doc.

<!-- UNRESOLVED: power-on sequencing, fault recovery, voltage/current, max simultaneous clients, connection-loss behavior not stated in source. -->

## Provenance

```yaml
source_domains:
  - shure.com
source_urls:
  - https://www.shure.com/en-US/docs/commandstrings/ulxd
  - https://www.shure.com/en-US/docs/commandstrings/mxa710
  - https://www.shure.com/en-US/docs/commandstrings/mxw
  - https://www.shure.com/en-US/docs/commandstrings/mxa920
  - https://www.shure.com/en-US/docs/commandstrings/mxcwncs
retrieved_at: 2026-09-02T16:07:12.391Z
last_checked_at: 2026-09-21T22:17:09.480Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-21T22:17:09.480Z
matched_actions: 64
action_count: 64
confidence: medium
summary: "All 64 spec actions have literal wire-level matches in the source; transport port 2202 and TCP confirmed; bidirectional coverage complete. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is ULX-D Command Strings page only; no safety, fault, or firmware notes"
- "source contains no safety warnings, interlocks, or power-on sequencing requirements."
- "power-on sequencing, fault recovery, voltage/current, max simultaneous clients, connection-loss behavior not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
