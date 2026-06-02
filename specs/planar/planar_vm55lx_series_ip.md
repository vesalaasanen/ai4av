---
spec_id: admin/planar-vm55lx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar VM55LX Series Control Spec"
manufacturer: Planar
model_family: VM55MX-M2
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - VM55MX-M2
    - VM55MX-X2
    - VM55LX-M2
    - VM55LX-X2
    - VM55LX-U2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/440918/020-1359-03a_vm_series_rs232_manual.pdf
retrieved_at: 2026-04-30T04:27:34.098Z
last_checked_at: 2026-06-01T20:45:23.757Z
generated_at: 2026-06-01T20:45:23.757Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Auto Signal Detecting Get appears only in the Command Summary table; no dedicated section in source describes packet layout, data bytes, or example."
  - "Auto Signal Detecting Set appears only in the Command Summary table; no dedicated section in source describes packet layout, data bytes, or example."
  - "no additional standalone settable variables described in source."
  - "source documents only solicited Report responses to Get/Set commands;"
  - "no multi-step macro sequences described in source."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing"
  - "firmware version compatibility ranges, Auto Signal Detecting (0xAE/0xAF) packet layout, power-on/cold-start timing tolerances."
verification:
  verdict: verified
  checked_at: 2026-06-01T20:45:23.757Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions match their source opcodes with correct parameter shapes; transport parameters verified (port 5000, baud 9600, serial config). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Planar VM55LX Series Control Spec

## Summary
Planar VM Series LCD video wall displays controlled via RS-232 serial or TCP over LAN. The protocol uses a binary SICP-style packet format with a fixed header byte (0xA6 host→display, 0x21 display→host), monitor ID addressing (1–255, with 0 for broadcast), an opcode byte, optional payload bytes, and an XOR checksum.

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 5000
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
- id: monitor_information_get
  label: Get Monitor Information (Model / FW / Build Date)
  kind: query
  command: "A6 01 00 00 00 04 01 A1 00 03"   # opcode 0xA1; DATA[1]: 0x00=Model, 0x01=FW, 0x02=Build Date
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID 1-255 (0 = broadcast)
    - name: info_code
      type: enum
      values: [model_number, fw_version, build_date]
      description: 0x00 Model Number, 0x01 FW Version, 0x02 Build Date

- id: power_state_get
  label: Power State Get
  kind: query
  command: "A6 01 00 00 00 03 01 19 BC"   # opcode 0x19
  params:
    - name: monitor_id
      type: integer

- id: power_state_set
  label: Power State Set
  kind: action
  command: "A6 01 00 00 00 04 01 18 {state} {checksum}"   # opcode 0x18; state: 0x01=Off, 0x02=On
  params:
    - name: monitor_id
      type: integer
    - name: state
      type: enum
      values: [off, on]
      description: 0x01 Power Off, 0x02 On

- id: ir_remote_lock_status_get
  label: IR Remote Lock Status Get
  kind: query
  command: "A6 01 00 00 00 03 01 1D B8"   # opcode 0x1D
  params:
    - name: monitor_id
      type: integer

- id: ir_remote_lock_status_set
  label: IR Remote Lock Status Set
  kind: action
  command: "A6 01 00 00 00 04 01 1C {status} {checksum}"   # opcode 0x1C
  params:
    - name: monitor_id
      type: integer
    - name: status
      type: enum
      values: [unlock_all, lock_all, lock_all_but_power, lock_all_but_volume, primary, secondary]
      description: 0x01 Unlock All, 0x02 Lock All, 0x03 Lock All but Power, 0x04 Lock All but Volume, 0x05 Primary, 0x06 Secondary

- id: keypad_lock_status_get
  label: Keypad Lock Status Get
  kind: query
  command: "A6 01 00 00 00 03 01 1B BE"   # opcode 0x1B
  params:
    - name: monitor_id
      type: integer

