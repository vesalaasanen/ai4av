---
spec_id: admin/philips-xxbdl4150d-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Philips xxBDL4150D Series Control Spec"
manufacturer: Philips
model_family: "xxBDL4150D Series (49BDL4150D / 55BDL4150D / 65BDL4150D / 75BDL4150D / 86BDL4150D / 98BDL4150D — Himalaya 2.0 platform)"
aliases: []
compatible_with:
  manufacturers:
    - Philips
  models:
    - "xxBDL4150D Series (49BDL4150D / 55BDL4150D / 65BDL4150D / 75BDL4150D / 86BDL4150D / 98BDL4150D — Himalaya 2.0 platform)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.xibo.org.uk
  - agneovo.com
  - digis.ru
  - github.com
  - keydigital.org
source_urls:
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.agneovo.com/wp-content/uploads/2021/07/PM-32_RS232_CommandList1.pdf
  - https://www.digis.ru/upload/iblock/bb4/SICP_application_note_v1.6.pdf
  - https://github.com/aolde/philips-signage-display-sicp
  - https://www.keydigital.org/web/content/160298/ModuleMa.pdf
retrieved_at: 2026-06-15T22:29:59.426Z
last_checked_at: 2026-06-16T07:14:07.236Z
generated_at: 2026-06-16T07:14:07.236Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility ranges not stated in source. Many commands carry platform-specific notes (Himalaya 1.0/1.2, Dragon 1.x, Eagle, Phoenix, QL3, Challenger 2.1); per-model applicability to xxBDL4150D (Himalaya 2.0) not always explicit — see Notes."
  - "none - source contains no event/notification section."
  - "source documents no named multi-step sequences."
  - "source contains no explicit safety interlock procedures, voltage/current"
  - "firmware version compatibility not stated in source."
  - "exact per-model command applicability for xxBDL4150D variants (49/55/65/75/86/98 inch) not enumerated."
  - "any commands introduced after SICP V2.03 (23/Nov/2018) are not covered."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:14:07.236Z
  matched_actions: 119
  action_count: 119
  confidence: medium
  summary: "All 119 spec actions confirmed verbatim by source opcodes and transport parameters fully supported by SICP V2.03 documentation. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Philips xxBDL4150D Series Control Spec

## Summary
Philips Professional Signage Displays of the xxBDL4150D Series (Himalaya 2.0 platform) controlled via the SICP V2.03 (Serial/Ethernet Interface Communication Protocol). Transport is RS-232C or TCP/IP (port 5000). Commands are binary packets `MsgSize Control Group Data[0..N] Checksum` where `Data[0]` is the opcode; the display replies with ACK (0x06), NACK (0x15), or NAV (0x18). This spec enumerates all documented Set and Get/Report commands.

<!-- UNRESOLVED: firmware version compatibility ranges not stated in source. Many commands carry platform-specific notes (Himalaya 1.0/1.2, Dragon 1.x, Eagle, Phoenix, QL3, Challenger 2.1); per-model applicability to xxBDL4150D (Himalaya 2.0) not always explicit — see Notes. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 5000  # TCP/IP port 5000 used by default for control in all displays
serial:
  baud_rate: 9600   # default; supported: 1200, 2400, 4800, 9600, 19200, 38400, 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

Packet framing (applies to both transports):
- Byte 1 `MsgSize` = total message length, range 0x03–0x28.
- Byte 2 `Control` = Monitor ID (1–255 signal mode; 0 = broadcast, no ACK).
- Byte 3 `Group` = Group ID (0 = no group / broadcast; 1–254 = control by group; omitted when group is off).
- Bytes 4..N `Data[0..N]` = payload; `Data[0]` is the command opcode.
- Last byte `Checksum` = XOR of all preceding bytes.
- Reply after each command within 500 ms; ACK `06 01 00 00 06 00`, NACK `06 01 00 00 15 12`, NAV `06 01 00 00 18 1F` (address 01). Get commands are answered with a Report packet, not an ACK.

## Traits
```yaml
traits:
  - powerable       # inferred: power on/off commands present (0x18/0x19)
  - queryable       # inferred: many Get/Report query commands present
  - levelable       # inferred: volume / brightness / contrast / color gain commands present
  - routable        # inferred: input source select + PIP/tiling routing commands present
```

