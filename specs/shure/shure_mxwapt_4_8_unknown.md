---
spec_id: admin/shure-mxwapt-4-8
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shure MXWAPT 4 / MXWAPT 8 Control Spec"
manufacturer: Shure
model_family: MXWAPT4
aliases: []
compatible_with:
  manufacturers:
    - Shure
  models:
    - MXWAPT4
    - MXWAPT8
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pubs.shure.com
  - shure.com
  - content-files.shure.com
source_urls:
  - https://pubs.shure.com/command-strings/MXW/en-US
  - https://pubs.shure.com/command-strings/MXA310/en-US
  - https://www.shure.com/en-US/docs/commandstrings/MXW
  - https://content-files.shure.com/Pubs2/files/259490.pdf
  - https://www.shure.com/en-US/docs/commandstrings
retrieved_at: 2026-06-15T23:30:12.409Z
last_checked_at: 2026-06-16T07:17:47.455Z
generated_at: 2026-06-16T07:17:47.455Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "MXWANI, MXWNCS charger-side commands are documented separately; this spec covers MXWAPT and transmitter-relayed commands only."
  - "no multi-step macro sequences are documented in source;"
  - "source does not document safety warnings, interlocks, or"
  - "firmware version compatibility not stated for general MXWAPT command set; only REMOTE_LINK notes v4.0+."
  - "transport framing (delimiter handling, line endings, message ordering, retransmit on collision) not stated beyond \"<\" and \">\" framing."
  - "no port authentication, encryption, or TLS option described in source."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:17:47.455Z
  matched_actions: 71
  action_count: 71
  confidence: medium
  summary: "All 71 spec actions match source commands literally; transport (port 2202, TCP, no auth) verified; complete bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Shure MXWAPT 4 / MXWAPT 8 Control Spec

## Summary
Control spec for the Shure Microflex Wireless Access Point Transceivers (MXWAPT4 4-channel, MXWAPT8 8-channel). Communication is Ethernet (TCP/IP) to AMX/Crestron/Extron or DSP control systems on port 2202, using ASCII command strings framed with `<` and `>`. The MXWAPT relays most commands to its linked wireless microphones (MXW1, MXW2, MXW6, MXW8).

<!-- UNRESOLVED: MXWANI, MXWNCS charger-side commands are documented separately; this spec covers MXWAPT and transmitter-relayed commands only. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 2202
auth:
  type: none  # inferred: no login/password/auth procedure in source
```

## Traits
```yaml
# - powerable       (TX_STATUS STANDBY/OFF commands present)
# - queryable       (extensive GET/REP queries present)
# - routable        (BP_MIC_SELECT INT/EXT routing present)
# - levelable       (AUDIO_GAIN, INT_AUDIO_GAIN, METER_RATE present)
```

## Actions
```yaml
# ====================================================================
# MXWAPT-level commands (sent to MXWAPT IP address)
# ====================================================================

# --- CHAN_NAME ---
- id: get_chan_name
  label: Get Channel Name (Primary)
  kind: query
  command: "< GET x CHAN_NAME >"
  params:
    - name: x
      type: integer
      description: Channel number 1-8 (or 0 for all)
- id: set_chan_name
  label: Set Channel Name (Primary)
  kind: action
  command: "< SET x CHAN_NAME {yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy} >"
  params:
    - name: x
      type: integer
      description: Channel number 1-8
    - name: name
      type: string
      description: Up to 8 characters (device pads response to 31)
- id: get_chan_name_sec
  label: Get Channel Name (Secondary)
  kind: query
  command: "< GET SEC x CHAN_NAME >"
  params:
    - name: x
      type: integer
      description: Channel number 1-8
- id: set_chan_name_sec
  label: Set Channel Name (Secondary)
  kind: action
  command: "< SET SEC x CHAN_NAME {yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy} >"
  params:
    - name: x
      type: integer
      description: Channel number 1-8
    - name: name
      type: string
      description: Up to 8 characters

# --- DEVICE_ID ---
- id: get_device_id
  label: Get Device ID
  kind: query
  command: "< GET DEVICE_ID >"
  params: []
- id: set_device_id
  label: Set Device ID
  kind: action
  command: "< SET DEVICE_ID {yyyyyyyyyyyyyyyyyyyyyyyyyy} >"
  params:
    - name: id
      type: string
      description: 1-8 characters; device pads to 31 in response

