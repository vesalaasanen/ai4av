---
spec_id: admin/planar-vm-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar VM Series Control Spec"
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
  - https://www.planar.com/media/m5fk5dtw/020-1359-03a_vm_series_rs232_manual-1.pdf
retrieved_at: 2026-04-30T04:27:29.643Z
last_checked_at: 2026-06-02T17:23:49.710Z
generated_at: 2026-06-02T17:23:49.710Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "SLxx64K family not documented in this source; spec covers VM55 variants only"
  - "voltage, current, and power-draw specifications not stated in source"
  - "firmware version compatibility not stated in source"
  - "Auto Signal Detecting (0xAF Get, 0xAE Set) listed in summary table only; byte layout not documented"
  - "source section 10.3 has no worked Set example"
  - "0xAF listed in summary table only; byte-level layout not documented in source"
  - "0xAE listed in summary table only; byte-level layout not documented in source"
  - "source contains no safety warnings, interlock procedures, or"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:49.710Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions matched literally to source commands with correct opcodes; all transport parameters verified in source; bidirectional coverage at 0.969 ratio. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Planar VM Series Control Spec

## Summary
Planar VM Series LCD video wall displays controlled via the SICP binary protocol over RS-232 (DB9 male, null-modem cable) or LAN. The source document is the Planar RS232 User Guide for the VM Series and enumerates the SICP command set for power, lock, input source, video/audio parameters, color, zoom, volume, operating hours, serial code, and video-wall tiling. The user-supplied "SLxx64K" family suffix is not present in the source; only the five VM55 models above are documented.

<!-- UNRESOLVED: SLxx64K family not documented in this source; spec covers VM55 variants only -->
<!-- UNRESOLVED: voltage, current, and power-draw specifications not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: Auto Signal Detecting (0xAF Get, 0xAE Set) listed in summary table only; byte layout not documented -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 5000  # stated in source section 4: "For LAN control, the port number is 5000"
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: DB9 male  # stated in source section 3
auth:
  type: none  # inferred: no auth procedure in source
```

**Packet framing (SICP, from source section 5):**
- Command header byte: `0xA6`
- Report/ACK header byte: `0x21`
- Monitor ID range: `0x01`–`0xFF`; `0x00` = broadcast (no ACK/report expected)
- Category, Code0 fixed: `0x00 0x00`; Code1 (function) fixed: `0x00`
- Length byte: `N + 3` (where N = number of Data bytes, range 0–36)
- Data Control byte: `0x01` (fixed)
- Checksum (last byte): XOR of all preceding bytes in the packet, range `0x00`–`0xFF`
- ACK: `0x00`, NAK: `0x03`, NAV: `0x04` (in Data[1] of report packets)
- Reply timeout: 500 ms before host may retry

**LAN note (source section 4):** Each monitor must be connected directly to the LAN; serial commands received via the LAN port are not relayed out the "RS232 out" connector to downstream monitors.

## Traits
```yaml
# powerable       - Power State Set (0x18) present
# routable        - Input Source Set (0xAC) present
# queryable       - numerous Get commands (power, source, volume, video, color, etc.)
# levelable       - Volume, Brightness, Color, Contrast, Sharpness, Tint, Black Level, Treble, Bass present
```

## Actions
```yaml
- id: monitor_info_get
  label: Monitor Information Get
  kind: query
  description: "Get Model Number / FW version / Build Date. Data[1] sub-code: 0x00=Model, 0x01=FW version, 0x02=Build Date."
  command: "A6 {monitor_id} 00 00 00 04 01 A1 {item} {checksum}"
  example: "A6 01 00 00 00 04 01 A1 00 03"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1-255 (0 = broadcast)
    - name: item
      type: enum
      values: [model, fw_version, build_date]
      description: "0x00=Model, 0x01=FW version, 0x02=Build Date"
    - name: checksum
      type: integer
      description: XOR of all preceding bytes; range 0x00-0xFF

