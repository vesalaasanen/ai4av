---
spec_id: admin/depili-mvision-wuxgaled
schema_version: ai4av-public-spec-v1
revision: 1
title: "Depili MVision WUXGALED Control Spec"
manufacturer: Depili
model_family: "MVision WUXGALED"
aliases: []
compatible_with:
  manufacturers:
    - Depili
  models:
    - "MVision WUXGALED"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - agneovo.com
  - oceanoptics.com
  - assets.lutron.com
source_urls:
  - https://www.agneovo.com/wp-content/uploads/2021/09/TBX-2201_RS232_CommandList.pdf
  - https://www.oceanoptics.com/wp-content/uploads/2025/04/Serial_Communications_Protocol_RS-232_Tech_Note_Rev8.pdf
  - "https://assets.lutron.com/a/documents/hwi%20rs232%20protocol.pdf"
  - https://www.agneovo.com/wp-content/uploads/2021/07/QD-98_RS232_CommandList1.pdf
  - https://www.agneovo.com/wp-content/uploads/2021/07/QX-28_RS232_CommandList.pdf
retrieved_at: 2026-05-14T15:32:43.432Z
last_checked_at: 2026-06-02T21:41:29.992Z
generated_at: 2026-06-02T21:41:29.992Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is labeled \"TBX-2201\" inside; the user-supplied model \"MVision WUXGALED\" may be a higher-level family designation. Source does not confirm firmware versions, voltage/current, or physical connector pinout beyond \"RS232 / Ethernet LAN\"."
  - "no event/notif protocol in source"
  - "source does not define any composite / multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:29.992Z
  matched_actions: 52
  action_count: 52
  confidence: medium
  summary: "All 52 spec actions (27 Set/Get pairs + 1 platform query) match source opcodes exactly; transport port 5000 and 9600-8N1 confirmed verbatim. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Depili MVision WUXGALED Control Spec

## Summary

This spec covers a Depili display (source document labeled **TBX-2201**, RS232 Command List v1.0) controllable over RS-232 (9600 8N1) and TCP/IP Ethernet (port 5000). The protocol is a binary packet format with a fixed header, monitor ID, command code, optional data, and an XOR checksum. Commands cover power, image settings (backlight, brightness, contrast, black level, sharpness, hue, saturation, color temperature, color RGB, gamma, noise reduction, DCR), audio (volume, mute), input/IR/keypad lock, network configuration, network name, signal info, blue screen, logo, anti-burn-in, power saving, and read-only queries (miscellaneous/operating hours, platform/version, model name).

<!-- UNRESOLVED: source document is labeled "TBX-2201" inside; the user-supplied model "MVision WUXGALED" may be a higher-level family designation. Source does not confirm firmware versions, voltage/current, or physical connector pinout beyond "RS232 / Ethernet LAN". -->

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
- powerable       # power on/off commands present (0x18)
- routable        # input selection is implicit via Signal Info (0x54); lock control present
- queryable       # explicit Get commands for nearly every setting
- levelable       # backlight, brightness, contrast, black, sharpness, hue, saturation, volume
```

## Actions
```yaml
# Packet structure (command, host -> display):
#   A6 {id} 00 00 00 {len} 01 {opcode} {data...} {cs}
#   - 0xA6: Header (fixed)
#   - {id}: Monitor ID 1..255 (0 = broadcast, no reply)
#   - 0x00 0x00 0x00: Category, Code0, Code1 (all fixed 0x00)
#   - {len}: length from Data Control byte through Checksum (inclusive)
#   - 0x01: Data Control (fixed)
#   - {opcode}: command code from tables below
#   - {data...}: zero or more data bytes per command
#   - {cs}: XOR of all preceding bytes (header through last data byte)
#
# Report packet (display -> host):
#   21 {id} 00 00 {len} 01 {opcode} {data...} {cs}
#   Header is 0x21 for reports; otherwise same structure.
# Reply semantics (Data[1] of report): 0x00 = OK, 0x03 = NACK/command canceled, 0x04 = NAV/parse error.
#
# All actions below assume Monitor ID = 0x01 in the example; substitute
# the target display's ID at runtime and recompute the checksum.

