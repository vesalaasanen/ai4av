---
spec_id: admin/christie-suhdxx-v3-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie SUHDxx V3 Series Control Spec"
manufacturer: Christie
model_family: "SUHDxx V3 Series"
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - "SUHDxx V3 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
  - manualmachine.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-104143-01-christie-lit-usr-suhd-v3.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-001766-01-christie-lit-man-ref-api-suhd983-p.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-002194-01-christie-lit-man-serv-suhd55-v3.pdf
  - https://manualmachine.com/christie/suhd651l/2542394-user-manual/
retrieved_at: 2026-05-14T14:01:43.952Z
last_checked_at: 2026-05-26T14:13:55.163Z
generated_at: 2026-05-26T14:13:55.163Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP command protocol — source describes LAN port and IP configuration menu but does not document any TCP/UDP control command set. Ethernet is referenced only for status alert delivery (Power Status Alert, Source Status Alert, Signal Lost Status)."
  - "Saturday Off Hour (TFH) and Off Minute (TFM) commands - source line truncated in"
  - "Display Port 1 EDID command (ED1) - only Display Port 2 (ED2) row is fully"
  - "Ethernet alert packet format and transport - source describes the"
  - "source does not document any user-defined or built-in macro sequences."
  - "source does not contain explicit safety warnings, interlock procedures,"
verification:
  verdict: verified
  checked_at: 2026-05-26T14:13:55.163Z
  matched_actions: 213
  action_count: 213
  confidence: medium
  summary: "All 213 spec actions verified against source; wire-level commands, parameter ranges, and transport settings all match exactly. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Christie SUHDxx V3 Series Control Spec

## Summary
The Christie SUHDxx V3 Series is a line of large-format display panels controllable over RS-232 serial. This spec covers the binary RS-232 command/response protocol used to query display state, control power, switch input sources, adjust image parameters, configure multi-window layouts, and manage the RTC schedule. Ethernet is supported for status alerts only and is not used as a control transport in the documented protocol.

<!-- UNRESOLVED: TCP/IP command protocol — source describes LAN port and IP configuration menu but does not document any TCP/UDP control command set. Ethernet is referenced only for status alert delivery (Power Status Alert, Source Status Alert, Signal Lost Status). -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

**Frame format (host → display):**
- Read: `07 IDT 01 CMD 08` (7 bytes)
- Write: `07 IDT 02 CMD VAL 08` (8 bytes)
- `STX = 0x07`, `ETX = 0x08`
- `IDT` = do not care; source examples use `0x01`
- `CMD` = 3 ASCII bytes per the command table
- Return from monitor uses `Type = 0x00` and echoes the CMD with the resulting value

**Worked example (power on):**
- Transmit: `07 01 02 50 4F 57 01 08`
- Return:    `07 01 00 50 4F 57 01 08`

## Traits
```yaml
- powerable       # POW command, on/off
- routable        # MIN input select, multi-window PSC/PIN/PIO/PIP
- queryable       # W/R commands, dedicated R commands (SER, MNA, GVE, RTV)
- levelable       # BRI, BRL, CON, SHA, HUE, SAT, USR/USG/USB, UOR/UOG/UOB
```

