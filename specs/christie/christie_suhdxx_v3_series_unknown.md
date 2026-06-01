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
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-102207-08-christie-lit-man-ref-spyder-commands.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
retrieved_at: 2026-05-04T15:10:58.851Z
last_checked_at: 2026-05-26T14:13:55.163Z
generated_at: 2026-05-26T14:13:55.163Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-26T14:13:55.163Z
  matched_actions: 213
  action_count: 213
  confidence: high
  summary: "All 213 spec actions verified against source; wire-level commands, parameter ranges, and transport settings all match exactly."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Christie SUHDxx V3 Series Control Spec

## Summary
The Christie SUHDxx V3 Series is a professional display supporting RS-232 serial control and Ethernet (TCP/IP) connectivity. This spec covers the binary RS-232 command protocol for power control, input selection, display adjustment, audio, OSD, EDID, multi-source/PIP, RTC scheduling, and remote-control key injection.

<!-- UNRESOLVED: TCP/IP port number not stated in source; Ethernet control protocol details (Telnet vs custom TCP) not documented beyond enabling the port -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred from IP control mention (Enable Network / LAN port documented)
serial:
  baud_rate: 115200  # default; adjustable to 38400 / 19200 / 9600 via BRA command
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # not stated in source
addressing:
  port: null  # UNRESOLVED: TCP port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from power command examples (POW)
- routable        # inferred from routing command examples (MIN, PIN, PIO, PIP)
- queryable       # inferred from query command examples (R-type reads for all W/R CMDs)
- levelable       # inferred from volume / brightness / contrast / gain control commands
```

## Actions
```yaml
# Frame format (binary):
#   Write: 07 IDT 02 CMD[3] VAL 08  (8 bytes)
#   Read:  07 IDT 01 CMD[3] 08      (7 bytes)
#   IDT = don't care (1 byte)
#   STX = 0x07, ETX = 0x08
#
# All CMD hex bytes given as 3-byte ASCII codes (e.g. POW = 50 4F 57)

# --- Power ---

- id: power_off
  label: Power Off
  kind: action
  cmd: POW
  cmd_hex: "50 4F 57"
  write_value_hex: "00"
  description: Soft power off. Valid in power saving/off mode.
  params: []

- id: power_on
  label: Power On
  kind: action
  cmd: POW
  cmd_hex: "50 4F 57"
  write_value_hex: "01"
  description: Soft power on. Valid in power saving/off mode.
  params: []

- id: power_status_query
  label: Power Status Query
  kind: query
  cmd: POW
  cmd_hex: "50 4F 57"
  query_command: "07 IDT 01 50 4F 57 08"
  description: Read current power state. Returns 00=off, 01=on.
  params: []

# --- Input Source ---

- id: input_source_set
  label: Set Main Input Source
  kind: action
  cmd: MIN
  cmd_hex: "4D 49 4E"
  description: Select the main input source.
  params:
    - name: source
      type: enum
      values:
        - value: "00"
          label: VGA
        - value: "0D"
          label: DisplayPort1
        - value: "10"
          label: DisplayPort2
        - value: "09"
          label: HDMI1
        - value: "0A"
          label: HDMI2
        - value: "0B"
          label: HDMI3
        - value: "0C"
          label: HDMI4

- id: input_source_query
  label: Main Input Source Query
  kind: query
  cmd: MIN
  cmd_hex: "4D 49 4E"
  query_command: "07 IDT 01 4D 49 4E 08"
  description: Read the current main input source.
  params: []

# --- Display Adjustment: Backlight (BRI) ---

- id: backlight_set
  label: Set Backlight
  kind: action
  cmd: BRI
  cmd_hex: "42 52 49"
  description: Set backlight level (0–100).
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: backlight_query
  label: Backlight Query
  kind: query
  cmd: BRI
  cmd_hex: "42 52 49"
  query_command: "07 IDT 01 42 52 49 08"
  description: Read current backlight level.
  params: []

# --- Display Adjustment: Brightness (BRL) ---

- id: brightness_set
  label: Set Brightness
  kind: action
  cmd: BRL
  cmd_hex: "42 52 4C"
  description: Set brightness level (0–100).
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: brightness_query
  label: Brightness Query
  kind: query
  cmd: BRL
  cmd_hex: "42 52 4C"
  query_command: "07 IDT 01 42 52 4C 08"
  description: Read current brightness level.
  params: []

# --- Display Adjustment: Back Light Control (BLC) ---

- id: back_light_control_set
  label: Set Back Light Control
  kind: action
  cmd: BLC
  cmd_hex: "42 4C 43"
  description: Enable or disable back light control.
  params:
    - name: state
      type: enum
      values:
        - value: "00"
          label: "Off"
        - value: "01"
          label: "On"

- id: back_light_control_query
  label: Back Light Control Query
  kind: query
  cmd: BLC
  cmd_hex: "42 4C 43"
  query_command: "07 IDT 01 42 4C 43 08"
  description: Read back light control state.
  params: []

# --- Display Adjustment: Contrast (CON) ---

- id: contrast_set
  label: Set Contrast
  kind: action
  cmd: CON
  cmd_hex: "43 4F 4E"
  description: Set contrast (0–100).
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: contrast_query
  label: Contrast Query
  kind: query
  cmd: CON
  cmd_hex: "43 4F 4E"
  query_command: "07 IDT 01 43 4F 4E 08"
  description: Read current contrast.
  params: []

# --- Display Adjustment: Sharpness (SHA) ---

- id: sharpness_set
  label: Set Sharpness
  kind: action
  cmd: SHA
  cmd_hex: "53 48 41"
  description: Set sharpness (0–10).
  params:
    - name: level
      type: integer
      range: [0, 10]

- id: sharpness_query
  label: Sharpness Query
  kind: query
  cmd: SHA
  cmd_hex: "53 48 41"
  query_command: "07 IDT 01 53 48 41 08"
  description: Read current sharpness.
  params: []

# --- Display Adjustment: Hue (HUE) ---

- id: hue_set
  label: Set Hue
  kind: action
  cmd: HUE
  cmd_hex: "48 55 45"
  description: Set hue (0–100).
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: hue_query
  label: Hue Query
  kind: query
  cmd: HUE
  cmd_hex: "48 55 45"
  query_command: "07 IDT 01 48 55 45 08"
  description: Read current hue.
  params: []

# --- Display Adjustment: Saturation (SAT) ---

- id: saturation_set
  label: Set Saturation
  kind: action
  cmd: SAT
  cmd_hex: "53 41 54"
  description: Set saturation (0–100).
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: saturation_query
  label: Saturation Query
  kind: query
  cmd: SAT
  cmd_hex: "53 41 54"
  query_command: "07 IDT 01 53 41 54 08"
  description: Read current saturation.
  params: []

# --- Display Adjustment: Color Scheme (SCM) ---

- id: color_scheme_set
  label: Set Color Scheme
  kind: action
  cmd: SCM
  cmd_hex: "53 43 4D"
  description: Set picture color scheme.
  params:
    - name: scheme
      type: enum
      values:
        - value: "00"
          label: User
        - value: "01"
          label: Sport
        - value: "02"
          label: Game
        - value: "03"
          label: Cinema
        - value: "04"
          label: Vivid

- id: color_scheme_query
  label: Color Scheme Query
  kind: query
  cmd: SCM
  cmd_hex: "53 43 4D"
  query_command: "07 IDT 01 53 43 4D 08"
  description: Read current color scheme.
  params: []

# --- Display Adjustment: Color Temperature (COT) ---