- id: keypad_lock_status_set
  label: Keypad Lock Status Set
  kind: action
  command: "A6 01 00 00 00 04 01 1A {status} {checksum}"   # opcode 0x1A
  params:
    - name: monitor_id
      type: integer
    - name: status
      type: enum
      values: [unlock_all, lock_all, lock_all_but_power, lock_all_but_volume]
      description: 0x01 Unlock All, 0x02 Lock All, 0x03 Lock All but Power, 0x04 Lock All but Volume

- id: power_state_cold_start_get
  label: Power State at Cold Start Get
  kind: query
  command: "A6 01 00 00 00 03 01 A4 01"   # opcode 0xA4
  params:
    - name: monitor_id
      type: integer

- id: power_state_cold_start_set
  label: Power State at Cold Start Set
  kind: action
  command: "A6 01 00 00 00 04 01 A3 {state} {checksum}"   # opcode 0xA3
  params:
    - name: monitor_id
      type: integer
    - name: state
      type: enum
      values: [power_off, forced_on, last_status]
      description: 0x00 Power Off, 0x01 Forced On, 0x02 Last Status

- id: input_source_set
  label: Input Source Set
  kind: action
  command: "A6 01 00 00 00 07 01 AC {source} 00 00 00 {checksum}"   # opcode 0xAC
  params:
    - name: monitor_id
      type: integer
    - name: source
      type: enum
      values: [vga, hdmi_2, displayport, ops, hdmi_1, dvi_d, hdmi_3, browser, cms, media_player, pdf_player, custom, hdmi_4]
      description: 0x05 VGA, 0x06 HDMI 2, 0x0A DisplayPort, 0x0B OPS, 0x0D HDMI 1, 0x0E DVI-D, 0x0F HDMI 3, 0x10 BROWSER, 0x11 CMS, 0x16 Media Player, 0x17 PDF Player, 0x18 Custom, 0x19 HDMI 4

- id: current_source_get
  label: Current Source Get
  kind: query
  command: "A6 01 00 00 00 03 01 AD 08"   # opcode 0xAD
  params:
    - name: monitor_id
      type: integer

- id: auto_signal_detecting_get
  label: Auto Signal Detecting Get
  kind: query
  command: "0xAF"   # opcode 0xAF (listed in Command Summary §771)
  params:
    - name: monitor_id
      type: integer
  # UNRESOLVED: Auto Signal Detecting Get appears only in the Command Summary table; no dedicated section in source describes packet layout, data bytes, or example.

- id: auto_signal_detecting_set
  label: Auto Signal Detecting Set
  kind: action
  command: "0xAE"   # opcode 0xAE (listed in Command Summary §771)
  params:
    - name: monitor_id
      type: integer
  # UNRESOLVED: Auto Signal Detecting Set appears only in the Command Summary table; no dedicated section in source describes packet layout, data bytes, or example.

- id: video_parameters_get
  label: Video Parameters Get
  kind: query
  command: "A6 01 00 00 00 03 01 33 96"   # opcode 0x33
  params:
    - name: monitor_id
      type: integer

- id: video_parameters_set
  label: Video Parameters Set
  kind: action
  command: "A6 01 00 00 00 0A 01 32 {brightness} {color} {contrast} {sharpness} {tint} {black_level} {gamma} {checksum}"   # opcode 0x32
  params:
    - name: monitor_id
      type: integer
    - name: brightness
      type: integer
      description: 0-100 (%)
    - name: color
      type: integer
      description: 0-100 (%)
    - name: contrast
      type: integer
      description: 0-100 (%)
    - name: sharpness
      type: integer
      description: 0-100 (%)
    - name: tint
      type: integer
      description: 0-100 (%)
    - name: black_level
      type: integer
      description: 0-100 (%)
    - name: gamma
      type: enum
      values: [native, s_gamma, "2.2", "2.4", d_image_dicom]
      description: 0x01 Native, 0x02 S gamma, 0x03 2.2, 0x04 2.4, 0x05 D-image (DICOM)

- id: color_temperature_get
  label: Color Temperature Get
  kind: query
  command: "A6 01 00 00 00 03 01 35 90"   # opcode 0x35
  params:
    - name: monitor_id
      type: integer