## Actions
```yaml
# Packet layout for every action: MsgSize Control Group Data[0] [Data[1..N]] Checksum.
# Examples below use Control=0x01 (Monitor ID 1) and Group=0x00 (no group) - verbatim from source.
# Parameterized actions show {var} placeholders; checksum must be recomputed for each value.
# Source: SICP V2.03. All opcodes are the literal Data[0] byte.

# ---------- Communication / System ----------
- id: comm_control_report
  label: Communication Control Report (ACK/NACK/NAV)
  kind: feedback
  command: "06 01 00 00 {status} {checksum}"   # status: 0x06 ACK / 0x15 NACK / 0x18 NAV
  params:
    - name: status
      type: integer
      description: "0x06=ACK, 0x15=NACK, 0x18=NAV"
  notes: Generic report returned after Get/Set.

- id: get_platform_version
  label: Get Platform and Version Labels
  kind: query
  command: "06 01 00 A2 {label} {checksum}"     # label: 0x00 SICP ver / 0x01 platform label / 0x02 platform version
  params:
    - name: label
      type: integer
      description: "0x00=SICP impl version, 0x01=platform label, 0x02=platform version"
  notes: Report DATA[0]=0xA2, DATA[1..N]=ASCII chars (≤36).

- id: get_model_fw_date
  label: Get Model Number, FW Version, Build Date
  kind: query
  command: "06 01 00 A1 {item} {checksum}"      # item: 0x00 Model / 0x01 FW / 0x02 Build Date / 0x03 Android FW
  params:
    - name: item
      type: integer
      description: "0x00=Model Number, 0x01=FW version, 0x02=Build Date, 0x03=Android FW build"
  notes: Report DATA[0]=0xA1, DATA[1..N]=ASCII chars (≤36).

- id: set_monitor_restart
  label: Monitor Restart
  kind: action
  command: "06 01 00 57 {target} {checksum}"    # 0x00=Android, 0x01=Scalar
  params:
    - name: target
      type: integer
      description: "0x00=Android, 0x01=Scalar"
  notes: Only on Android monitors (Himalaya 2 / Dragon 2 / future).

- id: set_factory_reset
  label: Factory Reset
  kind: action
  command: "05 01 00 56 52"
  params: []
  notes: Resets all configurable parameters listed in section 7.18.

- id: set_screenshot_email
  label: Take Screenshot and Email
  kind: action
  command: "05 01 00 58 5C"
  params: []
  notes: Android monitors only (Himalaya 2 / Dragon 2). Saves {yyyy-MM-dd-HH-mm-ss}.png.

- id: set_monitor_id
  label: Set Monitor ID
  kind: action
  command: "06 {old_id} 00 69 {new_id} {checksum}"
  params:
    - name: old_id
      type: integer
      description: Current monitor ID (Control byte), 1-254
    - name: new_id
      type: integer
      description: New monitor ID, 0x01-0xFE (1-254)

- id: set_group_id
  label: Set Group ID
  kind: action
  command: "06 01 00 5C {group_id} {checksum}"  # 0x01-0xFE = 1-254; 0xFF = Off (legacy)
  params:
    - name: group_id
      type: integer
      description: "1-254 = group; 0xFF = off (legacy)"

- id: get_group_id
  label: Get Group ID
  kind: query
  command: "05 01 00 5D 59"
  params: []

- id: anytile_set_group_monitor_id
  label: AnyTile Set Group ID and Monitor ID (IP only)
  kind: action
  command: "06 01 00 C0 {monitor_id} {group_id} {checksum}"
  params:
    - name: monitor_id
      type: integer
    - name: group_id
      type: integer
  notes: Works only via IP connection, not RS-232.

- id: set_display_monitor_id_osd
  label: Display Monitor ID on Screen (Set)
  kind: action
  command: "06 01 00 4C {enable} {checksum}"    # 0x01=show, 0x00=hide (per source table)
  params:
    - name: enable
      type: integer
      description: "0x01=show monitor ID, 0x00=hide"

# ---------- Power ----------
- id: set_power
  label: Set Power State
  kind: action
  command: "06 01 00 18 {state} {checksum}"     # 0x01=Off, 0x02=On
  params:
    - name: state
      type: integer
      description: "0x01=Power Off, 0x02=On"
  traits: [powerable]

- id: get_power
  label: Get Power State
  kind: query
  command: "05 01 00 19 1D"
  params: []
  notes: Report DATA[1]: 0x01=Off, 0x02=On.

- id: set_power_cold_start
  label: Set Power State at Cold Start
  kind: action
  command: "06 01 00 A3 {state} {checksum}"     # 0x00=Off, 0x01=Forced On, 0x02=Last Status
  params:
    - name: state
      type: integer
      description: "0x00=Off, 0x01=Forced On, 0x02=Last Status"

- id: get_power_cold_start
  label: Get Power State at Cold Start
  kind: query
  command: "05 01 00 A4 A0"
  params: []

- id: set_apm
  label: Set APM (Advanced Power Management) Status
  kind: action
  command: "06 01 00 D0 {mode} {checksum}"      # 0x00=Off, 0x01=On, 0x02=Mode1 (TCP off/WOL on), 0x03=Mode2 (TCP on/WOL off)
  params:
    - name: mode
      type: integer
      description: "0x00=Off, 0x01=On, 0x02=Mode1, 0x03=Mode2"
  notes: Himalaya supports off/Mode1/Mode2 only.

- id: get_apm
  label: Get APM Status
  kind: query
  command: "05 01 00 D1 D5"
  params: []

- id: set_power_saving_mode
  label: Set Power Saving Mode
  kind: action
  command: "06 01 00 D2 {mode} {checksum}"      # 0x00-0x07 (see notes)
  params:
    - name: mode
      type: integer
      description: "0x00=RGB off & Video off, 0x01=RGB off Video on, 0x02=RGB on Video off, 0x03=both on, 0x04-0x07=modes 1-4"

- id: get_power_saving_mode
  label: Get Power Saving Mode
  kind: query
  command: "05 01 00 D3 D7"
  params: []

- id: set_smart_power
  label: Set Smart Power (Backlight Dimming)
  kind: action
  command: "06 01 00 DD {level} {checksum}"     # 0x00=Off, 0x01=Low, 0x02=Medium, 0x03=High
  params:
    - name: level
      type: integer
      description: "0x00=Off, 0x01=Low, 0x02=Medium, 0x03=High"

- id: get_smart_power
  label: Get Smart Power
  kind: query
  command: "05 01 00 DE DA"
  params: []

- id: set_eco_mode
  label: Set ECO Mode
  kind: action
  command: "06 01 00 64 {mode} {checksum}"      # 0x00=low power standby, 0x01=normal
  params:
    - name: mode
      type: integer
      description: "0x00=low power standby, 0x01=normal"
  notes: Phoenix 1 & 2 platform only.

- id: get_eco_mode
  label: Get ECO Mode
  kind: query
  command: "05 01 00 63 67"
  params: []

- id: set_off_timer
  label: Set Off Timer
  kind: action
  command: "06 01 00 92 {hours} {checksum}"     # 0x00=Off, 0x01-0x18 = 1-24 hours
  params:
    - name: hours
      type: integer
      description: "0=Off, 1-24 hours"

- id: get_off_timer
  label: Get Off Timer
  kind: query
  command: "05 01 00 91 95"
  params: []

- id: set_backlight
  label: Set Backlight (Picture Mute)
  kind: action
  command: "06 01 00 72 {state} {checksum}"     # 0x00=on, 0x01=off
  params:
    - name: state
      type: integer
      description: "0x00=backlight on, 0x01=backlight off (audio unaffected)"

- id: get_backlight
  label: Get Backlight (Picture Mute) Status
  kind: query
  command: "05 01 00 71 50"
  params: []
  notes: Report 06 01 00 71 00 76 = on; 06 01 00 71 01 77 = off.

# ---------- Lock / Input Control ----------
- id: set_ir_lock
  label: Set IR Remote Control Lock
  kind: action
  command: "06 01 00 1C {state} {checksum}"     # 0x01 Unlock all / 0x02 Lock all / 0x03 Lock all but Power / 0x04 Lock all but Volume / 0x05 Primary / 0x06 Secondary / 0x07 Lock all except Power & Volume
  params:
    - name: state
      type: integer
      description: "0x01=Unlock all, 0x02=Lock all, 0x03=Lock all but Power, 0x04=Lock all but Volume, 0x05=Primary, 0x06=Secondary, 0x07=Lock all except Power & Volume"

- id: get_ir_lock
  label: Get IR Remote Control Lock
  kind: query
  command: "05 01 00 1D 19"
  params: []

- id: set_keypad_lock
  label: Set Keypad Lock
  kind: action
  command: "06 01 00 1A {state} {checksum}"     # 0x01 Unlock all / 0x02 Lock all / 0x03 Lock all but Power / 0x04 Lock all but Volume / 0x07 Lock all except Power & Volume
  params:
    - name: state
      type: integer
      description: "0x01=Unlock all, 0x02=Lock all, 0x03=Lock all but Power, 0x04=Lock all but Volume, 0x07=Lock all except Power & Volume"

- id: get_keypad_lock
  label: Get Keypad Lock
  kind: query
  command: "05 01 00 1B 1F"
  params: []

- id: set_external_storage_lock
  label: Set MicroSD and USB Ports Lock
  kind: action
  command: "06 01 00 F1 {state} {checksum}"     # 0x00=unlocked, 0x01=Locked
  params:
    - name: state
      type: integer
      description: "0x00=unlocked, 0x01=locked"
  notes: Locks/unlocks all MicroSD + USB-A + microUSB ports at once. 10BDL3051T / Dragon 1.x / 1.6 / QL3.

- id: get_external_storage_lock
  label: Get MicroSD and USB Ports Lock
  kind: query
  command: "05 01 00 F2 F6"
  params: []

# ---------- Input Source / Failover ----------
- id: set_input_source
  label: Set Input Source
  kind: action
  command: "09 01 00 AC {source} {playlist} {osd_style} {mute_style} {checksum}"
  params:
    - name: source
      type: integer
      description: "0x01=VIDEO, 0x02=S-VIDEO, 0x03=COMPONENT, 0x05=VGA, 0x06=HDMI2, 0x07=DP2, 0x08=USB2, 0x09=DVI-D, 0x0A=DP1, 0x0B=OPS, 0x0C=USB, 0x0D=HDMI, 0x0E=DVI-D, 0x0F=HDMI3, 0x10=BROWSER, 0x11=SMARTCMS, 0x12=DMS, 0x13=INTERNAL STORAGE, 0x16=Media Player, 0x17=PDF Player, 0x18=Custom, 0x19=HDMI4, 0x1A=VGA2, 0x1B=VGA3, 0x1C=IWB"
    - name: playlist
      type: integer
      description: "Playlist/URL number (1-7) for Media/PDF/Browser; 0 otherwise"
    - name: osd_style
      type: integer
      description: "Bit6=do-not-switch flag, Bits2..0=source display style (1=label)"
    - name: mute_style
      type: integer
      description: "Reserved bits, default 0x00"
  traits: [routable]
  notes: Minimal form is "09 01 00 AC {source} 09 01 00 {checksum}".

- id: get_current_source
  label: Get Current Input Source
  kind: query
  command: "05 01 00 AD A9"
  params: []

- id: set_auto_signal_detecting
  label: Set Auto Signal Detecting
  kind: action
  command: "06 01 00 AE {mode} {checksum}"      # 0x00=Off, 0x01=All, 0x03=PC sources only, 0x04=Video sources only, 0x05=Failover
  params:
    - name: mode
      type: integer
      description: "0x00=Off, 0x01=All, 0x03=PC only, 0x04=Video only, 0x05=Failover"

- id: get_auto_signal_detecting
  label: Get Auto Signal Detecting
  kind: query
  command: "05 01 00 AF AB"
  params: []

- id: set_failover_priority
  label: Set Failover Priority List
  kind: action
  command: "0D 01 00 A5 {p1} {p2} {p3} {p4} {p5} {p6} {p7} {p8} {p9} {p10} {p11} {p12} {p13} {checksum}"
  params:
    - name: p1
      type: integer
      description: 1st priority source (0x00=HDMI … 0x16=IWB)
  notes: Up to 14 priority slots; each value uses the source-type table.

- id: get_failover_priority
  label: Get Failover Priority List
  kind: query
  command: "05 01 00 A6 A2"
  params: []

# ---------- Video / Picture ----------
- id: set_video_parameters
  label: Set Video Parameters
  kind: action
  command: "0C 01 00 32 {brightness} {color} {contrast} {sharpness} {tint} {black_level} {gamma} {checksum}"
  params:
    - name: brightness
      type: integer
      description: "0-100 (%)"
    - name: color
      type: integer
      description: "0-100 (%)"
    - name: contrast
      type: integer
      description: "0-100 (%)"
    - name: sharpness
      type: integer
      description: "0-100 (%)"
    - name: tint
      type: integer
      description: "0-100 (%)"
    - name: black_level
      type: integer
      description: "0-100 (%)"
    - name: gamma
      type: integer
      description: "0x01=Native, 0x02=S gamma, 0x03=2.2, 0x04=2.4, 0x05=D-image (DICOM)"
  traits: [levelable]
  notes: Not on QL3 platform for browser/PDF/media/CMND&play/installed apk sources.

- id: get_video_parameters
  label: Get Video Parameters
  kind: query
  command: "05 01 00 33 37"
  params: []

- id: set_color_temperature
  label: Set Color Temperature Preset
  kind: action
  command: "06 01 00 34 {preset} {checksum}"    # 0x00 User1 / 0x01 Native / 0x03 10000K … 0x12 User2 (see notes)
  params:
    - name: preset
      type: integer
      description: "0x00=User1, 0x01=Native, 0x03=10000K, 0x04=9300K, 0x05=7500K, 0x06=6500K, 0x09=5000K, 0x0A=4000K, 0x0D=3000K, 0x12=User2"

- id: get_color_temperature
  label: Get Color Temperature Preset
  kind: query
  command: "05 01 00 35 31"
  params: []

- id: set_color_temperature_100k
  label: Set Color Temperature 100K Steps
  kind: action
  command: "06 01 00 11 {steps} {checksum}"     # 0x14(20)=2000K … 0x64(100)=10000K
  params:
    - name: steps
      type: integer
      description: "20-100 (0x14-0x64), step=100K"

- id: get_color_temperature_100k
  label: Get Color Temperature 100K Steps
  kind: query
  command: "05 01 00 12 16"
  params: []

- id: set_rgb_parameters
  label: Set RGB Gain/Offset
  kind: action
  command: "0B 01 00 36 {r_gain} {g_gain} {b_gain} {r_offset} {g_offset} {b_offset} {checksum}"
  params:
    - name: r_gain
      type: integer
      description: "0-255"
    - name: g_gain
      type: integer
      description: "0-255"
    - name: b_gain
      type: integer
      description: "0-255"
    - name: r_offset
      type: integer
      description: "0-255"
    - name: g_offset
      type: integer
      description: "0-255"
    - name: b_offset
      type: integer
      description: "0-255"

- id: get_rgb_parameters
  label: Get RGB Gain/Offset
  kind: query
  command: "05 01 00 37 33"
  params: []

- id: set_vga_video_parameters
  label: Set VGA Video Parameters
  kind: action
  command: "09 01 00 38 {clock} {phase} {h_pos} {v_pos} {checksum}"
  params:
    - name: clock
      type: integer
      description: "0-100 (%)"
    - name: phase
      type: integer
      description: "0-100 (%)"
    - name: h_pos
      type: integer
      description: "0-100 (%)"
    - name: v_pos
      type: integer
      description: "0-100 (%)"

- id: get_vga_video_parameters
  label: Get VGA Video Parameters
  kind: query
  command: "05 01 00 39 3D"
  params: []

- id: set_picture_format
  label: Set Picture Format
  kind: action
  command: "06 01 00 3A {format} {checksum}"    # 0x00 Normal / 0x01 Custom / 0x02 Real / 0x03 Full / 0x04 21:9 / 0x05 Dynamic / 0x06 16:9
  params:
    - name: format
      type: integer
      description: "0x00=Normal, 0x01=Custom, 0x02=Real, 0x03=Full, 0x04=21:9, 0x05=Dynamic, 0x06=16:9"

- id: get_picture_format
  label: Get Picture Format
  kind: query
  command: "05 01 00 3B 3F"
  params: []

- id: set_picture_style
  label: Set Picture Style
  kind: action
  command: "06 01 00 66 {style} {checksum}"     # 0x00 Highbright / 0x01 sRGB / 0x02 Vivid / 0x03 Natural / 0x04 Standard / 0x05 Video / 0x06 Static Signage / 0x07 Text / 0x08 Energy saving / 0x09 Soft / 0x0A User
  params:
    - name: style
      type: integer
      description: "0x00=Highbright, 0x01=sRGB, 0x02=Vivid, 0x03=Natural, 0x04=Standard, 0x05=Video, 0x06=Static Signage, 0x07=Text, 0x08=Energy saving, 0x09=Soft, 0x0A=User"
  notes: Phoenix 1 & 2 platform only.

- id: get_picture_style
  label: Get Picture Style
  kind: query
  command: "05 01 00 65 61"
  params: []

- id: set_pip
  label: Set Picture-in-Picture
  kind: action
  command: "09 01 00 3C {pip_mode} {position} 00 00 {checksum}"
  params:
    - name: pip_mode
      type: integer
      description: "0x00=Off, 0x01=PIP, 0x02=POP, 0x03=Quick swap, 0x04=PBP 2win, 0x05=PBP 3win, 0x06=PBP 4win, 0x07=PBP 3win-1, 0x08=PBP 3win-2, 0x09=PBP 4win-1, 0x0A=SICP (Custom)"
    - name: position
      type: integer
      description: "0x00-0x04 PIP window position"

- id: get_pip
  label: Get Picture-in-Picture
  kind: query
  command: "05 01 00 3D 39"
  params: []

- id: set_pip_source
  label: Set PIP Source
  kind: action
  command: "09 01 00 84 FD {q2} {q3} {q4} {checksum}"   # source-type 0xFD = input source
  params:
    - name: q2
      type: integer
      description: Q2 source number (source-type table)
    - name: q3
      type: integer
      description: Q3 source number
    - name: q4
      type: integer
      description: Q4 source number
  notes: Minimal form "07 01 00 84 FD {src} {checksum}".

- id: get_pip_source
  label: Get PIP Source
  kind: query
  command: "05 01 00 85 81"
  params: []

- id: set_scan_mode
  label: Set Scan Mode (Over/Under scan)
  kind: action
  command: "06 01 00 50 {mode} {checksum}"      # 0x00=Over scan, 0x01=Under scan, 0x02=Off, 0x03-0x1C=0-25 (challenger 2.1)
  params:
    - name: mode
      type: integer
      description: "0x00=Over scan, 0x01=Under scan, 0x02=Off"

- id: get_scan_mode
  label: Get Scan Mode
  kind: query
  command: "05 01 00 51 55"
  params: []

- id: set_scan_conversion
  label: Set Scan Conversion (Progressive/Interlace)
  kind: action
  command: "06 01 00 52 {mode} {checksum}"      # 0x00=Progressive, 0x01=Interlace
  params:
    - name: mode
      type: integer
      description: "0x00=Progressive, 0x01=Interlace"
  notes: Not on Himalaya 1.0/1.2, Dragon 1.x/1.6.

- id: get_scan_conversion
  label: Get Scan Conversion
  kind: query
  command: "05 01 00 53 57"
  params: []

- id: set_noise_reduction
  label: Set Noise Reduction
  kind: action
  command: "06 01 00 2A {level} {checksum}"     # 0x00 Off / 0x01 Low / 0x02 Middle / 0x03 High / 0x04 default
  params:
    - name: level
      type: integer
      description: "0x00=Off, 0x01=Low, 0x02=Middle, 0x03=High, 0x04=default"

- id: get_noise_reduction
  label: Get Noise Reduction
  kind: query
  command: "05 01 00 2B 2F"
  params: []

- id: set_memc_effect
  label: Set MEMC Effect
  kind: action
  command: "06 01 00 28 {level} {checksum}"     # 0x00 Off / 0x01 Low / 0x02 Medium / 0x03 High
  params:
    - name: level
      type: integer
      description: "0x00=Off, 0x01=Low, 0x02=Medium, 0x03=High"
  notes: Not on Himalaya 1.0/1.2, Dragon 1.x/1.6.

- id: get_memc_effect
  label: Get MEMC Effect
  kind: query
  command: "05 01 00 29 2D"
  params: []

- id: set_pixel_shift
  label: Set Pixel Shift
  kind: action
  command: "06 01 00 B2 {interval} {checksum}"  # 0x00=Off, 0x01=10s … 0x5A=900s, 0x5B=AUTO
  params:
    - name: interval
      type: integer
      description: "0=Off, 1=10s … 90=900s, 0x5B=AUTO"
  notes: Dragon 1.0/1.5 only.

- id: get_pixel_shift
  label: Get Pixel Shift
  kind: query
  command: "05 01 00 B1 B5"
  params: []

- id: set_auto_adjust
  label: VGA Auto Adjust
  kind: action
  command: "07 01 00 70 40 00 36"
  params: []

- id: set_display_orientation
  label: Set Display Orientation
  kind: action
  command: "0C 01 00 17 {auto_rotate} {osd_rotation} {image_all} {win1} {win2} {win3} {win4} {checksum}"
  params:
    - name: auto_rotate
      type: integer
      description: "0x00=Off, 0x01=On (Dragon 1/1.5 only)"
    - name: osd_rotation
      type: integer
      description: "0x00=Landscape, 0x01=Portrait"
    - name: image_all
      type: integer
      description: "0x00=Off, 0x01=On, 0x02=On CW (CRD50), 0x03=On CCW (CRD50)"
    - name: win1
      type: integer
      description: "0x00=Off, 0x01=On"
    - name: win2
      type: integer
      description: "0x00=Off, 0x01=On"
    - name: win3
      type: integer
      description: "0x00=Off, 0x01=On"
    - name: win4
      type: integer
      description: "0x00=Off, 0x01=On"
  notes: Himalaya 2.0 supports OSD Rotation (DATA[2]) and main-window image rotation (DATA[4]) only.

- id: get_display_orientation
  label: Get Display Orientation
  kind: query
  command: "05 01 00 16 12"
  params: []

- id: set_osd_rotating
  label: Set OSD Rotating
  kind: action
  command: "06 01 00 26 {state} {checksum}"     # 0x00=Off, 0x01=On
  params:
    - name: state
      type: integer
      description: "0x00=Off, 0x01=On"

- id: get_osd_rotating
  label: Get OSD Rotating
  kind: query
  command: "05 01 00 27 23"
  params: []

- id: set_information_osd
  label: Set Information OSD Feature
  kind: action
  command: "06 01 00 2C {timeout} {checksum}"   # 0x00=Off, 0x01-0x3C=1-60 sec
  params:
    - name: timeout
      type: integer
      description: "0=Off, 1-60 seconds"

- id: get_information_osd
  label: Get Information OSD Feature
  kind: query
  command: "05 01 00 2D 29"
  params: []

- id: set_touch_feature
  label: Set Touch Feature
  kind: action
  command: "06 01 00 1E {state} {checksum}"     # 0x00=Off, 0x01=On
  params:
    - name: state
      type: integer
      description: "0x00=Off, 0x01=On"
  notes: Not on Himalaya 1.0/1.2, Dragon 1.x/2.0.

- id: get_touch_feature
  label: Get Touch Feature
  kind: query
  command: "05 01 00 1F 1B"
  params: []

- id: set_power_on_logo
  label: Set Power On Logo
  kind: action
  command: "06 01 00 3E {state} {checksum}"     # 0x00=Off, 0x01=On, 0x02=User
  params:
    - name: state
      type: integer
      description: "0x00=Off, 0x01=On, 0x02=User"

- id: get_power_on_logo
  label: Get Power On Logo Status
  kind: query
  command: "05 01 00 3F 3B"
  params: []

# ---------- Audio ----------
- id: set_volume
  label: Set Volume (Speaker + Audio Out)
  kind: action
  command: "07 01 00 44 {speaker} {audio_out} {checksum}"
  params:
    - name: speaker
      type: integer
      description: "0-100 (%) speaker out"
    - name: audio_out
      type: integer
      description: "0-100 (%) variable audio out"
  traits: [levelable]
  notes: Platforms without variable audio out (Himalaya 1/1.2, Eagle) omit DATA[2]: "06 01 00 44 {speaker} {checksum}".

- id: get_volume
  label: Get Volume
  kind: query
  command: "05 01 00 45 41"
  params: []

- id: set_volume_step
  label: Set Volume Step Up/Down
  kind: action
  command: "07 01 00 41 {speaker_dir} {audio_dir} {checksum}"   # 0=down, 1=up, 2=no change
  params:
    - name: speaker_dir
      type: integer
      description: "0=down, 1=up, 2=no change"
    - name: audio_dir
      type: integer
      description: "0=down, 1=up, 2=no change"

- id: set_volume_mute
  label: Set Volume Mute
  kind: action
  command: "06 01 00 47 {state} {checksum}"     # 0x00=mute off, 0x01=mute on
  params:
    - name: state
      type: integer
      description: "0x00=off, 0x01=on"

- id: get_volume_mute
  label: Get Volume Mute
  kind: query
  command: "05 01 00 46 42"
  params: []

- id: set_audio_parameters
  label: Set Audio Parameters (Treble/Bass)
  kind: action
  command: "07 01 00 42 {treble} {bass} {checksum}"
  params:
    - name: treble
      type: integer
      description: "0-100 (%) [Phoenix 2.0: -8..8, two's-complement]"
    - name: bass
      type: integer
      description: "0-100 (%) [Phoenix 2.0: -8..8, two's-complement]"

- id: get_audio_parameters
  label: Get Audio Parameters
  kind: query
  command: "05 01 00 43 47"
  params: []

- id: set_volume_limit_speaker
  label: Set Volume Limits Speaker Out
  kind: action
  command: "08 01 00 B8 {min} {max} {switch_on} {checksum}"
  params:
    - name: min
      type: integer
      description: "0-100 (%) minimum"
    - name: max
      type: integer
      description: "0-100 (%) maximum"
    - name: switch_on
      type: integer
      description: "0-100 (%) switch-on volume"
  notes: Constraint: min <= switch_on <= max.

- id: get_volume_limit_speaker
  label: Get Volume Limits Speaker Out
  kind: query
  command: "05 01 00 B6 B2"
  params: []

- id: set_volume_limit_audio
  label: Set Volume Limits Audio Out
  kind: action
  command: "08 01 00 B9 {min} {max} {switch_on} {checksum}"
  params:
    - name: min
      type: integer
      description: "0-100 (%) minimum"
    - name: max
      type: integer
      description: "0-100 (%) maximum"
    - name: switch_on
      type: integer
      description: "0-100 (%) switch-on volume"

- id: get_volume_limit_audio
  label: Get Volume Limits Audio Out
  kind: query
  command: "05 01 00 B7 B3"
  params: []

# ---------- Sensors / Environment ----------
- id: get_temperature
  label: Get Temperature Sensor
  kind: query
  command: "05 01 00 2F 2B"
  params: []
  notes: Report DATA[1]/DATA[2] = sensors 1/2 in °C (±3°C). Dragon 1.0/2.0 only returns DATA[1].

- id: set_light_sensor
  label: Set Light Sensor
  kind: action
  command: "06 01 00 24 {state} {checksum}"     # 0x00=Off, 0x01=On
  params:
    - name: state
      type: integer
      description: "0x00=Off, 0x01=On"

- id: get_light_sensor
  label: Get Light Sensor
  kind: query
  command: "05 01 00 25 21"
  params: []

- id: set_human_sensor
  label: Set Human Sensor (CRD41)
  kind: action
  command: "06 01 00 B4 {timeout} {checksum}"   # 0x00=Off, 0x01=10min … 0x06=60min
  params:
    - name: timeout
      type: integer
      description: "0=Off, 1-6 = 10-60 minutes"

- id: get_human_sensor
  label: Get Human Sensor
  kind: query
  command: "05 01 00 B3 B7"
  params: []

- id: set_fan_speed
  label: Set Fan Speed
  kind: action
  command: "06 01 00 61 {level} {checksum}"     # 0x00=Off, 0x01=Auto, 0x02=Low, 0x03=Middle, 0x04=High
  params:
    - name: level
      type: integer
      description: "0x00=Off, 0x01=Auto, 0x02=Low, 0x03=Middle, 0x04=High"
  notes: Not on Dragon 1.x/1.6.

- id: get_fan_speed
  label: Get Fan Speed
  kind: query
  command: "05 01 00 62 66"
  params: []

- id: get_video_signal_present
  label: Get Video Signal Present
  kind: query
  command: "05 01 00 59 5D"
  params: []
  notes: Report DATA[1]: 0x00=not present, 0x01=present.

- id: get_serial_code
  label: Get Serial Code
  kind: query
  command: "05 01 00 15 11"
  params: []
  notes: Report DATA[1..14] = 14 ASCII characters.

- id: get_operating_hours
  label: Get Operating Hours
  kind: query
  command: "06 01 00 0F 02 0A"
  params: []
  notes: Report DATA[1]=MSB, DATA[2]=LSB (16-bit hours).

# ---------- Tiling / Video Wall ----------
- id: set_tiling
  label: Set Tiling
  kind: action
  command: "09 01 00 22 {enable} {frame_comp} {position} {h_v_monitors} {checksum}"
  params:
    - name: enable
      type: integer
      description: "0x00=No, 0x01=Yes"
    - name: frame_comp
      type: integer
      description: "0x00=No, 0x01=Yes, 0x02=don't overwrite"
    - name: position
      type: integer
      description: "Tile position (1-25, or 1-150 for Zero Bezel)"
    - name: h_v_monitors
      type: integer
      description: "Encoded H×V monitors per Note 2"

- id: get_tiling
  label: Get Tiling
  kind: query
  command: "05 01 00 23 27"
  params: []

- id: set_switch_on_delay
  label: Set Switch On Delay (Tiling)
  kind: action
  command: "06 01 00 54 {delay} {checksum}"     # 0x00=Off, 0x01=Auto, 0x02=2s … 0xFF=255s
  params:
    - name: delay
      type: integer
      description: "0=Off, 1=Auto, 2-255 = seconds"

- id: get_switch_on_delay
  label: Get Switch On Delay (Tiling)
  kind: query
  command: "05 01 00 55 51"
  params: []

- id: set_frame_comp_horz
  label: Set Horizontal Frame Compensation
  kind: action
  command: "06 01 00 5F {value} {checksum}"     # 0x00-0xFF
  params:
    - name: value
      type: integer
      description: "0-255"

- id: get_frame_comp_horz
  label: Get Horizontal Frame Compensation
  kind: query
  command: "05 01 00 5E 5A"
  params: []

- id: set_frame_comp_vert
  label: Set Vertical Frame Compensation
  kind: action
  command: "06 01 00 68 {value} {checksum}"     # 0x00-0xFF
  params:
    - name: value
      type: integer
      description: "0-255"

- id: get_frame_comp_vert
  label: Get Vertical Frame Compensation
  kind: query
  command: "05 01 00 67 63"
  params: []

# ---------- AnyTile (Custom Tiling) ----------
- id: set_custom_tiling
  label: Set Custom Tiling (AnyTile)
  kind: action
  command: "10 01 00 4B {enable} {rot_lsb} {rot_msb} {h_start_lsb} {h_start_msb} {v_start_lsb} {v_start_msb} {h_size_lsb} {h_size_msb} {v_size_lsb} {v_size_msb} {checksum}"
  params:
    - name: enable
      type: integer
      description: "0x00=No, 0x01=Yes"
  notes: Dragon 1.x/1.6/Himalaya 2.0 only; canvas tiling must be activated in admin menu.

- id: get_custom_tiling
  label: Get Custom Tiling (AnyTile)
  kind: query
  command: "05 01 00 4A 4E"
  params: []

- id: set_resolution_mode
  label: Set Resolution Input Mode
  kind: action
  command: "06 01 00 4F {mode} {checksum}"      # 0x00=default, 0x01=FHD, 0x02=UHD4K
  params:
    - name: mode
      type: integer
      description: "0x00=default, 0x01=FHD, 0x02=UHD4K"

- id: get_resolution_mode
  label: Get Resolution Input Mode
  kind: query
  command: "05 01 00 4E 4A"
  params: []

# ---------- Custom Multi-Window ----------
- id: set_custom_multiwin_execute
  label: Execute Custom Multi-Window
  kind: action
  command: "07 01 00 FB {switch} {windows} {checksum}"   # switch: 0x00=OFF, 0x01=ON; windows: 0x00-0x03
  params:
    - name: switch
      type: integer
      description: "0x00=OFF, 0x01=ON"
    - name: windows
      type: integer
      description: "0x00=1 window, 0x01=2, 0x02=3, 0x03=4"

- id: set_custom_multiwin_window
  label: Set Custom Multi-Window Window
  kind: action
  command: "10 01 00 FC {window} {rotation} {x_h} {x_l} {y_h} {y_l} {w_h} {w_l} {h_h} {h_l} {picture_format} {checksum}"
  params:
    - name: window
      type: integer
      description: "0x00=Main, 0x01=Sub1, 0x02=Sub2, 0x03=Sub3"
    - name: rotation
      type: integer
      description: "0x00=NONE, 0x01=90, 0x02=270, 0x03=H_MIRROR, 0x04=V_MIRROR, 0x05=HV_MIRROR"
    - name: picture_format
      type: integer
      description: "0x00=Normal, 0x01=Custom, 0x02=Real, 0x03=Full, 0x04=21:9, 0x05=Dynamic, 0x06=16:9, 0xFF=keep"

- id: get_custom_multiwin_window
  label: Get Custom Multi-Window Window
  kind: query
  command: "06 01 00 FD {window} {checksum}"    # window: 0x00=Main … 0x03=Sub3
  params:
    - name: window
      type: integer
      description: "0x00=Main, 0x01=Sub1, 0x02=Sub2, 0x03=Sub3"

# ---------- Scheduling ----------
- id: set_scheduling
  label: Set Scheduling Page
  kind: action
  command: "0C 01 00 5A {page} {start_h} {start_m} {end_h} {end_m} {video_source} {working_days} {tag} {checksum}"
  params:
    - name: page
      type: integer
      description: "Bits7..4=1-7 page, Bits3..0=0 disable / 1 enable"
    - name: start_h
      type: integer
      description: "0-23, 24=NULL"
    - name: start_m
      type: integer
      description: "0-59, 60=NULL"
    - name: end_h
      type: integer
      description: "0-23, 24=NULL"
    - name: end_m
      type: integer
      description: "0-59, 60=NULL"
    - name: video_source
      type: integer
      description: "Source-type table value (0x00=NULL, 0x0D=HDMI, etc.)"
    - name: working_days
      type: integer
      description: "Bit0=every week, Bit1=Mon … Bit7=Sun"
    - name: tag
      type: integer
      description: "0x01-0x07 = playlist/bookmark/file tag 1-7 (Dragon/Himalaya 2.0)"

- id: get_scheduling
  label: Get Scheduling Page
  kind: query
  command: "06 01 00 5B {page} {checksum}"      # page 1-7
  params:
    - name: page
      type: integer
      description: "1-7"

# ---------- LED Strip (10BDL3051T) ----------
- id: set_led_strip
  label: Set LED Strip Control
  kind: action
  command: "09 01 00 F3 {on_off} {red} {green} {blue} {checksum}"   # on_off: 0x00=off, 0x01=on; RGB 0x00-0xFF
  params:
    - name: on_off
      type: integer
      description: "0x00=off, 0x01=on"
    - name: red
      type: integer
      description: "0-255"
    - name: green
      type: integer
      description: "0-255"
    - name: blue
      type: integer
      description: "0-255"
  notes: 10BDL3051T only; both LED strips controlled together.

- id: get_led_strip
  label: Get LED Strip Status
  kind: query
  command: "05 01 00 F4 F0"
  params: []

# ---------- Color Calibration (Reserved) ----------
- id: set_mic_color_calibration
  label: MIC Color Calibration (Reserved)
  kind: action
  command: "0xFE"   # CMD reserved for future use; payload TBD in source
  params: []
  notes: Source marks as "TBD / Reserved for Future use". No payload documented.
```

