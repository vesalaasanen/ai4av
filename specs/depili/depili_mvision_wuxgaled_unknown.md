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
    - TBX-2201
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - agneovo.com
  - projector-database.com
source_urls:
  - https://www.agneovo.com/wp-content/uploads/2021/09/TBX-2201_RS232_CommandList.pdf
  - https://www.projector-database.com/pdf/DigitalProjectioniVisionSXHC-rs232c.pdf
retrieved_at: 2026-05-19T04:31:40.666Z
last_checked_at: 2026-05-20T11:40:29.792Z
generated_at: 2026-05-20T11:40:29.792Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T11:40:29.792Z
  matched_actions: 45
  action_count: 45
  confidence: high
  summary: "All 45 spec actions matched; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Depili MVision WUXGALED Control Spec

## Summary
LED display controlled via RS-232C serial or Ethernet LAN (TCP/IP). Protocol is binary packet-based with XOR checksum. Commands cover power, image adjustments, network config, audio, and display settings. No authentication required.

<!-- UNRESOLVED: relationship between TBX-2201 (source doc) and MVision WUXGALED (product name) not stated in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 5000  # Ethernet LAN port; stated in source
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
- powerable       # power on/off commands present (0x18/0x19)
- routable        # UNRESOLVED: no input routing commands in source
- queryable       # query commands returning state present
- levelable       # volume, brightness, contrast, etc. present
```

## Actions
```yaml
# Network Configuration - Set
- id: network_config_set
  label: Network Configuration Set
  kind: action
  params:
    - name: network_mode
      type: integer
      description: "0x01=DHCP, 0x02=Static IP"
    - name: address_function
      type: integer
      description: "0x00=Disable, 0x01=IP, 0x02=Netmask, 0x03=MAC, 0x04=Gateway, 0x05=DNS1, 0x06=DNS2"
    - name: address_value
      type: string
      description: ASCII hex bytes for the address setting; length varies by type

# Network Name - Set
- id: network_name_set
  label: Network Name Set
  kind: action
  params:
    - name: name
      type: string
      description: "Up to 16 ASCII characters (0x00~0xFF per char)"

# Power State - Set
- id: power_state_set
  label: Power State Set
  kind: action
  params:
    - name: state
      type: integer
      description: "0x01=Power OFF, 0x02=Power ON"

# User Input Control - Set (key lock/unlock)
- id: user_input_control_set
  label: User Input Control Set
  kind: action
  params:
    - name: control_byte
      type: integer
      description: "Bitmask: bit2=power key lock, bit1=local keyboard, bit0=remote control. 0x07=unlock all"

# Backlight Level - Set
- id: backlight_level_set
  label: Backlight Level Set
  kind: action
  params:
    - name: level
      type: integer
      description: "0x00~0x64 (0~100)"

# Color Temperature - Set
- id: color_temperature_set
  label: Color Temperature Set
  kind: action
  params:
    - name: temperature
      type: integer
      description: "0x20=WARM, 0x21=COOL, 0x23=USER, 0x24=NEUTRAL"

# Volume - Set
- id: volume_set
  label: Volume Set
  kind: action
  params:
    - name: level
      type: integer
      description: "0x00~0x64 (0~100)"

# Color Range - Set
- id: color_range_set
  label: Color Range Set
  kind: action
  params:
    - name: range
      type: integer
      description: "0x00=FULL, 0x01=LIMITED"

# LED ON/OFF - Set
- id: led_onoff_set
  label: LED ON/OFF Set
  kind: action
  params:
    - name: state
      type: integer
      description: "0x00=OFF, 0x01=ON"

# Signal Info - Set
- id: signal_info_set
  label: Signal Info Set
  kind: action
  params:
    - name: state
      type: integer
      description: "0x00=OFF, 0x01=ON"

# Blue Screen - Set
- id: blue_screen_set
  label: Blue Screen Set
  kind: action
  params:
    - name: state
      type: integer
      description: "0x00=OFF, 0x01=ON"

# LOGO - Set
- id: logo_set
  label: LOGO Set
  kind: action
  params:
    - name: state
      type: integer
      description: "0x00=OFF, 0x01=ON"

# Color RGB - Set
- id: color_rgb_set
  label: Color RGB Set
  kind: action
  params:
    - name: red
      type: integer
      description: "0~255 (0x00~0xFF)"
    - name: green
      type: integer
      description: "0~255 (0x00~0xFF)"
    - name: blue
      type: integer
      description: "0~255 (0x00~0xFF)"

