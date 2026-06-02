---
spec_id: admin/renkus-heinz-icxxrii
schema_version: ai4av-public-spec-v1
revision: 1
title: "Renkus-Heinz ICxxRII Control Spec"
manufacturer: Renkus-Heinz
model_family: ICxxRII
aliases: []
compatible_with:
  manufacturers:
    - Renkus-Heinz
  models:
    - ICxxRII
    - IC8-R-II
    - IC16-R-II
    - IC24-R-II
    - IC32-R-II
    - "Iconyx R"
    - "IC-Live R"
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
  - https://www.renkus-heinz.com/products/plugins/
retrieved_at: 2026-05-18T11:03:05.228Z
last_checked_at: 2026-06-02T17:23:54.176Z
generated_at: 2026-06-02T17:23:54.176Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP control surface (RHAON II) exists per family notes but not covered in this source — RS-485 only here."
  - "flow control not explicitly stated; source says \"RS-485, 57,600/8-N-1\""
  - "source does not describe unsolicited/asynchronous notifications."
  - "voltage/current/power specs not stated in source."
  - "TCP/IP RHAON-II control protocol (mentioned in family notes for the broader product line) is NOT in this source; this spec covers RS-485 only."
  - "firmware version compatibility ranges not stated."
  - "serial flow control not explicitly stated; source says \"57,600/8-N-1\" only."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:54.176Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions matched wire-level tokens in source; transport parameters (baud, framing, addressing) verified; coverage complete. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Renkus-Heinz ICxxRII Control Spec

## Summary
Renkus-Heinz Iconyx R / IC-Live R powered loudspeaker columns. RS-485 control protocol at 57600 8-N-1. Each column individually addressed by last 3 octets of its MAC address. Commands framed `AA <addr3> <payload> CC` (header AA, footer CC). Some commands master-only (M), some required for all units (A), some require ADC disable/enable wrapper (D). RS-485 control mode must first be enabled per column from RHAON software.

<!-- UNRESOLVED: TCP/IP control surface (RHAON II) exists per family notes but not covered in this source — RS-485 only here. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated; source says "RS-485, 57,600/8-N-1"
  variant: rs485
addressing:
  framing:
    header: "0xAA"
    footer: "0xCC"
    address_bytes: 3  # last 3 octets of column MAC (first 3 always 00:1B:DE)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred from RemotePowerON / RemotePowerOFF
- queryable    # inferred from Status request command
- levelable    # inferred from Sendvolume / gain encoding table
- routable     # inferred from AES/EBU input switching commands
```

## Actions
```yaml
- id: status_request
  label: Status Request
  kind: query
  command: "AA <addr3> 01 02 CC"
  scope: all_units
  notes: Returns 7 status messages (gain, delay, speaker open coil, supply voltages, temperature, P/S temperature, last loaded preset). See Feedbacks.

- id: led_on
  label: LED On (Wink)
  kind: action
  command: "AA <addr3> 02 07 CC"
  scope: all_units

- id: led_off
  label: LED Off
  kind: action
  command: "AA <addr3> 02 08 CC"
  scope: all_units

- id: board_reset
  label: Board Reset
  kind: action
  command: "AA <addr3> 02 09 CC"
  scope: all_units

- id: micro_version_hw_rev_query
  label: Microcontroller Firmware / Hardware Assembly Revision Query
  kind: query
  command: "AA <addr3> 02 0A CC"
  scope: all_units
  notes: Response = <Header><Address><5 bytes FW Ver><32 bytes HW Rev><32 bytes Password><Footer>. ASCII, HW Rev/Password terminated with 0xFF.

- id: disable_adc
  label: Disable ADC
  kind: action
  command: "AA <addr3> 02 98 CC"
  scope: all_units
  notes: Wait 100ms after issuing before sending an ADC-restricted command.

- id: enable_adc
  label: Enable ADC
  kind: action
  command: "AA <addr3> 02 99 CC"
  scope: all_units
  notes: Wait 200ms after issuing.

- id: set_7segment_digit
  label: Set 7-Segment to Digit
  kind: action
  command: "AA <addr3> 02 8{x} CC"
  scope: all_units
  params:
    - name: x
      type: integer
      description: Digit value (low nibble of second payload byte; 0x80..0x8F range)