# --- 4.1 Network Configuration ---
- id: network_config_set
  label: Network Configuration Set
  kind: action
  command: "A6 {id} 00 00 00 {len} 01 05 {data...} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255; 0 = broadcast)
    - name: network_mode
      type: integer
      description: "0x01 = DHCP, 0x02 = Static IP"
    - name: address_function
      type: integer
      description: |
        DHCP: 0x00 = disable address writing (1 byte). Static IP:
        0x00 = disable, 0x01 = IP Address, 0x02 = Netmask,
        0x03 = Ethernet MAC Address, 0x04 = Gateway,
        0x05 = DNS 1, 0x06 = DNS 2.
    - name: address_bytes
      type: bytes
      description: |
        4 bytes for IP/Netmask/Gateway/DNS; 6 bytes for MAC.
        Omit (and set address_function=0x00) to leave unchanged.
  notes: |
    Length = 3 + N where N is the number of address bytes
    (4 for IP, 6 for MAC, 1 for the disable variant).
    Example (Display 01, Static IP, IP=192.168.0.1):
      A6 01 00 00 00 09 01 05 02 01 C0 A8 00 01 C0

- id: network_config_get
  label: Network Configuration Get
  kind: query
  command: "A6 {id} 00 00 00 04 01 06 {address_function} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: address_function
      type: integer
      description: "0x01 = IP, 0x02 = Netmask, 0x03 = MAC, 0x04 = Gateway, 0x05 = DNS 1, 0x06 = DNS 2"
  notes: |
    Response: 0x21 report; Data[1] = network mode (0x01 DHCP / 0x02 Static),
    Data[2] = address function, Data[3..N] = address bytes.

# --- 4.2 Network Name ---
- id: network_name_set
  label: Network Name Set
  kind: action
  command: "A6 {id} 00 00 00 {len} 01 09 {ascii_bytes} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: name
      type: string
      description: |
        Up to 16 ASCII characters from the set 0-9, A-Z, Space, +, -, /, :.
        Each character becomes one data byte.
  notes: |
    Length = 3 + N (N = name length). Example: "AGN TBX-2201" (12 chars)
    yields: A6 01 00 00 00 13 01 09 41 47 4E 20 54 42 58 2D 32 32 30 31 20 B6