# Brightness - Set
- id: brightness_set
  label: Brightness Set
  kind: action
  params:
    - name: level
      type: integer
      description: "0x00~0x64 (0~100)"

# Contrast - Set
- id: contrast_set
  label: Contrast Set
  kind: action
  params:
    - name: level
      type: integer
      description: "0x00~0x64 (0~100)"

# Black Level - Set
- id: black_level_set
  label: Black Level Set
  kind: action
  params:
    - name: level
      type: integer
      description: "0x00~0x64 (0~100)"

# Sharpness - Set
- id: sharpness_set
  label: Sharpness Set
  kind: action
  params:
    - name: level
      type: integer
      description: "0x00~0x64 (0~100)"

# HUE (TINT) - Set
- id: hue_set
  label: HUE (TINT) Set
  kind: action
  params:
    - name: level
      type: integer
      description: "0x00~0x64 (0~100)"

# Saturation - Set
- id: saturation_set
  label: Saturation Set
  kind: action
  params:
    - name: level
      type: integer
      description: "0x00~0x64 (0~100)"

# DCR - Set
- id: dcr_set
  label: DCR Set
  kind: action
  params:
    - name: state
      type: integer
      description: "0x00=OFF, 0x01=ON"

# Gamma - Set
- id: gamma_set
  label: Gamma Set
  kind: action
  params:
    - name: gamma
      type: integer
      description: "0x00=2.2, 0x01=2.4, 0x04=2.0, 0x05=S-Curve"

# Noise Reduction - Set
- id: noise_reduction_set
  label: Noise Reduction Set
  kind: action
  params:
    - name: level
      type: integer
      description: "0x00=OFF, 0x01=LOW, 0x02=MEDIUM, 0x03=HIGH"

# Audio Mute - Set
- id: audio_mute_set
  label: Audio Mute Set
  kind: action
  params:
    - name: state
      type: integer
      description: "0x00=OFF, 0x01=ON"

# Power Saving - Set
- id: power_saving_set
  label: Power Saving Set
  kind: action
  params:
    - name: state
      type: integer
      description: "0x00=OFF, 0x01=ON"

# Anti-Burn-in (Pixel Shift) - Set
- id: anti_burn_in_set
  label: Anti-Burn-in Set
  kind: action
  params:
    - name: enable
      type: integer
      description: "0x00=OFF, 0x01=ON"
    - name: hours
      type: integer
      description: "0x01=4h, 0x02=5h, 0x03=6h, 0x04=8h"
    - name: type
      type: integer
      description: "0x01=A, 0x02=B, 0x03=C"
- id: network_address_get
  label: Network Address Get
  kind: query
  params:
    - name: address_function
      type: integer
      description: "0x01=IP, 0x02=Netmask, 0x03=MAC, 0x04=Gateway, 0x05=DNS1, 0x06=DNS2"

- id: network_name_get
  label: Network Name Get
  kind: query
  params: []

- id: miscellaneous_info_get
  label: Miscellaneous Info Get
  kind: query
  params:
    - name: sub_command
      type: integer
      description: "0x02=Operating Hours"

- id: power_state_get
  label: Power State Get
  kind: query
  params: []

- id: keypad_control_get
  label: Keypad Control Get
  kind: query
  params: []

- id: backlight_level_get
  label: Backlight Level Get
  kind: query
  params: []

- id: color_temp_get
  label: Color Temp Get
  kind: query
  params: []

- id: volume_get
  label: Volume Get
  kind: query
  params: []

- id: color_range_get
  label: Color Range Get
  kind: query
  params: []

- id: led_onoff_get
  label: LED ON/OFF Get
  kind: query
  params: []

- id: signal_info_get
  label: Signal Info Get
  kind: query
  params: []

- id: blue_screen_get
  label: Blue Screen Get
  kind: query
  params: []

- id: logo_get
  label: LOGO Get
  kind: query
  params: []

- id: color_rgb_get
  label: Color RGB Get
  kind: query
  params: []

- id: platform_version_get
  label: Platform/Version Labels Get
  kind: query
  params:
    - name: label_type
      type: integer
      description: "0x00=F/W version, 0x01=Model Name"

- id: brightness_get
  label: Brightness Get
  kind: query
  params: []

- id: contrast_get
  label: Contrast Get
  kind: query
  params: []

- id: black_level_get
  label: Black Level Get
  kind: query
  params: []

- id: sharpness_get
  label: Sharpness Get
  kind: query
  params: []

