---
spec_id: admin/dell-c5517h
schema_version: ai4av-public-spec-v1
revision: 1
title: "DELL C5517H Control Spec"
manufacturer: DELL
model_family: C5517H
aliases: []
compatible_with:
  manufacturers:
    - DELL
  models:
    - C5517H
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - dl.dell.com
  - manualslib.com
source_urls:
  - "https://dl.dell.com/manuals/all-products/esuprt_electronics/esuprt_display_projector/esuprt_display/dell-c5517h-monitor_User's%20Guide4_en-us.pdf"
  - https://www.manualslib.com/manual/1411812/Dell-C5517h.html
retrieved_at: 2026-06-12T02:48:16.329Z
last_checked_at: 2026-08-05T08:16:01.235Z
generated_at: 2026-08-05T08:16:01.235Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 pinout only partially shown in source; full DB9 pin assignment table is incomplete."
  - "populate from source, or remove section if not applicable"
  - "remove this comment and populate from source, or remove section if not applicable"
  - "source does not document explicit safety warnings, interlocks,"
  - "full DB9 pinout for unused pins not stated; firmware version compatibility range not stated."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:16:01.235Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions map one-to-one to source commands; transport parameters match the source's RS-232 settings table. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# DELL C5517H Control Spec

## Summary
Spec covers DELL C5517H commercial monitor RS-232C control protocol. PC-to-monitor framed binary protocol with 0x37/0x51 header, length byte, R/W flag, command opcode, optional data, XOR checksum. Monitor replies with 0x6F/0x37 header, length, reply (0x02), result code, mirrored command echo, and data. No auth required.

<!-- UNRESOLVED: RS-232 pinout only partially shown in source; full DB9 pin assignment table is incomplete. -->

## Transport
```yaml
protocols:
  - serial
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
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Actions
```yaml
# Header bytes: H0=0x37, H1=0x51 (PC→Monitor)
# Reply header: H2=0x6F, H3=0x37 (Monitor→PC)
# R/W: Read=0xEB, Write=0xEA; Reply=0x02
# Chk = XOR of all bytes from first byte (H0) through last data byte
# Frame template (PC→Monitor): 37 51 [Len] [R/W] [Cmd] [Data0..DataN] [Chk]
# Frame template (Reply):         6F 37 [Len] 02    [RC]   [Cmd] [Data0..DataN] [Chk]

# ── MONITOR MANAGEMENT ──────────────────────────────────────────
- id: get_monitor_name
  label: Get Monitor Name
  kind: query
  command: "37 51 02 EB 01 8E"   # XOR of 37,51,02,EB,01 = 8E
  params: []
  notes: |
    Returns ASCII string, max 10 characters.
    Example reply (name "Dell C5517H"):
      6F 37 0F 02 00 01 44 65 6C 6C 20 43 35 35 31 37 48 00 58

- id: get_monitor_serial_number
  label: Get Monitor Serial Number
  kind: query
  command: "37 51 02 EB 02 {checksum}"   # Len=2 (R/W + Cmd only), Chk computed
  params:
    - name: checksum
      type: byte
      description: XOR of bytes 0x37, 0x51, 0x02, 0xEB, 0x02
  notes: |
    Reply: 6F 37 10 02 [RC] 02 [Data0..DataC] Chk  (16-byte ASCII string)

- id: get_backlight_hours
  label: Get Backlight Hours
  kind: query
  command: "37 51 02 EB 04 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0x04
  notes: |
    Reply Data0..Data1 = WORD, 0-65535.

# ── POWER MANAGEMENT ────────────────────────────────────────────
- id: get_power_state
  label: Get Power State
  kind: query
  command: "37 51 02 EB 20 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0x20
  notes: "Data0: 0=off, 1=on"

- id: set_power_state
  label: Set Power State
  kind: action
  command: "37 51 03 EA 20 {value} {checksum}"
  params:
    - name: value
      type: byte
      description: "0 = off, 1 = on"
    - name: checksum
      type: byte
      description: XOR of all preceding bytes (0x37, 0x51, 0x03, 0xEA, 0x20, value)

- id: get_power_led
  label: Get Power LED
  kind: query
  command: "37 51 02 EB 21 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0x21
  notes: "Data0: 0=off during Active, 1=on during Active"

