---
spec_id: admin/planar-luxxx-ero-b-t
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar UltraLux (LUXxx-ERO-B-T) Control Spec"
manufacturer: Planar
model_family: UltraLux
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - UltraLux
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
  - manua.ls
source_urls:
  - https://www.planar.com/media/434375/020-1207-00e_ultralux-installation-guide.pdf
  - https://www.planar.com/media/440010/ultrares-x-series_rs232-user-manual.pdf
  - https://www.planar.com/media/440011/ultrares-x-series_user-manual.pdf
  - https://www.planar.com/media/440932/planar-ultrares-p-series-rs232-user-manual.pdf
  - https://www.manua.ls/planar/ur8450-lx-ero-b-t/manual
retrieved_at: 2026-07-26T14:07:30.956Z
last_checked_at: 2026-08-05T08:37:12.534Z
generated_at: 2026-08-05T08:37:12.534Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact \"LUXxx-ERO-B-T\" model string not in current Planar catalog; mapped to UltraLux Series per source title. Firmware version not stated. Voltage/power specs not in source."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "exact LUXxx-ERO-B-T model identifier not present in Planar catalog; source titled \"UltraLux\" — LUX70-ERO-B-T etc. likely members. Firmware version range not stated. Power/voltage specs not in source. SNMP port (161) not explicitly stated in source. Whether UDP port 57 also returns query responses over UDP not explicitly stated (source only shows send side)."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:37:12.534Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions match the 44 RS232 command rows in the source one-to-one, transport params verified. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Planar UltraLux (LUXxx-ERO-B-T) Control Spec

## Summary
Planar UltraLux Series large-format LCD display (LUXxx-ERO-B-T family). External control via RS232 (binary hex commands, 8-byte Set / 4-byte Get, checksum=100h) and UDP port 57 (same command set). SNMP read-only monitoring also available. Source covers 44 RS232 command rows + UDP mirror + SNMP object table.

<!-- UNRESOLVED: exact "LUXxx-ERO-B-T" model string not in current Planar catalog; mapped to UltraLux Series per source title. Firmware version not stated. Voltage/power specs not in source. -->

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
  port: 57
auth:
  type: none
```

Serial config: 19200 8N1, no flow control (stated). UDP port 57 accepts identical command bytes; requires "Enable ASCII command service (UDP port 57)" checkbox in Remote Monitoring Access Control page. Straight-through RS232 cable.

## Traits
```yaml
traits:
  - powerable
  - queryable
  - routable
  - levelable