- id: color_temperature_set
  label: Set Color Temperature
  kind: action
  cmd: COT
  cmd_hex: "43 4F 54"
  description: Set color temperature.
  params:
    - name: temperature
      type: enum
      values:
        - value: "00"
          label: User
        - value: "01"
          label: 6500K
        - value: "02"
          label: 9300K
        - value: "06"
          label: 5000K
        - value: "07"
          label: 7500K

- id: color_temperature_query
  label: Color Temperature Query
  kind: query
  cmd: COT
  cmd_hex: "43 4F 54"
  query_command: "07 IDT 01 43 4F 54 08"
  description: Read current color temperature.
  params: []

# --- Display Adjustment: Gamma (GAC) ---

- id: gamma_set
  label: Set Gamma
  kind: action
  cmd: GAC
  cmd_hex: "47 41 43"
  description: Set gamma correction.
  params:
    - name: gamma
      type: enum
      values:
        - value: "00"
          label: "Off"
        - value: "01"
          label: "2.2"

- id: gamma_query
  label: Gamma Query
  kind: query
  cmd: GAC
  cmd_hex: "47 41 43"
  query_command: "07 IDT 01 47 41 43 08"
  description: Read current gamma setting.
  params: []

# --- Gain & Offset: Red Gain (USR) ---

- id: red_gain_set
  label: Set Red Gain
  kind: action
  cmd: USR
  cmd_hex: "55 53 52"
  description: Set red gain (0–100).
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: red_gain_query
  label: Red Gain Query
  kind: query
  cmd: USR
  cmd_hex: "55 53 52"
  query_command: "07 IDT 01 55 53 52 08"
  description: Read current red gain.
  params: []

# --- Gain & Offset: Green Gain (USG) ---

- id: green_gain_set
  label: Set Green Gain
  kind: action
  cmd: USG
  cmd_hex: "55 53 47"
  description: Set green gain (0–100).
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: green_gain_query
  label: Green Gain Query
  kind: query
  cmd: USG
  cmd_hex: "55 53 47"
  query_command: "07 IDT 01 55 53 47 08"
  description: Read current green gain.
  params: []

# --- Gain & Offset: Blue Gain (USB) ---

- id: blue_gain_set
  label: Set Blue Gain
  kind: action
  cmd: USB
  cmd_hex: "55 53 42"
  description: Set blue gain (0–100).
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: blue_gain_query
  label: Blue Gain Query
  kind: query
  cmd: USB
  cmd_hex: "55 53 42"
  query_command: "07 IDT 01 55 53 42 08"
  description: Read current blue gain.
  params: []

# --- Gain & Offset: Red Offset (UOR) ---

- id: red_offset_set
  label: Set Red Offset
  kind: action
  cmd: UOR
  cmd_hex: "55 4F 52"
  description: Set red offset (0–100).
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: red_offset_query
  label: Red Offset Query
  kind: query
  cmd: UOR
  cmd_hex: "55 4F 52"
  query_command: "07 IDT 01 55 4F 52 08"
  description: Read current red offset.
  params: []

# --- Gain & Offset: Green Offset (UOG) ---

- id: green_offset_set
  label: Set Green Offset
  kind: action
  cmd: UOG
  cmd_hex: "55 4F 47"
  description: Set green offset (0–100).
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: green_offset_query
  label: Green Offset Query
  kind: query
  cmd: UOG
  cmd_hex: "55 4F 47"
  query_command: "07 IDT 01 55 4F 47 08"
  description: Read current green offset.
  params: []

# --- Gain & Offset: Blue Offset (UOB) ---

- id: blue_offset_set
  label: Set Blue Offset
  kind: action
  cmd: UOB
  cmd_hex: "55 4F 42"
  description: Set blue offset (0–100).
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: blue_offset_query
  label: Blue Offset Query
  kind: query
  cmd: UOB
  cmd_hex: "55 4F 42"
  query_command: "07 IDT 01 55 4F 42 08"
  description: Read current blue offset.
  params: []

# --- RTC: Year (RTY) ---

- id: rtc_year_set
  label: Set RTC Year
  kind: action
  cmd: RTY
  cmd_hex: "52 54 59"
  description: Set RTC year (0–99, 2-digit).
  params:
    - name: year
      type: integer
      range: [0, 99]

- id: rtc_year_query
  label: RTC Year Query
  kind: query
  cmd: RTY
  cmd_hex: "52 54 59"
  query_command: "07 IDT 01 52 54 59 08"
  params: []

# --- RTC: Month (RTM) ---

- id: rtc_month_set
  label: Set RTC Month
  kind: action
  cmd: RTM
  cmd_hex: "52 54 4D"
  description: Set RTC month (1–12).
  params:
    - name: month
      type: integer
      range: [1, 12]

- id: rtc_month_query
  label: RTC Month Query
  kind: query
  cmd: RTM
  cmd_hex: "52 54 4D"
  query_command: "07 IDT 01 52 54 4D 08"
  params: []

# --- RTC: Day (RTD) ---

- id: rtc_day_set
  label: Set RTC Day
  kind: action
  cmd: RTD
  cmd_hex: "52 54 44"
  description: Set RTC day (1–31).
  params:
    - name: day
      type: integer
      range: [1, 31]

- id: rtc_day_query
  label: RTC Day Query
  kind: query
  cmd: RTD
  cmd_hex: "52 54 44"
  query_command: "07 IDT 01 52 54 44 08"
  params: []

# --- RTC: Hour (RTH) ---

- id: rtc_hour_set
  label: Set RTC Hour
  kind: action
  cmd: RTH
  cmd_hex: "52 54 48"
  description: Set RTC hour (0–23).
  params:
    - name: hour
      type: integer
      range: [0, 23]

- id: rtc_hour_query
  label: RTC Hour Query
  kind: query
  cmd: RTH
  cmd_hex: "52 54 48"
  query_command: "07 IDT 01 52 54 48 08"
  params: []

# --- RTC: Minute (RTN) ---

- id: rtc_minute_set
  label: Set RTC Minute
  kind: action
  cmd: RTN
  cmd_hex: "52 54 4E"
  description: Set RTC minute (0–59).
  params:
    - name: minute
      type: integer
      range: [0, 59]

- id: rtc_minute_query
  label: RTC Minute Query
  kind: query
  cmd: RTN
  cmd_hex: "52 54 4E"
  query_command: "07 IDT 01 52 54 4E 08"
  params: []

# --- RTC: Timer Mode (TMS) ---

- id: timer_mode_set
  label: Set Timer Mode
  kind: action
  cmd: TMS
  cmd_hex: "54 4D 53"
  description: Set RTC timer mode.
  params:
    - name: mode
      type: enum
      values:
        - value: "00"
          label: Everyday Mode
        - value: "01"
          label: Workday Mode
        - value: "02"
          label: User Mode

- id: timer_mode_query
  label: Timer Mode Query
  kind: query
  cmd: TMS
  cmd_hex: "54 4D 53"
  query_command: "07 IDT 01 54 4D 53 08"
  params: []

# --- RTC: Timer Enable Days (AEN) ---

- id: timer_enable_days_set
  label: Set Timer Enable Days
  kind: action
  cmd: AEN
  cmd_hex: "41 45 4E"
  description: Set which days the on-timer is enabled (bitmask 0–127; bit0=Sunday ... bit6=Saturday).
  params:
    - name: bitmask
      type: integer
      range: [0, 127]

- id: timer_enable_days_query
  label: Timer Enable Days Query
  kind: query
  cmd: AEN
  cmd_hex: "41 45 4E"
  query_command: "07 IDT 01 41 45 4E 08"
  params: []

# --- RTC: Timer Disable Days (AEF) ---

- id: timer_disable_days_set
  label: Set Timer Disable Days
  kind: action
  cmd: AEF
  cmd_hex: "41 45 46"
  description: Set which days the off-timer is active (bitmask 0–127; bit0=Sunday ... bit6=Saturday).
  params:
    - name: bitmask
      type: integer
      range: [0, 127]