- id: set_power_led
  label: Set Power LED
  kind: action
  command: "37 51 03 EA 21 {value} {checksum}"
  params:
    - name: value
      type: byte
      description: "0 = off during Active, 1 = on during Active"
    - name: checksum
      type: byte
      description: XOR of all preceding bytes

- id: get_power_usb
  label: Get Power USB
  kind: query
  command: "37 51 02 EB 22 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0x22
  notes: "Data0: 0=off during Standby, 1=on during Standby"

- id: set_power_usb
  label: Set Power USB
  kind: action
  command: "37 51 03 EA 22 {value} {checksum}"
  params:
    - name: value
      type: byte
      description: "0 = off during Standby, 1 = on during Standby"
    - name: checksum
      type: byte
      description: XOR of all preceding bytes

- id: reset_power
  label: Reset Power
  kind: action
  command: "37 51 02 EA 2F {checksum}"   # Len=2 (R/W + Cmd only)
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEA, 0x2F
  notes: "Resets power management section. Reply: 6F 37 03 02 [RC] 2F Chk"

# ── IMAGE ADJUSTMENT ────────────────────────────────────────────
- id: get_brightness
  label: Get Brightness
  kind: query
  command: "37 51 02 EB 30 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0x30
  notes: "Data0: 0-100, increments of 1"

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "37 51 03 EA 30 {level} {checksum}"
  params:
    - name: level
      type: byte
      description: "Brightness 0-100, increments of 1"
    - name: checksum
      type: byte
      description: XOR of all preceding bytes

- id: get_contrast
  label: Get Contrast
  kind: query
  command: "37 51 02 EB 31 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0x31
  notes: "Data0: 0-100, increments of 1"

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "37 51 03 EA 31 {level} {checksum}"
  params:
    - name: level
      type: byte
      description: "Contrast 0-100, increments of 1"
    - name: checksum
      type: byte
      description: XOR of all preceding bytes

- id: get_aspect_ratio
  label: Get Aspect Ratio
  kind: query
  command: "37 51 02 EB 33 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0x33
  notes: "Data0: 0=Wide 16:9, 2=4:3, 4=5:4"

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  command: "37 51 03 EA 33 {value} {checksum}"
  params:
    - name: value
      type: byte
      description: "0 = Wide 16:9, 2 = 4:3, 4 = 5:4"
    - name: checksum
      type: byte
      description: XOR of all preceding bytes

- id: get_sharpness
  label: Get Sharpness
  kind: query
  command: "37 51 02 EB 34 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0x34
  notes: "Data0: 0-100, increments of 10"

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "37 51 03 EA 34 {level} {checksum}"
  params:
    - name: level
      type: byte
      description: "Sharpness 0-100, increments of 10"
    - name: checksum
      type: byte
      description: XOR of all preceding bytes

# ── COLOR MANAGEMENT ────────────────────────────────────────────
- id: get_color_temp_caps
  label: Get Color Temperature Capabilities
  kind: query
  command: "37 51 02 EB 42 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0x42
  notes: |
    Bitwise DWORD of supported color temperatures:
      0x00000001 = 5000K
      0x00000002 = 5700K
      0x00000004 = 6500K
      0x00000008 = 7500K
      0x00000010 = 9300K
      0x00000020 = 10000K

- id: get_color_temp
  label: Get Color Temperature
  kind: query
  command: "37 51 02 EB 43 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0x43
  notes: "Data0..Data3 = DWORD bitwise (see GetColorTempCaps encoding)"

- id: set_color_temp
  label: Set Color Temperature
  kind: action
  command: "37 51 06 EA 43 {d0} {d1} {d2} {d3} {checksum}"
  params:
    - name: d0
      type: byte
      description: "DWORD byte 0 (LSB) - see GetColorTempCaps bit values"
    - name: d1
      type: byte
      description: "DWORD byte 1"
    - name: d2
      type: byte
      description: "DWORD byte 2"
    - name: d3
      type: byte
      description: "DWORD byte 3 (MSB)"
    - name: checksum
      type: byte
      description: XOR of all preceding bytes