- id: hue_tint_get
  label: HUE (TINT) Get
  kind: query
  params: []
```

## Feedbacks
```yaml
# All Get commands return a report packet with header 0x21.
# Report packet structure: Header(0x21) | MonitorID | Category(0x00) | Page(0x00) | Length | Control(0x01) | Data[0]=command_code | Data[1..N] | Checksum

- id: power_state_report
  label: Power State Report
  type: enum
  values:
    - 0x01  # Power OFF
    - 0x02  # Power ON

- id: backlight_level_report
  label: Backlight Level Report
  type: integer
  range: [0, 100]

- id: volume_report
  label: Volume Report
  type: integer
  range: [0, 100]

- id: brightness_report
  label: Brightness Report
  type: integer
  range: [0, 100]

- id: contrast_report
  label: Contrast Report
  type: integer
  range: [0, 100]

- id: color_temperature_report
  label: Color Temperature Report
  type: enum
  values:
    - 0x20  # WARM
    - 0x21  # COOL
    - 0x23  # USER
    - 0x24  # NEUTRAL

- id: network_config_report
  label: Network Configuration Report
  type: object
  fields:
    - name: mode
      type: integer
      description: "0x01=DHCP, 0x02=Static IP"
    - name: address_function
      type: integer
      description: "0x01=IP, 0x02=Netmask, 0x03=MAC, 0x04=Gateway, 0x05=DNS1, 0x06=DNS2"
    - name: address_bytes
      type: string
      description: "4 bytes for IP/netmask/gateway/DNS; 6 bytes for MAC"

- id: network_name_report
  label: Network Name Report
  type: string
  description: "Up to 16 ASCII characters"

- id: misc_operating_hours_report
  label: Operating Hours Report
  type: integer
  description: "16-bit unsigned; MSB=Data[1], LSB=Data[2]"

- id: platform_version_report
  label: Platform/Version Report
  type: string
  description: "Up to 36 ASCII characters (0x24 max)"
```

## Variables
```yaml
# No standalone settable parameters beyond the action commands.
# All adjustable parameters are accessed via Set/Get command pairs.
```

## Events
```yaml
# No unsolicited event messages described in source.
# Device only responds to Get commands; no push notifications.
```

## Macros
```yaml
# No multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source.
```

## Notes
- **Packet structure:** `Header(0xA6) | MonitorID(1~255, 0=broadcast) | Category(0x00) | Code0 | Code1 | Length | Control(0x01) | Data[0] | Data[1..N] | Checksum` — Checksum = XOR of all bytes except checksum itself.
- **Reply structure:** `Header(0x21) | MonitorID | Category(0x00) | Page(0x00) | Length | Control(0x01) | Data[0]=command code echoed | Data[1]=status | Checksum` — Data[1] status codes: 0x00=ACK, 0x03=NACK (command canceled), 0x04=NAV (parse error).
- **Timing:** wait 500ms before retry if no response. No new command until previous acknowledged.
- **Serial + TCP both use same protocol** — port 5000 for Ethernet.
- **Command code mapping:**
  - Set commands use Data[0] = code, Data[1] = value.
  - Get commands use Data[0] = code+1 (e.g., 0x18 Set → 0x19 Get; 0x30 Set → 0x31 Get).
- **Anti-Burn-in:** Data[2] hours field uses non-sequential values (0x01=4h, 0x02=5h, 0x03=6h, 0x04=8h) — not simple increment.
- **Color RGB Set:** 4-byte payload (Data[0]=0x66, Data[1]=R, Data[2]=G, Data[3]=B) — different from single-byte params.
- **Network config:** DHCP mode only supports disable-address-writing (Data[2]=0x00); static IP mode supports IP, netmask, gateway, DNS1, DNS2, MAC address writes.
- **User Input Control:** current model does not support power-key-only lock; only full key lock / unlock combinations documented.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: input source selection / routing commands not present in source -->
<!-- UNRESOLVED: unsolicited event/notification messages not described in source -->

## Provenance

```yaml
source_domains:
  - agneovo.com
  - projector-database.com
source_urls:
  - https://www.agneovo.com/wp-content/uploads/2021/09/TBX-2201_RS232_CommandList.pdf
  - https://www.projector-database.com/pdf/DigitalProjectioniVisionSXHC-rs232c.pdf
retrieved_at: 2026-05-19T04:31:40.666Z
last_checked_at: 2026-05-20T11:40:29.792Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T11:40:29.792Z
matched_actions: 45
action_count: 45
confidence: high
summary: "All 45 spec actions matched; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