# --- UNLINK ---
- id: unlink_mic
  label: Unlink Primary Microphone
  kind: action
  command: "< SET x UNLINK >"
  params:
    - name: x
      type: integer
      description: APT channel or charger bay 1-8 (0 not allowed)
- id: unlink_sec_mic
  label: Unlink Secondary Microphone
  kind: action
  command: "< SET SEC x UNLINK >"
  params:
    - name: x
      type: integer
      description: APT channel or charger bay 1-8

# --- FLASH (device/channel identify) ---
- id: flash_device_on
  label: Device Identify On
  kind: action
  command: "< SET FLASH ON >"
  params: []
- id: flash_device_off
  label: Device Identify Off
  kind: action
  command: "< SET FLASH OFF >"
  params: []
- id: flash_sec_device_on
  label: Secondary Device Identify On
  kind: action
  command: "< SET SEC FLASH ON >"
  params: []
- id: flash_channel_on
  label: Channel Identify On (Primary)
  kind: action
  command: "< SET x FLASH ON >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: flash_sec_channel_on
  label: Channel Identify On (Secondary)
  kind: action
  command: "< SET SEC x FLASH ON >"
  params:
    - name: x
      type: integer
      description: Channel number

# --- METER_RATE ---
- id: set_meter_rate
  label: Set Meter Rate (Primary)
  kind: action
  command: "< SET x METER_RATE sssss >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: sssss
      type: integer
      description: "Metering interval in ms: 00000=OFF (default), 00100-65535"
- id: set_meter_rate_sec
  label: Set Meter Rate (Secondary)
  kind: action
  command: "< SET SEC x METER_RATE sssss >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: sssss
      type: integer
      description: "Metering interval in ms: 00000=OFF (default), 00100-65535"

# ====================================================================
# Transmitter-relayed commands (sent to MXWAPT, relayed to mics)
# ====================================================================

# --- TX_AVAILABLE ---
- id: get_tx_available
  label: Get TX Available (Primary)
  kind: query
  command: "< GET x TX_AVAILABLE >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: get_tx_available_sec
  label: Get TX Available (Secondary)
  kind: query
  command: "< GET SEC x TX_AVAILABLE >"
  params:
    - name: x
      type: integer
      description: Channel number

# --- TX_STATUS ---
- id: get_tx_status
  label: Get TX Status (Primary)
  kind: query
  command: "< GET x TX_STATUS >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: set_tx_status_active
  label: Set TX Status Active (Primary)
  kind: action
  command: "< SET x TX_STATUS ACTIVE >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: set_tx_status_mute
  label: Set TX Status Mute (Primary)
  kind: action
  command: "< SET x TX_STATUS MUTE >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: set_tx_status_standby
  label: Set TX Status Standby (Primary)
  kind: action
  command: "< SET x TX_STATUS STANDBY >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: set_tx_status_off
  label: Set TX Status Off (Primary)
  kind: action
  command: "< SET x TX_STATUS OFF >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: get_tx_status_sec
  label: Get TX Status (Secondary)
  kind: query
  command: "< GET SEC x TX_STATUS >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: set_tx_status_active_sec
  label: Set TX Status Active (Secondary)
  kind: action
  command: "< SET SEC x TX_STATUS ACTIVE >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: set_tx_status_mute_sec
  label: Set TX Status Mute (Secondary)
  kind: action
  command: "< SET SEC x TX_STATUS MUTE >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: set_tx_status_standby_sec
  label: Set TX Status Standby (Secondary)
  kind: action
  command: "< SET SEC x TX_STATUS STANDBY >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: set_tx_status_off_sec
  label: Set TX Status Off (Secondary)
  kind: action
  command: "< SET SEC x TX_STATUS OFF >"
  params:
    - name: x
      type: integer
      description: Channel number

# --- AUDIO_GAIN (offset 25: 000-060 = -25 to +35 dB) ---
- id: get_audio_gain
  label: Get Audio Gain (Primary)
  kind: query
  command: "< GET x AUDIO_GAIN >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: set_audio_gain
  label: Set Audio Gain (Primary)
  kind: action
  command: "< SET x AUDIO_GAIN {value} >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: value
      type: integer
      description: "Gain offset value 000-060, 3-digit zero-padded. Actual dB = value - 25."