- id: color_temperature_set
  label: Color Temperature Set
  kind: action
  command: "A6 01 00 00 00 04 01 34 {temp} {checksum}"   # opcode 0x34
  params:
    - name: monitor_id
      type: integer
    - name: temp
      type: enum
      values: [user_1, native, "10000K", "9300K", "7500K", "6500K", "5000K", "4000K", "3000K", user_2]
      description: 0x00 User 1, 0x01 Native, 0x03 10000K, 0x04 9300K, 0x05 7500K, 0x06 6500K, 0x09 5000K, 0x0A 4000K, 0x0D 3000K, 0x12 User 2

- id: color_parameters_get
  label: Color Parameters Get
  kind: query
  command: "A6 01 00 00 00 03 01 37 92"   # opcode 0x37
  params:
    - name: monitor_id
      type: integer

- id: color_parameters_set
  label: Color Parameters Set
  kind: action
  command: "A6 01 00 00 00 09 01 36 {red} {green} {blue} 80 80 80 {checksum}"   # opcode 0x36
  params:
    - name: monitor_id
      type: integer
    - name: red
      type: integer
      description: Red color gain 0-255
    - name: green
      type: integer
      description: Green color gain 0-255
    - name: blue
      type: integer
      description: Blue color gain 0-255

- id: zoom_mode_get
  label: Zoom Mode Get
  kind: query
  command: "A6 01 00 00 00 03 01 3B 9E"   # opcode 0x3B
  params:
    - name: monitor_id
      type: integer

- id: zoom_mode_set
  label: Zoom Mode Set
  kind: action
  command: "A6 01 00 00 00 04 01 3A {mode} {checksum}"   # opcode 0x3A
  params:
    - name: monitor_id
      type: integer
    - name: mode
      type: enum
      values: ["4:3", custom, "1:1", full, "21:9"]
      description: 0x00 4:3, 0x01 Custom, 0x02 1:1, 0x03 Full, 0x04 21:9

- id: volume_get
  label: Volume Get
  kind: query
  command: "A6 01 00 00 00 03 01 45 E0"   # opcode 0x45
  params:
    - name: monitor_id
      type: integer

- id: volume_set
  label: Volume Set
  kind: action
  command: "A6 01 00 00 00 04 01 44 {volume} {audio_out_volume} {checksum}"   # opcode 0x44 - note source example uses length 0x04 but documents two volume bytes
  params:
    - name: monitor_id
      type: integer
    - name: volume
      type: integer
      description: Speaker volume 0-100 (%); send 0 to mute without affecting system mute state
    - name: audio_out_volume
      type: integer
      description: Audio Out volume 0-100 (%)

- id: audio_parameters_get
  label: Audio Parameters Get
  kind: query
  command: "A6 01 00 00 00 03 01 43 E6"   # opcode 0x43
  params:
    - name: monitor_id
      type: integer

- id: audio_parameters_set
  label: Audio Parameters Set
  kind: action
  command: "A6 01 00 00 00 05 01 42 {treble} {bass} {checksum}"   # opcode 0x42
  params:
    - name: monitor_id
      type: integer
    - name: treble
      type: integer
      description: Treble 0-100 (%)
    - name: bass
      type: integer
      description: Bass 0-100 (%)

- id: operating_hours_get
  label: Operating Hours (Miscellaneous Info) Get
  kind: query
  command: "A6 01 00 00 00 04 01 0F 02 AF"   # opcode 0x0F; DATA[1]=0x02 Operating Hours
  params:
    - name: monitor_id
      type: integer

- id: auto_adjust_set
  label: Auto Adjust (VGA) Set
  kind: action
  command: "A6 01 00 00 00 05 01 70 40 00 93"   # opcode 0x70; DATA[1]=0x40 Auto Adjust, DATA[2]=0 reserved
  params:
    - name: monitor_id
      type: integer

- id: serial_code_get
  label: Serial Code Get
  kind: query
  command: "A6 01 00 00 00 03 01 15 B0"   # opcode 0x15
  params:
    - name: monitor_id
      type: integer