- id: timer_disable_days_query
  label: Timer Disable Days Query
  kind: query
  cmd: AEF
  cmd_hex: "41 45 46"
  query_command: "07 IDT 01 41 45 46 08"
  params: []

# --- RTC Schedule: Sunday On Hour (SNH) ---

- id: sunday_on_hour_set
  label: Set Sunday On Hour
  kind: action
  cmd: SNH
  cmd_hex: "53 4E 48"
  params:
    - name: hour
      type: integer
      range: [0, 23]

- id: sunday_on_hour_query
  label: Sunday On Hour Query
  kind: query
  cmd: SNH
  cmd_hex: "53 4E 48"
  query_command: "07 IDT 01 53 4E 48 08"
  params: []

# --- RTC Schedule: Sunday On Minute (SNM) ---

- id: sunday_on_minute_set
  label: Set Sunday On Minute
  kind: action
  cmd: SNM
  cmd_hex: "53 4E 4D"
  params:
    - name: minute
      type: integer
      range: [0, 59]

- id: sunday_on_minute_query
  label: Sunday On Minute Query
  kind: query
  cmd: SNM
  cmd_hex: "53 4E 4D"
  query_command: "07 IDT 01 53 4E 4D 08"
  params: []

# --- RTC Schedule: Sunday Off Hour (SFH) ---

- id: sunday_off_hour_set
  label: Set Sunday Off Hour
  kind: action
  cmd: SFH
  cmd_hex: "53 46 48"
  params:
    - name: hour
      type: integer
      range: [0, 23]

- id: sunday_off_hour_query
  label: Sunday Off Hour Query
  kind: query
  cmd: SFH
  cmd_hex: "53 46 48"
  query_command: "07 IDT 01 53 46 48 08"
  params: []

# --- RTC Schedule: Sunday Off Minute (SFM) ---

- id: sunday_off_minute_set
  label: Set Sunday Off Minute
  kind: action
  cmd: SFM
  cmd_hex: "53 46 4D"
  params:
    - name: minute
      type: integer
      range: [0, 59]

- id: sunday_off_minute_query
  label: Sunday Off Minute Query
  kind: query
  cmd: SFM
  cmd_hex: "53 46 4D"
  query_command: "07 IDT 01 53 46 4D 08"
  params: []

# --- RTC Schedule: Monday On Hour (NNH) ---

- id: monday_on_hour_set
  label: Set Monday On Hour
  kind: action
  cmd: NNH
  cmd_hex: "4E 4E 48"
  params:
    - name: hour
      type: integer
      range: [0, 23]

- id: monday_on_hour_query
  label: Monday On Hour Query
  kind: query
  cmd: NNH
  cmd_hex: "4E 4E 48"
  query_command: "07 IDT 01 4E 4E 48 08"
  params: []

# --- RTC Schedule: Monday On Minute (NNM) ---

- id: monday_on_minute_set
  label: Set Monday On Minute
  kind: action
  cmd: NNM
  cmd_hex: "4E 4E 4D"
  params:
    - name: minute
      type: integer
      range: [0, 59]

- id: monday_on_minute_query
  label: Monday On Minute Query
  kind: query
  cmd: NNM
  cmd_hex: "4E 4E 4D"
  query_command: "07 IDT 01 4E 4E 4D 08"
  params: []

# --- RTC Schedule: Monday Off Hour (NFH) ---

- id: monday_off_hour_set
  label: Set Monday Off Hour
  kind: action
  cmd: NFH
  cmd_hex: "4E 46 48"
  params:
    - name: hour
      type: integer
      range: [0, 23]

- id: monday_off_hour_query
  label: Monday Off Hour Query
  kind: query
  cmd: NFH
  cmd_hex: "4E 46 48"
  query_command: "07 IDT 01 4E 46 48 08"
  params: []

# --- RTC Schedule: Monday Off Minute (NFM) ---

- id: monday_off_minute_set
  label: Set Monday Off Minute
  kind: action
  cmd: NFM
  cmd_hex: "4E 46 4D"
  params:
    - name: minute
      type: integer
      range: [0, 59]

- id: monday_off_minute_query
  label: Monday Off Minute Query
  kind: query
  cmd: NFM
  cmd_hex: "4E 46 4D"
  query_command: "07 IDT 01 4E 46 4D 08"
  params: []

# --- RTC Schedule: Tuesday On Hour (ENH) ---

- id: tuesday_on_hour_set
  label: Set Tuesday On Hour
  kind: action
  cmd: ENH
  cmd_hex: "45 4E 48"
  params:
    - name: hour
      type: integer
      range: [0, 23]

- id: tuesday_on_hour_query
  label: Tuesday On Hour Query
  kind: query
  cmd: ENH
  cmd_hex: "45 4E 48"
  query_command: "07 IDT 01 45 4E 48 08"
  params: []

# --- RTC Schedule: Tuesday On Minute (ENM) ---

- id: tuesday_on_minute_set
  label: Set Tuesday On Minute
  kind: action
  cmd: ENM
  cmd_hex: "45 4E 4D"
  params:
    - name: minute
      type: integer
      range: [0, 59]

- id: tuesday_on_minute_query
  label: Tuesday On Minute Query
  kind: query
  cmd: ENM
  cmd_hex: "45 4E 4D"
  query_command: "07 IDT 01 45 4E 4D 08"
  params: []

# --- RTC Schedule: Tuesday Off Hour (EFH) ---

- id: tuesday_off_hour_set
  label: Set Tuesday Off Hour
  kind: action
  cmd: EFH
  cmd_hex: "45 46 48"
  params:
    - name: hour
      type: integer
      range: [0, 23]

- id: tuesday_off_hour_query
  label: Tuesday Off Hour Query
  kind: query
  cmd: EFH
  cmd_hex: "45 46 48"
  query_command: "07 IDT 01 45 46 48 08"
  params: []

# --- RTC Schedule: Tuesday Off Minute (EFM) ---

- id: tuesday_off_minute_set
  label: Set Tuesday Off Minute
  kind: action
  cmd: EFM
  cmd_hex: "45 46 4D"
  params:
    - name: minute
      type: integer
      range: [0, 59]

- id: tuesday_off_minute_query
  label: Tuesday Off Minute Query
  kind: query
  cmd: EFM
  cmd_hex: "45 46 4D"
  query_command: "07 IDT 01 45 46 4D 08"
  params: []

# --- RTC Schedule: Wednesday On Hour (DNH) ---

- id: wednesday_on_hour_set
  label: Set Wednesday On Hour
  kind: action
  cmd: DNH
  cmd_hex: "44 4E 48"
  params:
    - name: hour
      type: integer
      range: [0, 23]

- id: wednesday_on_hour_query
  label: Wednesday On Hour Query
  kind: query
  cmd: DNH
  cmd_hex: "44 4E 48"
  query_command: "07 IDT 01 44 4E 48 08"
  params: []

# --- RTC Schedule: Wednesday On Minute (DNM) ---

- id: wednesday_on_minute_set
  label: Set Wednesday On Minute
  kind: action
  cmd: DNM
  cmd_hex: "44 4E 4D"
  params:
    - name: minute
      type: integer
      range: [0, 59]

- id: wednesday_on_minute_query
  label: Wednesday On Minute Query
  kind: query
  cmd: DNM
  cmd_hex: "44 4E 4D"
  query_command: "07 IDT 01 44 4E 4D 08"
  params: []

# --- RTC Schedule: Wednesday Off Hour (DFH) ---

- id: wednesday_off_hour_set
  label: Set Wednesday Off Hour
  kind: action
  cmd: DFH
  cmd_hex: "44 46 48"
  params:
    - name: hour
      type: integer
      range: [0, 23]