- id: power_state_get
  label: Power State Get
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 19 {checksum}"
  example: "A6 01 00 00 00 03 01 19 BC"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1-255
    - name: checksum
      type: integer
      description: XOR of all preceding bytes

- id: power_state_set
  label: Power State Set
  kind: action
  command: "A6 {monitor_id} 00 00 00 04 01 18 {state} {checksum}"
  example: "A6 01 00 00 00 04 01 18 01 BB  # Power Off"
  params:
    - name: monitor_id
      type: integer
      description: Display address 1-255
    - name: state
      type: enum
      values: [off, on]
      description: "0x01=Power Off, 0x02=On"
    - name: checksum
      type: integer
      description: XOR of all preceding bytes

- id: ir_remote_lock_status_get
  label: IR Remote Lock Status Get
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 1D {checksum}"
  example: "A6 01 00 00 00 03 01 1D B8"
  params:
    - name: monitor_id
      type: integer
    - name: checksum
      type: integer

- id: ir_remote_lock_status_set
  label: IR Remote Lock Status Set
  kind: action
  command: "A6 {monitor_id} 00 00 00 04 01 1C {mode} {checksum}"
  example: "A6 01 00 00 00 04 01 1C 01 BF  # Unlock All"
  params:
    - name: monitor_id
      type: integer
    - name: mode
      type: enum
      values: [unlock_all, lock_all, lock_all_but_power, lock_all_but_volume, primary_master, secondary_daisy_chain]
      description: "0x01=Unlock All, 0x02=Lock All, 0x03=Lock All but Power, 0x04=Lock All but Volume, 0x05=Primary (Master), 0x06=Secondary (Daisy chain PD)"
    - name: checksum
      type: integer

- id: keypad_lock_status_get
  label: Keypad Lock Status Get
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 1B {checksum}"
  example: "A6 01 00 00 00 03 01 1B BE"
  params:
    - name: monitor_id
      type: integer
    - name: checksum
      type: integer

- id: keypad_lock_status_set
  label: Keypad Lock Status Set
  kind: action
  command: "A6 {monitor_id} 00 00 00 04 01 1A {mode} {checksum}"
  example: "A6 01 00 00 00 04 01 1A 01 B9  # Unlock All"
  params:
    - name: monitor_id
      type: integer
    - name: mode
      type: enum
      values: [unlock_all, lock_all, lock_all_but_power, lock_all_but_volume]
      description: "0x01=Unlock All, 0x02=Lock All, 0x03=Lock All but Power, 0x04=Lock All but Volume"
    - name: checksum
      type: integer

- id: cold_start_power_state_get
  label: Power State at Cold Start Get
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 A4 {checksum}"
  example: "A6 01 00 00 00 03 01 A4 01"
  params:
    - name: monitor_id
      type: integer
    - name: checksum
      type: integer

- id: cold_start_power_state_set
  label: Power State at Cold Start Set
  kind: action
  command: "A6 {monitor_id} 00 00 00 04 01 A3 {state} {checksum}"
  example: null  # UNRESOLVED: source section 10.3 has no worked Set example
  params:
    - name: monitor_id
      type: integer
    - name: state
      type: enum
      values: [power_off, forced_on, last_status]
      description: "0x00=Power Off, 0x01=Forced On, 0x02=Last Status"
    - name: checksum
      type: integer

- id: input_source_set
  label: Input Source Set
  kind: action
  command: "A6 {monitor_id} 00 00 00 07 01 AC {source} 00 00 00 {checksum}"
  example: "A6 01 00 00 00 07 01 AC 0E 00 00 00 03  # DVI-D"
  params:
    - name: monitor_id
      type: integer
    - name: source
      type: enum
      values: [vga, hdmi2, displayport, ops, hdmi1, dvi_d, hdmi3, browser, cms, media_player, pdf_player, custom, hdmi4]
      description: "0x05=VGA, 0x06=HDMI 2, 0x0A=DisplayPort, 0x0B=OPS, 0x0D=HDMI 1, 0x0E=DVI-D, 0x0F=HDMI 3, 0x10=BROWSER, 0x11=CMS, 0x16=Media Player, 0x17=PDF Player, 0x18=Custom, 0x19=HDMI 4. Note: DisplayPort/HDMI 3/HDMI 4 are 65/75/86 only; DVI-D is 43/55 only."
    - name: checksum
      type: integer