- id: decimal_points_on
  label: Decimal Points On
  kind: action
  command: "AA <addr3> 02 94 CC"
  scope: all_units

- id: decimal_points_off
  label: Decimal Points Off
  kind: action
  command: "AA <addr3> 02 95 CC"
  scope: all_units

- id: save_decimal_points_default
  label: Save Decimal Points Default Status
  kind: action
  command: "AA <addr3> 02 AE CC"
  scope: all_units

- id: enable_7segment_display
  label: Enable 7-Segment Display
  kind: action
  command: "AA <addr3> 02 9E CC"
  scope: all_units

- id: disable_7segment_display
  label: Disable 7-Segment Display
  kind: action
  command: "AA <addr3> 02 9F CC"
  scope: all_units

- id: save_7segment_default
  label: Save 7-Segment Default Status
  kind: action
  command: "AA <addr3> 02 A7 CC"
  scope: all_units

- id: disable_crestron_comms_saved
  label: Disable Crestron Comms (Saved)
  kind: action
  command: "AA <addr3> 02 10 CC"
  scope: all_units
  notes: Returns column to CobraNet/RHAON mode and persists state.

- id: disable_crestron_comms_not_saved
  label: Disable Crestron Comms (Not Saved)
  kind: action
  command: "AA <addr3> 02 AC CC"
  scope: all_units

- id: read_preset_metadata_2
  label: Read 2nd Set of Preset Metadata
  kind: query
  command: "AA <addr3> 09 {preset} CC"
  scope: all_units
  requires_adc_disable: true
  params:
    - name: preset
      type: integer
      description: Preset index (single byte)
  notes: Response = <Header><Address><128 bytes metadata><Footer>. Metadata layout = 1 byte audience-area count, 48 bytes audience-area dimensions (floats), 4 bytes array X, 4 bytes array Y, 4 bytes array angle, 63 bytes ASCII preset name (0xFF-terminated). Unused dimension bytes filled 0xFF.

- id: begin_test_tone_scan
  label: Begin Test Tone Channel Scan
  kind: action
  command: "AA <addr3> 02 A8 CC"
  scope: all_units

- id: end_test_tone_scan
  label: End Test Tone Channel Scan
  kind: action
  command: "AA <addr3> 02 A9 CC"
  scope: all_units

- id: enter_button_press
  label: Enter Button Press
  kind: action
  command: "AA <addr3> 02 90 CC"
  scope: all_units
  requires_adc_disable: true
  notes: Wait 15 seconds after issuing for preset to load.

- id: remote_power_on
  label: Remote Power On
  kind: action
  command: "AA <addr3> 02 12 CC"
  scope: master_only

- id: remote_power_off
  label: Remote Power Off
  kind: action
  command: "AA <addr3> 02 13 CC"
  scope: master_only

- id: toggle_mute
  label: Toggle Mute
  kind: action
  command: "AA <addr3> 02 16 CC"
  scope: master_only

- id: toggle_analog_pad
  label: Toggle Analog Pad
  kind: action
  command: "AA <addr3> 02 17 CC"
  scope: master_only

- id: lock_buttons
  label: Lock Front-Panel Buttons
  kind: action
  command: "AA <addr3> 02 0B CC"
  scope: master_only

- id: unlock_buttons
  label: Unlock Front-Panel Buttons
  kind: action
  command: "AA <addr3> 02 0C CC"
  scope: master_only

- id: send_delay
  label: Send Delay (R and L channels)
  kind: action
  command: "AA <addr3> 07 {Rhi} {Rlo} {Lhi} {Llo} CC"
  scope: master_only
  params:
    - name: Rhi
      type: integer
      description: Right-channel delay high byte (16-bit value = delay_ms * sample_rate_Hz / 1000)
    - name: Rlo
      type: integer
      description: Right-channel delay low byte
    - name: Lhi
      type: integer
      description: Left-channel delay high byte
    - name: Llo
      type: integer
      description: Left-channel delay low byte
  notes: Max 170 ms per channel @ 48 kHz, 85 ms @ 96 kHz. Example payload "07 1F E0 0D B0" = R=170ms L=73ms @ 48 kHz.