- id: wednesday_off_hour_query
  label: Wednesday Off Hour Query
  kind: query
  cmd: DFH
  cmd_hex: "44 46 48"
  query_command: "07 IDT 01 44 46 48 08"
  params: []

# --- RTC Schedule: Wednesday Off Minute (DFM) ---

- id: wednesday_off_minute_set
  label: Set Wednesday Off Minute
  kind: action
  cmd: DFM
  cmd_hex: "44 46 4D"
  params:
    - name: minute
      type: integer
      range: [0, 59]

- id: wednesday_off_minute_query
  label: Wednesday Off Minute Query
  kind: query
  cmd: DFM
  cmd_hex: "44 46 4D"
  query_command: "07 IDT 01 44 46 4D 08"
  params: []

# --- RTC Schedule: Thursday On Hour (UNH) ---

- id: thursday_on_hour_set
  label: Set Thursday On Hour
  kind: action
  cmd: UNH
  cmd_hex: "55 4E 48"
  params:
    - name: hour
      type: integer
      range: [0, 23]

- id: thursday_on_hour_query
  label: Thursday On Hour Query
  kind: query
  cmd: UNH
  cmd_hex: "55 4E 48"
  query_command: "07 IDT 01 55 4E 48 08"
  params: []

# --- RTC Schedule: Thursday On Minute (UNM) ---

- id: thursday_on_minute_set
  label: Set Thursday On Minute
  kind: action
  cmd: UNM
  cmd_hex: "55 4E 4D"
  params:
    - name: minute
      type: integer
      range: [0, 59]

- id: thursday_on_minute_query
  label: Thursday On Minute Query
  kind: query
  cmd: UNM
  cmd_hex: "55 4E 4D"
  query_command: "07 IDT 01 55 4E 4D 08"
  params: []

# --- RTC Schedule: Thursday Off Hour (UFH) ---

- id: thursday_off_hour_set
  label: Set Thursday Off Hour
  kind: action
  cmd: UFH
  cmd_hex: "55 46 48"
  params:
    - name: hour
      type: integer
      range: [0, 23]

- id: thursday_off_hour_query
  label: Thursday Off Hour Query
  kind: query
  cmd: UFH
  cmd_hex: "55 46 48"
  query_command: "07 IDT 01 55 46 48 08"
  params: []

# --- RTC Schedule: Thursday Off Minute (UFM) ---

- id: thursday_off_minute_set
  label: Set Thursday Off Minute
  kind: action
  cmd: UFM
  cmd_hex: "55 46 4D"
  params:
    - name: minute
      type: integer
      range: [0, 59]

- id: thursday_off_minute_query
  label: Thursday Off Minute Query
  kind: query
  cmd: UFM
  cmd_hex: "55 46 4D"
  query_command: "07 IDT 01 55 46 4D 08"
  params: []

# --- RTC Schedule: Friday On Hour (INH) ---

- id: friday_on_hour_set
  label: Set Friday On Hour
  kind: action
  cmd: INH
  cmd_hex: "49 4E 48"
  params:
    - name: hour
      type: integer
      range: [0, 23]

- id: friday_on_hour_query
  label: Friday On Hour Query
  kind: query
  cmd: INH
  cmd_hex: "49 4E 48"
  query_command: "07 IDT 01 49 4E 48 08"
  params: []

# --- RTC Schedule: Friday On Minute (INM) ---

- id: friday_on_minute_set
  label: Set Friday On Minute
  kind: action
  cmd: INM
  cmd_hex: "49 4E 4D"
  params:
    - name: minute
      type: integer
      range: [0, 59]

- id: friday_on_minute_query
  label: Friday On Minute Query
  kind: query
  cmd: INM
  cmd_hex: "49 4E 4D"
  query_command: "07 IDT 01 49 4E 4D 08"
  params: []

# --- RTC Schedule: Friday Off Hour (IFH) ---

- id: friday_off_hour_set
  label: Set Friday Off Hour
  kind: action
  cmd: IFH
  cmd_hex: "49 46 48"
  params:
    - name: hour
      type: integer
      range: [0, 23]

- id: friday_off_hour_query
  label: Friday Off Hour Query
  kind: query
  cmd: IFH
  cmd_hex: "49 46 48"
  query_command: "07 IDT 01 49 46 48 08"
  params: []

# --- RTC Schedule: Friday Off Minute (IFM) ---

- id: friday_off_minute_set
  label: Set Friday Off Minute
  kind: action
  cmd: IFM
  cmd_hex: "49 46 4D"
  params:
    - name: minute
      type: integer
      range: [0, 59]

- id: friday_off_minute_query
  label: Friday Off Minute Query
  kind: query
  cmd: IFM
  cmd_hex: "49 46 4D"
  query_command: "07 IDT 01 49 46 4D 08"
  params: []

# --- RTC Schedule: Saturday On Hour (TNH) ---

- id: saturday_on_hour_set
  label: Set Saturday On Hour
  kind: action
  cmd: TNH
  cmd_hex: "54 4E 48"
  params:
    - name: hour
      type: integer
      range: [0, 23]

- id: saturday_on_hour_query
  label: Saturday On Hour Query
  kind: query
  cmd: TNH
  cmd_hex: "54 4E 48"
  query_command: "07 IDT 01 54 4E 48 08"
  params: []

# --- RTC Schedule: Saturday On Minute (TNM) ---

- id: saturday_on_minute_set
  label: Set Saturday On Minute
  kind: action
  cmd: TNM
  cmd_hex: "54 4E 4D"
  params:
    - name: minute
      type: integer
      range: [0, 59]

- id: saturday_on_minute_query
  label: Saturday On Minute Query
  kind: query
  cmd: TNM
  cmd_hex: "54 4E 4D"
  query_command: "07 IDT 01 54 4E 4D 08"
  params: []

# --- RTC Schedule: Saturday Off Hour (TFH) ---

- id: saturday_off_hour_set
  label: Set Saturday Off Hour
  kind: action
  cmd: TFH
  cmd_hex: "54 46 48"
  params:
    - name: hour
      type: integer
      range: [0, 23]

- id: saturday_off_hour_query
  label: Saturday Off Hour Query
  kind: query
  cmd: TFH
  cmd_hex: "54 46 48"
  query_command: "07 IDT 01 54 46 48 08"
  params: []

# --- RTC Schedule: Saturday Off Minute (TFM) ---

- id: saturday_off_minute_set
  label: Set Saturday Off Minute
  kind: action
  cmd: TFM
  cmd_hex: "54 46 4D"
  params:
    - name: minute
      type: integer
      range: [0, 59]

- id: saturday_off_minute_query
  label: Saturday Off Minute Query
  kind: query
  cmd: TFM
  cmd_hex: "54 46 4D"
  query_command: "07 IDT 01 54 46 4D 08"
  params: []

# --- Audio: Volume (VOL) ---

- id: volume_set
  label: Set Volume
  kind: action
  cmd: VOL
  cmd_hex: "56 4F 4C"
  description: Set audio volume (0–100).
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: volume_query
  label: Volume Query
  kind: query
  cmd: VOL
  cmd_hex: "56 4F 4C"
  query_command: "07 IDT 01 56 4F 4C 08"
  params: []

# --- Audio: Bass (BAS) ---

- id: bass_set
  label: Set Bass
  kind: action
  cmd: BAS
  cmd_hex: "42 41 53"
  description: Set bass (0–12, maps to -6 to +6).
  params:
    - name: level
      type: integer
      range: [0, 12]

- id: bass_query
  label: Bass Query
  kind: query
  cmd: BAS
  cmd_hex: "42 41 53"
  query_command: "07 IDT 01 42 41 53 08"
  params: []