- id: get_input_color_format
  label: Get Input Color Format
  kind: query
  command: "37 51 02 EB 46 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0x46
  notes: "Data0: 0=RGB, 1=YPbPr"

- id: set_input_color_format
  label: Set Input Color Format
  kind: action
  command: "37 51 03 EA 46 {value} {checksum}"
  params:
    - name: value
      type: byte
      description: "0 = RGB, 1 = YPbPr"
    - name: checksum
      type: byte
      description: XOR of all preceding bytes

- id: get_color_preset_caps
  label: Get Color Preset Capabilities
  kind: query
  command: "37 51 02 EB 47 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0x47
  notes: |
    Bitwise DWORD of supported color presets:
      0x00000001 = Standard
      0x00000002 = Multimedia
      0x00000020 = Color Temp
      0x00000080 = Custom Color

- id: get_color_preset
  label: Get Color Preset
  kind: query
  command: "37 51 02 EB 48 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0x48
  notes: "Data0..Data3 = DWORD bitwise (see GetColorPresetCaps encoding)"

- id: set_color_preset
  label: Set Color Preset
  kind: action
  command: "37 51 06 EA 48 {d0} {d1} {d2} {d3} {checksum}"
  params:
    - name: d0
      type: byte
      description: "DWORD byte 0 (LSB) - see GetColorPresetCaps bit values"
    - name: d1
      type: byte
      description: "DWORD byte 1"
    - name: d2
      type: byte
      description: "DWORD byte 2"
    - name: d3
      type: byte
      description: "DWORD byte 3 (MSB)"
    - name: checksum
      type: byte
      description: XOR of all preceding bytes

- id: get_custom_color
  label: Get Custom Color
  kind: query
  command: "37 51 03 EB 49 {type} {checksum}"
  params:
    - name: type
      type: byte
      description: "Custom color type: 0=Gain"
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x03, 0xEB, 0x49, type
  notes: "Data0..Data2: R/G/B gain values, 0-100 each"

- id: set_custom_color
  label: Set Custom Color
  kind: action
  command: "37 51 06 EA 49 {type} {r} {g} {b} {checksum}"
  params:
    - name: type
      type: byte
      description: "Custom color type: 0=Gain"
    - name: r
      type: byte
      description: "Red gain 0-100"
    - name: g
      type: byte
      description: "Green gain 0-100"
    - name: b
      type: byte
      description: "Blue gain 0-100"
    - name: checksum
      type: byte
      description: XOR of all preceding bytes

- id: reset_color
  label: Reset Color
  kind: action
  command: "37 51 02 EA 4F {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEA, 0x4F
  notes: "Resets color management section. Reply: 6F 37 03 02 [RC] 4F Chk"

# ── VIDEO INPUT MANAGEMENT ──────────────────────────────────────
- id: get_auto_select
  label: Get Auto Select
  kind: query
  command: "37 51 02 EB 60 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0x60
  notes: "Data0: 0=off, 1=on"

- id: set_auto_select
  label: Set Auto Select
  kind: action
  command: "37 51 03 EA 60 {value} {checksum}"
  params:
    - name: value
      type: byte
      description: "0 = off, 1 = on"
    - name: checksum
      type: byte
      description: XOR of all preceding bytes

- id: get_video_input_caps
  label: Get Video Input Capabilities
  kind: query
  command: "37 51 02 EB 61 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0x61
  notes: |
    Bitwise DWORD of available video inputs:
      0x00000001 = HDMI1
      0x00000002 = HDMI2
      0x00000008 = DP1
      0x00000040 = VGA1

- id: get_video_input
  label: Get Video Input
  kind: query
  command: "37 51 02 EB 62 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0x62
  notes: "Data0..Data3 = DWORD bitwise (see GetVideoInputCaps encoding)"

- id: set_video_input
  label: Set Video Input
  kind: action
  command: "37 51 06 EA 62 {d0} {d1} {d2} {d3} {checksum}"
  params:
    - name: d0
      type: byte
      description: "DWORD byte 0 (LSB) - see GetVideoInputCaps bit values"
    - name: d1
      type: byte
      description: "DWORD byte 1"
    - name: d2
      type: byte
      description: "DWORD byte 2"
    - name: d3
      type: byte
      description: "DWORD byte 3 (MSB)"
    - name: checksum
      type: byte
      description: XOR of all preceding bytes

