---
spec_id: admin/planar-lux70-ero-b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar LUX70 ERO B Control Spec"
manufacturer: Planar
model_family: "Planar LUX70 ERO B"
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - "Planar LUX70 ERO B"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
  - manualslib.com
source_urls:
  - https://www.planar.com/media/434375/020-1207-00e_ultralux-installation-guide.pdf
  - "https://www.manualslib.com/manual/3294572/Planar-Lux70-Ero-B.html?page=41"
  - https://www.manualslib.com/manual/3294572/Planar-Lux70-Ero-B.html
retrieved_at: 2026-07-25T09:31:12.882Z
last_checked_at: 2026-08-05T08:37:16.632Z
generated_at: 2026-08-05T08:37:16.632Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is the shared Planar UltraLux \"External Control and Monitoring\" manual; it does not state a firmware version, hardware revision, or model-specific deviations. Recovery notes indicate the LUX70 ERO B is discontinued and this UltraLux-platform doc is the closest available protocol reference."
  - "SNMP monitoring (read-only, community \"public\", MIB PLANAR-DISPLAY-MIB)"
  - "encoding for negative values (-350..0) not shown in source; single value byte cannot natively represent the full -350..350 Get range - encoding for negatives is undocumented. -->\""
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility not stated in source."
  - "model-specific LUX70 ERO B deviations from the UltraLux platform doc not confirmed."
  - "negative-value byte encoding for Set Blacklevel Brightness (-350..0) not documented."
  - "exact response terminator / line framing for serial/UDP replies not specified in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:37:16.632Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions match the source command table, transport values are supported, and the full 44-command catalogue is represented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Planar LUX70 ERO B Control Spec

## Summary
The Planar LUX70 ERO B is a 70" ruggedized large-format LCD display (UltraLux family, ERO — Extended Ruggedness & Optics). This spec covers external control via an RS-232 serial link and a UDP mirror on port 57 that carries the identical binary command set (8-byte "Set" commands, 4-byte "Get" commands, each with a checksum byte). The device also exposes read-only SNMP monitoring (not modeled here as control actions).

<!-- UNRESOLVED: source document is the shared Planar UltraLux "External Control and Monitoring" manual; it does not state a firmware version, hardware revision, or model-specific deviations. Recovery notes indicate the LUX70 ERO B is discontinued and this UltraLux-platform doc is the closest available protocol reference. -->

## Transport
```yaml
protocols:
  - serial
  - udp
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # "no flow control" stated in source
addressing:
  port: 57  # UDP port accepts the same command set as RS232
auth:
  type: none  # inferred: no auth procedure in source for RS232 or UDP
# UNRESOLVED: SNMP monitoring (read-only, community "public", MIB PLANAR-DISPLAY-MIB)
# is also available but is not modeled as a control protocol here - all SNMP
# objects are read-only and no traps are used.
```

## Traits
```yaml
# All inferred from command evidence in source (Tier 2).
traits:
  - powerable    # inferred: Set Power on/off commands present (rows 1-2)
  - queryable    # inferred: Get/query commands return current values (rows 3,5,7,9,...)
  - levelable    # inferred: backlight, contrast, sharpness, RGB gain, volume set commands
  - routable     # inferred: input-source select commands present (rows 22-24)
```