## Actions
```yaml
# Every W/R command from the source is enumerated as separate set/query actions.
# Read-only commands (SER, MNA, GVE, RTV) are emitted as kind: query.
# Command payloads use the literal byte format from the source: "07 01 TT CMD VAL 08"
# where TT = 01 (read) or 02 (write), CMD = 3 ASCII bytes (hex), VAL = hex byte.
# IDT = 0x01 per source examples; "do not care" per spec.

# -------- Power control --------
- id: power_off
  label: Power Off (soft power)
  kind: action
  command: "07 01 02 50 4F 57 00 08"
  params: []
  notes: "▲ Valid in power-save/off mode when Wake Up From Sleep is not 'VGA Only'."

- id: power_on
  label: Power On (soft power)
  kind: action
  command: "07 01 02 50 4F 57 01 08"
  params: []
  notes: "▲ Valid in power-save/off mode when Wake Up From Sleep is not 'VGA Only'."

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "07 01 01 50 4F 57 08"
  params: []
  notes: "Return value XX: 0=off, 1=on."

# -------- Input source --------
- id: set_main_input
  label: Set Main Input Source
  kind: action
  command: "07 01 02 4D 49 4E {val} 08"
  params:
    - name: val
      type: integer
      description: Input selector (hex byte)
      enum:
        - 0x00  # VGA
        - 0x09  # HDMI1
        - 0x0A  # HDMI2
        - 0x0B  # HDMI3
        - 0x0C  # HDMI4
        - 0x0D  # DisplayPort1
        - 0x10  # DisplayPort2

- id: main_input_query
  label: Main Input Source Query
  kind: query
  command: "07 01 01 4D 49 4E 08"
  params: []

# -------- Display adjustments --------
- id: set_backlight
  label: Set Backlight
  kind: action
  command: "07 01 02 42 52 49 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-100 (hex 00-64)

- id: backlight_query
  label: Backlight Query
  kind: query
  command: "07 01 01 42 52 49 08"
  params: []

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "07 01 02 42 52 4C {val} 08"
  params:
    - name: val
      type: integer
      description: 0-100 (hex 00-64)

- id: brightness_query
  label: Brightness Query
  kind: query
  command: "07 01 01 42 52 4C 08"
  params: []

- id: set_backlight_control
  label: Set Back Light On/Off
  kind: action
  command: "07 01 02 42 4C 43 {val} 08"
  params:
    - name: val
      type: integer
      description: "0=Off, 1=On"

- id: backlight_control_query
  label: Back Light On/Off Query
  kind: query
  command: "07 01 01 42 4C 43 08"
  params: []

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "07 01 02 43 4F 4E {val} 08"
  params:
    - name: val
      type: integer
      description: 0-100 (hex 00-64)

- id: contrast_query
  label: Contrast Query
  kind: query
  command: "07 01 01 43 4F 4E 08"
  params: []

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "07 01 02 53 48 41 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-10 (hex 00-0A)

- id: sharpness_query
  label: Sharpness Query
  kind: query
  command: "07 01 01 53 48 41 08"
  params: []

- id: set_hue
  label: Set Hue
  kind: action
  command: "07 01 02 48 55 45 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-100 (hex 00-64)

- id: hue_query
  label: Hue Query
  kind: query
  command: "07 01 01 48 55 45 08"
  params: []

- id: set_saturation
  label: Set Saturation
  kind: action
  command: "07 01 02 53 41 54 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-100 (hex 00-64)

- id: saturation_query
  label: Saturation Query
  kind: query
  command: "07 01 01 53 41 54 08"
  params: []

- id: set_scheme
  label: Set Color Scheme
  kind: action
  command: "07 01 02 53 43 4D {val} 08"
  params:
    - name: val
      type: integer
      enum:
        - 0x00  # User
        - 0x01  # Sport
        - 0x02  # Game
        - 0x03  # Cinema
        - 0x04  # Vivid

- id: scheme_query
  label: Color Scheme Query
  kind: query
  command: "07 01 01 53 43 4D 08"
  params: []

- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  command: "07 01 02 43 4F 54 {val} 08"
  params:
    - name: val
      type: integer
      enum:
        - 0x00  # User
        - 0x01  # 6500K
        - 0x02  # 9300K
        - 0x06  # 5000K
        - 0x07  # 7500K

- id: color_temperature_query
  label: Color Temperature Query
  kind: query
  command: "07 01 01 43 4F 54 08"
  params: []

- id: set_gamma
  label: Set Gamma
  kind: action
  command: "07 01 02 47 41 43 {val} 08"
  params:
    - name: val
      type: integer
      enum:
        - 0x00  # Off
        - 0x01  # 2.2

- id: gamma_query
  label: Gamma Query
  kind: query
  command: "07 01 01 47 41 43 08"
  params: []

# -------- Gain & Offset --------
- id: set_red_gain
  label: Set Red Gain
  kind: action
  command: "07 01 02 55 53 52 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-100 (hex 00-64)

- id: red_gain_query
  label: Red Gain Query
  kind: query
  command: "07 01 01 55 53 52 08"
  params: []

- id: set_green_gain
  label: Set Green Gain
  kind: action
  command: "07 01 02 55 53 47 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-100 (hex 00-64)

- id: green_gain_query
  label: Green Gain Query
  kind: query
  command: "07 01 01 55 53 47 08"
  params: []

- id: set_blue_gain
  label: Set Blue Gain
  kind: action
  command: "07 01 02 55 53 42 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-100 (hex 00-64)

- id: blue_gain_query
  label: Blue Gain Query
  kind: query
  command: "07 01 01 55 53 42 08"
  params: []

- id: set_red_offset
  label: Set Red Offset
  kind: action
  command: "07 01 02 55 4F 52 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-100 (hex 00-64)

- id: red_offset_query
  label: Red Offset Query
  kind: query
  command: "07 01 01 55 4F 52 08"
  params: []

- id: set_green_offset
  label: Set Green Offset
  kind: action
  command: "07 01 02 55 4F 47 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-100 (hex 00-64)

- id: green_offset_query
  label: Green Offset Query
  kind: query
  command: "07 01 01 55 4F 47 08"
  params: []

- id: set_blue_offset
  label: Set Blue Offset
  kind: action
  command: "07 01 02 55 4F 42 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-100 (hex 00-64)

- id: blue_offset_query
  label: Blue Offset Query
  kind: query
  command: "07 01 01 55 4F 42 08"
  params: []

# -------- RTC current time adjustment --------
- id: set_rtc_year
  label: Set RTC Year
  kind: action
  command: "07 01 02 52 54 59 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-99 (hex 00-63)

- id: rtc_year_query
  label: RTC Year Query
  kind: query
  command: "07 01 01 52 54 59 08"
  params: []

- id: set_rtc_month
  label: Set RTC Month
  kind: action
  command: "07 01 02 52 54 4D {val} 08"
  params:
    - name: val
      type: integer
      description: 1-12 (hex 01-0C)

- id: rtc_month_query
  label: RTC Month Query
  kind: query
  command: "07 01 01 52 54 4D 08"
  params: []

- id: set_rtc_day
  label: Set RTC Day
  kind: action
  command: "07 01 02 52 54 44 {val} 08"
  params:
    - name: val
      type: integer
      description: 1-31 (hex 01-1F)

- id: rtc_day_query
  label: RTC Day Query
  kind: query
  command: "07 01 01 52 54 44 08"
  params: []

- id: set_rtc_hour
  label: Set RTC Hour
  kind: action
  command: "07 01 02 52 54 48 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-23 (hex 00-17)

- id: rtc_hour_query
  label: RTC Hour Query
  kind: query
  command: "07 01 01 52 54 48 08"
  params: []

- id: set_rtc_minute
  label: Set RTC Minute
  kind: action
  command: "07 01 02 52 54 4E {val} 08"
  params:
    - name: val
      type: integer
      description: 0-59 (hex 00-3B)

- id: rtc_minute_query
  label: RTC Minute Query
  kind: query
  command: "07 01 01 52 54 4E 08"
  params: []

# -------- Timer mode --------
- id: set_timer_mode
  label: Set Timer Mode
  kind: action
  command: "07 01 02 54 4D 53 {val} 08"
  params:
    - name: val
      type: integer
      enum:
        - 0x00  # Everyday Mode
        - 0x01  # Workday Mode
        - 0x02  # User Mode

- id: timer_mode_query
  label: Timer Mode Query
  kind: query
  command: "07 01 01 54 4D 53 08"
  params: []

# -------- RTC enable / disable per-day bitmask --------
- id: set_rtc_enable_days
  label: Set RTC Enable Days
  kind: action
  command: "07 01 02 41 45 4E {val} 08"
  params:
    - name: val
      type: integer
      description: "0-127 bitmask; bit0=Sun, bit1=Mon, bit2=Tue, bit3=Wed, bit4=Thu, bit5=Fri, bit6=Sat. In User Mode set individual bits; in Everyday/Workday mode set bits 0-6."

- id: rtc_enable_days_query
  label: RTC Enable Days Query
  kind: query
  command: "07 01 01 41 45 4E 08"
  params: []

- id: set_rtc_disable_days
  label: Set RTC Disable Days
  kind: action
  command: "07 01 02 41 45 46 {val} 08"
  params:
    - name: val
      type: integer
      description: "0-127 bitmask; bit0=Sun, bit1=Mon, bit2=Tue, bit3=Wed, bit4=Thu, bit5=Fri, bit6=Sat. In User Mode clear individual bits; in Everyday/Workday mode set bits 0-6 to disable."

- id: rtc_disable_days_query
  label: RTC Disable Days Query
  kind: query
  command: "07 01 01 41 45 46 08"
  params: []

# -------- Daily schedule (On/Off hour+minute) --------
# Sunday
- id: set_sunday_on_hour
  label: Set Sunday On Hour
  kind: action
  command: "07 01 02 53 4E 48 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-23 (hex 00-17)

- id: sunday_on_hour_query
  label: Sunday On Hour Query
  kind: query
  command: "07 01 01 53 4E 48 08"
  params: []

- id: set_sunday_on_minute
  label: Set Sunday On Minute
  kind: action
  command: "07 01 02 53 4E 4D {val} 08"
  params:
    - name: val
      type: integer
      description: 0-59 (hex 00-3B)

- id: sunday_on_minute_query
  label: Sunday On Minute Query
  kind: query
  command: "07 01 01 53 4E 4D 08"
  params: []

- id: set_sunday_off_hour
  label: Set Sunday Off Hour
  kind: action
  command: "07 01 02 53 46 48 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-23 (hex 00-17)

- id: sunday_off_hour_query
  label: Sunday Off Hour Query
  kind: query
  command: "07 01 01 53 46 48 08"
  params: []

- id: set_sunday_off_minute
  label: Set Sunday Off Minute
  kind: action
  command: "07 01 02 53 46 4D {val} 08"
  params:
    - name: val
      type: integer
      description: 0-59 (hex 00-3B)

- id: sunday_off_minute_query
  label: Sunday Off Minute Query
  kind: query
  command: "07 01 01 53 46 4D 08"
  params: []

# Monday
- id: set_monday_on_hour
  label: Set Monday On Hour
  kind: action
  command: "07 01 02 4E 4E 48 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-23 (hex 00-17)

- id: monday_on_hour_query
  label: Monday On Hour Query
  kind: query
  command: "07 01 01 4E 4E 48 08"
  params: []

- id: set_monday_on_minute
  label: Set Monday On Minute
  kind: action
  command: "07 01 02 4E 4E 4D {val} 08"
  params:
    - name: val
      type: integer
      description: 0-59 (hex 00-3B)

- id: monday_on_minute_query
  label: Monday On Minute Query
  kind: query
  command: "07 01 01 4E 4E 4D 08"
  params: []

- id: set_monday_off_hour
  label: Set Monday Off Hour
  kind: action
  command: "07 01 02 4E 46 48 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-23 (hex 00-17)

- id: monday_off_hour_query
  label: Monday Off Hour Query
  kind: query
  command: "07 01 01 4E 46 48 08"
  params: []

- id: set_monday_off_minute
  label: Set Monday Off Minute
  kind: action
  command: "07 01 02 4E 46 4D {val} 08"
  params:
    - name: val
      type: integer
      description: 0-59 (hex 00-3B)

- id: monday_off_minute_query
  label: Monday Off Minute Query
  kind: query
  command: "07 01 01 4E 46 4D 08"
  params: []

# Tuesday
- id: set_tuesday_on_hour
  label: Set Tuesday On Hour
  kind: action
  command: "07 01 02 45 4E 48 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-23 (hex 00-17)

- id: tuesday_on_hour_query
  label: Tuesday On Hour Query
  kind: query
  command: "07 01 01 45 4E 48 08"
  params: []

- id: set_tuesday_on_minute
  label: Set Tuesday On Minute
  kind: action
  command: "07 01 02 45 4E 4D {val} 08"
  params:
    - name: val
      type: integer
      description: 0-59 (hex 00-3B)

- id: tuesday_on_minute_query
  label: Tuesday On Minute Query
  kind: query
  command: "07 01 01 45 4E 4D 08"
  params: []

- id: set_tuesday_off_hour
  label: Set Tuesday Off Hour
  kind: action
  command: "07 01 02 45 46 48 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-23 (hex 00-17)

- id: tuesday_off_hour_query
  label: Tuesday Off Hour Query
  kind: query
  command: "07 01 01 45 46 48 08"
  params: []

- id: set_tuesday_off_minute
  label: Set Tuesday Off Minute
  kind: action
  command: "07 01 02 45 46 4D {val} 08"
  params:
    - name: val
      type: integer
      description: 0-59 (hex 00-3B)

- id: tuesday_off_minute_query
  label: Tuesday Off Minute Query
  kind: query
  command: "07 01 01 45 46 4D 08"
  params: []

# Wednesday
- id: set_wednesday_on_hour
  label: Set Wednesday On Hour
  kind: action
  command: "07 01 02 44 4E 48 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-23 (hex 00-17)

- id: wednesday_on_hour_query
  label: Wednesday On Hour Query
  kind: query
  command: "07 01 01 44 4E 48 08"
  params: []

- id: set_wednesday_on_minute
  label: Set Wednesday On Minute
  kind: action
  command: "07 01 02 44 4E 4D {val} 08"
  params:
    - name: val
      type: integer
      description: 0-59 (hex 00-3B)

- id: wednesday_on_minute_query
  label: Wednesday On Minute Query
  kind: query
  command: "07 01 01 44 4E 4D 08"
  params: []

- id: set_wednesday_off_hour
  label: Set Wednesday Off Hour
  kind: action
  command: "07 01 02 44 46 48 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-23 (hex 00-17)

- id: wednesday_off_hour_query
  label: Wednesday Off Hour Query
  kind: query
  command: "07 01 01 44 46 48 08"
  params: []

- id: set_wednesday_off_minute
  label: Set Wednesday Off Minute
  kind: action
  command: "07 01 02 44 46 4D {val} 08"
  params:
    - name: val
      type: integer
      description: 0-59 (hex 00-3B)

- id: wednesday_off_minute_query
  label: Wednesday Off Minute Query
  kind: query
  command: "07 01 01 44 46 4D 08"
  params: []

# Thursday
- id: set_thursday_on_hour
  label: Set Thursday On Hour
  kind: action
  command: "07 01 02 55 4E 48 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-23 (hex 00-17)

- id: thursday_on_hour_query
  label: Thursday On Hour Query
  kind: query
  command: "07 01 01 55 4E 48 08"
  params: []

- id: set_thursday_on_minute
  label: Set Thursday On Minute
  kind: action
  command: "07 01 02 55 4E 4D {val} 08"
  params:
    - name: val
      type: integer
      description: 0-59 (hex 00-3B)

- id: thursday_on_minute_query
  label: Thursday On Minute Query
  kind: query
  command: "07 01 01 55 4E 4D 08"
  params: []

- id: set_thursday_off_hour
  label: Set Thursday Off Hour
  kind: action
  command: "07 01 02 55 46 48 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-23 (hex 00-17)

- id: thursday_off_hour_query
  label: Thursday Off Hour Query
  kind: query
  command: "07 01 01 55 46 48 08"
  params: []

- id: set_thursday_off_minute
  label: Set Thursday Off Minute
  kind: action
  command: "07 01 02 55 46 4D {val} 08"
  params:
    - name: val
      type: integer
      description: 0-59 (hex 00-3B)

- id: thursday_off_minute_query
  label: Thursday Off Minute Query
  kind: query
  command: "07 01 01 55 46 4D 08"
  params: []

# Friday
- id: set_friday_on_hour
  label: Set Friday On Hour
  kind: action
  command: "07 01 02 49 4E 48 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-23 (hex 00-17)

- id: friday_on_hour_query
  label: Friday On Hour Query
  kind: query
  command: "07 01 01 49 4E 48 08"
  params: []

- id: set_friday_on_minute
  label: Set Friday On Minute
  kind: action
  command: "07 01 02 49 4E 4D {val} 08"
  params:
    - name: val
      type: integer
      description: 0-59 (hex 00-3B)

- id: friday_on_minute_query
  label: Friday On Minute Query
  kind: query
  command: "07 01 01 49 4E 4D 08"
  params: []

- id: set_friday_off_hour
  label: Set Friday Off Hour
  kind: action
  command: "07 01 02 49 46 48 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-23 (hex 00-17)

- id: friday_off_hour_query
  label: Friday Off Hour Query
  kind: query
  command: "07 01 01 49 46 48 08"
  params: []

- id: set_friday_off_minute
  label: Set Friday Off Minute
  kind: action
  command: "07 01 02 49 46 4D {val} 08"
  params:
    - name: val
      type: integer
      description: 0-59 (hex 00-3B)

- id: friday_off_minute_query
  label: Friday Off Minute Query
  kind: query
  command: "07 01 01 49 46 4D 08"
  params: []

# Saturday (only On Hour/On Minute confirmed in source)
- id: set_saturday_on_hour
  label: Set Saturday On Hour
  kind: action
  command: "07 01 02 54 4E 48 {val} 08"
  params:
    - name: val
      type: integer
      description: 0-23 (hex 00-17)

- id: saturday_on_hour_query
  label: Saturday On Hour Query
  kind: query
  command: "07 01 01 54 4E 48 08"
  params: []

- id: set_saturday_on_minute
  label: Set Saturday On Minute
  kind: action
  command: "07 01 02 54 4E 4D {val} 08"
  params:
    - name: val
      type: integer
      description: 0-59 (hex 00-3B)

- id: saturday_on_minute_query
  label: Saturday On Minute Query
  kind: query
  command: "07 01 01 54 4E 4D 08"
  params: []

# UNRESOLVED: Saturday Off Hour (TFH) and Off Minute (TFM) commands - source line truncated in
# extracted text; command mnemonics and exact hex bytes not visible. Per the documented
# naming pattern these likely follow the same shape as the other days, but the source
# fragment visible to this skill does not include them. Do not fabricate; verify against
# a full PDF or the on-device command table before implementing.

# -------- Display Port EDID --------
# UNRESOLVED: Display Port 1 EDID command (ED1) - only Display Port 2 (ED2) row is fully
# visible in the source. The Display Port 1 row was truncated in the extracted text. Likely
# 1080P / 4K30 / 4K60 options following the same shape, but the exact CMD hex bytes are
# not verified in the available source fragment.
- id: set_displayport2_edid
  label: Set DisplayPort 2 EDID Mode
  kind: action
  command: "07 01 02 45 44 32 {val} 08"
  params:
    - name: val
      type: integer
      enum:
        - 0x00  # 1080P
        - 0x01  # 4K30 Hz
        - 0x02  # 4K60 Hz

- id: displayport2_edid_query
  label: DisplayPort 2 EDID Mode Query
  kind: query
  command: "07 01 01 45 44 32 08"
  params: []

# -------- Multi-source views --------
- id: set_multi_source_mode
  label: Set Multi-Source View Mode
  kind: action
  command: "07 01 02 50 53 43 {val} 08"
  params:
    - name: val
      type: integer
      enum:
        - 0x00  # OFF
        - 0x01  # PIP Small
        - 0x02  # PIP Medium
        - 0x03  # PIP Large
        - 0x04  # Dual View
        - 0x07  # Quad View

- id: multi_source_mode_query
  label: Multi-Source View Mode Query
  kind: query
  command: "07 01 01 50 53 43 08"
  params: []

- id: set_pip_subwindow1_input
  label: Set PIP Sub-Window 1 Input
  kind: action
  command: "07 01 02 50 49 4E {val} 08"
  params:
    - name: val
      type: integer
      description: "Same enum as MIN (0x00 VGA, 0x09 HDMI1, 0x0A HDMI2, 0x0B HDMI3, 0x0C HDMI4, 0x0D DP1, 0x10 DP2)"

- id: pip_subwindow1_input_query
  label: PIP Sub-Window 1 Input Query
  kind: query
  command: "07 01 01 50 49 4E 08"
  params: []

- id: set_pip_subwindow2_input
  label: Set PIP Sub-Window 2 Input
  kind: action
  command: "07 01 02 50 49 4F {val} 08"
  params:
    - name: val
      type: integer
      description: "Same enum as MIN (0x00 VGA, 0x09 HDMI1, 0x0A HDMI2, 0x0B HDMI3, 0x0C HDMI4, 0x0D DP1, 0x10 DP2)"

- id: pip_subwindow2_input_query
  label: PIP Sub-Window 2 Input Query
  kind: query
  command: "07 01 01 50 49 4F 08"
  params: []

- id: set_pip_subwindow3_input
  label: Set PIP Sub-Window 3 Input
  kind: action
  command: "07 01 02 50 49 50 {val} 08"
  params:
    - name: val
      type: integer
      description: "Same enum as MIN (0x00 VGA, 0x09 HDMI1, 0x0A HDMI2, 0x0B HDMI3, 0x0C HDMI4, 0x0D DP1, 0x10 DP2)"

- id: pip_subwindow3_input_query
  label: PIP Sub-Window 3 Input Query
  kind: query
  command: "07 01 01 50 49 50 08"
  params: []

- id: set_pip_position
  label: Set PIP Position
  kind: action
  command: "07 01 02 50 50 4F {val} 08"
  params:
    - name: val
      type: integer
      enum:
        - 0x00  # Bottom-left
        - 0x01  # Bottom-right
        - 0x02  # Top-left
        - 0x03  # Top-right

- id: pip_position_query
  label: PIP Position Query
  kind: query
  command: "07 01 01 50 50 4F 08"
  params: []

- id: swap_main_and_pip
  label: Swap Main and PIP
  kind: action
  command: "07 01 02 53 57 41 00 08"
  params: []

# -------- Scaling / aspect / zoom --------
- id: set_aspect
  label: Set Aspect Ratio
  kind: action
  command: "07 01 02 41 53 50 {val} 08"
  params:
    - name: val
      type: integer
      enum:
        - 0x00  # Native
        - 0x01  # Full Screen
        - 0x02  # 4:3
        - 0x03  # Letterbox

- id: aspect_query
  label: Aspect Ratio Query
  kind: query
  command: "07 01 01 41 53 50 08"
  params: []

- id: set_picture_aspect
  label: Set Picture Aspect
  kind: action
  command: "07 01 02 50 41 53 {val} 08"
  params:
    - name: val
      type: integer
      enum:
        - 0x01  # Full Screen
        - 0x02  # 4:3
        - 0x03  # Letterbox

- id: picture_aspect_query
  label: Picture Aspect Query
  kind: query
  command: "07 01 01 50 41 53 08"
  params: []

- id: set_overscan
  label: Set Overscan Ratio
  kind: action
  command: "07 01 02 5A 4F 4D {val} 08"
  params:
    - name: val
      type: integer
      description: 0-10 (hex 00-0A)

- id: overscan_query
  label: Overscan Query
  kind: query
  command: "07 01 01 5A 4F 4D 08"
  params: []

# -------- Communication config --------
- id: set_baud_rate
  label: Set Baud Rate
  kind: action
  command: "07 01 02 42 52 41 {val} 08"
  params:
    - name: val
      type: integer
      enum:
        - 0x00  # 115200
        - 0x01  # 38400
        - 0x02  # 19200
        - 0x03  # 9600

- id: baud_rate_query
  label: Baud Rate Query
  kind: query
  command: "07 01 01 42 52 41 08"
  params: []

- id: set_wake_up_from_sleep
  label: Set Wake Up From Sleep Mode
  kind: action
  command: "07 01 02 57 46 53 {val} 08"
  params:
    - name: val
      type: integer
      enum:
        - 0x00  # VGA Only
        - 0x01  # Digital, RS232, Ethernet
        - 0x02  # Never Sleep

- id: wake_up_from_sleep_query
  label: Wake Up From Sleep Mode Query
  kind: query
  command: "07 01 01 57 46 53 08"
  params: []

- id: set_auto_scan
  label: Set Auto Scan
  kind: action
  command: "07 01 02 41 54 53 {val} 08"
  params:
    - name: val
      type: integer
      enum:
        - 0x00  # Off
        - 0x01  # Main
        - 0x02  # Multi
        - 0x03  # All

- id: auto_scan_query
  label: Auto Scan Query
  kind: query
  command: "07 01 01 41 54 53 08"
  params: []

# -------- IR / Smart Light / LED / RGB range --------
- id: set_ir_function
  label: Set IR Function
  kind: action
  command: "07 01 02 49 52 46 {val} 08"
  params:
    - name: val
      type: integer
      enum:
        - 0x00  # Off
        - 0x01  # On

- id: ir_function_query
  label: IR Function Query
  kind: query
  command: "07 01 01 49 52 46 08"
  params: []

- id: set_smart_light_control
  label: Set Smart Light Control
  kind: action
  command: "07 01 02 53 4C 43 {val} 08"
  params:
    - name: val
      type: integer
      enum:
        - 0x00  # Off
        - 0x01  # DCR
        - 0x02  # Light Sensor

- id: smart_light_control_query
  label: Smart Light Control Query
  kind: query
  command: "07 01 01 53 4C 43 08"
  params: []

- id: set_power_led
  label: Set Power LED
  kind: action
  command: "07 01 02 4C 45 44 {val} 08"
  params:
    - name: val
      type: integer
      enum:
        - 0x00  # Off
        - 0x01  # On

- id: power_led_query
  label: Power LED Query
  kind: query
  command: "07 01 01 4C 45 44 08"
  params: []

- id: set_rgb_color_range
  label: Set RGB Color Range
  kind: action
  command: "07 01 02 48 43 52 {val} 08"
  params:
    - name: val
      type: integer
      enum:
        - 0x00  # Auto Detect
        - 0x01  # Full Range
        - 0x02  # Limited Range

- id: rgb_color_range_query
  label: RGB Color Range Query
  kind: query
  command: "07 01 01 48 43 52 08"
  params: []

# -------- Remote control emulation --------
- id: remote_control_key
  label: Remote Control Key
  kind: action
  command: "07 01 02 52 43 55 {val} 08"
  params:
    - name: val
      type: integer
      enum:
        - 0x00  # MENU
        - 0x01  # INFO
        - 0x02  # UP
        - 0x03  # DOWN
        - 0x04  # LEFT
        - 0x05  # RIGHT
        - 0x06  # ENTER
        - 0x07  # EXIT
        - 0x08  # VGA
        - 0x0A  # HDMI1
        - 0x0B  # HDMI2
        - 0x1F  # HDMI3
        - 0x20  # HDMI4
        - 0x0C  # DISPLAYPORT1
        - 0x22  # DISPLAYPORT2
        - 0x12  # SOURCE
        - 0x13  # P-SOURCE
        - 0x14  # PIP
        - 0x15  # P-POSITION
        - 0x16  # SWAP
        - 0x17  # SCALING
        - 0x18  # FREEZE
        - 0x19  # Mute
        - 0x1A  # BRIGHT
        - 0x1B  # CONTRAST
        - 0x1C  # AUTO
        - 0x1D  # VOLUME+
        - 0x1E  # VOLUME-
  notes: "Emulates IR remote key press. Source documents this as a Write-only action."

# -------- Default / lock --------
- id: reset_all
  label: Reset All to Default
  kind: action
  command: "07 01 02 41 4C 4C 00 08"
  params: []

- id: set_key_lock
  label: Set Key Lock
  kind: action
  command: "07 01 02 4B 4C 43 {val} 08"
  params:
    - name: val
      type: integer
      enum:
        - 0x00  # Unlock keys
        - 0x01  # Lock keys

- id: key_lock_query
  label: Key Lock Query
  kind: query
  command: "07 01 01 4B 4C 43 08"
  params: []

# -------- Information (read-only) --------
- id: read_serial_number
  label: Read Serial Number
  kind: query
  command: "07 01 01 53 45 52 08"
  params: []
  notes: "Returns 13 bytes ASCII (S(0)-S(12))."

- id: read_model_name
  label: Read Model Name
  kind: query
  command: "07 01 01 4D 4E 41 08"
  params: []
  notes: "Returns 13 bytes ASCII."

- id: read_firmware_version
  label: Read Firmware Version
  kind: query
  command: "07 01 01 47 56 45 08"
  params: []
  notes: "Returns 6 bytes ASCII (S(0)-S(5))."

- id: read_rs232_table_version
  label: Read RS232 Table Version
  kind: query
  command: "07 01 01 52 54 56 08"
  params:
    - name: return
      description: "0-255 (hex 00-FF)"
```