- id: inc_audio_gain
  label: Increment Audio Gain (Primary)
  kind: action
  command: "< SET x AUDIO_GAIN INC {n} >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: n
      type: integer
      description: Increment in dB
- id: dec_audio_gain
  label: Decrement Audio Gain (Primary)
  kind: action
  command: "< SET x AUDIO_GAIN DEC {n} >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: n
      type: integer
      description: Decrement in dB
- id: get_audio_gain_sec
  label: Get Audio Gain (Secondary)
  kind: query
  command: "< GET SEC x AUDIO_GAIN >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: set_audio_gain_sec
  label: Set Audio Gain (Secondary)
  kind: action
  command: "< SET SEC x AUDIO_GAIN {value} >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: value
      type: integer
      description: "Gain offset value 000-060, 3-digit zero-padded."
- id: inc_audio_gain_sec
  label: Increment Audio Gain (Secondary)
  kind: action
  command: "< SET SEC x AUDIO_GAIN INC {n} >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: n
      type: integer
      description: Increment in dB
- id: dec_audio_gain_sec
  label: Decrement Audio Gain (Secondary)
  kind: action
  command: "< SET SEC x AUDIO_GAIN DEC {n} >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: n
      type: integer
      description: Decrement in dB

# --- INT_AUDIO_GAIN (offset 25: 000-040 = -25 to +15 dB) ---
- id: get_int_audio_gain
  label: Get Internal Mic Gain (Primary)
  kind: query
  command: "< GET x INT_AUDIO_GAIN >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: set_int_audio_gain
  label: Set Internal Mic Gain (Primary)
  kind: action
  command: "< SET x INT_AUDIO_GAIN {value} >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: value
      type: integer
      description: "Gain offset value 000-040, 3-digit zero-padded."
- id: inc_int_audio_gain
  label: Increment Internal Mic Gain (Primary)
  kind: action
  command: "< SET x INT_AUDIO_GAIN INC {n} >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: n
      type: integer
      description: Increment in dB
- id: dec_int_audio_gain
  label: Decrement Internal Mic Gain (Primary)
  kind: action
  command: "< SET x INT_AUDIO_GAIN DEC {n} >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: n
      type: integer
      description: Decrement in dB
- id: get_int_audio_gain_sec
  label: Get Internal Mic Gain (Secondary)
  kind: query
  command: "< GET SEC x INT_AUDIO_GAIN >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: set_int_audio_gain_sec
  label: Set Internal Mic Gain (Secondary)
  kind: action
  command: "< SET SEC x INT_AUDIO_GAIN {value} >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: value
      type: integer
      description: "Gain offset value 000-040, 3-digit zero-padded."
- id: inc_int_audio_gain_sec
  label: Increment Internal Mic Gain (Secondary)
  kind: action
  command: "< SET SEC x INT_AUDIO_GAIN INC {n} >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: n
      type: integer
      description: Increment in dB
- id: dec_int_audio_gain_sec
  label: Decrement Internal Mic Gain (Secondary)
  kind: action
  command: "< SET SEC x INT_AUDIO_GAIN DEC {n} >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: n
      type: integer
      description: Decrement in dB

# --- BUTTON_STS ---
- id: get_button_sts
  label: Get Button Status (Primary)
  kind: query
  command: "< GET x BUTTON_STS >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: get_button_sts_sec
  label: Get Button Status (Secondary)
  kind: query
  command: "< GET SEC x BUTTON_STS >"
  params:
    - name: x
      type: integer
      description: Channel number

# --- LED_STATUS (rr,gg each: ON/OF/ST/FL/PU/NC) ---
- id: get_led_status
  label: Get LED Status (Primary)
  kind: query
  command: "< GET x LED_STATUS >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: set_led_status
  label: Set LED Status (Primary)
  kind: action
  command: "< SET x LED_STATUS {rr} {gg} >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: rr
      type: string
      description: "Red LED: ON, OF, ST, FL, PU, NC"
    - name: gg
      type: string
      description: "Green LED: ON, OF, ST, FL, PU, NC"