## Actions
```yaml
# Source documents 44 numbered RS232 command rows; UDP port 57 carries the
# identical payloads. All 44 are enumerated below verbatim.
#
# Checksum convention (from source): "the last byte value is chosen to force the
# check sum to 100 hex." In practice the sum of all command bytes ≡ 0x00 (mod
# 0x100); i.e. total byte sum is a multiple of 256. Set commands are 8 bytes,
# Get commands are 4 bytes. For parameterized Set commands the final byte is the
# filler that satisfies this rule for the chosen value byte.
#
# Legend: Set = 8-byte action command; Get = 4-byte query command.

# --- Power (rows 1-3) ---
- id: set_power_off
  label: Set Power Off
  kind: action
  command: "08 22 FE 00 00 00 00 D8"
  params: []
  notes: "Soft power off; backlight off."

- id: set_power_on
  label: Set Power On
  kind: action
  command: "08 22 FD 00 00 00 00 D9"
  params: []
  notes: "Soft power on; backlight on if video source present or while searching."

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "04 21 16 C5"
  params: []

# --- Backlight brightness (rows 4-5) ---
- id: set_backlight_brightness
  label: Set Backlight Brightness
  kind: action
  command: "08 22 00 00 00 00 {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "Backlight brightness, 1-100. Sent as single byte (e.g. 80 = 0x50)."
    - name: checksum
      type: byte
      description: "Filler byte so the 8-byte sum ≡ 0 (mod 256). For value=80: 0x86."
  notes: "Source example, value 80: 08 22 00 00 00 00 50 86."

- id: get_backlight_brightness
  label: Get Backlight Brightness
  kind: query
  command: "04 21 08 D3"
  params: []

# --- Contrast (rows 6-7) ---
- id: set_contrast
  label: Set Contrast
  kind: action
  command: "08 22 01 00 00 00 {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "Contrast, 0-100 (e.g. 40 = 0x28)."
    - name: checksum
      type: byte
      description: "Filler byte so 8-byte sum ≡ 0 (mod 256). For value=40: 0xAD."
  notes: "Source: contrast changes are NOT saved on hard power-off (known bug). Example 40: 08 22 01 00 00 00 28 AD."

- id: get_contrast
  label: Get Contrast
  kind: query
  command: "04 21 09 D2"
  params: []

# --- Sharpness (rows 8-9) ---
- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "08 22 03 00 00 00 {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "Encoded byte = desired sharpness + 4. Range -4..4 maps to byte 0..8 (e.g. -4 -> 0x00, 4 -> 0x08)."
    - name: checksum
      type: byte
      description: "Filler byte so 8-byte sum ≡ 0 (mod 256). For value byte 0x00: 0xD3."
  notes: "Source example, sharpness -4 (byte 0x00): 08 22 03 00 00 00 00 D3."

- id: get_sharpness
  label: Get Sharpness
  kind: query
  command: "04 21 0A D1"
  params: []
  notes: "Returned value = sharpness setting + 4."

# --- Color temperature (rows 10-15) ---
- id: set_color_temp_4200k
  label: Set Color Temp 4200K
  kind: action
  command: "08 22 04 00 00 00 02 D0"
  params: []

- id: set_color_temp_5000k
  label: Set Color Temp 5000K
  kind: action
  command: "08 22 04 00 00 00 03 CF"
  params: []

- id: set_color_temp_6500k
  label: Set Color Temp 6500K
  kind: action
  command: "08 22 04 00 00 00 04 CE"
  params: []

- id: set_color_temp_7500k
  label: Set Color Temp 7500K
  kind: action
  command: "08 22 04 00 00 00 05 CD"
  params: []

- id: set_color_temp_9300k
  label: Set Color Temp 9300K
  kind: action
  command: "08 22 04 00 00 00 06 CC"
  params: []

- id: get_color_temp
  label: Get Color Temp
  kind: query
  command: "04 21 0B D0"
  params: []
  notes: "Returns 2=4200K, 3=5000K, 4=6500K, 5=7500K, 6=9300K."

# --- RGB gain (rows 16-21) ---
- id: set_red_gain
  label: Set Red Gain
  kind: action
  command: "08 22 0E 00 00 00 {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "Red gain, 0-100 (e.g. 50 = 0x32)."
    - name: checksum
      type: byte
      description: "Filler byte so 8-byte sum ≡ 0 (mod 256). For value=50: 0x96."
  notes: "Use RGB set commands to obtain custom color temperatures. Example 50: 08 22 0E 00 00 00 32 96."

- id: get_red_gain
  label: Get Red Gain
  kind: query
  command: "04 21 0C CF"
  params: []

- id: set_green_gain
  label: Set Green Gain
  kind: action
  command: "08 22 0F 00 00 00 {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "Green gain, 0-100 (e.g. 20 = 0x14)."
    - name: checksum
      type: byte
      description: "Filler byte so 8-byte sum ≡ 0 (mod 256). For value=20: 0xB3."
  notes: "Example 20: 08 22 0F 00 00 00 14 B3."

- id: get_green_gain
  label: Get Green Gain
  kind: query
  command: "04 21 0D CE"
  params: []

- id: set_blue_gain
  label: Set Blue Gain
  kind: action
  command: "08 22 10 00 00 00 {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "Blue gain, 0-100 (e.g. 80 = 0x50)."
    - name: checksum
      type: byte
      description: "Filler byte so 8-byte sum ≡ 0 (mod 256). For value=80: 0x76."
  notes: "Example 80: 08 22 10 00 00 00 50 76."

- id: get_blue_gain
  label: Get Blue Gain
  kind: query
  command: "04 21 0E CD"
  params: []

# --- Input select (rows 22-24) ---
- id: set_input_displayport
  label: Set Input DisplayPort
  kind: action
  command: "08 22 02 00 00 00 00 D4"
  params: []
  notes: "Sets DP as default source."

- id: set_input_hdmi
  label: Set Input HDMI
  kind: action
  command: "08 22 05 00 00 00 00 D1"
  params: []
  notes: "Sets HDMI as default source."

- id: set_input_vga
  label: Set Input VGA
  kind: action
  command: "08 22 06 00 00 00 00 D0"
  params: []
  notes: "Sets VGA as default source."

# --- Audio (rows 25-29) ---
- id: set_volume
  label: Set Volume
  kind: action
  command: "08 22 09 00 00 00 {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "Speaker volume, 0-100 (e.g. 100 = 0x64)."
    - name: checksum
      type: byte
      description: "Filler byte so 8-byte sum ≡ 0 (mod 256). For value=100: 0x69."
  notes: "Example 100: 08 22 09 00 00 00 64 69."

- id: get_volume
  label: Get Volume
  kind: query
  command: "04 21 0F CC"
  params: []

- id: set_mute_on
  label: Set Mute On
  kind: action
  command: "08 22 0A 00 00 00 01 CB"
  params: []
  notes: "Setting not saved on hard power-off (per source)."

- id: set_mute_off
  label: Set Mute Off
  kind: action
  command: "08 22 0A 00 00 00 00 CC"
  params: []

- id: get_mute
  label: Get Mute
  kind: query
  command: "04 21 14 C7"
  params: []
  notes: "Known bug: may not reflect mute state if mute was changed via serial commands; reflects OSD changes only (0=off,1=on)."

# --- Input / color space status (rows 30-33) ---
- id: get_input_status
  label: Get Input Status
  kind: query
  command: "04 21 07 D4"
  params: []
  notes: "Returns HDMI, VGA, or DPRx. If no source present, returns last searched source - pair with Get Power Status to confirm active source."

- id: set_color_space_full
  label: Set Color Space Full
  kind: action
  command: "08 22 12 00 00 00 00 C4"
  params: []

- id: set_color_space_srgb
  label: Set Color Space sRGB
  kind: action
  command: "08 22 13 00 00 00 02 C1"
  params: []

- id: get_color_space
  label: Get Color Space
  kind: query
  command: "04 21 15 C6"
  params: []
  notes: "Returns 0=full color, 2=sRGB."

# --- Adjust / reset (rows 34-36) ---
- id: auto_adjust
  label: Auto Adjust
  kind: action
  command: "08 22 07 00 00 00 00 CF"
  params: []
  notes: "Sync/timing auto adjust; only effective when VGA (analog) source present."

- id: auto_color_adjust
  label: Auto Color Adjust
  kind: action
  command: "08 22 08 00 00 00 00 CE"
  params: []
  notes: "Gray-level auto adjust; only effective when VGA source present."

- id: factory_reset
  label: Factory Reset
  kind: action
  command: "08 22 11 00 00 00 00 C5"
  params: []
  notes: "Restores all settings to factory defaults."

# --- Blacklevel brightness (rows 37-38) ---
- id: get_blacklevel_brightness
  label: Get Blacklevel Brightness
  kind: query
  command: "04 21 17 C4"
  params: []
  notes: "Returned value ranges -350 to 350; scale differs from the 0-255 OSD scale."

- id: set_blacklevel_brightness
  label: Set Blacklevel Brightness
  kind: action
  command: "08 22 16 00 00 00 {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "Blacklevel offset. Source shows positive example only (50 = 0x32)."
    - name: checksum
      type: byte
      description: "Filler byte so 8-byte sum ≡ 0 (mod 256). For value=50: 0x8E."
  notes: "Example 50: 08 22 16 00 00 00 32 8E. <!-- UNRESOLVED: encoding for negative values (-350..0) not shown in source; single value byte cannot natively represent the full -350..350 Get range - encoding for negatives is undocumented. -->"

# --- Auto scan (rows 39-41) ---
- id: get_auto_scan_status
  label: Get Auto Scan Status
  kind: query
  command: "04 21 18 C3"
  params: []
  notes: "Returns 1=on, 0=off."

- id: set_auto_scan_on
  label: Set Auto Scan On
  kind: action
  command: "08 22 17 00 00 00 01 BE"
  params: []
  notes: "Continually checks inputs for activity, starting from default/selected source."

- id: set_auto_scan_off
  label: Set Auto Scan Off
  kind: action
  command: "08 22 17 00 00 00 00 BF"
  params: []
  notes: "Only default/selected source can be active; suppresses LCD search pop-ups."

# --- HDMI full range (rows 42-44) ---
- id: get_hdmi_full_range
  label: Get HDMI Full Range
  kind: query
  command: "04 21 1A C1"
  params: []
  notes: "Returns 1=full range on, 0=limited range on, 2=user contrast/brightness in effect or source is VGA."

- id: set_hdmi_full_range_on
  label: Set HDMI Full Range On
  kind: action
  command: "08 22 19 00 00 00 01 BC"
  params: []
  notes: "Per-color range 0 (black) to 255 (white). Affects both HDMI and DisplayPort sources."

- id: set_hdmi_full_range_off
  label: Set HDMI Full Range Off
  kind: action
  command: "08 22 19 00 00 00 00 BD"
  params: []
  notes: "Limited range: 15 (black) to 235 (white) per color. Affects both HDMI and DisplayPort sources."
```