- id: tiling_get
  label: Tiling Get
  kind: query
  command: "A6 01 00 00 00 03 01 23 86"   # opcode 0x23
  params:
    - name: monitor_id
      type: integer

- id: tiling_set
  label: Tiling Set
  kind: action
  command: "A6 01 00 00 00 07 01 22 {enable} {frame_comp} {position} {v_h_monitors} {checksum}"   # opcode 0x22
  params:
    - name: monitor_id
      type: integer
    - name: enable
      type: enum
      values: [no, yes]
      description: 0x00 No, 0x01 Yes
    - name: frame_comp
      type: enum
      values: [no, yes, keep_previous]
      description: 0x00 No, 0x01 Yes, 0x02 don't overwrite
    - name: position
      type: integer
      description: 0x00 keep previous; 0x01-0xE1 (1-225) position counted left-to-right, top-to-bottom
    - name: v_h_monitors
      type: integer
      description: 0x00 keep previous; encoded value = (V−1)×15 + H; max V=15, max H=15

- id: tiling_preset_set
  label: Tiling Preset Set
  kind: action
  command: "A6 01 00 00 00 05 01 24 {action} {preset} {checksum}"   # opcode 0x24
  params:
    - name: monitor_id
      type: integer
    - name: action
      type: enum
      values: [save, recall]
      description: 0x00 Save, 0x01 Recall
    - name: preset
      type: integer
      description: 0x00 Preset 1 through 0x09 Preset 10
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  description: Reported by Power State Report (opcode 0x19); DATA[1] 0x01 Off, 0x02 On

- id: ir_remote_lock_status
  type: enum
  values: [unlock_all, lock_all, lock_all_but_power, lock_all_but_volume, primary, secondary]
  description: Reported by IR Remote Lock Status Report (opcode 0x1D)

- id: keypad_lock_status
  type: enum
  values: [unlock_all, lock_all, lock_all_but_power, lock_all_but_volume]
  description: Reported by Keypad Lock Status Report (opcode 0x1B)

- id: power_state_cold_start
  type: enum
  values: [power_off, forced_on, last_status]
  description: Reported by Power State at Cold Start Report (opcode 0xA4)

- id: current_source
  type: enum
  values: [vga, hdmi_2, displayport, ops, hdmi_1, dvi_d, hdmi_3, browser, cms, media_player, pdf_player, custom, hdmi_4]
  description: Reported by Current Source Report (opcode 0xAD)

- id: video_parameters
  type: object
  description: Brightness, Color, Contrast, Sharpness, Tint, Black Level (each 0-100%), Gamma; reported by Video Parameters Report (opcode 0x33)

- id: color_temperature
  type: enum
  values: [user_1, native, "10000K", "9300K", "7500K", "6500K", "5000K", "4000K", "3000K", user_2]
  description: Reported by Color Temperature Report (opcode 0x35)

- id: color_parameters
  type: object
  description: Red/Green/Blue gain 0-255 each; reported by Color Parameters Report (opcode 0x37)

- id: zoom_mode
  type: enum
  values: ["4:3", custom, real, full, "21:9"]
  description: Reported by Zoom Mode Report (opcode 0x3B); note Report values include 0x02 Real whereas Set uses 0x02 1:1

- id: volume
  type: integer
  description: Volume 0-100 (%); reported by Volume Report (opcode 0x45)

- id: audio_parameters
  type: object
  description: Treble and Bass each 0-100 (%); reported by Audio Parameters Report (opcode 0x43)

- id: operating_hours
  type: integer
  description: 16-bit operating-hours counter (DATA[1] MSByte, DATA[2] LSByte); reported by Misc. Info Report (opcode 0x0F)

- id: serial_code
  type: string
  description: 14-character ASCII production serial code; reported by Serial Code Report (opcode 0x15)

- id: monitor_information
  type: string
  description: Model number, FW version, or build date string (up to 36 ASCII chars); reported by Monitor Information Report (opcode 0xA1)

