---
spec_id: admin/renkus_heinz-icxxrii
schema_version: ai4av-public-spec-v1
revision: 1
title: "Renkus-Heinz ICxxR-II Control Spec"
manufacturer: Renkus-Heinz
model_family: IC8-R-II
aliases: []
compatible_with:
  manufacturers:
    - Renkus-Heinz
  models:
    - IC8-R-II
    - IC16-R-II
    - IC24-R-II
    - IC32-R-II
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - renkus-heinz.com
  - legacy.renkus-heinz.com
source_urls:
  - https://www.renkus-heinz.com/wp-content/uploads/2021/03/an-ic-2-rs485-1-1.pdf
  - https://www.renkus-heinz.com/wp-content/uploads/2021/03/icr-ii-usersmanual-2.pdf
  - "https://legacy.renkus-heinz.com/downloads/Iconyx_Gen-1_Gen-2/2_Then_Look_Here/1_Seriously_Did_You_Read_This/Servicing%20Serial%20Iconyx.pdf"
  - https://www.renkus-heinz.com/downloads/
retrieved_at: 2026-05-18T11:03:05.228Z
last_checked_at: 2026-05-18T16:46:53.266Z
generated_at: 2026-05-18T16:46:53.266Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T16:46:53.266Z
  matched_actions: 39
  action_count: 39
  confidence: high
  summary: "All 39 spec actions matched to command table entries; baud rate and framing verified in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-18
---

# Renkus-Heinz ICxxR-II Control Spec

## Summary
Renkus-Heinz Iconyx RHAON RS-485 protocol for ICxxR-II series column loudspeakers. Multi-unit array communication via RS-485, addressing each column by MAC address. Master-slave architecture — some commands target all units, others master-only. 57,600 baud, 8-N-1 framing.

<!-- UNRESOLVED: TCP/IP RHAON control layer not documented in this source — see RHAON-II manual PDF -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  port: null  # UNRESOLVED: serial port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: status_request
  label: Status Request
  kind: action
  params: []
  description: Returns 7 status messages. See Status Message section.

- id: remote_power_on
  label: Remote Power On
  kind: action
  params: []
  note: Master unit only

- id: remote_power_off
  label: Remote Power Off
  kind: action
  params: []
  note: Master unit only

- id: toggle_mute
  label: Toggle Mute
  kind: action
  params: []
  note: Master unit only

- id: toggle_analog_pad
  label: Toggle Analog Pad
  kind: action
  params: []
  note: Master unit only

- id: set_7segment
  label: Set 7-Segment Display
  kind: action
  params:
    - name: digit
      type: integer
      description: Digit value 0-F (hex nibble)
  note: Type "A" - all units

- id: turn_decimal_points_on
  label: Turn Decimal Points On
  kind: action
  params: []
  note: Type "A"

- id: turn_decimal_points_off
  label: Turn Decimal Points Off
  kind: action
  params: []
  note: Type "A"

- id: save_decimal_points_default
  label: Save Decimal Points Default Status
  kind: action
  params: []
  note: Type "A"

- id: enable_7segment_display
  label: Enable 7-Segment Display
  kind: action
  params: []
  note: Type "A"

- id: disable_7segment_display
  label: Disable 7-Segment Display
  kind: action
  params: []
  note: Type "A"

- id: save_7segment_default
  label: Save 7-Segment Default Status
  kind: action
  params: []
  note: Type "A"

- id: led_on
  label: LED On
  kind: action
  params: []
  note: Type "A"

- id: led_off
  label: LED Off
  kind: action
  params: []
  note: Type "A"

- id: board_reset
  label: Board Reset
  kind: action
  params: []
  note: Type "A"

- id: micro_version_hardware_revision
  label: Microcontroller Firmware / Hardware Revision
  kind: action
  params: []
  note: Type "A" - returns response with FW version, HW revision, password

- id: disable_adc
  label: Disable ADC
  kind: action
  params: []
  note: Type "A" - requires undivded microcontroller attention; must disable before certain commands

- id: enable_adc
  label: Enable ADC
  kind: action
  params: []
  note: Type "A" - re-enable after disable_adc; wait 200ms

- id: disable_crestron_comms_saved
  label: Disable Crestron Comms (Saved)
  kind: action
  params: []
  note: Type "A"

- id: disable_crestron_comms_not_saved
  label: Disable Crestron Comms (Not Saved)
  kind: action
  params: []
  note: Type "A"

- id: read_preset_metadata
  label: Read 2nd Set of Preset Beam Steering Metadata
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (0-based)
  note: Type "A,D" - requires ADC disable/enable; returns 128-byte metadata block

- id: begin_test_tone_scan
  label: Begin Test Tone Channel Scan
  kind: action
  params: []
  note: Type "A"

- id: end_test_tone_scan
  label: End Test Tone Channel Scan
  kind: action
  params: []
  note: Type "A"