## Feedbacks
```yaml
# The display emits Report packets (DATA[0] mirrors the Get opcode) and the
# ACK/NACK/NAV generic report (0x00). Each Report is the response to the matching
# Get/Query action above.
- id: ack_nack_nav
  type: enum
  values: [ACK, NACK, NAV]
  trigger: response to any Set/Get command
  payload: "06 01 00 00 {status} {checksum}"

- id: power_state
  type: enum
  values: [off, on]
  trigger: response to Get Power State (0x19)
  payload: "06 01 00 19 {state} {checksum}"

- id: current_source
  type: enum
  values: [VIDEO, S-VIDEO, COMPONENT, VGA, HDMI, HDMI2, HDMI3, HDMI4, DP, DP2, DVI-D, USB, OPS, BROWSER, SMARTCMS, DMS, INTERNAL_STORAGE, MEDIA_PLAYER, PDF_PLAYER, CUSTOM, VGA2, VGA3, IWB]
  trigger: response to Get Current Source (0xAD)

- id: volume_level
  type: object
  fields: [speaker_out_pct, audio_out_pct]
  trigger: response to Get Volume (0x45)

- id: video_signal_present
  type: boolean
  trigger: response to Get Video Signal Present (0x59)

- id: temperature
  type: object
  fields: [sensor_1_celsius, sensor_2_celsius]
  trigger: response to Get Temperature (0x2F); ±3°C accuracy
```