- id: network_name_get
  label: Network Name Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 0A {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report with N ASCII bytes (N = 0..16).

# --- 4.3 Miscellaneous (Operating Hours) ---
- id: miscellaneous_operating_hours_get
  label: Operating Hours Get
  kind: query
  command: "A6 {id} 00 00 00 04 01 0F 02 {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Sub-command Data[1] = 0x02 (Operating Hours; all other sub-commands reserved).
    Response: 0x21 report; Data[1] = MSByte, Data[2] = LSByte of 16-bit hours value.

# --- 4.4 Power State ---
- id: power_state_set
  label: Power State Set
  kind: action
  command: "A6 {id} 00 00 00 04 01 18 {state} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: state
      type: integer
      description: "0x01 = Power OFF, 0x02 = Power ON"
  notes: |
    Acceptable in power-off (saving) mode per source. Example OFF (ID 01):
    A6 01 00 00 00 04 01 18 01 BB

- id: power_state_get
  label: Power State Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 19 {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = 0x01 (OFF) or 0x02 (ON).
    Acceptable in power-off (saving) mode.

# --- 4.5 User Input (Keypad/Remote) Control ---
- id: user_input_control_set
  label: User Input Control Set
  kind: action
  command: "A6 {id} 00 00 00 04 01 1C {lock_bits} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: lock_bits
      type: integer
      description: |
        Bit-mask (per source): bit2 = Power key lock,
        bit1 = Local keyboard, bit0 = Remote control.
        0 = locked, 1 = unlocked. Bits 7..3 reserved.
        Current model only supports power-key lock; practical values:
        0x01 = lock all (except power), 0x03 = unsupported,
        0x05 = lock all (except power), 0x07 = unlock all.
  notes: |
    Acceptable in power-off (saving) mode.

- id: user_input_control_get
  label: User Input Control Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 1D {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = lock bits as above.

# --- 4.6 Backlight Level ---
- id: backlight_set
  label: Backlight Level Set
  kind: action
  command: "A6 {id} 00 00 00 04 01 30 {level} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: level
      type: integer
      description: Backlight 0..100 (0x00..0x64)
  notes: |
    Acceptable in power-off (saving) mode.

- id: backlight_get
  label: Backlight Level Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 31 {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = 0..100.

# --- 4.7 Color Temperature ---
- id: color_temperature_set
  label: Color Temperature Set
  kind: action
  command: "A6 {id} 00 00 00 04 01 34 {preset} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: preset
      type: integer
      description: "0x20 = WARM, 0x21 = COOL, 0x23 = USER, 0x24 = NEUTRAL"
  notes: ~

- id: color_temperature_get
  label: Color Temperature Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 35 {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = preset value as above.

# --- 4.8 Volume ---
- id: volume_set
  label: Volume Set
  kind: action
  command: "A6 {id} 00 00 00 04 01 44 {level} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: level
      type: integer
      description: Volume 0..100 (0x00..0x64)
  notes: |
    Acceptable in power-off (saving) mode.

- id: volume_get
  label: Volume Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 45 {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = 0..100.

# --- 4.9 Color Range ---
- id: color_range_set
  label: Color Range Set
  kind: action
  command: "A6 {id} 00 00 00 04 01 50 {range} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: range
      type: integer
      description: "0x00 = FULL, 0x01 = LIMITED"
  notes: ~

- id: color_range_get
  label: Color Range Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 51 {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = 0x00 (FULL) / 0x01 (LIMITED).

# --- 4.10 LED ON/OFF ---
- id: led_set
  label: LED ON/OFF Set
  kind: action
  command: "A6 {id} 00 00 00 04 01 52 {state} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: state
      type: integer
      description: "0x00 = OFF, 0x01 = ON"
  notes: ~

- id: led_get
  label: LED ON/OFF Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 53 {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = 0x00 / 0x01.

# --- 4.11 Signal Info ---
- id: signal_info_set
  label: Signal Info Set
  kind: action
  command: "A6 {id} 00 00 00 04 01 54 {state} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: state
      type: integer
      description: "0x00 = OFF, 0x01 = ON"
  notes: ~

- id: signal_info_get
  label: Signal Info Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 55 {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = 0x00 / 0x01.

# --- 4.12 Blue Screen ---
- id: blue_screen_set
  label: Blue Screen Set
  kind: action
  command: "A6 {id} 00 00 00 04 01 56 {state} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: state
      type: integer
      description: "0x00 = OFF, 0x01 = ON"
  notes: ~

- id: blue_screen_get
  label: Blue Screen Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 57 {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = 0x00 / 0x01.

# --- 4.13 LOGO ---
- id: logo_set
  label: LOGO Set
  kind: action
  command: "A6 {id} 00 00 00 04 01 58 {state} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: state
      type: integer
      description: "0x00 = OFF, 0x01 = ON"
  notes: ~

- id: logo_get
  label: LOGO Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 59 {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = 0x00 / 0x01.

# --- 4.14 Color RGB (gain) ---
- id: color_rgb_set
  label: Color RGB Set
  kind: action
  command: "A6 {id} 00 00 00 06 01 66 {red} {green} {blue} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: red
      type: integer
      description: Red gain 0..255 (0x00..0xFF)
    - name: green
      type: integer
      description: Green gain 0..255 (0x00..0xFF)
    - name: blue
      type: integer
      description: Blue gain 0..255 (0x00..0xFF)
  notes: |
    Length byte = 0x06 (fixed for 3-byte RGB payload).

- id: color_rgb_get
  label: Color RGB Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 67 {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1..3] = R, G, B (0..255 each).

# --- 4.15 Platform / Version Label ---
- id: platform_version_get
  label: Platform/Version Label Get
  kind: query
  command: "A6 {id} 00 00 00 04 01 A2 {label} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: label
      type: integer
      description: "0x00 = F/W version, 0x01 = Model Name"
  notes: |
    Acceptable in power-off (saving) mode. Response: 0x21 report with up to 36 ASCII bytes.

# --- 4.16 Brightness ---
- id: brightness_set
  label: Brightness Set
  kind: action
  command: "A6 {id} 00 00 00 04 01 C0 {level} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: level
      type: integer
      description: Brightness 0..100 (0x00..0x64)
  notes: |
    Acceptable in power-off (saving) mode.

- id: brightness_get
  label: Brightness Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 C1 {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = 0..100.

# --- 4.17 Contrast ---
- id: contrast_set
  label: Contrast Set
  kind: action
  command: "A6 {id} 00 00 00 04 01 C2 {level} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: level
      type: integer
      description: Contrast 0..100 (0x00..0x64)
  notes: ~

- id: contrast_get
  label: Contrast Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 C3 {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = 0..100.

# --- 4.18 Black Level ---
- id: black_level_set
  label: Black Level Set
  kind: action
  command: "A6 {id} 00 00 00 04 01 C4 {level} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: level
      type: integer
      description: Black level 0..100 (0x00..0x64)
  notes: ~

- id: black_level_get
  label: Black Level Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 C5 {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = 0..100.

# --- 4.19 Sharpness ---
- id: sharpness_set
  label: Sharpness Set
  kind: action
  command: "A6 {id} 00 00 00 04 01 C6 {level} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: level
      type: integer
      description: Sharpness 0..100 (0x00..0x64)
  notes: ~

- id: sharpness_get
  label: Sharpness Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 C7 {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = 0..100.

# --- 4.20 HUE (TINT) ---
- id: hue_tint_set
  label: HUE (TINT) Set
  kind: action
  command: "A6 {id} 00 00 00 04 01 C8 {level} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: level
      type: integer
      description: HUE/TINT 0..100 (0x00..0x64)
  notes: ~

- id: hue_tint_get
  label: HUE (TINT) Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 C9 {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = 0..100.

# --- 4.21 Saturation ---
- id: saturation_set
  label: Saturation Set
  kind: action
  command: "A6 {id} 00 00 00 04 01 CA {level} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: level
      type: integer
      description: Saturation 0..100 (0x00..0x64)
  notes: ~

- id: saturation_get
  label: Saturation Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 CB {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = 0..100.

# --- 4.22 DCR ---
- id: dcr_set
  label: DCR Set
  kind: action
  command: "A6 {id} 00 00 00 04 01 D2 {state} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: state
      type: integer
      description: "0x00 = OFF, 0x01 = ON"
  notes: ~

- id: dcr_get
  label: DCR Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 D3 {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = 0x00 / 0x01.

# --- 4.23 Gamma ---
- id: gamma_set
  label: Gamma Set
  kind: action
  command: "A6 {id} 00 00 00 04 01 DC {gamma} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: gamma
      type: integer
      description: "0x00 = 2.2, 0x01 = 2.4, 0x04 = 2.0, 0x05 = S-Curve"
  notes: ~

- id: gamma_get
  label: Gamma Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 DD {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = gamma value as above.

# --- 4.24 Noise Reduction ---
- id: noise_reduction_set
  label: Noise Reduction Set
  kind: action
  command: "A6 {id} 00 00 00 04 01 DE {level} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: level
      type: integer
      description: "0x00 = OFF, 0x01 = LOW, 0x02 = MEDIUM, 0x03 = HIGH"
  notes: ~

- id: noise_reduction_get
  label: Noise Reduction Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 DF {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = 0..3 per above.

# --- 4.25 Audio Mute ---
- id: audio_mute_set
  label: Audio Mute Set
  kind: action
  command: "A6 {id} 00 00 00 04 01 E0 {state} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: state
      type: integer
      description: "0x00 = OFF, 0x01 = ON"
  notes: ~

- id: audio_mute_get
  label: Audio Mute Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 E1 {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = 0x00 / 0x01.

# --- 4.26 Power Saving ---
- id: power_saving_set
  label: Power Saving Set
  kind: action
  command: "A6 {id} 00 00 00 04 01 E2 {state} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: state
      type: integer
      description: "0x00 = OFF, 0x01 = ON"
  notes: ~

- id: power_saving_get
  label: Power Saving Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 E3 {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = 0x00 / 0x01.

# --- 4.27 Anti-Burn-in (Pixel Shift) ---
- id: anti_burn_in_set
  label: Anti-Burn-in Set
  kind: action
  command: "A6 {id} 00 00 00 06 01 E4 {enable} {hours} {type} {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
    - name: enable
      type: integer
      description: "0x00 = OFF, 0x01 = ON"
    - name: hours
      type: integer
      description: "0x01 = 4h, 0x02 = 5h, 0x03 = 6h, 0x04 = 8h"
    - name: type
      type: integer
      description: "0x01 = A, 0x02 = B, 0x03 = C"
  notes: |
    Length byte = 0x06 (fixed for 3-byte payload).

- id: anti_burn_in_get
  label: Anti-Burn-in Get
  kind: query
  command: "A6 {id} 00 00 00 03 01 E5 {cs}"
  params:
    - name: id
      type: integer
      description: Monitor ID (1-255)
  notes: |
    Response: 0x21 report; Data[1] = enable, Data[2] = hours, Data[3] = type.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  source: power_state_get (0x19)

- id: backlight_level
  type: integer
  range: [0, 100]
  source: backlight_get (0x31)

- id: color_temperature
  type: enum
  values: [warm, cool, user, neutral]
  source: color_temperature_get (0x35)

- id: volume_level
  type: integer
  range: [0, 100]
  source: volume_get (0x45)

- id: color_range
  type: enum
  values: [full, limited]
  source: color_range_get (0x51)

- id: led_state
  type: enum
  values: [off, on]
  source: led_get (0x53)

- id: signal_info
  type: enum
  values: [off, on]
  source: signal_info_get (0x55)

- id: blue_screen
  type: enum
  values: [off, on]
  source: blue_screen_get (0x57)

- id: logo
  type: enum
  values: [off, on]
  source: logo_get (0x59)

- id: color_rgb
  type: object
  fields:
    red:   {type: integer, range: [0, 255]}
    green: {type: integer, range: [0, 255]}
    blue:  {type: integer, range: [0, 255]}
  source: color_rgb_get (0x67)

- id: brightness
  type: integer
  range: [0, 100]
  source: brightness_get (0xC1)

- id: contrast
  type: integer
  range: [0, 100]
  source: contrast_get (0xC3)

- id: black_level
  type: integer
  range: [0, 100]
  source: black_level_get (0xC5)

- id: sharpness
  type: integer
  range: [0, 100]
  source: sharpness_get (0xC7)

- id: hue_tint
  type: integer
  range: [0, 100]
  source: hue_tint_get (0xC9)

- id: saturation
  type: integer
  range: [0, 100]
  source: saturation_get (0xCB)

- id: dcr
  type: enum
  values: [off, on]
  source: dcr_get (0xD3)

- id: gamma
  type: enum
  values: [g22, g24, g20, s_curve]
  source: gamma_get (0xDD)

- id: noise_reduction
  type: enum
  values: [off, low, medium, high]
  source: noise_reduction_get (0xDF)

- id: audio_mute
  type: enum
  values: [off, on]
  source: audio_mute_get (0xE1)

- id: power_saving
  type: enum
  values: [off, on]
  source: power_saving_get (0xE3)

- id: anti_burn_in
  type: object
  fields:
    enable: {type: enum, values: [off, on]}
    hours:  {type: enum, values: [h4, h5, h6, h8]}
    type:   {type: enum, values: [a, b, c]}
  source: anti_burn_in_get (0xE5)

- id: user_input_control
  type: object
  fields:
    power_key_lock: {type: enum, values: [locked, unlocked]}
    local_keyboard: {type: enum, values: [locked, unlocked]}
    remote_control: {type: enum, values: [locked, unlocked]}
  source: user_input_control_get (0x1D)

- id: network_config
  type: object
  fields:
    mode:             {type: enum, values: [dhcp, static]}
    address_function: {type: enum, values: [ip, netmask, mac, gateway, dns1, dns2]}
    address:          {type: string, description: "IP as dotted-quad, MAC as colon-hex"}
  source: network_config_get (0x06)

- id: network_name
  type: string
  source: network_name_get (0x0A)

- id: operating_hours
  type: integer
  description: 16-bit hours (MSB/LSB) reported by miscellaneous_get (0x0F, sub 0x02)

- id: platform_version_label
  type: string
  source: platform_version_get (0xA2), label=0x00

- id: model_name
  type: string
  source: platform_version_get (0xA2), label=0x01
```

## Variables
```yaml
# (Section omitted - all settable parameters in this spec are modeled as
# discrete Set actions per the source protocol; no free-form scalar
# variables exposed beyond what the actions already cover.)
```

## Events
```yaml
# Source defines no unsolicited asynchronous notifications. All display->host
# traffic is in response to a Set or Get request (ACK/NAV/NACK or Get Report).
# UNRESOLVED: no event/notif protocol in source
```

## Macros
```yaml
# UNRESOLVED: source does not define any composite / multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. User Input Control (0x1C) can lock the
# power key, which is the only near-safety-critical capability described.
```

## Notes
- **Model identity:** the source document is titled "TBX-2201 RS232 Command List v1.0". The user-supplied model is "MVision WUXGALED". The spec is generated under the MVision WUXGALED entity; if TBX-2201 turns out to be a different product, regenerate.
- **Transport:** the same binary protocol runs on both RS-232 (9600 8N1, no flow control) and TCP port 5000. The packet framing is identical on both transports.
- **Timing:** source states a new command must not be sent until the previous one is acknowledged. A retry may be triggered if no response is received within 500 ms.
- **Broadcast:** Monitor ID = 0 is broadcast. The display does not ACK or report broadcast commands. Using a non-zero ID with no reply implies the wrong ID is in use.
- **ACK semantics:** every valid command receives an ACK (0x00). A valid-but-unsupported command gets NAV (0x04). A corrupt buffer (transmission error) gets NACK (0x03). The Data[1] field of the report encodes the result: 0x00 = OK, 0x03 = canceled/incorrect data, 0x04 = parse/checksum error.
- **Checksum:** XOR of all bytes preceding the checksum byte (header through last data byte). 8-bit, range 0x00..0xFF.
- **Length byte:** the Length field counts bytes from Data Control through Checksum, inclusive. For 0-data commands this is 0x03; for 1-data commands 0x04; for 3-data (RGB, anti-burn-in) 0x06; for variable-length payloads (network config, network name) it scales with the payload.
- **Reserved sub-codes:** sub-commands other than 0x02 for the miscellaneous get (0x0F) are reserved per source.
- **Keypad lock limitation:** source notes "Current model not support: Only power key lock" for the User Input Control command, with documented values 0x01/0x03/0x05/0x07 of which 0x03 is "no support".
- **Fields not in source:** voltage/current/power draw, fault recovery, firmware compatibility ranges, protocol version, RS-232 connector pinout, default IP address (source defers to "user manual"). All marked unresolved.

## Provenance

```yaml
source_domains:
  - agneovo.com
  - oceanoptics.com
  - assets.lutron.com
source_urls:
  - https://www.agneovo.com/wp-content/uploads/2021/09/TBX-2201_RS232_CommandList.pdf
  - https://www.oceanoptics.com/wp-content/uploads/2025/04/Serial_Communications_Protocol_RS-232_Tech_Note_Rev8.pdf
  - "https://assets.lutron.com/a/documents/hwi%20rs232%20protocol.pdf"
  - https://www.agneovo.com/wp-content/uploads/2021/07/QD-98_RS232_CommandList1.pdf
  - https://www.agneovo.com/wp-content/uploads/2021/07/QX-28_RS232_CommandList.pdf
retrieved_at: 2026-05-14T15:32:43.432Z
last_checked_at: 2026-06-02T21:41:29.992Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:29.992Z
matched_actions: 52
action_count: 52
confidence: medium
summary: "All 52 spec actions (27 Set/Get pairs + 1 platform query) match source opcodes exactly; transport port 5000 and 9600-8N1 confirmed verbatim. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is labeled \"TBX-2201\" inside; the user-supplied model \"MVision WUXGALED\" may be a higher-level family designation. Source does not confirm firmware versions, voltage/current, or physical connector pinout beyond \"RS232 / Ethernet LAN\"."
- "no event/notif protocol in source"
- "source does not define any composite / multi-step sequences."
- "source contains no safety warnings, interlock procedures, or"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