# --- Audio: Treble (TRE) ---

- id: treble_set
  label: Set Treble
  kind: action
  cmd: TRE
  cmd_hex: "54 52 45"
  description: Set treble (0–12, maps to -6 to +6).
  params:
    - name: level
      type: integer
      range: [0, 12]

- id: treble_query
  label: Treble Query
  kind: query
  cmd: TRE
  cmd_hex: "54 52 45"
  query_command: "07 IDT 01 54 52 45 08"
  params: []

# --- Audio: Balance (BAL) ---

- id: balance_set
  label: Set Balance
  kind: action
  cmd: BAL
  cmd_hex: "42 41 4C"
  description: Set balance (0–12, maps to -6 to +6).
  params:
    - name: level
      type: integer
      range: [0, 12]

- id: balance_query
  label: Balance Query
  kind: query
  cmd: BAL
  cmd_hex: "42 41 4C"
  query_command: "07 IDT 01 42 41 4C 08"
  params: []

# --- Audio: Internal Speaker (INS) ---

- id: internal_speaker_set
  label: Set Internal Speaker
  kind: action
  cmd: INS
  cmd_hex: "49 4E 53"
  description: Enable or disable internal speaker.
  params:
    - name: state
      type: enum
      values:
        - value: "00"
          label: "Off"
        - value: "01"
          label: "On"

- id: internal_speaker_query
  label: Internal Speaker Query
  kind: query
  cmd: INS
  cmd_hex: "49 4E 53"
  query_command: "07 IDT 01 49 4E 53 08"
  params: []

# --- Audio: Mute (MUT) ---

- id: mute_set
  label: Set Mute
  kind: action
  cmd: MUT
  cmd_hex: "4D 55 54"
  description: Set audio mute state.
  params:
    - name: state
      type: enum
      values:
        - value: "00"
          label: Mute Off
        - value: "01"
          label: Mute On

- id: mute_query
  label: Mute Query
  kind: query
  cmd: MUT
  cmd_hex: "4D 55 54"
  query_command: "07 IDT 01 4D 55 54 08"
  params: []

# --- Audio: Audio Source Select (AUS) ---

- id: audio_source_set
  label: Set Audio Source
  kind: action
  cmd: AUS
  cmd_hex: "41 55 53"
  description: Select audio source.
  params:
    - name: source
      type: enum
      values:
        - value: "00"
          label: Audio-In
        - value: "01"
          label: Main Input
        - value: "02"
          label: Source 2
        - value: "03"
          label: Source 3
        - value: "04"
          label: Source 4

- id: audio_source_query
  label: Audio Source Query
  kind: query
  cmd: AUS
  cmd_hex: "41 55 53"
  query_command: "07 IDT 01 41 55 53 08"
  params: []

# --- OSD: Transparency (OST) ---

- id: osd_transparency_set
  label: Set OSD Transparency
  kind: action
  cmd: OST
  cmd_hex: "4F 53 54"
  description: Set OSD transparency (0–10).
  params:
    - name: level
      type: integer
      range: [0, 10]

- id: osd_transparency_query
  label: OSD Transparency Query
  kind: query
  cmd: OST
  cmd_hex: "4F 53 54"
  query_command: "07 IDT 01 4F 53 54 08"
  params: []

# --- OSD: H Position (OSH) ---

- id: osd_h_position_set
  label: Set OSD H Position
  kind: action
  cmd: OSH
  cmd_hex: "4F 53 48"
  description: Set OSD horizontal position (0–100).
  params:
    - name: position
      type: integer
      range: [0, 100]

- id: osd_h_position_query
  label: OSD H Position Query
  kind: query
  cmd: OSH
  cmd_hex: "4F 53 48"
  query_command: "07 IDT 01 4F 53 48 08"
  params: []

# --- OSD: V Position (OSV) ---

- id: osd_v_position_set
  label: Set OSD V Position
  kind: action
  cmd: OSV
  cmd_hex: "4F 53 56"
  description: Set OSD vertical position (0–100).
  params:
    - name: position
      type: integer
      range: [0, 100]

- id: osd_v_position_query
  label: OSD V Position Query
  kind: query
  cmd: OSV
  cmd_hex: "4F 53 56"
  query_command: "07 IDT 01 4F 53 56 08"
  params: []

# --- OSD: Rotation (OSR) ---

- id: osd_rotation_set
  label: Set OSD Rotation
  kind: action
  cmd: OSR
  cmd_hex: "4F 53 52"
  description: Set OSD rotation mode.
  params:
    - name: mode
      type: enum
      values:
        - value: "00"
          label: Landscape
        - value: "01"
          label: Portrait

- id: osd_rotation_query
  label: OSD Rotation Query
  kind: query
  cmd: OSR
  cmd_hex: "4F 53 52"
  query_command: "07 IDT 01 4F 53 52 08"
  params: []

# --- OSD: Language (OSL) ---

- id: osd_language_set
  label: Set OSD Language
  kind: action
  cmd: OSL
  cmd_hex: "4F 53 4C"
  description: Set OSD language.
  params:
    - name: language
      type: enum
      values:
        - value: "00"
          label: English
        - value: "01"
          label: Chinese

- id: osd_language_query
  label: OSD Language Query
  kind: query
  cmd: OSL
  cmd_hex: "4F 53 4C"
  query_command: "07 IDT 01 4F 53 4C 08"
  params: []

# --- OSD: Timeout (OSO) ---

- id: osd_timeout_set
  label: Set OSD Timeout
  kind: action
  cmd: OSO
  cmd_hex: "4F 53 4F"
  description: Set OSD timeout in seconds. Valid values: 5, 10, 20, 30, 60.
  params:
    - name: seconds
      type: enum
      values:
        - value: "05"
          label: "5 seconds"
        - value: "0A"
          label: "10 seconds"
        - value: "14"
          label: "20 seconds"
        - value: "1E"
          label: "30 seconds"
        - value: "2C"
          label: "60 seconds"

- id: osd_timeout_query
  label: OSD Timeout Query
  kind: query
  cmd: OSO
  cmd_hex: "4F 53 4F"
  query_command: "07 IDT 01 4F 53 4F 08"
  params: []

# --- EDID: HDMI1 (EH1) ---

- id: edid_hdmi1_set
  label: Set EDID HDMI1
  kind: action
  cmd: EH1
  cmd_hex: "45 48 31"
  description: Set EDID mode for HDMI1 input.
  params:
    - name: mode
      type: enum
      values:
        - value: "00"
          label: 1080P
        - value: "01"
          label: 4K30Hz
        - value: "02"
          label: 4K60Hz

- id: edid_hdmi1_query
  label: EDID HDMI1 Query
  kind: query
  cmd: EH1
  cmd_hex: "45 48 31"
  query_command: "07 IDT 01 45 48 31 08"
  params: []

# --- EDID: HDMI2 (EH2) ---

- id: edid_hdmi2_set
  label: Set EDID HDMI2
  kind: action
  cmd: EH2
  cmd_hex: "45 48 32"
  description: Set EDID mode for HDMI2 input.
  params:
    - name: mode
      type: enum
      values:
        - value: "00"
          label: 1080P
        - value: "01"
          label: 4K30Hz
        - value: "02"
          label: 4K60Hz

- id: edid_hdmi2_query
  label: EDID HDMI2 Query
  kind: query
  cmd: EH2
  cmd_hex: "45 48 32"
  query_command: "07 IDT 01 45 48 32 08"
  params: []

# --- EDID: HDMI3 (EH3) ---

- id: edid_hdmi3_set
  label: Set EDID HDMI3
  kind: action
  cmd: EH3
  cmd_hex: "45 48 33"
  description: Set EDID mode for HDMI3 input.
  params:
    - name: mode
      type: enum
      values:
        - value: "00"
          label: 1080P
        - value: "01"
          label: 4K30Hz