## Variables
```yaml
- id: brightness
  type: integer
  unit: percent
  range: [0, 100]
  get: get_video_parameters
  set: set_video_parameters

- id: contrast
  type: integer
  unit: percent
  range: [0, 100]
  get: get_video_parameters
  set: set_video_parameters

- id: speaker_volume
  type: integer
  unit: percent
  range: [0, 100]
  get: get_volume
  set: set_volume

- id: audio_out_volume
  type: integer
  unit: percent
  range: [0, 100]
  get: get_volume
  set: set_volume

- id: backlight
  type: enum
  values: [on, off]
  get: get_backlight
  set: set_backlight

- id: volume_mute
  type: boolean
  get: get_volume_mute
  set: set_volume_mute

- id: off_timer_hours
  type: integer
  range: [0, 24]
  get: get_off_timer
  set: set_off_timer

- id: power_state
  type: enum
  values: [off, on]
  get: get_power
  set: set_power
```

## Events
```yaml
# Source documents no unsolicited notifications; the display only replies to host
# commands (ACK/NACK/NAV or Report). No async event stream defined.
# UNRESOLVED: none - source contains no event/notification section.
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step sequences.
```

## Safety
```yaml
confirmation_required_for:
  - set_factory_reset       # irreversible; resets all parameters
  - set_monitor_restart     # reboots display OS
  - set_power               # powers display off (may require physical wake)
  - anytile_set_group_monitor_id  # changes addressing; can orphan the unit on the bus
interlocks:
  - "No reply is sent when the wrong Monitor ID is used - verify Control byte before sending."
  - "Broadcast ID (Control=0x00) produces no ACK/Report; collisions may occur on daisy-chain."
  - "Wait for ACK (≤500 ms) before sending the next command; retry on timeout."
  - "Cold Start Power State (set_power_cold_start) only applies on next mains-power cycle."
# UNRESOLVED: source contains no explicit safety interlock procedures, voltage/current
# specs, or power-on sequencing warnings beyond the communication rules above.
```