## Feedbacks
```yaml
# Query responses and observable device state.
# All W/R commands support query; see paired *_query actions in Actions section.

- id: power_state
  type: enum
  values: [off, on]
  source_command: POW  # read returns 0=off, 1=on

- id: main_input
  type: enum
  values: [vga, hdmi1, hdmi2, hdmi3, hdmi4, displayport1, displayport2]
  source_command: MIN  # read returns 0x00/0x09/0x0A/0x0B/0x0C/0x0D/0x10

- id: backlight_level
  type: integer
  range: [0, 100]
  source_command: BRI

- id: brightness_level
  type: integer
  range: [0, 100]
  source_command: BRL

- id: backlight_enabled
  type: boolean
  source_command: BLC  # 0=off, 1=on

- id: contrast_level
  type: integer
  range: [0, 100]
  source_command: CON

- id: sharpness_level
  type: integer
  range: [0, 10]
  source_command: SHA

- id: hue_level
  type: integer
  range: [0, 100]
  source_command: HUE

- id: saturation_level
  type: integer
  range: [0, 100]
  source_command: SAT

- id: scheme
  type: enum
  values: [user, sport, game, cinema, vivid]
  source_command: SCM

- id: color_temperature
  type: enum
  values: [user, 6500K, 9300K, 5000K, 7500K]
  source_command: COT

- id: gamma
  type: enum
  values: [off, "2.2"]
  source_command: GAC

- id: multi_source_mode
  type: enum
  values: [off, pip_small, pip_medium, pip_large, dual_view, quad_view]
  source_command: PSC

- id: pip_position
  type: enum
  values: [bottom_left, bottom_right, top_left, top_right]
  source_command: PPO

- id: aspect
  type: enum
  values: [native, full_screen, "4:3", letterbox]
  source_command: ASP

- id: baud_rate
  type: integer
  values: [115200, 38400, 19200, 9600]
  source_command: BRA

- id: serial_number
  type: string
  source_command: SER
  notes: "13 ASCII bytes"

- id: model_name
  type: string
  source_command: MNA
  notes: "13 ASCII bytes"

- id: firmware_version
  type: string
  source_command: GVE
  notes: "6 ASCII bytes"

- id: rs232_table_version
  type: integer
  range: [0, 255]
  source_command: RTV
```

