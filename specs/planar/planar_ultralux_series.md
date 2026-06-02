---
spec_id: admin/planar-ultralux-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar UltraLux Series Control Spec"
manufacturer: Planar
model_family: "Planar UltraLux Series"
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - "Planar UltraLux Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/434375/020-1207-00e_ultralux-installation-guide.pdf
retrieved_at: 2026-05-02T21:44:10.697Z
last_checked_at: 2026-06-02T22:13:13.668Z
generated_at: 2026-06-02T22:13:13.668Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model variants within UltraLux Series not specified"
  - "SNMP is read-only monitoring only — not a control protocol"
  - "no unsolicited notification events described in source"
  - "no multi-step sequences described in source"
  - "source mentions \"hard power\" vs \"soft power\" distinction but no"
  - "SNMP details not fully represented as a separate transport — SNMP is monitoring-only"
  - "exact Blacklevel Brightness value range for set command — get returns -350 to 350 but set example shows value 50"
  - "firmware version compatibility not stated in source"
  - "command timing / inter-command delay requirements not stated"
  - "RS232 cable pinout not specified beyond \"standard straight-through\""
verification:
  verdict: verified
  checked_at: 2026-06-02T22:13:13.668Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-03
---

# Planar UltraLux Series Control Spec

## Summary
Planar UltraLux Series large-format LCD display with RS-232 serial and UDP control. Binary hex command protocol (8-byte set commands, 4-byte get commands) with 100h checksum. Also supports read-only SNMP monitoring.

<!-- UNRESOLVED: exact model variants within UltraLux Series not specified -->
<!-- UNRESOLVED: SNMP is read-only monitoring only — not a control protocol -->

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
  flow_control: none
addressing:
  port: 57  # UDP port accepts same RS232 command set
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # power on/off commands
  - queryable    # get commands returning current values
  - levelable    # brightness, contrast, volume, color gain control
  - routable     # input source selection (DisplayPort, HDMI, VGA)