- id: current_source_get
  label: Current Source Get
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 AD {checksum}"
  example: "A6 01 00 00 00 03 01 AD 08"
  params:
    - name: monitor_id
      type: integer
    - name: checksum
      type: integer

- id: auto_signal_detecting_get
  label: Auto Signal Detecting Get
  kind: query
  command: null  # UNRESOLVED: 0xAF listed in summary table only; byte-level layout not documented in source
  params: []
  notes: "Source command summary lists code 0xAF as a Get for Auto Signal Detecting, but section-by-section body does not document the Data[0..N] layout."

- id: auto_signal_detecting_set
  label: Auto Signal Detecting Set
  kind: action
  command: null  # UNRESOLVED: 0xAE listed in summary table only; byte-level layout not documented in source
  params: []
  notes: "Source command summary lists code 0xAE as a Set for Auto Signal Detecting, but section-by-section body does not document the Data[0..N] layout."

- id: video_parameters_get
  label: Video Parameters Get
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 33 {checksum}"
  example: "A6 01 00 00 00 03 01 33 96"
  params:
    - name: monitor_id
      type: integer
    - name: checksum
      type: integer

- id: video_parameters_set
  label: Video Parameters Set
  kind: action
  command: "A6 {monitor_id} 00 00 00 0A 01 32 {brightness} {color} {contrast} {sharpness} {tint} {black_level} {gamma} {checksum}"
  example: "A6 01 00 00 00 0A 01 32 37 37 37 37 37 37 03 AC  # all params 55%, Gamma 2.2"
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
      description: 0-100 (%) Hue
    - name: black_level
      type: integer
      description: 0-100 (%)
    - name: gamma
      type: enum
      values: [native, s_gamma, g22, g24, d_image]
      description: "0x01=Native, 0x02=S gamma, 0x03=2.2, 0x04=2.4, 0x05=D-image (DICOM gamma)"
    - name: checksum
      type: integer

- id: color_temperature_get
  label: Color Temperature Get
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 35 {checksum}"
  example: "A6 01 00 00 00 03 01 35 90"
  params:
    - name: monitor_id
      type: integer
    - name: checksum
      type: integer

- id: color_temperature_set
  label: Color Temperature Set
  kind: action
  command: "A6 {monitor_id} 00 00 00 04 01 34 {temp} {checksum}"
  example: "A6 01 00 00 00 04 01 34 01 97  # Native"
  params:
    - name: monitor_id
      type: integer
    - name: temp
      type: enum
      values: [user1, native, k10000, k9300, k7500, k6500, k5000, k4000, k3000, user2]
      description: "0x00=User 1, 0x01=Native, 0x03=10000K, 0x04=9300K, 0x05=7500K, 0x06=6500K, 0x09=5000K, 0x0A=4000K, 0x0D=3000K, 0x12=User 2"
    - name: checksum
      type: integer

- id: color_parameters_get
  label: Color Parameters Get
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 37 {checksum}"
  example: "A6 01 00 00 00 03 01 37 92"
  params:
    - name: monitor_id
      type: integer
    - name: checksum
      type: integer

- id: color_parameters_set
  label: Color Parameters Set
  kind: action
  command: "A6 {monitor_id} 00 00 00 09 01 36 {red} {green} {blue} {red2} {green2} {blue2} {checksum}"
  example: "A6 01 00 00 00 09 01 36 FF FF FF 80 80 80 E6"
  notes: "Source example shows six data bytes (DATA[1]-DATA[6]); the body labels DATA[1..3] as R/G/B gain (0-255) but the example bytes do not match that mapping. Treat the six bytes as required payload; do not infer field boundaries beyond what the byte count and the report layout establish."
  params:
    - name: monitor_id
      type: integer
    - name: checksum
      type: integer