- id: get_led_status_sec
  label: Get LED Status (Secondary)
  kind: query
  command: "< GET SEC x LED_STATUS >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: set_led_status_sec
  label: Set LED Status (Secondary)
  kind: action
  command: "< SET SEC x LED_STATUS {rr} {gg} >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: rr
      type: string
      description: "Red LED: ON, OF, ST, FL, PU, NC"
    - name: gg
      type: string
      description: "Green LED: ON, OF, ST, FL, PU, NC"

# --- TX_TYPE ---
- id: get_tx_type
  label: Get TX Type (Primary)
  kind: query
  command: "< GET x TX_TYPE >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: get_tx_type_sec
  label: Get TX Type (Secondary)
  kind: query
  command: "< GET SEC x TX_TYPE >"
  params:
    - name: x
      type: integer
      description: Channel number

# --- BP_MIC_SELECT ---
- id: get_bp_mic_select
  label: Get Bodypack Mic Select (Primary)
  kind: query
  command: "< GET x BP_MIC_SELECT >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: get_bp_mic_select_sec
  label: Get Bodypack Mic Select (Secondary)
  kind: query
  command: "< GET SEC x BP_MIC_SELECT >"
  params:
    - name: x
      type: integer
      description: Channel number

# --- BATT_CHARGE ---
- id: get_batt_charge
  label: Get Battery Charge (Primary)
  kind: query
  command: "< GET x BATT_CHARGE >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: get_batt_charge_sec
  label: Get Battery Charge (Secondary)
  kind: query
  command: "< GET SEC x BATT_CHARGE >"
  params:
    - name: x
      type: integer
      description: Channel number

# --- BATT_RUN_TIME ---
- id: get_batt_run_time
  label: Get Battery Run Time (Primary)
  kind: query
  command: "< GET x BATT_RUN_TIME >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: get_batt_run_time_sec
  label: Get Battery Run Time (Secondary)
  kind: query
  command: "< GET SEC x BATT_RUN_TIME >"
  params:
    - name: x
      type: integer
      description: Channel number

# --- BATT_HEALTH ---
- id: get_batt_health
  label: Get Battery Health (Primary)
  kind: query
  command: "< GET x BATT_HEALTH >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: get_batt_health_sec
  label: Get Battery Health (Secondary)
  kind: query
  command: "< GET SEC x BATT_HEALTH >"
  params:
    - name: x
      type: integer
      description: Channel number

# --- BATT_TIME_TO_FULL ---
- id: get_batt_time_to_full
  label: Get Battery Time To Full (Primary)
  kind: query
  command: "< GET x BATT_TIME_TO_FULL >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: get_batt_time_to_full_sec
  label: Get Battery Time To Full (Secondary)
  kind: query
  command: "< GET SEC x BATT_TIME_TO_FULL >"
  params:
    - name: x
      type: integer
      description: Channel number

# --- TX_DEVICE_ID (transmitter side, sent to MXWAPT) ---
- id: get_tx_device_id
  label: Get TX Device ID (Primary)
  kind: query
  command: "< GET x TX_DEVICE_ID >"
  params:
    - name: x
      type: integer
      description: Channel number (0 = all mics)
- id: set_tx_device_id
  label: Set TX Device ID (Primary)
  kind: action
  command: "< SET x TX_DEVICE_ID {yyyyyyyyyyyy} >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: id
      type: string
      description: "1-12 characters from A-Z, a-z, 0-9, '-'"
- id: get_tx_device_id_pri
  label: Get TX Device ID (Primary, explicit PRI)
  kind: query
  command: "< GET PRI x TX_DEVICE_ID >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: set_tx_device_id_pri
  label: Set TX Device ID (Primary, explicit PRI)
  kind: action
  command: "< SET PRI x TX_DEVICE_ID {yyyyyyyyyyyy} >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: id
      type: string
      description: "1-12 characters from A-Z, a-z, 0-9, '-'"
- id: get_tx_device_id_sec
  label: Get TX Device ID (Secondary)
  kind: query
  command: "< GET SEC x TX_DEVICE_ID >"
  params:
    - name: x
      type: integer
      description: Channel number