- id: edid_hdmi3_query
  label: EDID HDMI3 Query
  kind: query
  cmd: EH3
  cmd_hex: "45 48 33"
  query_command: "07 IDT 01 45 48 33 08"
  params: []

# --- EDID: HDMI4 (EH4) ---

- id: edid_hdmi4_set
  label: Set EDID HDMI4
  kind: action
  cmd: EH4
  cmd_hex: "45 48 34"
  description: Set EDID mode for HDMI4 input.
  params:
    - name: mode
      type: enum
      values:
        - value: "00"
          label: 1080P
        - value: "01"
          label: 4K30Hz

- id: edid_hdmi4_query
  label: EDID HDMI4 Query
  kind: query
  cmd: EH4
  cmd_hex: "45 48 34"
  query_command: "07 IDT 01 45 48 34 08"
  params: []

# --- EDID: DisplayPort1 (ED1) ---

- id: edid_dp1_set
  label: Set EDID DisplayPort1
  kind: action
  cmd: ED1
  cmd_hex: "45 44 31"
  description: Set EDID mode for DisplayPort1 input.
  params:
    - name: mode
      type: enum
      values:
        - value: "00"
          label: 1080P
        - value: "01"
          label: 4K30Hz
        - value: "02"
          label: 4K60Hz

- id: edid_dp1_query
  label: EDID DisplayPort1 Query
  kind: query
  cmd: ED1
  cmd_hex: "45 44 31"
  query_command: "07 IDT 01 45 44 31 08"
  params: []

# --- EDID: DisplayPort2 (ED2) ---

- id: edid_dp2_set
  label: Set EDID DisplayPort2
  kind: action
  cmd: ED2
  cmd_hex: "45 44 32"
  description: Set EDID mode for DisplayPort2 input.
  params:
    - name: mode
      type: enum
      values:
        - value: "00"
          label: 1080P
        - value: "01"
          label: 4K30Hz
        - value: "02"
          label: 4K60Hz

- id: edid_dp2_query
  label: EDID DisplayPort2 Query
  kind: query
  cmd: ED2
  cmd_hex: "45 44 32"
  query_command: "07 IDT 01 45 44 32 08"
  params: []

# --- Multi-Source: Source Adjust (PSC) ---

- id: multi_source_set
  label: Set Multi-Source Mode
  kind: action
  cmd: PSC
  cmd_hex: "50 53 43"
  description: Configure multi-source / PIP display mode.
  params:
    - name: mode
      type: enum
      values:
        - value: "00"
          label: "OFF"
        - value: "01"
          label: PIP Small
        - value: "02"
          label: PIP Medium
        - value: "03"
          label: PIP Large
        - value: "04"
          label: Dual View
        - value: "07"
          label: Quad View

- id: multi_source_query
  label: Multi-Source Mode Query
  kind: query
  cmd: PSC
  cmd_hex: "50 53 43"
  query_command: "07 IDT 01 50 53 43 08"
  params: []

# --- Multi-Source: PIP Source Sub-Window 1 (PIN) ---

- id: pip_source_1_set
  label: Set PIP Source Sub-Window 1
  kind: action
  cmd: PIN
  cmd_hex: "50 49 4E"
  description: Select input source for PIP sub-window 1. Uses same values as MIN.
  params:
    - name: source
      type: enum
      description: Same values as MIN (main input source).
      values:
        - value: "00"
          label: VGA
        - value: "0D"
          label: DisplayPort1
        - value: "10"
          label: DisplayPort2
        - value: "09"
          label: HDMI1
        - value: "0A"
          label: HDMI2
        - value: "0B"
          label: HDMI3
        - value: "0C"
          label: HDMI4

- id: pip_source_1_query
  label: PIP Source Sub-Window 1 Query
  kind: query
  cmd: PIN
  cmd_hex: "50 49 4E"
  query_command: "07 IDT 01 50 49 4E 08"
  params: []

# --- Multi-Source: PIP Source Sub-Window 2 (PIO) ---

- id: pip_source_2_set
  label: Set PIP Source Sub-Window 2
  kind: action
  cmd: PIO
  cmd_hex: "50 49 4F"
  description: Select input source for PIP sub-window 2. Uses same values as MIN.
  params:
    - name: source
      type: enum
      description: Same values as MIN.
      values:
        - value: "00"
          label: VGA
        - value: "0D"
          label: DisplayPort1
        - value: "10"
          label: DisplayPort2
        - value: "09"
          label: HDMI1
        - value: "0A"
          label: HDMI2
        - value: "0B"
          label: HDMI3
        - value: "0C"
          label: HDMI4

- id: pip_source_2_query
  label: PIP Source Sub-Window 2 Query
  kind: query
  cmd: PIO
  cmd_hex: "50 49 4F"
  query_command: "07 IDT 01 50 49 4F 08"
  params: []

# --- Multi-Source: PIP Source Sub-Window 3 (PIP) ---

- id: pip_source_3_set
  label: Set PIP Source Sub-Window 3
  kind: action
  cmd: PIP
  cmd_hex: "50 49 50"
  description: Select input source for PIP sub-window 3. Uses same values as MIN.
  params:
    - name: source
      type: enum
      description: Same values as MIN.
      values:
        - value: "00"
          label: VGA
        - value: "0D"
          label: DisplayPort1
        - value: "10"
          label: DisplayPort2
        - value: "09"
          label: HDMI1
        - value: "0A"
          label: HDMI2
        - value: "0B"
          label: HDMI3
        - value: "0C"
          label: HDMI4

- id: pip_source_3_query
  label: PIP Source Sub-Window 3 Query
  kind: query
  cmd: PIP
  cmd_hex: "50 49 50"
  query_command: "07 IDT 01 50 49 50 08"
  params: []

# --- Multi-Source: PIP Position (PPO) ---

- id: pip_position_set
  label: Set PIP Position
  kind: action
  cmd: PPO
  cmd_hex: "50 50 4F"
  description: Set PIP window position.
  params:
    - name: position
      type: enum
      values:
        - value: "00"
          label: Bottom-Left
        - value: "01"
          label: Bottom-Right
        - value: "02"
          label: Top-Left
        - value: "03"
          label: Top-Right

- id: pip_position_query
  label: PIP Position Query
  kind: query
  cmd: PPO
  cmd_hex: "50 50 4F"
  query_command: "07 IDT 01 50 50 4F 08"
  params: []

# --- Multi-Source: Swap Main and PIP (SWA) ---

- id: pip_swap
  label: Swap Main and PIP
  kind: action
  cmd: SWA
  cmd_hex: "53 57 41"
  description: Swap the main window and PIP window. Write-only.
  params:
    - name: value
      type: enum
      values:
        - value: "00"
          label: Swap

# --- Other Control: Scaling (ASP) ---

- id: scaling_set
  label: Set Scaling (ASP)
  kind: action
  cmd: ASP
  cmd_hex: "41 53 50"
  description: Set display scaling mode.
  params:
    - name: mode
      type: enum
      values:
        - value: "00"
          label: Native
        - value: "01"
          label: Full Screen
        - value: "02"
          label: "4:3"
        - value: "03"
          label: Letterbox

- id: scaling_asp_query
  label: Scaling (ASP) Query
  kind: query
  cmd: ASP
  cmd_hex: "41 53 50"
  query_command: "07 IDT 01 41 53 50 08"
  params: []

# --- Other Control: Scaling PAS (PAS) ---