- id: zoom_mode_get
  label: Zoom Mode Get
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 3B {checksum}"
  example: "A6 01 00 00 00 03 01 3B 9E"
  params:
    - name: monitor_id
      type: integer
    - name: checksum
      type: integer

- id: zoom_mode_set
  label: Zoom Mode Set
  kind: action
  command: "A6 {monitor_id} 00 00 00 04 01 3A {mode} {checksum}"
  example: "A6 01 00 00 00 04 01 3A 03 9B  # Full"
  params:
    - name: monitor_id
      type: integer
    - name: mode
      type: enum
      values: [ratio_4_3, custom, real_1_1, full, ratio_21_9]
      description: "0x00=4:3, 0x01=Custom, 0x02=1:1 (Real), 0x03=Full, 0x04=21:9. Report enum differs (Real vs 1:1); set values per source section 14.3."
    - name: checksum
      type: integer

- id: volume_get
  label: Volume Get
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 45 {checksum}"
  example: "A6 01 00 00 00 03 01 45 E0"
  params:
    - name: monitor_id
      type: integer
    - name: checksum
      type: integer

- id: volume_set
  label: Volume Set
  kind: action
  command: "A6 {monitor_id} 00 00 00 05 01 44 {volume} {audio_out_volume} {checksum}"
  example: "A6 01 00 00 00 04 01 44 4D 4D E7  # Volume 77%, Audio Out 77% (note: source length byte reads 0x04 but example uses two data bytes; treat example bytes as authoritative)"
  params:
    - name: monitor_id
      type: integer
    - name: volume
      type: integer
      description: "0-100 (%) speaker volume. Source note: setting Volume=0 does not overwrite system mute."
    - name: audio_out_volume
      type: integer
      description: "0-100 (%) audio-out line level"
    - name: checksum
      type: integer

- id: audio_parameters_get
  label: Audio Parameters Get
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 43 {checksum}"
  example: "A6 01 00 00 00 03 01 43 E6"
  params:
    - name: monitor_id
      type: integer
    - name: checksum
      type: integer

- id: audio_parameters_set
  label: Audio Parameters Set
  kind: action
  command: "A6 {monitor_id} 00 00 00 05 01 42 {treble} {bass} {checksum}"
  example: "A6 01 00 00 00 05 01 42 4D 4D E1  # Treble 77%, Bass 77%"
  params:
    - name: monitor_id
      type: integer
    - name: treble
      type: integer
      description: "0-100 (%)"
    - name: bass
      type: integer
      description: "0-100 (%)"
    - name: checksum
      type: integer

- id: misc_info_get
  label: Miscellaneous Info Get (Operating Hours)
  kind: query
  command: "A6 {monitor_id} 00 00 00 04 01 0F {item} {checksum}"
  example: "A6 01 00 00 00 04 01 0F 02 AF  # Operating Hours"
  params:
    - name: monitor_id
      type: integer
    - name: item
      type: enum
      values: [operating_hours]
      description: "0x02=Operating Hours (all other values reserved by source)"
    - name: checksum
      type: integer

- id: auto_adjust_set
  label: Auto Adjust (VGA)
  kind: action
  command: "A6 {monitor_id} 00 00 00 05 01 70 40 00 {checksum}"
  example: "A6 01 00 00 00 05 01 70 40 00 93"
  params:
    - name: monitor_id
      type: integer
    - name: checksum
      type: integer

- id: serial_code_get
  label: Serial Code Get
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 15 {checksum}"
  example: "A6 01 00 00 00 03 01 15 B0"
  params:
    - name: monitor_id
      type: integer
    - name: checksum
      type: integer

- id: tiling_get
  label: Tiling Get
  kind: query
  command: "A6 {monitor_id} 00 00 00 03 01 23 {checksum}"
  example: "A6 01 00 00 00 03 01 23 86"
  params:
    - name: monitor_id
      type: integer
    - name: checksum
      type: integer