- id: save_delay
  label: Save Delay
  kind: action
  command: "AA <addr3> 02 1A CC"
  scope: master_only

- id: aes_off
  label: AES/EBU Input Off
  kind: action
  command: "AA <addr3> 02 96 CC"
  scope: master_only

- id: aes_on
  label: AES/EBU Input On
  kind: action
  command: "AA <addr3> 02 97 CC"
  scope: master_only

- id: phase_inversion_off
  label: Phase Inversion Off
  kind: action
  command: "AA <addr3> 02 A5 CC"
  scope: master_only

- id: phase_inversion_on
  label: Phase Inversion On
  kind: action
  command: "AA <addr3> 02 A6 CC"
  scope: master_only

- id: send_volume
  label: Send Volume
  kind: action
  command: "AA <addr3> 06 {gain_byte} {gain_counter} CC"
  scope: master_only
  params:
    - name: gain_byte
      type: integer
      description: Gain byte (hex) per Gain Encoding table; e.g. 0xC8 = 0.0 dB
    - name: gain_counter
      type: integer
      description: Gain counter (hex) per Gain Encoding table; e.g. 0xC9 = 0.0 dB
  notes: Range 0.0 dB (C8 C9) down to -100.0 dB (00 00) in 0.5 dB steps. See Gain Encoding table in source.

- id: save_volume
  label: Save Volume
  kind: action
  command: "AA <addr3> 02 18 CC"
  scope: master_only

- id: test_tone_set_freq_440hz_amp1
  label: Test Tone Set Frequency 440 Hz (D2Audio amp 1)
  kind: action
  command: "AA <addr3> 2A 54 B2 00 00 3F 01 2C 60 CC"
  scope: all_units
  notes: Low-frequency driver test tone.

- id: test_tone_set_freq_440hz_amp2
  label: Test Tone Set Frequency 440 Hz (D2Audio amp 2)
  kind: action
  command: "AA <addr3> 2A 54 B4 00 00 3F 01 2C 60 CC"
  scope: all_units

- id: test_tone_set_freq_5khz_amp1
  label: Test Tone Set Frequency 5 kHz (D2Audio amp 1)
  kind: action
  command: "AA <addr3> 2A 54 B2 00 00 3F 0D 55 57 CC"
  scope: all_units
  notes: High-frequency driver test tone.

- id: test_tone_set_freq_5khz_amp2
  label: Test Tone Set Frequency 5 kHz (D2Audio amp 2)
  kind: action
  command: "AA <addr3> 2A 54 B4 00 00 3F 0D 55 57 CC"
  scope: all_units

- id: test_tone_set_level_neg12db_amp1
  label: Test Tone Set Level -12 dB (D2Audio amp 1)
  kind: action
  command: "AA <addr3> 2A 54 B2 00 00 42 DF D9 0D CC"
  scope: all_units

- id: test_tone_set_level_neg12db_amp2
  label: Test Tone Set Level -12 dB (D2Audio amp 2)
  kind: action
  command: "AA <addr3> 2A 54 B4 00 00 42 DF D9 0D CC"
  scope: all_units

- id: test_tone_engage_amp1
  label: Engage Sine Tone Generator (D2Audio amp 1)
  kind: action
  command: "AA <addr3> 2A 54 B2 00 00 40 80 00 00 CC"
  scope: all_units

- id: test_tone_engage_amp2
  label: Engage Sine Tone Generator (D2Audio amp 2)
  kind: action
  command: "AA <addr3> 2A 54 B4 00 00 40 80 00 00 CC"
  scope: all_units

- id: test_tone_disengage_amp1
  label: Disengage Sine Tone Generator (D2Audio amp 1)
  kind: action
  command: "AA <addr3> 2A 54 B2 00 00 40 00 00 00 CC"
  scope: all_units

- id: test_tone_disengage_amp2
  label: Disengage Sine Tone Generator (D2Audio amp 2)
  kind: action
  command: "AA <addr3> 2A 54 B4 00 00 40 00 00 00 CC"
  scope: all_units