# ── OSD MANAGEMENT ──────────────────────────────────────────────
- id: set_osd_transparency
  label: Set OSD Transparency
  kind: action
  command: "37 51 03 EA 80 {value} {checksum}"
  params:
    - name: value
      type: byte
      description: "OSD transparency 0-100, increments of 20"
    - name: checksum
      type: byte
      description: XOR of all preceding bytes

- id: get_osd_transparency
  label: Get OSD Transparency
  kind: query
  command: "37 51 02 EB 80 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0x80
  notes: "Data0: 0-100, increments of 20"

- id: set_osd_language
  label: Set OSD Language
  kind: action
  command: "37 51 03 EA 81 {value} {checksum}"
  params:
    - name: value
      type: byte
      description: |
        Language code:
          0 = English
          1 = Español
          2 = Français
          3 = Deutsch
          4 = Português (Brasil)
          5 = Русский
          6 = 简体中文
          7 = 日本語
    - name: checksum
      type: byte
      description: XOR of all preceding bytes

- id: get_osd_language
  label: Get OSD Language
  kind: query
  command: "37 51 02 EB 81 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0x81
  notes: "Data0: see SetOSDLanguage language codes"

- id: set_osd_timer
  label: Set OSD Timer
  kind: action
  command: "37 51 03 EA 83 {value} {checksum}"
  params:
    - name: value
      type: byte
      description: "OSD timer 5-60 seconds, increments of 1"
    - name: checksum
      type: byte
      description: XOR of all preceding bytes

- id: get_osd_timer
  label: Get OSD Timer
  kind: query
  command: "37 51 02 EB 83 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0x83
  notes: "Data0: 5-60 seconds"

- id: set_osd_button_lock
  label: Set OSD Button Lock
  kind: action
  command: "37 51 03 EA 84 {value} {checksum}"
  params:
    - name: value
      type: byte
      description: "0 = Unlock, 1 = Lock"
    - name: checksum
      type: byte
      description: XOR of all preceding bytes

- id: get_osd_button_lock
  label: Get OSD Button Lock
  kind: query
  command: "37 51 02 EB 84 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0x84
  notes: "Data0: 0=Unlock, 1=Lock"

- id: reset_osd
  label: Reset OSD
  kind: action
  command: "37 51 02 EA 8F {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEA, 0x8F
  notes: "Resets OSD section. Reply: 6F 37 03 02 [RC] 8F Chk"

# ── SYSTEM MANAGEMENT ───────────────────────────────────────────
- id: get_version_firmware
  label: Get Firmware Version
  kind: query
  command: "37 51 02 EB A0 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0xA0
  notes: "Reply Data0..Data6 = 7-byte ASCII string"

- id: get_ddcci
  label: Get DDC/CI
  kind: query
  command: "37 51 02 EB A2 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0xA2
  notes: "Data0: 0=Disabled, 1=Enabled"

- id: set_ddcci
  label: Set DDC/CI
  kind: action
  command: "37 51 03 EA A2 {value} {checksum}"
  params:
    - name: value
      type: byte
      description: "0 = Disabled, 1 = Enabled"
    - name: checksum
      type: byte
      description: XOR of all preceding bytes

- id: get_lcd_conditioning
  label: Get LCD Conditioning
  kind: query
  command: "37 51 02 EB A3 {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEB, 0xA3
  notes: "Data0: 0=Disabled, 1=Enabled"

- id: set_lcd_conditioning
  label: Set LCD Conditioning
  kind: action
  command: "37 51 03 EA A3 {value} {checksum}"
  params:
    - name: value
      type: byte
      description: "0 = Disabled, 1 = Enabled"
    - name: checksum
      type: byte
      description: XOR of all preceding bytes

- id: factory_reset
  label: Factory Reset
  kind: action
  command: "37 51 02 EA AF {checksum}"
  params:
    - name: checksum
      type: byte
      description: XOR of 0x37, 0x51, 0x02, 0xEA, 0xAF
  notes: "Restores all settings to factory defaults. Reply: 6F 37 03 02 [RC] AF Chk"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  notes: "Returned by GetPowerState (cmd 0x20) - Data0: 0=off, 1=on"