- id: set_tx_device_id_sec
  label: Set TX Device ID (Secondary)
  kind: action
  command: "< SET SEC x TX_DEVICE_ID {yyyyyyyyyyyy} >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: id
      type: string
      description: "1-12 characters from A-Z, a-z, 0-9, '-'"

# ====================================================================
# MXWNCS (charger-side) commands - sent to MXWNCS IP address
# Included for reference; MXWAPT does not relay these
# ====================================================================

# --- REMOTE_LINK (requires MXWAPT/NCS firmware v4.0+) ---
- id: remote_link_primary
  label: Remote Link Primary Microphone
  kind: action
  command: "< SET PRI x REMOTE_LINK y {zzz.zzz.zzz.zzz} >"
  params:
    - name: x
      type: integer
      description: Charger bay number
    - name: y
      type: integer
      description: MXWAPT channel number
    - name: ip
      type: string
      description: IP address of target MXWAPT
- id: remote_link_secondary
  label: Remote Link Secondary Microphone
  kind: action
  command: "< SET SEC x REMOTE_LINK y {zzz.zzz.zzz.zzz} >"
  params:
    - name: x
      type: integer
      description: Charger bay number
    - name: y
      type: integer
      description: MXWAPT channel number
    - name: ip
      type: string
      description: IP address of target MXWAPT

# --- TX_DEVICE_ID (charger-side variant) ---
- id: ncs_get_tx_device_id
  label: Get TX Device ID (NCS)
  kind: query
  command: "< GET x TX_DEVICE_ID >"
  params:
    - name: x
      type: integer
      description: Charger bay number (0 = all)
- id: ncs_set_tx_device_id
  label: Set TX Device ID (NCS)
  kind: action
  command: "< SET x TX_DEVICE_ID {yyyyyyyyyyyy} >"
  params:
    - name: x
      type: integer
      description: Charger bay number
    - name: id
      type: string
      description: "1-12 characters from A-Z, a-z, 0-9, '-'"
```

## Feedbacks
```yaml
# Discrete / enumerable state values
- id: tx_available
  type: enum
  values: [YES, NO]
- id: tx_status
  type: enum
  values: [ACTIVE, MUTE, STANDBY, ON_CHARGER, OFF, UNKNOWN]
- id: button_sts
  type: enum
  values: [ON, OFF]
- id: tx_type
  type: enum
  values: [MXW1, MXW2, MXW6, MXW8, UNKNOWN]
- id: bp_mic_select
  type: enum
  values: [INT, EXT, AUTO, ERR, UNKNOWN]
- id: led_color_value
  type: enum
  values: [ON, OF, ST, FL, PU, NC]
  description: "Per-color LED mode (red or green); ST=Strobe, FL=Flash, PU=Pulse, NC=No Change"
- id: unlink_result
  type: enum
  values: [SUCCESS, ERROR]
- id: remote_link_result
  type: enum
  values: [SUCCESS, ERR]
- id: generic_error
  type: enum
  values: [ERR]
  description: "< REP ERR > when command cannot be implemented (typo or unknown command)"
```

## Variables
```yaml
- id: chan_name
  type: string
  description: Channel name, padded to 31 characters; SET accepts up to 8
- id: device_id
  type: string
  description: Device ID, padded to 31 characters; SET accepts 1-8
- id: tx_device_id
  type: string
  description: Transmitter Device ID, 12 characters padded with spaces
- id: audio_gain
  type: integer
  description: "Audio gain offset 000-060 (3-digit). Actual dB = value - 25. Range -25 to +35 dB."
- id: int_audio_gain
  type: integer
  description: "Internal mic gain offset 000-040 (3-digit). Actual dB = value - 25. Range -25 to +15 dB."
- id: meter_rate
  type: integer
  description: "Metering interval in ms. 00000=OFF, 00100-65535"
- id: batt_charge
  type: integer
  description: "Battery charge percent 000-100, or 255=off"
- id: batt_run_time
  type: integer
  description: "Minutes until TX turns off. Special values: 65532=wall-wart powered, 65533=on charger, 65534=calculating, 65535=off"
- id: batt_health
  type: integer
  description: "Battery health percent 000-100, or 255=Unknown"
- id: batt_time_to_full
  type: integer
  description: "Minutes until full charge. Special values: 65535=off, 65534=on charger & full, 65533=on and not on charger"