```

## Feedbacks
```yaml
- id: status_msg1_gain_flags
  label: Status Message 1 (Gain + Flags)
  frame: "AA <addr3> 2C <gain> <flags> CC"
  fields:
    - name: gain
      description: Current gain byte (see Gain Encoding table)
    - name: flags
      description: Bit-packed (bit 1=mute, 2=input pad, 3=remote power, 4=fault relay, 5=front LED, 6=alarm pin high/low, 7=alarm pin connected, 8=button lock)

- id: status_msg2_delay
  label: Status Message 2 (Delay)
  frame: "AA <addr3> <Rhi> <Rlo> <Lhi> <Llo> CC"

- id: status_msg3_speaker_coil_flags
  label: Status Message 3 (Speaker Open Coil + I/O Flags)
  frame: "AA <addr3> 2D <speaker_open_coil> <flags> CC"
  fields:
    - name: speaker_open_coil
      description: Each bit = 1 speaker. 0=OK, 1=open. Bit 1 = top speaker, bit 8 = bottom speaker.
    - name: flags
      description: Bit 1=ext RH-switch attached, 2=7-segment display status, 3=AES/EBU input status, 4=Ethernet connected, 5=fault relay default behavior, 6=signal present, 7=signal clip, 8=phase inversion.

- id: status_msg4_7seg_supply
  label: Status Message 4 (7-Segment Digits + Supply Voltages)
  frame: "AA <addr3> 29 <7seg_digits> <flags> CC"
  fields:
    - name: flags
      description: Bit 1=+5V OK, 2=+12V OK, 3=+1.8V OK, 4=-12V OK, 5=+3.3V OK, 6/7=unassigned, 8=D2Audio amp fault (1=BAD).

- id: status_msg5_column_temperature
  label: Status Message 5 (Column Temperature, F)
  frame: "AA <addr3> 2F <tenc_hi> <tenc_lo> CC"
  notes: "Temperature_F = ((((tenc * 2.4) / 1024) * 1000) + 500) / 10"

- id: status_msg6_psu_temperature
  label: Status Message 6 (Power Supply Temperature, F)
  frame: "AA <addr3> 31 <tenc_hi> <tenc_lo> CC"
  notes: Same encoding as msg 5.

- id: status_msg7_last_preset
  label: Status Message 7 (Last Loaded Preset + Mode Flags)
  frame: "AA <addr3> 32 <last_preset> <flags> CC"
  fields:
    - name: last_preset
      description: 0xFF if no preset has been loaded.
    - name: flags
      description: Bit 1=RS-485 mode status, 2=7-segment display default status, 3=7-segment decimal point default status, 4-8 unassigned.

- id: preset_metadata_response
  label: Preset Metadata (Set 2) Response
  frame: "AA <addr3> <128 bytes metadata> CC"
  notes: Returned in response to read_preset_metadata_2.

- id: firmware_hw_response
  label: Microcontroller Firmware / Hardware Revision Response
  frame: "AA <addr3> <5 bytes FW Ver ASCII> <32 bytes HW Rev ASCII> <32 bytes Password ASCII> CC"
  notes: HW Rev and Password strings 0xFF-terminated.
```

## Variables
```yaml
- id: gain_db
  label: Output Gain (dB)
  type: float
  range: [-100.0, 0.0]
  step: 0.5
  encoding: gain_encoding_table
  setter: send_volume
  persist: save_volume
  notes: See full Gain Encoding table in source (0.0 dB = C8 C9 ... -100.0 dB = 00 00).

- id: delay_ms_right
  label: Delay Right Channel (ms)
  type: integer
  range_48k: [0, 170]
  range_96k: [0, 85]
  encoding: "delay_int = delay_ms * sample_rate_Hz / 1000 (16-bit)"
  setter: send_delay
  persist: save_delay