- id: scaling_pas_set
  label: Set Scaling (PAS)
  kind: action
  cmd: PAS
  cmd_hex: "50 41 53"
  description: Set secondary scaling mode.
  params:
    - name: mode
      type: enum
      values:
        - value: "01"
          label: Full Screen
        - value: "02"
          label: "4:3"
        - value: "03"
          label: Letterbox

- id: scaling_pas_query
  label: Scaling (PAS) Query
  kind: query
  cmd: PAS
  cmd_hex: "50 41 53"
  query_command: "07 IDT 01 50 41 53 08"
  params: []

# --- Other Control: Zoom/Overscan (ZOM) ---

- id: zoom_set
  label: Set Zoom / Overscan
  kind: action
  cmd: ZOM
  cmd_hex: "5A 4F 4D"
  description: Adjust overscan ratio (0–10).
  params:
    - name: level
      type: integer
      range: [0, 10]

- id: zoom_query
  label: Zoom / Overscan Query
  kind: query
  cmd: ZOM
  cmd_hex: "5A 4F 4D"
  query_command: "07 IDT 01 5A 4F 4D 08"
  params: []

# --- Other Control: Baud Rate Adjustment (BRA) ---

- id: baud_rate_set
  label: Set Baud Rate
  kind: action
  cmd: BRA
  cmd_hex: "42 52 41"
  description: Change the RS-232 baud rate. Takes effect immediately.
  params:
    - name: rate
      type: enum
      values:
        - value: "00"
          label: "115200"
        - value: "01"
          label: "38400"
        - value: "02"
          label: "19200"
        - value: "03"
          label: "9600"

- id: baud_rate_query
  label: Baud Rate Query
  kind: query
  cmd: BRA
  cmd_hex: "42 52 41"
  query_command: "07 IDT 01 42 52 41 08"
  params: []

# --- Other Control: Wake Up From Sleep (WFS) ---

- id: wake_from_sleep_set
  label: Set Wake Up From Sleep
  kind: action
  cmd: WFS
  cmd_hex: "57 46 53"
  description: Configure which inputs can wake the display from sleep mode.
  params:
    - name: mode
      type: enum
      values:
        - value: "00"
          label: VGA Only
        - value: "01"
          label: "Digital, RS232, Ethernet"
        - value: "02"
          label: Never Sleep

- id: wake_from_sleep_query
  label: Wake Up From Sleep Query
  kind: query
  cmd: WFS
  cmd_hex: "57 46 53"
  query_command: "07 IDT 01 57 46 53 08"
  params: []

# --- Other Control: Auto Scan (ATS) ---

- id: auto_scan_set
  label: Set Auto Scan
  kind: action
  cmd: ATS
  cmd_hex: "41 54 53"
  description: Set auto scan mode.
  params:
    - name: mode
      type: enum
      values:
        - value: "00"
          label: "Off"
        - value: "01"
          label: Main
        - value: "02"
          label: Multi
        - value: "03"
          label: All

- id: auto_scan_query
  label: Auto Scan Query
  kind: query
  cmd: ATS
  cmd_hex: "41 54 53"
  query_command: "07 IDT 01 41 54 53 08"
  params: []

# --- Other Control: IRFM (IRF) ---

- id: irfm_set
  label: Set IRFM
  kind: action
  cmd: IRF
  cmd_hex: "49 52 46"
  description: Enable or disable IRFM (IR frequency mode).
  params:
    - name: state
      type: enum
      values:
        - value: "00"
          label: "Off"
        - value: "01"
          label: "On"

- id: irfm_query
  label: IRFM Query
  kind: query
  cmd: IRF
  cmd_hex: "49 52 46"
  query_command: "07 IDT 01 49 52 46 08"
  params: []

# --- Other Control: Smart Light Control (SLC) ---

- id: smart_light_control_set
  label: Set Smart Light Control
  kind: action
  cmd: SLC
  cmd_hex: "53 4C 43"
  description: Configure smart light control / ambient dimming mode.
  params:
    - name: mode
      type: enum
      values:
        - value: "00"
          label: "Off"
        - value: "01"
          label: DCR
        - value: "02"
          label: Light Sensor

- id: smart_light_control_query
  label: Smart Light Control Query
  kind: query
  cmd: SLC
  cmd_hex: "53 4C 43"
  query_command: "07 IDT 01 53 4C 43 08"
  params: []

# --- Other Control: Power LED (LED) ---

- id: power_led_set
  label: Set Power LED
  kind: action
  cmd: LED
  cmd_hex: "4C 45 44"
  description: Enable or disable the power LED indicator.
  params:
    - name: state
      type: enum
      values:
        - value: "00"
          label: "Off"
        - value: "01"
          label: "On"

- id: power_led_query
  label: Power LED Query
  kind: query
  cmd: LED
  cmd_hex: "4C 45 44"
  query_command: "07 IDT 01 4C 45 44 08"
  params: []

# --- Other Control: RGB Color Range (HCR) ---

- id: rgb_color_range_set
  label: Set RGB Color Range
  kind: action
  cmd: HCR
  cmd_hex: "48 43 52"
  description: Set HDMI RGB color range.
  params:
    - name: range
      type: enum
      values:
        - value: "00"
          label: Auto Detect
        - value: "01"
          label: Full Range
        - value: "02"
          label: Limited Range

- id: rgb_color_range_query
  label: RGB Color Range Query
  kind: query
  cmd: HCR
  cmd_hex: "48 43 52"
  query_command: "07 IDT 01 48 43 52 08"
  params: []

# --- Remote Control Key Injection (RCU) ---

- id: remote_key_menu
  label: Remote Key - MENU
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "00"
  description: Inject MENU key press.
  params: []

- id: remote_key_info
  label: Remote Key - INFO
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "01"
  description: Inject INFO key press.
  params: []

- id: remote_key_up
  label: Remote Key - UP
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "02"
  description: Inject UP key press.
  params: []

- id: remote_key_down
  label: Remote Key - DOWN
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "03"
  description: Inject DOWN key press.
  params: []

- id: remote_key_left
  label: Remote Key - LEFT
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "04"
  description: Inject LEFT key press.
  params: []

- id: remote_key_right
  label: Remote Key - RIGHT
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "05"
  description: Inject RIGHT key press.
  params: []

- id: remote_key_enter
  label: Remote Key - ENTER
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "06"
  description: Inject ENTER key press.
  params: []

- id: remote_key_exit
  label: Remote Key - EXIT
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "07"
  description: Inject EXIT key press.
  params: []

- id: remote_key_vga
  label: Remote Key - VGA
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "08"
  description: Inject VGA key press.
  params: []

- id: remote_key_hdmi1
  label: Remote Key - HDMI1
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "0A"
  description: Inject HDMI1 key press.
  params: []

- id: remote_key_hdmi2
  label: Remote Key - HDMI2
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "0B"
  description: Inject HDMI2 key press.
  params: []

- id: remote_key_hdmi3
  label: Remote Key - HDMI3
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "1F"
  description: Inject HDMI3 key press.
  params: []

- id: remote_key_hdmi4
  label: Remote Key - HDMI4
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "20"
  description: Inject HDMI4 key press.
  params: []

- id: remote_key_dp1
  label: Remote Key - DISPLAYPORT1
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "0C"
  description: Inject DISPLAYPORT1 key press.
  params: []

- id: remote_key_dp2
  label: Remote Key - DISPLAYPORT2
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "22"
  description: Inject DISPLAYPORT2 key press.
  params: []

- id: remote_key_source
  label: Remote Key - SOURCE
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "12"
  description: Inject SOURCE key press.
  params: []

- id: remote_key_p_source
  label: Remote Key - P-SOURCE
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "13"
  description: Inject P-SOURCE key press.
  params: []

- id: remote_key_pip
  label: Remote Key - PIP
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "14"
  description: Inject PIP key press.
  params: []