```

## Actions
```yaml
actions:
  - id: power_off
    label: Set Power Off
    kind: action
    command: "08 22 FE 00 00 00 00 D8"
    params: []
  - id: power_on
    label: Set Power On
    kind: action
    command: "08 22 FD 00 00 00 00 D9"
    params: []
  - id: power_status_query
    label: Get Power Status
    kind: query
    command: "04 21 16 C5"
    params: []
  - id: set_backlight_brightness
    label: Set Backlight Brightness
    kind: action
    command: "08 22 00 00 00 00 {value} {checksum}"
    params:
      - name: value
        type: integer
        range: [1, 100]
        description: Backlight brightness
      - name: checksum
        type: integer
        description: "Byte chosen so sum of all 8 bytes mod 256 = 0 (checksum=100h). e.g. value=80 (0x50) -> 86"
  - id: get_backlight_brightness
    label: Get Backlight Brightness
    kind: query
    command: "04 21 08 D3"
    params: []
  - id: set_contrast
    label: Set Contrast
    kind: action
    command: "08 22 01 00 00 00 {value} {checksum}"
    params:
      - name: value
        type: integer
        range: [0, 100]
        description: "Contrast (not saved on hard power off; known bug)"
      - name: checksum
        type: integer
        description: "Byte making 8-byte sum mod 256 = 0. e.g. value=40 (0x28) -> AD"
  - id: get_contrast
    label: Get Contrast
    kind: query
    command: "04 21 09 D2"
    params: []
  - id: set_sharpness
    label: Set Sharpness
    kind: action
    command: "08 22 03 00 00 00 {value} {checksum}"
    params:
      - name: value
        type: integer
        range: [0, 8]
        description: "Wire value = Sharpness setting + 4. Setting -4 -> 0x00; setting +4 -> 0x08"
      - name: checksum
        type: integer
        description: "Byte making 8-byte sum mod 256 = 0. setting -4 (0x00) -> D3"
  - id: get_sharpness
    label: Get Sharpness
    kind: query
    command: "04 21 0A D1"
    params: []
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
  - id: set_red_gain
    label: Set Red Gain
    kind: action
    command: "08 22 0E 00 00 00 {value} {checksum}"
    params:
      - name: value
        type: integer
        range: [0, 100]
        description: Red gain (custom color temp)
      - name: checksum
        type: integer
        description: "Byte making 8-byte sum mod 256 = 0. e.g. value=50 (0x32) -> 96"
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
        range: [0, 100]
        description: Green gain
      - name: checksum
        type: integer
        description: "Byte making 8-byte sum mod 256 = 0. e.g. value=20 (0x14) -> B3"
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
        range: [0, 100]
        description: Blue gain
      - name: checksum
        type: integer
        description: "Byte making 8-byte sum mod 256 = 0. e.g. value=80 (0x50) -> 76"
  - id: get_blue_gain
    label: Get Blue Gain
    kind: query
    command: "04 21 0E CD"
    params: []
  - id: select_input_displayport
    label: Set Input DisplayPort
    kind: action
    command: "08 22 02 00 00 00 00 D4"
    params: []
  - id: select_input_hdmi
    label: Set Input HDMI
    kind: action
    command: "08 22 05 00 00 00 00 D1"
    params: []
  - id: select_input_vga
    label: Set Input VGA
    kind: action
    command: "08 22 06 00 00 00 00 D0"
    params: []
  - id: get_input_status
    label: Get Input Status
    kind: query
    command: "04 21 07 D4"
    params: []
  - id: set_volume
    label: Set Volume
    kind: action
    command: "08 22 09 00 00 00 {value} {checksum}"
    params:
      - name: value
        type: integer
        range: [0, 100]
        description: Speaker volume
      - name: checksum
        type: integer
        description: "Byte making 8-byte sum mod 256 = 0. e.g. value=100 (0x64) -> 69"
  - id: get_volume
    label: Get Volume
    kind: query
    command: "04 21 0F CC"
    params: []
  - id: mute_on
    label: Set Mute On
    kind: action
    command: "08 22 0A 00 00 00 01 CB"
    params: []
  - id: mute_off
    label: Set Mute Off
    kind: action
    command: "08 22 0A 00 00 00 00 CC"
    params: []
  - id: get_mute
    label: Get Mute
    kind: query
    command: "04 21 14 C7"
    params: []
  - id: set_color_space_full
    label: Set Color Space Full Color
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
  - id: auto_adjust
    label: Do Auto Adjust
    kind: action
    command: "08 22 07 00 00 00 00 CF"
    params: []
  - id: auto_color_adjust
    label: Do Auto Color Adjust
    kind: action
    command: "08 22 08 00 00 00 00 CE"
    params: []
  - id: factory_reset
    label: Factory Reset
    kind: action
    command: "08 22 11 00 00 00 00 C5"
    params: []
  - id: get_blacklevel_brightness
    label: Get Blacklevel Brightness
    kind: query
    command: "04 21 17 C4"
    params: []
  - id: set_blacklevel_brightness
    label: Set Blacklevel Brightness
    kind: action
    command: "08 22 16 00 00 00 {value} {checksum}"
    params:
      - name: value
        type: integer
        range: [-350, 350]
        description: "Blacklevel offset (scale differs from OSD 0-255). e.g. value=50 (0x32) -> 8E"
      - name: checksum
        type: integer
        description: Byte making 8-byte sum mod 256 = 0
  - id: get_auto_scan
    label: Get Auto Scan Status
    kind: query
    command: "04 21 18 C3"
    params: []
  - id: set_auto_scan_on
    label: Set Auto Scan On
    kind: action
    command: "08 22 17 00 00 00 01 BE"
    params: []
  - id: set_auto_scan_off
    label: Set Auto Scan Off
    kind: action
    command: "08 22 17 00 00 00 00 BF"
    params: []
  - id: get_hdmi_full_range
    label: Get HDMI Full Range
    kind: query
    command: "04 21 1A C1"
    params: []
  - id: set_hdmi_full_range_on
    label: Set HDMI Full Range On
    kind: action
    command: "08 22 19 00 00 00 01 BC"
    params: []
  - id: set_hdmi_full_range_off
    label: Set HDMI Full Range Off
    kind: action
    command: "08 22 19 00 00 00 00 BD"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [on, off, on_no_source]
    description: "Get Power Status reply: 'Power: ON' / 'Power:' (off) / 'Power: OFF' (on, no source)"
  - id: backlight_brightness
    type: number
    range: [1, 100]
  - id: contrast
    type: number
    range: [0, 100]
  - id: sharpness
    type: number
    range: [-4, 4]
  - id: color_temp
    type: enum
    values: [4200K, 5000K, 6500K, 7500K, 9300K]
  - id: red_gain
    type: number
    range: [0, 100]
  - id: green_gain
    type: number
    range: [0, 100]
  - id: blue_gain
    type: number
    range: [0, 100]
  - id: input_source
    type: enum
    values: [HDMI, VGA, DisplayPort]
  - id: volume
    type: number
    range: [0, 100]
  - id: mute
    type: enum
    values: [on, off]
  - id: color_space
    type: enum
    values: [full, sRGB]
  - id: blacklevel_brightness
    type: number
    range: [-350, 350]
  - id: auto_scan
    type: enum
    values: [on, off]
  - id: hdmi_full_range
    type: enum
    values: [on, off, user_or_vga]