- id: tiling_set
  label: Tiling Set
  kind: action
  command: "A6 {monitor_id} 00 00 00 07 01 22 {enable} {frame_comp} {position} {v_h_monitors} {checksum}"
  example: "A6 01 00 00 00 07 01 22 00 00 02 08 89  # Enabled No, Frame comp No, Position 2, V=2 H=3"
  params:
    - name: monitor_id
      type: integer
    - name: enable
      type: enum
      values: [no, yes]
      description: "0x00=No, 0x01=Yes"
    - name: frame_comp
      type: enum
      values: [no, yes, keep]
      description: "0x00=No, 0x01=Yes, 0x02=don't overwrite (keep previous)"
    - name: position
      type: integer
      description: "0x00=keep previous; 0x01-0xE1=position 1..225 (left-to-right, then top-to-bottom)"
    - name: v_h_monitors
      type: integer
      description: "0x00=keep previous; else (V-1)*15 + H, where V and H each range 1..15"
    - name: checksum
      type: integer

- id: tiling_preset_set
  label: Tiling Preset Set
  kind: action
  command: "A6 {monitor_id} 00 00 00 05 01 24 {action} {preset} {checksum}"
  example: "A6 01 00 00 00 05 01 24 00 00 87  # Save into Preset 1"
  params:
    - name: monitor_id
      type: integer
    - name: action
      type: enum
      values: [save, recall]
      description: "0x00=Save, 0x01=Recall"
    - name: preset
      type: integer
      description: "0x00-0x09 = Preset 1..10"
    - name: checksum
      type: integer
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  description: "Reported via 0x19 Power State Report; 0x01=Off, 0x02=On"

- id: ir_remote_lock_status
  type: enum
  values: [unlock_all, lock_all, lock_all_but_power, lock_all_but_volume, primary_master, secondary_daisy_chain]

- id: keypad_lock_status
  type: enum
  values: [unlock_all, lock_all, lock_all_but_power, lock_all_but_volume]

- id: cold_start_power_state
  type: enum
  values: [power_off, forced_on, last_status]

- id: current_source
  type: enum
  values: [vga, hdmi2, displayport, ops, hdmi1, dvi_d, hdmi3, browser, cms, media_player, pdf_player, custom, hdmi4]

- id: video_parameters
  type: object
  description: "Reported via 0x33 Video Parameters Report"
  fields:
    brightness: 0-100
    color: 0-100
    contrast: 0-100
    sharpness: 0-100
    tint: 0-100
    black_level: 0-100
    gamma: [native, s_gamma, g22, g24, d_image]

- id: color_temperature
  type: enum
  values: [user1, native, k10000, k9300, k7500, k6500, k5000, k4000, k3000, user2]

- id: color_parameters
  type: object
  description: "Reported via 0x37 Color Parameters Report; DATA[1..6] payload (see action notes for caveat)"
  fields:
    red_gain: 0-255
    green_gain: 0-255
    blue_gain: 0-255

- id: zoom_mode
  type: enum
  values: [ratio_4_3, custom, real, full, ratio_21_9]
  description: "Reported via 0x3B Zoom Mode Report; note 'Real' in report vs '1:1' in set"

- id: volume
  type: integer
  description: "0-100 (%) reported via 0x45 Volume Report"

- id: audio_parameters
  type: object
  description: "Reported via 0x43 Audio Parameters Report"
  fields:
    treble: 0-100
    bass: 0-100

- id: operating_hours
  type: integer
  description: "16-bit counter; DATA[1]=MSByte, DATA[2]=LSByte"

- id: serial_code
  type: string
  description: "14 ASCII characters; returned via 0x15 Serial Code Report"

- id: tiling_status
  type: object
  description: "Reported via 0x23 Tiling Report"
  fields:
    enable: [no, yes]
    frame_comp: [no, yes]
    position: 1-225
    v_h_monitors: "(V-1)*15 + H; each axis 1..15"

- id: model_number
  type: string
  description: "Up to 36 ASCII characters; requested via 0xA1 Monitor Information Get with item=0x00"