- id: power_led
  type: enum
  values: [off_during_active, on_during_active]
  notes: "Returned by GetPowerLED (cmd 0x21)"

- id: power_usb
  type: enum
  values: [off_during_standby, on_during_standby]
  notes: "Returned by GetPowerUSB (cmd 0x22)"

- id: brightness
  type: integer
  range: [0, 100]
  notes: "Returned by GetBrightness (cmd 0x30), increments of 1"

- id: contrast
  type: integer
  range: [0, 100]
  notes: "Returned by GetContrast (cmd 0x31), increments of 1"

- id: aspect_ratio
  type: enum
  values: [wide_16_9, ratio_4_3, ratio_5_4]
  notes: "Returned by GetAspectRatio (cmd 0x33) - 0=Wide 16:9, 2=4:3, 4=5:4"

- id: sharpness
  type: integer
  range: [0, 100]
  notes: "Returned by GetSharpness (cmd 0x34), increments of 10"

- id: color_temp
  type: integer
  notes: |
    Bitwise DWORD returned by GetColorTemp (cmd 0x43).
    See GetColorTempCaps bit values (5000K=0x01, 5700K=0x02, 6500K=0x04,
    7500K=0x08, 9300K=0x10, 10000K=0x20).

- id: input_color_format
  type: enum
  values: [rgb, ypbpr]
  notes: "Returned by GetInputColorFormat (cmd 0x46) - 0=RGB, 1=YPbPr"

- id: color_preset
  type: integer
  notes: |
    Bitwise DWORD returned by GetColorPreset (cmd 0x48).
    See GetColorPresetCaps bit values (Standard=0x01, Multimedia=0x02,
    Color Temp=0x20, Custom Color=0x80).

- id: custom_color
  type: object
  notes: |
    Returned by GetCustomColor (cmd 0x49). Fields:
      type = 0 (Gain)
      r, g, b = 0-100 each
```

## Variables
```yaml
# Each Get/Set pair above functions as a settable variable.
# No additional variables beyond the image/color/OSD parameters above.
# UNRESOLVED: remove this comment and populate from source, or remove section if not applicable
```

## Events
```yaml
# Source does not document unsolicited notifications from the monitor.
# UNRESOLVED: remove this comment and populate from source, or remove section if not applicable
```

## Macros
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset
  - reset_power
  - reset_color
  - reset_osd
interlocks: []
# UNRESOLVED: source does not document explicit safety warnings, interlocks,
# or power-on sequencing requirements beyond noting RS232 cable is not provided by Dell.
```

## Notes
RS-232 cable not provided by Dell per source note 1. Protocol uses binary framed messages — no ASCII/text fallback documented. Checksum is single-byte XOR of all preceding bytes (H0..last data byte). No unsolicited event stream documented; communication is strictly request/response. Source explicitly omits DB9 pin signal details for pins 1, 4, 6, 9 (cable-side facing) and pin 9 (monitor-side facing) — only TXD (pin 2/3 crossover), RXD, GROUND (pin 5), and "Not Used" pins 7/8 enumerated. Length byte counts remaining bytes (R/W + Cmd + Data + Chk = 2+N+1 for writes; 2 for reads without data).

<!-- UNRESOLVED: full DB9 pinout for unused pins not stated; firmware version compatibility range not stated. -->

## Provenance

```yaml
source_domains:
  - dl.dell.com
  - manualslib.com
source_urls:
  - "https://dl.dell.com/manuals/all-products/esuprt_electronics/esuprt_display_projector/esuprt_display/dell-c5517h-monitor_User's%20Guide4_en-us.pdf"
  - https://www.manualslib.com/manual/1411812/Dell-C5517h.html
retrieved_at: 2026-06-12T02:48:16.329Z
last_checked_at: 2026-08-05T08:16:01.235Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:16:01.235Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions map one-to-one to source commands; transport parameters match the source's RS-232 settings table. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 pinout only partially shown in source; full DB9 pin assignment table is incomplete."
- "populate from source, or remove section if not applicable"
- "remove this comment and populate from source, or remove section if not applicable"
- "source does not document explicit safety warnings, interlocks,"
- "full DB9 pinout for unused pins not stated; firmware version compatibility range not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