```

## Variables
```yaml
variables: []
```

All settable params exposed as actions above (set_*). No discrete non-action variables.

## Events
```yaml
events: []
```

Source states no SNMP traps; no unsolicited RS232/UDP push notifications documented.

## Macros
```yaml
macros: []
```

Source documents web-UI "Custom Commands" (10 user buttons) but no protocol-level multi-step macros.

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

<!-- UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements. -->

## Notes

Command framing: every Set = 8 bytes; every Get = 4 bytes. Last byte is checksum chosen so sum of all bytes mod 256 = 0 (source calls this "check sum = 100h" = 256 decimal). Example verbatim from source: Set Backlight 80 = `08 22 00 00 00 00 50 86` (0x08+0x22+0+0+0+0+0x50+0x86 = 256 = 0x100). For parameterized commands, compute checksum from chosen value.

Known bugs called out in source:
- Contrast not saved on hard power off.
- Mute not saved on hard power off.
- Get Mute may not reflect serial-changed mute state (only OSD-changed); known bug.

Get Input Status returns last searched source if none present — pair with Get Power Status to confirm active source.

Sharpness wire encoding: setting -4 -> byte 0x00; setting +4 -> byte 0x08 (offset +4). Get Sharpness returns setting+4.

SNMP monitoring (separate from RS232/UDP control): UDP/SNMP read-only, community "public", MIB file `PLANAR-DISPLAY-MIB.txt`, root OID 1.3.6.1.4.1.19125. Objects: plnrModel, plnrInputSelect (1=HDMI,2=DP,3=VGA), plnrInputStatus, plnrDisplayBacklight, plnrDisplayBrightness, plnrDisplayContrast, plnrDisplaySharpness (0-8), plnrDisplayColorSpace, plnrDisplayColorTemp, plnrDisplayGainRed/Green/Blue, plnrAudioVolume, plnrAudioMute, plnrPower1, plnrPower2. Integer -1 = internal/comm error.

Color Space SNMP codes differ from RS232: SNMP 0=full/2=sRGB; RS232 Get Color Space returns "Color Space = value".

<!-- UNRESOLVED: exact LUXxx-ERO-B-T model identifier not present in Planar catalog; source titled "UltraLux" — LUX70-ERO-B-T etc. likely members. Firmware version range not stated. Power/voltage specs not in source. SNMP port (161) not explicitly stated in source. Whether UDP port 57 also returns query responses over UDP not explicitly stated (source only shows send side). -->

## Provenance

```yaml
source_domains:
  - planar.com
  - manua.ls
source_urls:
  - https://www.planar.com/media/434375/020-1207-00e_ultralux-installation-guide.pdf
  - https://www.planar.com/media/440010/ultrares-x-series_rs232-user-manual.pdf
  - https://www.planar.com/media/440011/ultrares-x-series_user-manual.pdf
  - https://www.planar.com/media/440932/planar-ultrares-p-series-rs232-user-manual.pdf
  - https://www.manua.ls/planar/ur8450-lx-ero-b-t/manual
retrieved_at: 2026-07-26T14:07:30.956Z
last_checked_at: 2026-08-05T08:37:12.534Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:37:12.534Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions match the 44 RS232 command rows in the source one-to-one, transport params verified. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact \"LUXxx-ERO-B-T\" model string not in current Planar catalog; mapped to UltraLux Series per source title. Firmware version not stated. Voltage/power specs not in source."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "exact LUXxx-ERO-B-T model identifier not present in Planar catalog; source titled \"UltraLux\" — LUX70-ERO-B-T etc. likely members. Firmware version range not stated. Power/voltage specs not in source. SNMP port (161) not explicitly stated in source. Whether UDP port 57 also returns query responses over UDP not explicitly stated (source only shows send side)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