- id: firmware_version
  type: string
  description: "Requested via 0xA1 Monitor Information Get with item=0x01"

- id: build_date
  type: string
  description: "Requested via 0xA1 Monitor Information Get with item=0x02"
```

## Variables
```yaml
# All settable parameters are addressed via discrete set commands (power state,
# input source, video parameters, volume, color temperature, color parameters,
# zoom mode, audio parameters, cold start, locks, tiling). No free-standing
# variables beyond those.
```

## Events
```yaml
# Source does not document unsolicited notifications beyond the reply/report
# mechanism in section 6 (ACK/NAK/NAV reports and status reports). Treat all
# device-to-host traffic as response packets to host commands.
```

## Macros
```yaml
# Source does not define multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. The cold-start power state (0xA3) is the
# only behaviorally safety-relevant feature but it is operator-configurable,
# not a protective interlock.
```

## Notes
**Protocol family:** SICP binary protocol. Same packet format is used on RS-232 (DB9, null-modem) and on LAN TCP port 5000. All examples in the source use Display Address 0x01; substitute the desired monitor ID and recompute the trailing XOR checksum.

**Checksum:** Trailing byte = XOR of every preceding byte in the packet (Header through last Data byte). Range 0x00-0xFF.

**Command summary table mismatches:** The "Command Summary" at the end of the source swaps the codes for Input Source Set and Current Source Get vs. the body sections (11/12). The body sections are authoritative: 0xAC = Input Source Set, 0xAD = Current Source Get. The summary's Auto Signal Detecting entries (0xAF Get, 0xAE Set) have no corresponding body section — treat as named-only features.

**Tiling math:** Position 1-225 counted left-to-right, then top-to-bottom. Geometry byte = (V-1)·15 + H, with V and H each 1..15.

**Volume quirk:** Source section 15.1 notes "To mute the display, send Volume = 0. This command does not overwrite the system mute status." No separate Mute command is documented in this source.

**Volume Set example inconsistency:** The source's Volume Set example (section 15.3) shows Length=0x04 with two Data bytes, which conflicts with the packet-framing rule that Length = N+3 (where N=2 → Length=0x05). Other Set examples in the source follow the N+3 rule. The byte sequence `A6 01 00 00 00 04 01 44 4D 4D E7` is reproduced verbatim from the source; downstream implementers should verify on hardware.

**Color Parameters Set example:** The Set example shows six payload bytes (DATA[1]-DATA[6]) while the body table only defines three (R/G/B gain, DATA[1]-DATA[3]). The discrepancy is preserved verbatim; do not infer the extra bytes' meaning.

**Undocumented family suffix:** The user-supplied device name "SLxx64K" does not appear in the source. This spec covers the five VM55 models explicitly listed in the source header. If the SLxx64K family shares the SICP protocol, treat that as unverified and revise after running the verify-commands pipeline against an SLxx64K manual.

**No published firmware/version gating:** The 0xA1 Monitor Information Get sub-codes (Model Number, FW version, Build Date) imply version-dependent behavior, but the source does not document per-version command support.

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/m5fk5dtw/020-1359-03a_vm_series_rs232_manual-1.pdf
retrieved_at: 2026-04-30T04:27:29.643Z
last_checked_at: 2026-06-02T17:23:49.710Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:49.710Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions matched literally to source commands with correct opcodes; all transport parameters verified in source; bidirectional coverage at 0.969 ratio. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "SLxx64K family not documented in this source; spec covers VM55 variants only"
- "voltage, current, and power-draw specifications not stated in source"
- "firmware version compatibility not stated in source"
- "Auto Signal Detecting (0xAF Get, 0xAE Set) listed in summary table only; byte layout not documented"
- "source section 10.3 has no worked Set example"
- "0xAF listed in summary table only; byte-level layout not documented in source"
- "0xAE listed in summary table only; byte-level layout not documented in source"
- "source contains no safety warnings, interlock procedures, or"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