- id: remote_key_p_position
  label: Remote Key - P-POSITION
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "15"
  description: Inject P-POSITION key press.
  params: []

- id: remote_key_swap
  label: Remote Key - SWAP
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "16"
  description: Inject SWAP key press.
  params: []

- id: remote_key_scaling
  label: Remote Key - SCALING
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "17"
  description: Inject SCALING key press.
  params: []

- id: remote_key_freeze
  label: Remote Key - FREEZE
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "18"
  description: Inject FREEZE key press.
  params: []

- id: remote_key_mute
  label: Remote Key - Mute
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "19"
  description: Inject Mute key press.
  params: []

- id: remote_key_bright
  label: Remote Key - BRIGHT
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "1A"
  description: Inject BRIGHT key press.
  params: []

- id: remote_key_contrast
  label: Remote Key - CONTRAST
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "1B"
  description: Inject CONTRAST key press.
  params: []

- id: remote_key_auto
  label: Remote Key - AUTO
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "1C"
  description: Inject AUTO key press.
  params: []

- id: remote_key_volume_plus
  label: Remote Key - VOLUME+
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "1D"
  description: Inject VOLUME+ key press.
  params: []

- id: remote_key_volume_minus
  label: Remote Key - VOLUME-
  kind: action
  cmd: RCU
  cmd_hex: "52 43 55"
  write_value_hex: "1E"
  description: Inject VOLUME- key press.
  params: []

# --- System: Reset All (ALL) ---

- id: reset_all
  label: Reset All to Default
  kind: action
  cmd: ALL
  cmd_hex: "41 4C 4C"
  description: Reset all settings to factory defaults. Write-only.
  params:
    - name: value
      type: enum
      values:
        - value: "00"
          label: Reset All

# --- System: Lock Keys (KLC) ---

- id: lock_keys_set
  label: Set Key Lock
  kind: action
  cmd: KLC
  cmd_hex: "4B 4C 43"
  description: Lock or unlock front panel keys.
  params:
    - name: state
      type: enum
      values:
        - value: "00"
          label: Unlock Keys
        - value: "01"
          label: Lock Keys

- id: lock_keys_query
  label: Key Lock Query
  kind: query
  cmd: KLC
  cmd_hex: "4B 4C 43"
  query_command: "07 IDT 01 4B 4C 43 08"
  params: []

# --- Information: Read Serial Number (SER) ---

- id: serial_number_query
  label: Read Serial Number
  kind: query
  cmd: SER
  cmd_hex: "53 45 52"
  query_command: "07 IDT 01 53 45 52 08"
  description: Returns 13 ASCII bytes representing the serial number.
  params: []

# --- Information: Read Model Name (MNA) ---

- id: model_name_query
  label: Read Model Name
  kind: query
  cmd: MNA
  cmd_hex: "4D 4E 41"
  query_command: "07 IDT 01 4D 4E 41 08"
  description: Returns 13 ASCII bytes representing the model name.
  params: []

# --- Information: Read Firmware Version (GVE) ---

- id: firmware_version_query
  label: Read Firmware Version
  kind: query
  cmd: GVE
  cmd_hex: "47 56 45"
  query_command: "07 IDT 01 47 56 45 08"
  description: Returns 6 ASCII bytes representing the firmware version string.
  params: []

# --- Information: Read RS232 Table Version (RTV) ---

- id: rs232_table_version_query
  label: Read RS232 Table Version
  kind: query
  cmd: RTV
  cmd_hex: "52 54 56"
  query_command: "07 IDT 01 52 54 56 08"
  description: Returns a single byte (0–255) indicating RS-232 command table version.
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  cmd: POW
  values:
    - value: "00"
      label: "Off"
    - value: "01"
      label: "On"

- id: main_input_source
  type: enum
  cmd: MIN
  values:
    - value: "00"
      label: VGA
    - value: "0D"
      label: DisplayPort1
    - value: "10"
      label: DisplayPort2
    - value: "09"
      label: HDMI1
    - value: "0A"
      label: HDMI2
    - value: "0B"
      label: HDMI3
    - value: "0C"
      label: HDMI4

- id: volume_level
  type: integer
  cmd: VOL
  range: [0, 100]

- id: mute_state
  type: enum
  cmd: MUT
  values:
    - value: "00"
      label: Mute Off
    - value: "01"
      label: Mute On

- id: serial_number
  type: string
  cmd: SER
  description: 13-byte ASCII serial number string.

- id: model_name
  type: string
  cmd: MNA
  description: 13-byte ASCII model name string.

- id: firmware_version
  type: string
  cmd: GVE
  description: 6-byte ASCII firmware version string.

- id: power_status_alert
  type: enum
  description: Unsolicited alert when display is powered down (if Power Status Alert is enabled in Communication menu).
  values:
    - label: Power down alert

- id: source_status_alert
  type: enum
  description: Unsolicited alert when source changes (if Source Status Alert is enabled).

- id: signal_lost_alert
  type: enum
  description: Unsolicited alert when video signal is lost (if Signal Lost Status is enabled).
```

## Variables
```yaml
# UNRESOLVED: no distinct settable-variable section beyond the W/R commands already covered in Actions
```

## Events
```yaml
# The communication menu documents three unsolicited alert types that the display
# can send when configured:
- id: power_status_alert
  description: Sent when the display is powered down (Power Status Alert = On in Communication menu).

- id: source_status_alert
  description: Sent when the active source changes (Source Status Alert = On).

- id: signal_lost_alert
  description: Sent when the video signal is lost (Signal Lost Status = On).

# UNRESOLVED: exact frame format for unsolicited alerts not specified in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for:
  - reset_all  # resets all settings to factory defaults
interlocks: []
# No safety interlocks or power-on sequencing requirements stated in source.
```

## Notes
Command frame format summary:
- STX = 0x07, ETX = 0x08
- IDT byte = don't care (set to any value, typically 0x01 in examples)
- Type byte: 0x01 = read, 0x02 = write, 0x00 = return from monitor
- CMD is always exactly 3 ASCII bytes (e.g. "POW" = 0x50 0x4F 0x57)
- Write frame: 07 IDT 02 CMD[0] CMD[1] CMD[2] VAL 08 (8 bytes total)
- Read frame:  07 IDT 01 CMD[0] CMD[1] CMD[2] 08 (7 bytes total)
- Response always mirrors the CMD bytes with Type=00 and the current/set value appended.

The default baud rate is 115200 (configurable via BRA command or the OSD Communication menu). The display also supports Ethernet control; the LAN port must be enabled via the Communication menu (Enable Network = On). The TCP/IP control port number is not stated in the source documentation.

Commands marked with ▲ in the source are valid even in power saving / sleep mode, provided the Wake Up From Sleep setting is not "VGA Only". These include POW (power on/off) and MIN (input source).

The RCU (Remote Control) command is write-only; there is no read variant documented.
The SWA (PIP/Main Swap) command is write-only; there is no read variant documented.
The ALL (Reset All) command is write-only.

<!-- UNRESOLVED: TCP port number for Ethernet/IP control not stated in source -->
<!-- UNRESOLVED: Exact frame format for unsolicited status alerts (Power Status Alert, Source Status Alert, Signal Lost Status) not documented -->
<!-- UNRESOLVED: Whether Ethernet control uses Telnet, raw TCP, or another application layer protocol is not stated -->

## Provenance

```yaml
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-102207-08-christie-lit-man-ref-spyder-commands.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
retrieved_at: 2026-05-04T15:10:58.851Z
last_checked_at: 2026-05-26T14:13:55.163Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-26T14:13:55.163Z
matched_actions: 213
action_count: 213
confidence: high
summary: "All 213 spec actions verified against source; wire-level commands, parameter ranges, and transport settings all match exactly."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