```

## Actions
```yaml
actions:
  - id: power_off
    label: Power Off
    kind: action
    description: Set display to soft power off mode, backlight off
    command: "08 22 FE 00 00 00 00 D8"
    params: []

  - id: power_on
    label: Power On
    kind: action
    description: Set display to soft power on mode, backlight on if video source present
    command: "08 22 FD 00 00 00 00 D9"
    params: []

  - id: set_backlight_brightness
    label: Set Backlight Brightness
    kind: action
    description: Set backlight brightness to specified value
    command_prefix: "08 22 00 00 00 00"
    params:
      - name: brightness
        type: integer
        min: 1
        max: 100
        description: Brightness value (1-100)

  - id: set_contrast
    label: Set Contrast
    kind: action
    description: Set contrast value. Note: contrast changes not saved when hard power turned off (known bug)
    command_prefix: "08 22 01 00 00 00"
    params:
      - name: contrast
        type: integer
        min: 0
        max: 100
        description: Contrast value (0-100)

  - id: set_sharpness
    label: Set Sharpness
    kind: action
    description: Set sharpness. Value 0 = -4, value 8 = +4
    command_prefix: "08 22 03 00 00 00"
    params:
      - name: sharpness
        type: integer
        min: 0
        max: 8
        description: "Sharpness raw value (0=-4, 4=0, 8=+4)"

  - id: set_color_temp_4200k
    label: Set Color Temperature 4200K
    kind: action
    description: Set color temperature to 4200K
    command: "08 22 04 00 00 00 02 D0"
    params: []

  - id: set_color_temp_5000k
    label: Set Color Temperature 5000K
    kind: action
    description: Set color temperature to 5000K
    command: "08 22 04 00 00 00 03 CF"
    params: []

  - id: set_color_temp_6500k
    label: Set Color Temperature 6500K
    kind: action
    description: Set color temperature to 6500K
    command: "08 22 04 00 00 00 04 CE"
    params: []

  - id: set_color_temp_7500k
    label: Set Color Temperature 7500K
    kind: action
    description: Set color temperature to 7500K
    command: "08 22 04 00 00 00 05 CD"
    params: []

  - id: set_color_temp_9300k
    label: Set Color Temperature 9300K
    kind: action
    description: Set color temperature to 9300K
    command: "08 22 04 00 00 00 06 CC"
    params: []

  - id: set_red_gain
    label: Set Red Gain
    kind: action
    description: Set red color gain. Use RGB set commands for custom color temperatures
    command_prefix: "08 22 0E 00 00 00"
    params:
      - name: red
        type: integer
        min: 0
        max: 100
        description: Red gain value (0-100)

  - id: set_green_gain
    label: Set Green Gain
    kind: action
    description: Set green color gain
    command_prefix: "08 22 0F 00 00 00"
    params:
      - name: green
        type: integer
        min: 0
        max: 100
        description: Green gain value (0-100)

  - id: set_blue_gain
    label: Set Blue Gain
    kind: action
    description: Set blue color gain
    command_prefix: "08 22 10 00 00 00"
    params:
      - name: blue
        type: integer
        min: 0
        max: 100
        description: Blue gain value (0-100)

  - id: set_input_displayport
    label: Select Input DisplayPort
    kind: action
    description: Set input source to DisplayPort, becomes default source
    command: "08 22 02 00 00 00 00 D4"
    params: []

  - id: set_input_hdmi
    label: Select Input HDMI
    kind: action
    description: Set input source to HDMI, becomes default source
    command: "08 22 05 00 00 00 00 D1"
    params: []

  - id: set_input_vga
    label: Select Input VGA
    kind: action
    description: Set input source to VGA, becomes default source
    command: "08 22 06 00 00 00 00 D0"
    params: []

  - id: set_volume
    label: Set Volume
    kind: action
    description: Set speaker volume
    command_prefix: "08 22 09 00 00 00"
    params:
      - name: volume
        type: integer
        min: 0
        max: 100
        description: Volume level (0-100)

  - id: mute_on
    label: Mute On
    kind: action
    description: Activate audio mute. Note: not saved when hard power turned off
    command: "08 22 0A 00 00 00 01 CB"
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    description: Deactivate audio mute
    command: "08 22 0A 00 00 00 00 CC"
    params: []

  - id: set_color_space_full
    label: Set Color Space Full Color
    kind: action
    description: Set color space to full color
    command: "08 22 12 00 00 00 00 C4"
    params: []

  - id: set_color_space_srgb
    label: Set Color Space sRGB
    kind: action
    description: Set color space to sRGB
    command: "08 22 13 00 00 00 02 C1"
    params: []

  - id: auto_adjust
    label: Auto Adjust
    kind: action
    description: Perform sync/timing auto adjust if VGA source is present
    command: "08 22 07 00 00 00 00 CF"
    params: []

  - id: auto_color_adjust
    label: Auto Color Adjust
    kind: action
    description: Perform gray level auto adjust if VGA source is present
    command: "08 22 08 00 00 00 00 CE"
    params: []

  - id: factory_reset
    label: Factory Reset
    kind: action
    description: Restore all settings to factory defaults
    command: "08 22 11 00 00 00 00 C5"
    params: []

  - id: set_blacklevel_brightness
    label: Set Blacklevel Brightness
    kind: action
    description: Set offset for color range to adjust definition of black
    command_prefix: "08 22 16 00 00 00"
    params:
      - name: blacklevel
        type: integer
        min: 0
        max: 100
        description: "Blacklevel brightness value"

  - id: set_auto_scan_on
    label: Set Auto Scan On
    kind: action
    description: Enable auto scan - source inputs checked for activity starting with default/selected source
    command: "08 22 17 00 00 00 01 BE"
    params: []

  - id: set_auto_scan_off
    label: Set Auto Scan Off
    kind: action
    description: Disable auto scan - only default/selected source active, suppresses pop-up search windows
    command: "08 22 17 00 00 00 00 BF"
    params: []

  - id: set_hdmi_full_range_on
    label: Set HDMI Full Range On
    kind: action
    description: Set HDMI full range (0-255 per color). Impacts HDMI and DisplayPort sources
    command: "08 22 19 00 00 00 01 BC"
    params: []

  - id: set_hdmi_full_range_off
    label: Set HDMI Full Range Off
    kind: action
    description: Set HDMI limited range (15-235 per color). Impacts HDMI and DisplayPort sources
    command: "08 22 19 00 00 00 00 BD"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_status
    label: Power Status
    type: enum
    command: "04 21 16 C5"
    values:
      - "Power: ON"
      - "Power:"
      - "Power: OFF"
    description: "Returns 'Power: ON' if on; 'Power:' if off; 'Power: OFF' if on but no video source"

  - id: backlight_brightness
    label: Backlight Brightness
    type: integer
    command: "04 21 08 D3"
    description: "Returns 'Backlight = value'"

  - id: contrast
    label: Contrast
    type: integer
    command: "04 21 09 D2"
    description: "Returns 'Contrast = value'"

  - id: sharpness
    label: Sharpness
    type: integer
    command: "04 21 0A D1"
    description: "Returns 'Sharpness = value' where value is setting + 4"

  - id: color_temp
    label: Color Temperature
    type: enum
    command: "04 21 0B D0"
    values: [2, 3, 4, 5, 6]
    description: "Returns 'Color Temp = value' where 2=4200K, 3=5000K, 4=6500K, 5=7500K, 6=9300K"

  - id: red_gain
    label: Red Gain
    type: integer
    command: "04 21 0C CF"
    description: "Returns 'Red Color = value'"

  - id: green_gain
    label: Green Gain
    type: integer
    command: "04 21 0D CE"
    description: "Returns 'Green Color = value'"

  - id: blue_gain
    label: Blue Gain
    type: integer
    command: "04 21 0E CD"
    description: "Returns 'Blue Color = value'"

  - id: input_status
    label: Input Status
    type: enum
    command: "04 21 07 D4"
    values: [HDMI, VGA, DPRx]
    description: "Returns current input source. If no source present, returns last source searched"

  - id: volume
    label: Volume
    type: integer
    command: "04 21 0F CC"
    description: "Returns 'Volume = value'"

  - id: mute_status
    label: Mute Status
    type: enum
    command: "04 21 14 C7"
    values: [0, 1]
    description: "Returns 'Mute = value' (0=off, 1=on). May not reflect actual mute if changed by serial commands (known bug)"

  - id: color_space
    label: Color Space
    type: enum
    command: "04 21 15 C6"
    description: "Returns 'Color Space = value'"

  - id: blacklevel_brightness
    label: Blacklevel Brightness
    type: integer
    command: "04 21 17 C4"
    description: "Returns 'Brightness = value' ranging from -350 to 350 (different scale than OSD 0-255)"

  - id: auto_scan_status
    label: Auto Scan Status
    type: enum
    command: "04 21 18 C3"
    values: [0, 1]
    description: "Returns 'Auto Scan = value' where 1=on, 0=off"

  - id: hdmi_full_range
    label: HDMI Full Range
    type: enum
    command: "04 21 1A C1"
    values: [0, 1, 2]
    description: "Returns 'HDMI Full Range = value' where 1=full range on, 0=limited range, 2=user-selected settings or VGA input"