## Notes
- **Protocol**: SICP V2.03 (Serial/Ethernet Interface Communication Protocol). Family platform is Himalaya 2.0 per the platform table (xxBDL4150D = 49/55/65/75/86/98BDL4150D).
- **Transport**: identical binary framing on RS-232C (DB9 pins 2 RXD, 3 TXD, 5 GND; null-modem cable) and TCP/IP port 5000. Default serial 9600/8/N/1, no flow control. Supported baud rates: 1200, 2400, 4800, 9600, 19200, 38400, 57600.
- **Checksum**: XOR of MsgSize, Control, Group, and all Data bytes (excluding the checksum byte itself).
- **Group byte**: optional. When group ID is "off" in the monitor, the Group byte may be omitted (e.g. `04 01 19 1C` vs `05 01 00 19 1D`). No ACK is returned if the Group byte is non-zero and doesn't match.
- **Platform gating**: many commands carry platform-specific caveats (Himalaya 1.0/1.2, Dragon 1.x/1.6, Eagle, Phoenix 1/2, QL3, Challenger 2.1, CRD50). Where a note explicitly excludes Himalaya 2.0 it is flagged; otherwise commands are presumed applicable but should be verified against the target device.
- **Example checksums** in this spec are reproduced verbatim from the source for the documented parameter values; they must be recomputed when any byte changes.
- **LED Strip (0xF3/0xF4)**, **External Storage Lock (0xF1/0xF2)**, and **Pixel Shift (0xB1/0xB2)** commands are documented for 10BDL3051T / Dragon 1.x platforms and may not apply to xxBDL4150D (Himalaya 2.0) — included for protocol completeness.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: exact per-model command applicability for xxBDL4150D variants (49/55/65/75/86/98 inch) not enumerated. -->
<!-- UNRESOLVED: any commands introduced after SICP V2.03 (23/Nov/2018) are not covered. -->
````