- id: delay_ms_left
  label: Delay Left Channel (ms)
  type: integer
  range_48k: [0, 170]
  range_96k: [0, 85]
  encoding: "delay_int = delay_ms * sample_rate_Hz / 1000 (16-bit)"
  setter: send_delay
  persist: save_delay
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited/asynchronous notifications.
# All response frames are reply-to-request only (see Feedbacks).
```

## Macros
```yaml
- id: open_coil_test_sequence
  label: Open-Coil Driver Test Sequence
  steps:
    - Stop polling status messages.
    - Issue Toggle Mute on master column (if necessary).
    - Send begin_test_tone_scan.
    - Send test_tone_set_freq_440hz_amp1 + test_tone_set_freq_440hz_amp2 (LF drivers) OR 5 kHz variants (HF drivers).
    - Send test_tone_set_level_neg12db_amp1 + test_tone_set_level_neg12db_amp2.
    - Send test_tone_engage_amp1 + test_tone_engage_amp2.
    - Wait 10 seconds.
    - Send status_request and decode Message 3 speaker_open_coil byte.
    - Send test_tone_disengage_amp1 + test_tone_disengage_amp2.
    - Send end_test_tone_scan.
    - Toggle Mute master column back (if necessary).

- id: adc_restricted_command_wrapper
  label: ADC-Restricted Command Wrapper
  steps:
    - Send disable_adc, wait 100 ms.
    - Send the ADC-restricted command (e.g. enter_button_press, read_preset_metadata_2).
    - Send enable_adc, wait 200 ms.
```

## Safety
```yaml
confirmation_required_for:
  - board_reset
  - remote_power_off
interlocks:
  - description: ADC-restricted commands (kind D) MUST be wrapped in disable_adc / enable_adc with the documented 100 ms / 200 ms waits.
    affected_commands: [enter_button_press, read_preset_metadata_2]
  - description: Open-coil test must mute master, run scan window, then unmute and stop scan before resuming normal use.
    affected_commands: [test_tone_engage_amp1, test_tone_engage_amp2]
# UNRESOLVED: voltage/current/power specs not stated in source.
```

## Notes
- RS-485 control mode must be enabled per column from RHAON software ("Switch Device to RS485 mode") before any of these commands work. Disabling returns control to CobraNet/RHAON; can be done either via RHAON or by issuing `disable_crestron_comms_saved` / `disable_crestron_comms_not_saved` on the bus.
- In a multi-column array, the master column (set via on-unit DIP switches) feeds audio to slaves. Master-only (M) commands target master; All-units (A) commands must be sent individually to each column.
- Address bytes = last 3 octets of the column's MAC address; first 3 are always `00:1B:DE`.
- Wiring: 6-pin 3.5 mm Phoenix connector J4 (bottom-left of User Interface Panel). Pin 2 = RS-485 Y, pin 3 = RS-485 X, pin 4 = DGND. Pins 1/5/6 (Vdd+, Remote LED Out, Program) reserved for Remote Controller.
- Family covers Iconyx R Gen-3 line: IC8-R-II, IC16-R-II, IC24-R-II, IC32-R-II, and IC-Live R variants. Per-column communication required regardless of array size.
- Test tones have two near-identical command pairs because each column has 2 D2Audio amplifiers (address byte B2 vs B4).
<!-- UNRESOLVED: TCP/IP RHAON-II control protocol (mentioned in family notes for the broader product line) is NOT in this source; this spec covers RS-485 only. -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated. -->
<!-- UNRESOLVED: serial flow control not explicitly stated; source says "57,600/8-N-1" only. -->

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
  - https://www.renkus-heinz.com/products/plugins/
retrieved_at: 2026-05-18T11:03:05.228Z
last_checked_at: 2026-06-02T17:23:54.176Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:54.176Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions matched wire-level tokens in source; transport parameters (baud, framing, addressing) verified; coverage complete. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP control surface (RHAON II) exists per family notes but not covered in this source — RS-485 only here."
- "flow control not explicitly stated; source says \"RS-485, 57,600/8-N-1\""
- "source does not describe unsolicited/asynchronous notifications."
- "voltage/current/power specs not stated in source."
- "TCP/IP RHAON-II control protocol (mentioned in family notes for the broader product line) is NOT in this source; this spec covers RS-485 only."
- "firmware version compatibility ranges not stated."
- "serial flow control not explicitly stated; source says \"57,600/8-N-1\" only."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