```

## Variables
```yaml
# No settable parameters beyond discrete actions - all parameterized controls are captured in Actions.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions "hard power" vs "soft power" distinction but no
# explicit safety interlock procedures or power-on sequencing requirements stated
```

## Notes

**Command format:** Binary hex protocol. Set commands are 8 bytes; Get commands are 4 bytes. Last byte is checksum chosen to force total to 100h. Parameterized commands use byte 7 for value; byte 8 adjusts for checksum.

**UDP transport:** UDP port 57 accepts the identical RS232 hex command set. The "Enable ASCII command service (UDP port 57)" checkbox must be enabled on the Access Control page of the Remote Monitoring web interface.

**Known bugs documented in source:**
- Contrast changes not saved when hard power turned off
- Mute status query may not reflect actual state if mute was changed by serial commands
- Sharpness get returns value = setting + 4 (offset by 4)

**SNMP monitoring:** Read-only SNMP supported (community string "public", MIB: PLANARDISPLAY-MIB.txt, OID root 1.3.6.1.4.1.19125). SNMP objects are read-only with no traps.

<!-- UNRESOLVED: SNMP details not fully represented as a separate transport — SNMP is monitoring-only -->
<!-- UNRESOLVED: exact Blacklevel Brightness value range for set command — get returns -350 to 350 but set example shows value 50 -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: command timing / inter-command delay requirements not stated -->
<!-- UNRESOLVED: RS232 cable pinout not specified beyond "standard straight-through" -->

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/434375/020-1207-00e_ultralux-installation-guide.pdf
retrieved_at: 2026-05-02T21:44:10.697Z
last_checked_at: 2026-06-02T22:13:13.668Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:13:13.668Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model variants within UltraLux Series not specified"
- "SNMP is read-only monitoring only — not a control protocol"
- "no unsolicited notification events described in source"
- "no multi-step sequences described in source"
- "source mentions \"hard power\" vs \"soft power\" distinction but no"
- "SNMP details not fully represented as a separate transport — SNMP is monitoring-only"
- "exact Blacklevel Brightness value range for set command — get returns -350 to 350 but set example shows value 50"
- "firmware version compatibility not stated in source"
- "command timing / inter-command delay requirements not stated"
- "RS232 cable pinout not specified beyond \"standard straight-through\""
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