- id: enter_button_press
  label: Enter Button Press
  kind: action
  params: []
  note: Type "A,D" - wait 15 seconds after issuing for preset to load

- id: send_delay
  label: Send Delay
  kind: action
  params:
    - name: delay_r_ms
      type: number
      description: Right channel delay in ms (max 170ms at 48kHz, 85ms at 96kHz)
    - name: delay_l_ms
      type: number
      description: Left channel delay in ms
  note: Master unit only - encoding formula: delay_ms * (sample_rate_Hz / 1000)

- id: save_delay
  label: Save Delay
  kind: action
  params: []
  note: Master unit only

- id: turn_aes_off
  label: Turn AES Off
  kind: action
  params: []
  note: Master unit only

- id: turn_aes_on
  label: Turn AES On
  kind: action
  params: []
  note: Master unit only

- id: turn_phase_inversion_off
  label: Turn Phase Inversion Off
  kind: action
  params: []
  note: Master unit only

- id: turn_phase_inversion_on
  label: Turn Phase Inversion On
  kind: action
  params: []
  note: Master unit only

- id: send_volume
  label: Send Volume
  kind: action
  params:
    - name: gain_db
      type: number
      description: Gain in dB (range -100.0 to 0.0)
  note: Master unit only - use Gain Encoding table for hex values

- id: save_volume
  label: Save Volume
  kind: action
  params: []
  note: Master unit only

- id: lock_buttons
  label: Lock Buttons
  kind: action
  params: []
  note: Master unit only

- id: unlock_buttons
  label: Unlock Buttons
  kind: action
  params: []
  note: Master unit only

- id: test_tone_set_frequency_440hz
  label: Set Test Tone Frequency 440Hz
  kind: action
  params: []
  note: Requires D2Audio address byte per amp; sent twice for 2-amp column

- id: test_tone_set_frequency_5khz
  label: Set Test Tone Frequency 5kHz
  kind: action
  params: []
  note: Requires D2Audio address byte per amp; sent twice for 2-amp column

- id: test_tone_set_level
  label: Set Test Tone Level
  kind: action
  params:
    - name: level_db
      type: number
      description: Level in dB (e.g. -12)
  note: Requires D2Audio address byte per amp

- id: test_tone_engage
  label: Engage Sine Tone Generator
  kind: action
  params: []
  note: Requires D2Audio address byte per amp

- id: test_tone_disengage
  label: Disengage Sine Tone Generator
  kind: action
  params: []
  note: Requires D2Audio address byte per amp
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [on, off]
  description: From status message yy byte bit 3

- id: mute_state
  label: Mute State
  type: enum
  values: [muted, unmuted]
  description: From status message yy byte bit 1

- id: input_pad_state
  label: Input Pad State
  type: enum
  values: [enabled, disabled]
  description: From status message yy byte bit 2

- id: signal_present
  label: Signal Present
  type: boolean
  description: From status message message 3 xx byte bit 6

- id: signal_clip
  label: Signal Clip
  type: boolean
  description: From status message message 3 xx byte bit 7

- id: delay_values
  label: Delay Values
  type: object
  fields:
    - name: delay_r_ms
      type: number
    - name: delay_l_ms
      type: number
  description: From status message message 2 - R and L delay in ms

- id: speaker_open_coil
  label: Speaker Open Coil Status
  type: object
  fields:
    - name: coils
      type: array
      items:
        type: boolean
      description: 8 booleans for 8 speakers; true=open coil. From message 3 coil byte
    - name: external_rh_switch_attached
      type: boolean
    - name: segment_display_status
      type: boolean
    - name: aes_input_status
      type: boolean
    - name: ethernet_connected
      type: boolean
    - name: fault_relay_default
      type: boolean
    - name: signal_present
      type: boolean
    - name: signal_clip
      type: boolean
    - name: phase_inversion
      type: boolean
  description: From status message message 3

- id: power_supply_status
  label: Power Supply Status
  type: object
  fields:
    - name: supply_5v
      type: boolean
    - name: supply_12v
      type: boolean
    - name: supply_1_8v
      type: boolean
    - name: supply_n12v
      type: boolean
    - name: supply_3_3v
      type: boolean
    - name: d2audio_amp_status
      type: enum
      values: [ok, error]
  description: From status message message 4

- id: column_temperature
  label: Column Temperature
  type: number
  unit: Fahrenheit
  description: From status message message 5 - formula: temp = (((tenc * 2.4) / 1024) * 1000 + 500) / 10

- id: power_supply_temperature
  label: Power Supply Temperature
  type: number
  unit: Fahrenheit
  description: From status message message 6

- id: last_loaded_preset
  label: Last Loaded Preset
  type: integer
  description: From status message message 7 - FF if no preset loaded