## Feedbacks
```yaml
# Observable states returned by Get commands (UDP/serial ASCII replies).
- id: power_state
  type: enum
  values: ["ON", "OFF", "OFF_NO_SOURCE"]
  description: 'Get Power Status replies: "Power: ON" when on; "Power:" when off; "Power: OFF" when on but no video source present.'

- id: backlight_brightness
  type: integer
  range: [1, 100]
  description: 'Reply format: "Backlight = value".'

- id: contrast
  type: integer
  range: [0, 100]
  description: 'Reply format: "Contrast = value".'

- id: sharpness
  type: integer
  range: [0, 8]
  description: 'Reply format: "Sharpness = value"; value = setting + 4.'

- id: color_temp
  type: enum
  values: [4200K, 5000K, 6500K, 7500K, 9300K]
  description: 'Reply format: "Color Temp = value" (2..6).'

- id: red_gain
  type: integer
  range: [0, 100]
  description: 'Reply format: "Red Color = value".'

- id: green_gain
  type: integer
  range: [0, 100]
  description: 'Reply format: "Green Color = value".'

- id: blue_gain
  type: integer
  range: [0, 100]
  description: 'Reply format: "Blue Color = value".'

- id: input_source
  type: enum
  values: [HDMI, VGA, DPRx]
  description: 'Reply from Get Input Status; may echo last-searched source when absent.'

- id: volume
  type: integer
  range: [0, 100]
  description: 'Reply format: "Volume = value".'

- id: mute_state
  type: enum
  values: [off, on]
  description: 'Reply format: "Mute = value" (0/1). Known bug: unreliable if mute changed via serial.'

- id: color_space
  type: enum
  values: [full, sRGB]
  description: 'Reply format: "Color Space = value" (0=full, 2=sRGB).'

- id: blacklevel_brightness
  type: integer
  range: [-350, 350]
  description: 'Reply format: "Brightness = value"; scale differs from OSD 0-255.'

- id: auto_scan_state
  type: enum
  values: [off, on]
  description: 'Reply format: "Auto Scan = value" (0/1).'

- id: hdmi_full_range_state
  type: enum
  values: [limited, full, user_or_vga]
  description: 'Reply format: "HDMI Full Range = value" (0=limited, 1=full, 2=user settings / VGA).'
```