```

## Events
```yaml
# SAMPLE messages from the device (metering)
- id: sample_meter
  description: "Periodic RF/audio level sample when METER_RATE > 0"
  payload_template: "< SAMPLE x aaa eee >"
  params:
    - name: x
      type: integer
      description: Channel number (or SEC x for secondary)
    - name: aaa
      type: integer
      description: RF level received
    - name: eee
      type: integer
      description: Audio level
# Unsolicited REPORT on parameter change (per source, the device sends a REP
# whenever most non-metered properties change; receivers should not poll these)
- id: rep_on_change
  description: "Device sends < REP ... > whenever a tracked property changes"
  payload_template: "< REP {channel-or-SEC} {PROPERTY} {value} >"
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences are documented in source;
# operators can compose push-to-talk and latching-mute flows using the
# LED_STATUS + BUTTON_STS examples in the "Echo Cancellation" section.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or
# power-on sequencing requirements for the control path.
```

## Notes
- All messages are ASCII, framed with `<` and `>` delimiters.
- The `x` channel placeholder is ASCII 0-8; 0 = all channels, 1-8 = individual channels (capacity matches the APT: MXWAPT4 supports 1-4, MXWAPT8 supports 1-8).
- `SEC` prefix selects the secondary microphone on chargers that dock two; primary is the default and can also be written as `PRI`.
- When using External Mute (set in MXWAPT web app), the device will not report `MUTE`; muting is performed by the connected mixer. The control system drives `LED_STATUS` based on `BUTTON_STS` reports (see "Echo Cancellation" examples in source).
- Best practice: monitor `TX_AVAILABLE` and re-query `TX_STATUS`, `AUDIO_GAIN`, `BATT_RUN_TIME`, `BATT_CHARGE`, `BATT_HEALTH`, `BUTTON_STS`, `LED_STATUS`, `TX_TYPE` on the NO→YES transition.
- AUDIO_GAIN and INT_AUDIO_GAIN use a fixed 25 offset between encoded value and actual dB.
- `REMOTE_LINK` requires firmware v4.0 or greater (charger-side only).
- Connection is raw TCP on port 2202; set the AMX/Crestron program to "Client" mode. No authentication is described.
- Special sentinel values 255/254/253/252 (3-digit) and 65535/65534/65533/65532 (5-digit) indicate the target device is unavailable.
- Additional MXWNCS commands for querying unlinked microphones on charge exist but are gated behind support@shure.com contact in the source.

<!-- UNRESOLVED: firmware version compatibility not stated for general MXWAPT command set; only REMOTE_LINK notes v4.0+. -->
<!-- UNRESOLVED: transport framing (delimiter handling, line endings, message ordering, retransmit on collision) not stated beyond "<" and ">" framing. -->
<!-- UNRESOLVED: no port authentication, encryption, or TLS option described in source. -->
```

Spec emitted. Wrapped JSON for ingest:Spec written. To ingest:

```json
{
  "markdown": "<paste the markdown above>",
}
```

## Provenance

```yaml
source_domains:
  - pubs.shure.com
  - shure.com
  - content-files.shure.com
source_urls:
  - https://pubs.shure.com/command-strings/MXW/en-US
  - https://pubs.shure.com/command-strings/MXA310/en-US
  - https://www.shure.com/en-US/docs/commandstrings/MXW
  - https://content-files.shure.com/Pubs2/files/259490.pdf
  - https://www.shure.com/en-US/docs/commandstrings
retrieved_at: 2026-06-15T23:30:12.409Z
last_checked_at: 2026-06-16T07:17:47.455Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:17:47.455Z
matched_actions: 71
action_count: 71
confidence: medium
summary: "All 71 spec actions match source commands literally; transport (port 2202, TCP, no auth) verified; complete bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "MXWANI, MXWNCS charger-side commands are documented separately; this spec covers MXWAPT and transmitter-relayed commands only."
- "no multi-step macro sequences are documented in source;"
- "source does not document safety warnings, interlocks, or"
- "firmware version compatibility not stated for general MXWAPT command set; only REMOTE_LINK notes v4.0+."
- "transport framing (delimiter handling, line endings, message ordering, retransmit on collision) not stated beyond \"<\" and \">\" framing."
- "no port authentication, encryption, or TLS option described in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