- id: tiling_status
  type: object
  description: Enable, Frame comp., Position, V/H monitors; reported by Tiling Report (opcode 0x23)

- id: command_ack
  type: enum
  values: [ack, nak, nav]
  description: Per §6.1 the display replies with header 0x21 and a status byte in DATA[1] - 0x00 ACK (command well executed), 0x03 NAK (transmission error / corrupt buffer), 0x04 NAV (not available or checksum error)
```

## Variables
```yaml
# All settable parameters are exposed via the Set actions above (Video Parameters, Color Parameters,
# Color Temperature, Volume, Audio Parameters, Power State at Cold Start, Tiling, etc.).
# UNRESOLVED: no additional standalone settable variables described in source.
```

## Events
```yaml
# UNRESOLVED: source documents only solicited Report responses to Get/Set commands;
# no unsolicited events are described.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing
# requirements specific to RS-232/LAN control.
```

## Notes
- Packet framing (§5): host→display header 0xA6, display→host header 0x21. Every packet carries Monitor ID (1–255; 0 = broadcast, no ACK), Category 0x00, Code0 0x00, Code1 0x00, Length = N + 3 (data control byte + payload + checksum), Data Control 0x01, opcode byte (DATA[0]), optional payload (DATA[1]…DATA[N], up to 36 bytes), and a trailing checksum = XOR of all preceding bytes.
- ACK/NAK/NAV reply protocol (§6): every valid command yields an ACK reply (DATA[1] = 0x00). Unsupported commands return NAV (0x04), corrupted/transmission-error packets return NAK (0x03). A wrong Monitor ID produces no reply.
- Timing (§4): do not send a new command until the previous command is acknowledged; if no response within 500 ms a retry may be triggered.
- LAN control (§4): TCP port 5000; each display must be connected directly to the LAN — serial commands received via LAN are not relayed through the RS-232 OUT connector to daisy-chained monitors.
- Source-specific quirk: §11 (Input Source Set) and §12 (Current Source Get) in the body use opcodes 0xAC and 0xAD respectively, but the Command Summary table (§771) lists them in reverse. The body-section opcodes (Set=0xAC, Get=0xAD) are used in this spec because they are also confirmed by the example packets in §11.1 and §12.1.
- Source-specific quirk: Zoom Mode Report (§14.2) defines 0x02 as "Real" while Zoom Mode Set (§14.3) defines 0x02 as "1:1" — values preserved as documented.
- Input source availability is model-dependent (§11.1 Note): DisplayPort/HDMI 3/HDMI 4 on 65/75/86" models only; DVI-D on 43/55" models only.
- Volume Set (§15.3) accepts two volume bytes (speaker + audio out) yet the source example shows Length 0x04 with both bytes present — the packet length appears inconsistent with the byte count in the example. Implementers should compute Length per §5 (Length = N + 3) using the actual payload byte count.
<!-- UNRESOLVED: firmware version compatibility ranges, Auto Signal Detecting (0xAE/0xAF) packet layout, power-on/cold-start timing tolerances. -->

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/440918/020-1359-03a_vm_series_rs232_manual.pdf
retrieved_at: 2026-04-30T04:27:34.098Z
last_checked_at: 2026-06-01T20:45:23.757Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T20:45:23.757Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions match their source opcodes with correct parameter shapes; transport parameters verified (port 5000, baud 9600, serial config). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Auto Signal Detecting Get appears only in the Command Summary table; no dedicated section in source describes packet layout, data bytes, or example."
- "Auto Signal Detecting Set appears only in the Command Summary table; no dedicated section in source describes packet layout, data bytes, or example."
- "no additional standalone settable variables described in source."
- "source documents only solicited Report responses to Get/Set commands;"
- "no multi-step macro sequences described in source."
- "source contains no safety warnings, interlock procedures, or power-on sequencing"
- "firmware version compatibility ranges, Auto Signal Detecting (0xAE/0xAF) packet layout, power-on/cold-start timing tolerances."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