## Variables
```yaml
# All settable parameters are represented as discrete Set Actions above
# (backlight brightness, contrast, sharpness, RGB gain, volume, blacklevel
# brightness, plus enumerated color-temp / color-space / mute / auto-scan /
# HDMI-range selections). No additional continuous variables to declare.
```

## Events
```yaml
# Source states SNMP uses "no traps". No unsolicited push notifications are
# documented for the RS-232 or UDP interfaces. Section not applicable.
events: []
```

## Macros
```yaml
# No multi-step command sequences described in source.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Never inferred.
```

## Notes
- **Source scope:** the protocol content comes from Planar's shared UltraLux "External Control and Monitoring" manual. The LUX70 ERO B is a discontinued 70" UltraLux-family display; no LUX70-model-specific protocol addendum was located (prior discovery attempts timed out — see recovery memo). Treat this as the platform-level command set; verify against a live unit before publishing.
- **Checksum:** source phrases the rule as "check sum = 100h". Operationally the sum of every command's bytes is a multiple of 256 (≡ 0 mod 0x100); the final byte is the filler that enforces this. Verify on-device before relying on it.
- **Command framing:** Set = 8 bytes (64 bits); Get = 4 bytes. RS-232 uses straight-through cables, 19200 baud, 8N1, no flow control.
- **UDP mirror:** UDP port 57 accepts the identical hex command frames as RS-232. The "Enable ASCII command service (UDP port 57)" checkbox on the Access Control page must be checked.
- **Known device bugs (per source):** contrast and mute settings are not retained across hard power-off; Get Mute may not reflect serial-driven mute changes.
- **SNMP (not modeled as control):** read-only monitoring via community string "public", MIB file `PLANAR-DISPLAY-MIB.txt`, root OID `1.3.6.1.4.1.19125`. Integer objects return -1 on internal/communication errors.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: model-specific LUX70 ERO B deviations from the UltraLux platform doc not confirmed. -->
<!-- UNRESOLVED: negative-value byte encoding for Set Blacklevel Brightness (-350..0) not documented. -->
<!-- UNRESOLVED: exact response terminator / line framing for serial/UDP replies not specified in source. -->