- id: rs485_mode_status
  label: RS-485 Mode Status
  type: boolean
  description: From status message message 7 xx bit 1

- id: preset_metadata
  label: Preset Beam Steering Metadata
  type: object
  fields:
    - name: audience_areas
      type: integer
    - name: audience_area_dimensions
      type: object
      description: Floats for (x,y) beginning and end
    - name: array_position_x
      type: number
    - name: array_position_y
      type: number
    - name: array_position_angle
      type: number
    - name: preset_name
      type: string
  description: 128-byte metadata block from read_preset_metadata response

- id: firmware_version
  label: Firmware Version
  type: string
  description: 5 bytes ASCII from micro_version_hardware_revision response

- id: hardware_revision
  label: Hardware Assembly Revision
  type: string
  description: 32 bytes ASCII (0xFF terminated) from micro_version_hardware_revision response
```

## Variables
```yaml
- id: volume_gain
  label: Volume Gain
  type: number
  unit: dB
  range:
    min: -100.0
    max: 0.0
  encoding: See Gain Encoding table (0.0dB = 0xC8, -100.0dB = 0x00)

- id: delay_right
  label: Delay Right Channel
  type: number
  unit: ms
  range:
    min: 0
    max: 170
  description: Max 170ms at 48kHz, 85ms at 96kHz

- id: delay_left
  label: Delay Left Channel
  type: number
  unit: ms
  range:
    min: 0
    max: 170
  description: Max 170ms at 48kHz, 85ms at 96kHz
```

## Events
```yaml
# UNRESOLVED: no unsolicited event definitions in source - device sends status messages only on request
```

## Macros
```yaml
- id: open_coil_test
  label: Open Coil Test Sequence
  description: |
    1. Stop requesting status messages
    2. Mute master column (if needed)
    3. Begin test tone channel scan
    4. Set frequency and level commands
    5. Engage sine tone generator
    6. Wait 10 seconds
    7. Request column status (open coil data in response)
    8. Disengage generator
    9. End test tone channel scan
    10. Unmute master column (if needed)

- id: adc_sensitive_command
  label: ADC-Sensitive Command Wrapper
  description: |
    1. Issue Disable ADC - wait 100ms
    2. Run command
    3. Issue Enable ADC - wait 200ms
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: ADC-sensitive commands require Disable ADC / Enable ADC wrapper sequence
    reference: "Section: Enabling / Disabling the ADC"
  - description: Test tone sequence must engage/disengage generator and wait 10 seconds
    reference: "Section: Test Tones - order-of-operations"
  - description: Master unit identified via DIP switch; slave columns bypass RHAON input card
    reference: "Section: Background"
  - description: Each column in array addressed individually by MAC address; routing commands may require master-only or all-units targeting
    reference: "Section: Background"
# UNRESOLVED: power cycling, fault relay behavior, and emergency muting procedures not documented in source
```

## Notes

Command frame format: `<Header 0xAA> <Address 3 bytes (last 3 octets of MAC, prefix 00:1B:DE)> <Command payload bytes> <Footer 0xCC>`

Wiring: 6-pin 3.5mm Phoenix connector J4 — pins 2 (RS485 Y), 3 (RS485 X), 4 (DGND). Vdd+, Remote LED Out, Program not used for RS-485 comms.

Gain encoding is a lookup table mapping dB values to hex gain bytes (0xC8 = 0.0dB down to 0x00 = -100dB). Counter bytes also defined but primary encoding uses gain byte column.

Preset loading via "Enter" button command requires 15-second wait after issuing command.

<!-- UNRESOLVED: TCP/IP control layer not in this source document — see RHAON-II manual for network control protocol -->
<!-- UNRESOLVED: Dante/AES67 support not documented in this source -->
<!-- UNRESOLVED: CobraNet configuration not documented in this source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact fault relay behavior and error codes not fully enumerated in source -->
<!-- UNRESOLVED: sample rate mode (48kHz/96kHz) selection command not found in source -->

## Provenance

```yaml
source_domains:
  - renkus-heinz.com
  - legacy.renkus-heinz.com
source_urls:
  - https://www.renkus-heinz.com/wp-content/uploads/2021/03/an-ic-2-rs485-1-1.pdf
  - https://www.renkus-heinz.com/wp-content/uploads/2021/03/icr-ii-usersmanual-2.pdf
  - "https://legacy.renkus-heinz.com/downloads/Iconyx_Gen-1_Gen-2/2_Then_Look_Here/1_Seriously_Did_You_Read_This/Servicing%20Serial%20Iconyx.pdf"
  - https://www.renkus-heinz.com/downloads/
retrieved_at: 2026-05-18T11:03:05.228Z
last_checked_at: 2026-05-18T16:46:53.266Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T16:46:53.266Z
matched_actions: 39
action_count: 39
confidence: high
summary: "All 39 spec actions matched to command table entries; baud rate and framing verified in source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