Spec output above. 1 AI4AV Markdown revision. Covers all 100+ SICP opcodes (Set + Get/Report) with verbatim hex payloads, full transport config (port 5000, 9600/8/N/1), traits, feedbacks, variables, safety interlocks, platform caveats.

## Provenance

```yaml
source_domains:
  - community.xibo.org.uk
  - agneovo.com
  - digis.ru
  - github.com
  - keydigital.org
source_urls:
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.agneovo.com/wp-content/uploads/2021/07/PM-32_RS232_CommandList1.pdf
  - https://www.digis.ru/upload/iblock/bb4/SICP_application_note_v1.6.pdf
  - https://github.com/aolde/philips-signage-display-sicp
  - https://www.keydigital.org/web/content/160298/ModuleMa.pdf
retrieved_at: 2026-06-15T22:29:59.426Z
last_checked_at: 2026-06-16T07:14:07.236Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:14:07.236Z
matched_actions: 119
action_count: 119
confidence: medium
summary: "All 119 spec actions confirmed verbatim by source opcodes and transport parameters fully supported by SICP V2.03 documentation. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility ranges not stated in source. Many commands carry platform-specific notes (Himalaya 1.0/1.2, Dragon 1.x, Eagle, Phoenix, QL3, Challenger 2.1); per-model applicability to xxBDL4150D (Himalaya 2.0) not always explicit — see Notes."
- "none - source contains no event/notification section."
- "source documents no named multi-step sequences."
- "source contains no explicit safety interlock procedures, voltage/current"
- "firmware version compatibility not stated in source."
- "exact per-model command applicability for xxBDL4150D variants (49/55/65/75/86/98 inch) not enumerated."
- "any commands introduced after SICP V2.03 (23/Nov/2018) are not covered."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