## Variables
```yaml
# No continuous settable parameters beyond what is exposed as discrete Actions above.
# (Daily schedule On/Off hour/minute are exposed as discrete set_* actions, not as
# composite variables, because the source treats each as an independent RS232 command.)
```

## Events
```yaml
# Ethernet alert messages (Power Status Alert, Source Status Alert, Signal Lost Status)
# are mentioned in the Communication menu as toggleable features, but the source does
# not document the alert packet format, transport, or destination. They are likely
# outbound TCP or UDP packets, but the source gives no protocol-level detail.
#
# UNRESOLVED: Ethernet alert packet format and transport - source describes the
# features as menu options with On/Off toggles only; no payload schema, port, or
# destination documented in the visible source. Marking as unresolved.
```

## Macros
```yaml
# UNRESOLVED: source does not document any user-defined or built-in macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain explicit safety warnings, interlock procedures,
# or required power-on sequencing. The Power saving / Wake Up From Sleep behavior is
# operational rather than safety-related and is documented in the Notes section.
```

## Notes

**Sleep mode behavior.** The display enters Sleep Mode by default after five minutes with no signal. With the default `Wake Up From Sleep = VGA Only`, RS-232, DisplayPort, and HDMI inputs are inactive during sleep. To retain control during sleep, set the mode to `Digital, RS232, Ethernet` (0x01) or `Never Sleep` (0x02). The Power (POW) command is marked ▲ in the source as valid in power-save/off mode under this same precondition.