## Provenance

```yaml
source_domains:
  - planar.com
  - manualslib.com
source_urls:
  - https://www.planar.com/media/434375/020-1207-00e_ultralux-installation-guide.pdf
  - "https://www.manualslib.com/manual/3294572/Planar-Lux70-Ero-B.html?page=41"
  - https://www.manualslib.com/manual/3294572/Planar-Lux70-Ero-B.html
retrieved_at: 2026-07-25T09:31:12.882Z
last_checked_at: 2026-08-05T08:37:16.632Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:37:16.632Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions match the source command table, transport values are supported, and the full 44-command catalogue is represented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is the shared Planar UltraLux \"External Control and Monitoring\" manual; it does not state a firmware version, hardware revision, or model-specific deviations. Recovery notes indicate the LUX70 ERO B is discontinued and this UltraLux-platform doc is the closest available protocol reference."
- "SNMP monitoring (read-only, community \"public\", MIB PLANAR-DISPLAY-MIB)"
- "encoding for negative values (-350..0) not shown in source; single value byte cannot natively represent the full -350..350 Get range - encoding for negatives is undocumented. -->\""
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility not stated in source."
- "model-specific LUX70 ERO B deviations from the UltraLux platform doc not confirmed."
- "negative-value byte encoding for Set Blacklevel Brightness (-350..0) not documented."
- "exact response terminator / line framing for serial/UDP replies not specified in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
