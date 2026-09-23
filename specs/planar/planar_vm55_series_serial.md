---
spec_id: admin/planar-vm55-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar VM55 Series Control Spec"
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
retrieved_at: 2026-09-02T16:39:26.097Z
last_checked_at: 2026-09-18T22:16:59.199Z
generated_at: 2026-09-18T22:16:59.199Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "per-model matrix of which input sources apply (DP/HDMI3/HDMI4: 65/75/86 only; DVI-D: 43/55 only) is described only in narrative form."
  - "full byte sequence and checksum not shown in body - only summary entry references code 0xAF."
  - "full byte sequence and checksum not shown in body - only summary entry references code 0xAE; Data[1] value not documented."
  - "remove section if not applicable."
verification:
  verdict: verified
  checked_at: 2026-09-18T22:16:59.199Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions match source wire tokens (opcodes 0xA1, 0x19, 0x18, 0x1C-0x1D, 0x1A-0x1B, 0xA3-0xA4, 0xAC-0xAD, 0xAF, 0xAE, 0x33-0x37, 0x3A-0x3B, 0x42-0x45, 0x0F, 0x70, 0x15, 0x22-0x24) with correct shapes and transport parameters (9600/8N1, port 5000). (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Planar VM55 Series Control Spec

## Summary
RS-232 (and LAN-over-TCP on port 5000) control protocol for the Planar VM Series large-format displays. Covers power, input source, video/audio parameters, volume, tiling, lock functions, and device information using a fixed-header SICP-style packet format with XOR checksums.

<!-- UNRESOLVED: per-model matrix of which input sources apply (DP/HDMI3/HDMI4: 65/75/86 only; DVI-D: 43/55 only) is described only in narrative form. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 5000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       # inferred from power state get/set (0x19/0x18)
# - routable        # inferred from input source set / current source get (0xAC/0xAD)
# - queryable       # inferred from broad set of "Get" commands
# - levelable       # inferred from volume set, brightness/contrast/color/tint/sharpness/black-level set
```

## Actions
```yaml
# Packet envelope (per source §5):
#   Header=0xA6 | MonitorID | 0x00 (Cat) | 0x00 (Page/Code0) | 0x00 (Code1) | Length (= N+3) | 0x01 (Data Control) | Data[0..N] | Checksum
#   Checksum = XOR of all bytes except checksum itself.
# LAN framing per source §4 note: same commands accepted on TCP port 5000.

- id: model_info_get
  label: Model Number / FW Version / Build Date Get
  kind: query
  command: "A6 01 00 00 00 04 01 A1 {subcode} {checksum}"
  params:
    - name: subcode
      type: enum
      description: "0x00 = Model Number, 0x01 = FW version, 0x02 = Build Date"

- id: power_state_get
  label: Power State Get
  kind: query
  command: "A6 01 00 00 00 03 01 19 BC"

- id: power_state_set
  label: Power State Set
  kind: action
  command: "A6 01 00 00 00 04 01 18 {state} {checksum}"
  params:
    - name: state
      type: enum
      values: [power_off, on]
      description: "0x01 = Power Off, 0x02 = On"

- id: ir_remote_lock_status_get
  label: IR Remote Lock Status Get
  kind: query
  command: "A6 01 00 00 00 03 01 1D B8"

- id: ir_remote_lock_status_set
  label: IR Remote Lock Status Set
  kind: action
  command: "A6 01 00 00 00 04 01 1C {mode} {checksum}"
  params:
    - name: mode
      type: enum
      values: [unlock_all, lock_all, lock_all_but_power, lock_all_but_volume, primary, secondary]
      description: "0x01..0x06 per source"

- id: keypad_lock_status_get
  label: Keypad Lock Status Get
  kind: query
  command: "A6 01 00 00 00 03 01 1B BE"

- id: keypad_lock_status_set
  label: Keypad Lock Status Set
  kind: action
  command: "A6 01 00 00 00 04 01 1A {mode} {checksum}"
  params:
    - name: mode
      type: enum
      values: [unlock_all, lock_all, lock_all_but_power, lock_all_but_volume]
      description: "0x01..0x04 per source"

- id: cold_start_power_state_get
  label: Power State at Cold Start Get
  kind: query
  command: "A6 01 00 00 00 03 01 A4 01"

- id: cold_start_power_state_set
  label: Power State at Cold Start Set
  kind: action
  command: "A6 01 00 00 00 04 01 A3 {state} {checksum}"
  params:
    - name: state
      type: enum
      values: [power_off, forced_on, last_status]
      description: "0x00=Power Off, 0x01=Forced On, 0x02=Last Status"

- id: input_source_set
  label: Input Source Set
  kind: action
  command: "A6 01 00 00 00 07 01 AC {source} 00 00 00 {checksum}"
  params:
    - name: source
      type: enum
      values: [vga, hdmi2, displayport, ops, hdmi1, dvi_d, hdmi3, browser, cms, media_player, pdf_player, custom, hdmi4]
      description: "0x05=VGA, 0x06=HDMI2, 0x0A=DisplayPort, 0x0B=OPS, 0x0D=HDMI1, 0x0E=DVI-D, 0x0F=HDMI3, 0x10=BROWSER, 0x11=CMS, 0x16=Media Player, 0x17=PDF Player, 0x18=Custom, 0x19=HDMI4. Some sources only on specific models (per source §11 note)."

- id: current_source_get
  label: Current Source Get
  kind: query
  command: "A6 01 00 00 00 03 01 AD 08"

- id: video_parameters_get
  label: Video Parameters Get
  kind: query
  command: "A6 01 00 00 00 03 01 33 96"

- id: video_parameters_set
  label: Video Parameters Set
  kind: action
  command: "A6 01 00 00 00 0A 01 32 {brightness} {color} {contrast} {sharpness} {tint} {black_level} {gamma} {checksum}"
  params:
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
      values: [native, s_gamma, g2_2, g2_4, d_image]
      description: "0x01=Native, 0x02=S gamma, 0x03=2.2, 0x04=2.4, 0x05=D-image"

- id: color_temperature_get
  label: Color Temperature Get
  kind: query
  command: "A6 01 00 00 00 03 01 35 90"

- id: color_temperature_set
  label: Color Temperature Set
  kind: action
  command: "A6 01 00 00 00 04 01 34 {ct} {checksum}"
  params:
    - name: ct
      type: enum
      values: [user1, native, ct_10000k, ct_9300k, ct_7500k, ct_6500k, ct_5000k, ct_4000k, ct_3000k, user2]
      description: "0x00=User1, 0x01=Native, 0x03=10000K, 0x04=9300K, 0x05=7500K, 0x06=6500K, 0x09=5000K, 0x0A=4000K, 0x0D=3000K, 0x12=User2"

- id: color_parameters_get
  label: Color Parameters Get (RGB Gain)
  kind: query
  command: "A6 01 00 00 00 03 01 37 92"

- id: color_parameters_set
  label: Color Parameters Set (RGB Gain)
  kind: action
  command: "A6 01 00 00 00 09 01 36 {red} {green} {blue} 00 00 00 {checksum}"
  params:
    - name: red
      type: integer
      description: 0-255
    - name: green
      type: integer
      description: 0-255
    - name: blue
      type: integer
      description: 0-255

- id: zoom_mode_get
  label: Zoom Mode Get
  kind: query
  command: "A6 01 00 00 00 03 01 3B 9E"

- id: zoom_mode_set
  label: Zoom Mode Set
  kind: action
  command: "A6 01 00 00 00 04 01 3A {mode} {checksum}"
  params:
    - name: mode
      type: enum
      values: [r4_3, custom, real, full, r21_9]
      description: "0x00=4:3, 0x01=Custom, 0x02=1:1 (Set) / Real (Report), 0x03=Full, 0x04=21:9"

- id: volume_get
  label: Volume Get
  kind: query
  command: "A6 01 00 00 00 03 01 45 E0"

- id: volume_set
  label: Volume Set (Speaker + Audio Out)
  kind: action
  command: "A6 01 00 00 00 04 01 44 {speaker_vol} {audio_out_vol} {checksum}"
  params:
    - name: speaker_vol
      type: integer
      description: 0-100 (%). Source notes: setting Volume=0 mutes the display without overwriting system mute state.
    - name: audio_out_vol
      type: integer
      description: 0-100 (%)

- id: audio_parameters_get
  label: Audio Parameters Get (Treble, Bass)
  kind: query
  command: "A6 01 00 00 00 03 01 43 E6"

- id: audio_parameters_set
  label: Audio Parameters Set (Treble, Bass)
  kind: action
  command: "A6 01 00 00 00 05 01 42 {treble} {bass} {checksum}"
  params:
    - name: treble
      type: integer
      description: 0-100 (%)
    - name: bass
      type: integer
      description: 0-100 (%)

- id: operating_hours_get
  label: Operating Hours Get
  kind: query
  command: "A6 01 00 00 00 04 01 0F 02 AF"
  params:
    - name: item
      type: enum
      values: [operating_hours]
      description: "DATA[1]=0x02 selects Operating Hours (other values reserved)"

- id: auto_adjust_set
  label: Auto Adjust Set (VGA)
  kind: action
  command: "A6 01 00 00 00 05 01 70 40 00 93"

- id: serial_code_get
  label: Serial Code Get (14-digit production code)
  kind: query
  command: "A6 01 00 00 00 03 01 15 B0"

- id: tiling_get
  label: Tiling Get
  kind: query
  command: "A6 01 00 00 00 03 01 23 86"

- id: tiling_set
  label: Tiling Set
  kind: action
  command: "A6 01 00 00 00 07 01 22 {enable} {frame_comp} {position} {vh_monitors} {checksum}"
  params:
    - name: enable
      type: enum
      values: [no, yes]
      description: "0x00=No, 0x01=Yes"
    - name: frame_comp
      type: enum
      values: [no, yes, keep_previous]
      description: "0x00=No, 0x01=Yes, 0x02=don't overwrite"
    - name: position
      type: integer
      description: "0x00=keep previous, 0x01..0xE1 (max 225) for tile position"
    - name: vh_monitors
      type: integer
      description: "0x00=keep previous; else (V-1)*15 + H, with V,H each 1..15"

- id: tiling_preset_set
  label: Tiling Preset Set (Save/Recall)
  kind: action
  command: "A6 01 00 00 00 05 01 24 {action} {preset} {checksum}"
  params:
    - name: action
      type: enum
      values: [save, recall]
      description: "0x00=Save, 0x01=Recall"
    - name: preset
      type: enum
      values: [preset1, preset2, preset3, preset4, preset5, preset6, preset7, preset8, preset9, preset10]
      description: "0x00..0x09 → Preset1..Preset10"

- id: auto_signal_detecting_get
  label: Auto Signal Detecting Get
  kind: query
  command: "A6 01 00 00 00 03 01 AF {checksum}"
  # UNRESOLVED: full byte sequence and checksum not shown in body - only summary entry references code 0xAF.

- id: auto_signal_detecting_set
  label: Auto Signal Detecting Set
  kind: action
  command: "A6 01 00 00 00 04 01 AE {value} {checksum}"
  # UNRESOLVED: full byte sequence and checksum not shown in body - only summary entry references code 0xAE; Data[1] value not documented.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [power_off, on]
  description: "0x01=Power Off, 0x02=On. Reported by device with header 0x21, Data[0]=0x19."

- id: ir_remote_lock_status
  type: enum
  values: [unlock_all, lock_all, lock_all_but_power, lock_all_but_volume, primary, secondary]
  description: "Reported with Data[0]=0x1D."

- id: keypad_lock_status
  type: enum
  values: [unlock_all, lock_all, lock_all_but_power, lock_all_but_volume]
  description: "Reported with Data[0]=0x1B."

- id: cold_start_power_state
  type: enum
  values: [power_off, forced_on, last_status]
  description: "Reported with Data[0]=0xA4."

- id: current_source
  type: enum
  values: [vga, hdmi2, displayport, ops, hdmi1, dvi_d, hdmi3, browser, cms, media_player, pdf_player, custom, hdmi4]
  description: "Reported with Data[0]=0xAD; full Data[1] table per input source set."

- id: video_parameters
  type: object
  description: "Brightness, Color, Contrast, Sharpness, Tint, Black Level (each 0-100), Gamma Selection. Reported with Data[0]=0x33."

- id: color_temperature
  type: enum
  values: [user1, native, ct_10000k, ct_9300k, ct_7500k, ct_6500k, ct_5000k, ct_4000k, ct_3000k, user2]
  description: "Reported with Data[0]=0x35."

- id: color_parameters
  type: object
  description: "Red/Green/Blue gain values (0-255 each). Reported with Data[0]=0x37."

- id: zoom_mode
  type: enum
  values: [r4_3, custom, real, full, r21_9]
  description: "Reported with Data[0]=0x3B."

- id: volume
  type: integer
  description: "0-100 (%). Reported with Data[0]=0x45."

- id: audio_parameters
  type: object
  description: "Treble, Bass (each 0-100). Reported with Data[0]=0x43."

- id: operating_hours
  type: integer
  description: "16-bit wide value, MSByte first (DATA[1]) then LSByte (DATA[2]). Reported with Data[0]=0x0F."

- id: serial_code
  type: string
  description: "14 ASCII characters (production code). Reported with Data[0]=0x15."

- id: tiling_status
  type: object
  description: "Enable, Frame comp., Position, V/H monitor count. Reported with Data[0]=0x23."
```

## Variables
```yaml
# Per-byte fields inside composite actions/feedbacks that an integrator must compute at runtime.
# Treat these as named slots rather than separate actions.
- id: monitor_id
  description: "Range 1..255 (per source §5). 0 = Broadcast Mode (no ACK/Report expected)."
- id: length
  description: "Length = N + 3, where N is the number of Data bytes (0..36). Per source §5."
- id: checksum
  description: "XOR of all bytes in the message except the checksum itself; result masked to 0..0xFF."
```

## Events
```yaml
# Reports from the device share the standard Message Report envelope (header 0x21):
# Header | Monitor ID | Category=0x00 | Page=0x00 | MsgLen | Control=0x01 | Data[0] (echo of command code) | Data[1..N] (response payload) | Checksum.
- id: command_ack
  description: "Header 0x21, Data[1]=0x00. Command executed successfully."
- id: command_nak
  description: "Header 0x21, Data[1]=0x03. Command buffer corrupt (transmission error)."
- id: command_nav
  description: "Header 0x21, Data[1]=0x04. Command valid but not supported in current implementation, or checksum error."
```

## Macros
```yaml
# No multi-step macros described in source. UNRESOLVED: remove section if not applicable.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source contains no explicit safety warnings, interlocks, or power-on sequencing requirements beyond the documented Cold Start behavior.
```

## Notes
- All RS-232 commands use the same packet envelope: `0xA6 | MonitorID | 0x00 | 0x00 | 0x00 | Length | 0x01 | Data[…] | Checksum`. Length = N+3. Checksum is XOR of all preceding bytes.
- Reports use a mirrored envelope with header `0x21` and `Data[0]` echoing the command code.
- Monitor ID range: 1..255. ID=0 = Broadcast (no ACK/Report expected). Wrong ID → no reply.
- Do not send a new command before the previous one is acknowledged. Retry allowed if no response within 500 ms.
- LAN control uses TCP port 5000 and accepts the same serial commands. Serial commands received via LAN are NOT relayed through the RS-232 out connector to daisy-chained monitors.
- Input source availability varies by model (e.g. DisplayPort, HDMI3, HDMI4 only on 65/75/86-inch; DVI-D only on 43/55-inch).
- Auto Signal Detecting commands (0xAF/0xAE) appear in the Command Summary table but their detailed packet examples are not present in the refined source — flagged UNRESOLVED above.
- Daisy-chain "RS232 out" connector is mentioned only in the LAN-control note; pinout for it is not in this document.

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/440918/020-1359-03a_vm_series_rs232_manual.pdf
retrieved_at: 2026-09-02T16:39:26.097Z
last_checked_at: 2026-09-18T22:16:59.199Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-18T22:16:59.199Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions match source wire tokens (opcodes 0xA1, 0x19, 0x18, 0x1C-0x1D, 0x1A-0x1B, 0xA3-0xA4, 0xAC-0xAD, 0xAF, 0xAE, 0x33-0x37, 0x3A-0x3B, 0x42-0x45, 0x0F, 0x70, 0x15, 0x22-0x24) with correct shapes and transport parameters (9600/8N1, port 5000). (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "per-model matrix of which input sources apply (DP/HDMI3/HDMI4: 65/75/86 only; DVI-D: 43/55 only) is described only in narrative form."
- "full byte sequence and checksum not shown in body - only summary entry references code 0xAF."
- "full byte sequence and checksum not shown in body - only summary entry references code 0xAE; Data[1] value not documented."
- "remove section if not applicable."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