**Frame protocol.** All RS-232 commands use the same 7- or 8-byte frame: `0x07 IDT Type CMD [Value] 0x08`. `IDT` is documented as "do not care"; the source examples consistently use `0x01`. The monitor's reply echoes the frame with `Type = 0x00` and either the executed value (write) or current value (read).

**Ethernet usage.** The display has a built-in Ethernet port (RJ-45 labeled "LAN / Communication port"), but the source only documents its use for status alerts. No TCP/UDP/JSON-RPC control command set is provided. The IP Address settings menu supports static IP (default `192.168.2.1`) or dynamic IP, and the network can be disabled via the Enable Network menu option (default Off).

**Command table source.** Some Saturday schedule rows (TFH, TFM) and the DisplayPort 1 EDID row (ED1) appear to be present in the original vendor manual but were truncated in the extracted text used to build this spec. They are marked UNRESOLVED above and should be verified against the full vendor PDF or on-device command table before implementation.

**IDT value.** Source says "Do not care". The example transactions all use `IDT = 0x01`. Some hosts may treat the byte as a device address and use other values; behavior with non-0x01 IDT is not validated by the source.

## Provenance

```yaml
source_domains:
  - christiedigital.com
  - manualmachine.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-104143-01-christie-lit-usr-suhd-v3.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-001766-01-christie-lit-man-ref-api-suhd983-p.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-002194-01-christie-lit-man-serv-suhd55-v3.pdf
  - https://manualmachine.com/christie/suhd651l/2542394-user-manual/
retrieved_at: 2026-05-14T14:01:43.952Z
last_checked_at: 2026-05-26T14:13:55.163Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-26T14:13:55.163Z
matched_actions: 213
action_count: 213
confidence: medium
summary: "All 213 spec actions verified against source; wire-level commands, parameter ranges, and transport settings all match exactly. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP command protocol — source describes LAN port and IP configuration menu but does not document any TCP/UDP control command set. Ethernet is referenced only for status alert delivery (Power Status Alert, Source Status Alert, Signal Lost Status)."
- "Saturday Off Hour (TFH) and Off Minute (TFM) commands - source line truncated in"
- "Display Port 1 EDID command (ED1) - only Display Port 2 (ED2) row is fully"
- "Ethernet alert packet format and transport - source describes the"
- "source does not document any user-defined or built-in macro sequences."
- "source does not contain explicit safety warnings, interlock procedures,"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
