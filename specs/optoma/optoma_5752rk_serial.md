---
spec_id: admin/optoma-5752rk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma 5752Rk Control Spec"
manufacturer: Optoma
model_family: 5752Rk
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - 5752Rk
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - region-resource.optoma.com
  - optomausa.com
source_urls:
  - https://region-resource.optoma.com/products/documents/RsaoIQhoaoLqdhAu1QP8DhgZtetPJ59GtrBTkUVk.pdf
  - https://www.optomausa.com/support
retrieved_at: 2026-07-15T00:21:07.478Z
last_checked_at: 2026-07-22T00:20:43.142Z
generated_at: 2026-07-22T00:20:43.142Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Voltage/power/current specs not in this protocol document. Auth/token behavior not described."
  - "no separate get commands documented for treble, bass, balance, color, backlight"
  - "no multi-step sequences described in source."
  - "firmware version compatibility range not stated in source."
  - "electrical/voltage/power/current specs not present in this protocol document."
  - "authentication / login procedure not described (inferred none)."
  - "response timing / inter-command delay not specified."
  - "no GET commands documented for treble, bass, balance, color, backlight, language, freeze, pixel-shift — read-back of these not confirmed."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:20:43.142Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions matched source command-for-command with exact hex codes; all transport parameters verified; auto-send events represented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-15
---

# Optoma 5752Rk Control Spec

## Summary
The Optoma 5752Rk is a Creative Touch 5-Series interactive flat panel display (IFPD). This spec covers its RS-232C serial and RJ45 LAN (TCP, port 23) control protocol, including power, audio, video, input-source, picture, and system-status commands. The command frame is an ASCII string: `~` lead + 2-digit device ID + variable-length command ID + space + parameter + CR.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Voltage/power/current specs not in this protocol document. Auth/token behavior not described. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # RJ45 LAN control port, stated in source
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

**Frame structure (from source):**
```
~  XX  CCCC  SP  N...  CR
7E 30 30 ...      20   ...  0D
```
- `7E` (`~`) lead code
- next 2 ASCII bytes = device ID (`30 30` = "00" in examples; source notes "01 indicates Device ID = 01" — device ID is configurable per display)
- then command ID (2–3 ASCII digits)
- `20` (space) separator
- parameter byte(s) (ASCII)
- `0D` (CR) terminator

Note: examples use device ID "00". Set bytes 2–3 to the display's configured ID.

**Response codes:**
- SET commands reply `P` (success) or `F` (failed).
- GET commands reply `OK<value>` (success) or `F` (failed).

## Traits
```yaml
traits:
  - powerable    # inferred: power on/off/restart commands present
  - levelable    # inferred: volume, brightness, contrast, treble, bass, balance, color, backlight control present
  - queryable    # inferred: GET/query commands returning state present
```

## Actions
```yaml
# ---------------------------------------------------------------------------
# SET commands - each distinct command ID (opcode) = one action.
# Enum values of a single opcode are parameterized, not multiplied.
# Device ID is "00" in all hex examples (bytes 2-3); adjust to match display.
# ---------------------------------------------------------------------------

- id: set_power
  label: Set Power
  kind: action
  command: "7E 30 30 30 30 20 {state} 0D"
  params:
    - name: state
      type: enum
      description: "ASCII decimal power state"
      values:
        - { value: "0", label: "Power off" }
        - { value: "1", label: "Power on" }
        - { value: "3", label: "Restart" }
  response_success: "P"
  response_failed: "F"

- id: set_power_mode_standby
  label: Set Power Mode (Standby)
  kind: action
  command: "7E 30 30 31 31 34 20 {mode} 0D"
  params:
    - name: mode
      type: enum
      description: "ASCII decimal standby mode"
      values:
        - { value: "0", label: "Eco." }
        - { value: "1", label: "Active" }
  response_success: "P"
  response_failed: "F"
  notes: "Remote/LAN power-on only works when Standby = Active."

- id: set_treble
  label: Set Treble
  kind: action
  command: "7E 30 30 39 35 20 {level} 0D"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "ASCII decimal 0-100"
  response_success: "P"
  response_failed: "F"

- id: set_bass
  label: Set Bass
  kind: action
  command: "7E 30 30 39 36 20 {level} 0D"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "ASCII decimal 0-100"
  response_success: "P"
  response_failed: "F"

- id: set_balance
  label: Set Balance
  kind: action
  command: "7E 30 30 39 39 20 {level} 0D"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "ASCII decimal 0-100"
  response_success: "P"
  response_failed: "F"

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "7E 30 30 32 32 20 {level} 0D"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "ASCII decimal 0-100"
  response_success: "P"
  response_failed: "F"

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "7E 30 30 32 31 20 {level} 0D"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "ASCII decimal 0-100"
  response_success: "P"
  response_failed: "F"

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  command: "7E 30 30 32 35 32 20 {mode} 0D"
  params:
    - name: mode
      type: enum
      description: "ASCII decimal sound mode"
      values:
        - { value: "1", label: "Standard" }
        - { value: "2", label: "User" }
        - { value: "3", label: "Classroom" }
        - { value: "4", label: "Meeting" }
        - { value: "5", label: "Movie" }
  response_success: "P"
  response_failed: "F"

- id: set_volume
  label: Set Volume
  kind: action
  command: "7E 30 30 38 31 20 {level} 0D"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "ASCII decimal 0-100"
  response_success: "P"
  response_failed: "F"

- id: set_video_mute
  label: Set Video Mute
  kind: action
  command: "7E 30 30 31 33 20 {state} 0D"
  params:
    - name: state
      type: enum
      description: "ASCII decimal video-mute state"
      values:
        - { value: "0", label: "Off" }
        - { value: "1", label: "On" }
  response_success: "P"
  response_failed: "F"

- id: set_mute
  label: Set Audio Mute
  kind: action
  command: "7E 30 30 38 30 20 {state} 0D"
  params:
    - name: state
      type: enum
      description: "ASCII decimal mute state"
      values:
        - { value: "0", label: "Off" }
        - { value: "1", label: "On" }
  response_success: "P"
  response_failed: "F"

- id: set_input_source
  label: Set Input Source
  kind: action
  command: "7E 30 30 31 32 20 {source} 0D"
  params:
    - name: source
      type: enum
      description: "ASCII decimal input source"
      values:
        - { value: "1",  label: "HDMI1" }
        - { value: "5",  label: "VGA" }
        - { value: "15", label: "HDMI2" }
        - { value: "16", label: "HDMI3" }
        - { value: "24", label: "Android" }
        - { value: "25", label: "Slot in PC" }
        - { value: "27", label: "USB Type C" }
  response_success: "P"
  response_failed: "F"

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  command: "7E 30 30 36 30 20 {ratio} 0D"
  params:
    - name: ratio
      type: enum
      description: "ASCII decimal aspect ratio"
      values:
        - { value: "1",  label: "4:3" }
        - { value: "2",  label: "16:9" }
        - { value: "14", label: "PTP" }
  response_success: "P"
  response_failed: "F"

- id: set_language
  label: Set Language
  kind: action
  command: "7E 30 30 37 30 20 {language} 0D"
  params:
    - name: language
      type: enum
      description: "ASCII decimal language code"
      values:
        - { value: "1",  label: "English" }
        - { value: "2",  label: "German" }
        - { value: "3",  label: "Français" }
        - { value: "4",  label: "Italian" }
        - { value: "5",  label: "Español" }
        - { value: "6",  label: "Português" }
        - { value: "7",  label: "Polish" }
        - { value: "8",  label: "Dutch" }
        - { value: "9",  label: "Swedish" }
        - { value: "10", label: "Norge" }
        - { value: "11", label: "Finnish" }
        - { value: "13", label: "Traditional Chinese" }
        - { value: "14", label: "Simplified Chinese" }
        - { value: "17", label: "Russian" }
        - { value: "18", label: "Hungarian" }
        - { value: "19", label: "Czech" }
        - { value: "20", label: "Arabic" }
        - { value: "22", label: "Turkish" }
        - { value: "24", label: "Danish" }
        - { value: "27", label: "Romanian" }
  response_success: "P"
  response_failed: "F"

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  command: "7E 30 30 32 30 20 {mode} 0D"
  params:
    - name: mode
      type: enum
      description: "ASCII decimal picture mode"
      values:
        - { value: "1",  label: "Presentation" }
        - { value: "2",  label: "Bright" }
        - { value: "3",  label: "Cinema" }
        - { value: "5",  label: "User" }
        - { value: "21", label: "HDR" }
  response_success: "P"
  response_failed: "F"

- id: set_color
  label: Set Color
  kind: action
  command: "7E 30 30 34 35 20 {level} 0D"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "ASCII decimal 0-100"
  response_success: "P"
  response_failed: "F"

- id: set_backlight
  label: Set Backlight
  kind: action
  command: "7E 30 30 32 35 31 20 {level} 0D"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "ASCII decimal 0-100"
  response_success: "P"
  response_failed: "F"

- id: set_color_temp
  label: Set Color Temperature
  kind: action
  command: "7E 30 30 33 36 20 {temp} 0D"
  params:
    - name: temp
      type: enum
      description: "ASCII decimal color temperature"
      values:
        - { value: "1", label: "Standard" }
        - { value: "2", label: "Cool" }
        - { value: "4", label: "Warm" }
  response_success: "P"
  response_failed: "F"

- id: set_freeze
  label: Set Freeze
  kind: action
  command: "7E 30 30 30 34 20 {state} 0D"
  params:
    - name: state
      type: enum
      description: "ASCII decimal freeze state"
      values:
        - { value: "0", label: "Unfreeze" }
        - { value: "1", label: "Freeze" }
  response_success: "P"
  response_failed: "F"

- id: set_pixel_shift_interval
  label: Set Pixel Shift Interval (min)
  kind: action
  command: "7E 30 30 32 35 30 20 {interval} 0D"
  params:
    - name: interval
      type: enum
      description: "ASCII decimal pixel-shift interval in minutes"
      values:
        - { value: "0",  label: "Off" }
        - { value: "2",  label: "2" }
        - { value: "3",  label: "3" }
        - { value: "5",  label: "5" }
        - { value: "30", label: "30" }
        - { value: "60", label: "60" }
  response_success: "P"
  response_failed: "F"

- id: remote_control_command
  label: Remote Control Command
  kind: action
  command: "7E 30 30 31 34 30 20 {key} 0D"
  params:
    - name: key
      type: enum
      description: "ASCII decimal remote key code"
      values:
        - { value: "10", label: "Remote UP" }
        - { value: "11", label: "Remote LEFT" }
        - { value: "12", label: "Remote OK" }
        - { value: "13", label: "Remote RIGHT" }
        - { value: "14", label: "Remote DOWN" }
        - { value: "17", label: "Vol +" }
        - { value: "18", label: "Vol -" }
        - { value: "20", label: "Remote Menu Key" }
        - { value: "47", label: "Remote Input source" }
        - { value: "74", label: "Remote Exit" }
  response_success: "P"
  response_failed: "F"

- id: display_osd_message
  label: Display Message on OSD
  kind: action
  command: "7E 30 30 32 31 30 20 {message} 0D"
  params:
    - name: message
      type: string
      description: "ASCII message text to display on OSD"
  response_success: "P"
  response_failed: "F"

- id: reset_to_default
  label: Reset To Default
  kind: action
  command: "7E 30 30 31 31 32 20 31 0D"
  params: []
  response_success: "P"
  response_failed: "F"

- id: set_osd_lock
  label: Set OSD Lock
  kind: action
  command: "7E 30 30 32 33 39 20 {mode} {password} 0D"
  params:
    - name: mode
      type: enum
      description: "ASCII decimal OSD lock mode"
      values:
        - { value: "1", label: "OSD lock On" }
        - { value: "2", label: "OSD lock Off" }
    - name: password
      type: string
      description: "ASCII numeric password (~nnnn)"
  response_success: "P"
  response_failed: "F"

# ---------------------------------------------------------------------------
# GET (query) commands - kind: query. Each returns OK<value> or F.
# ---------------------------------------------------------------------------

- id: query_power
  label: Query Power State
  kind: query
  command: "7E 30 30 31 32 34 20 31 0D"
  params: []
  response_format: "OK0=Power off; OK1=Power on"

- id: query_contrast
  label: Query Contrast
  kind: query
  command: "7E 30 30 31 32 36 20 31 0D"
  params: []
  response_format: "OK0-100"

- id: query_brightness
  label: Query Brightness
  kind: query
  command: "7E 30 30 31 32 35 20 31 0D"
  params: []
  response_format: "OK0-100"

- id: query_volume
  label: Query Volume
  kind: query
  command: "7E 30 30 31 32 30 20 31 0D"
  params: []
  response_format: "OK0-100"

- id: query_video_mute
  label: Query Video Mute
  kind: query
  command: "7E 30 30 33 36 33 20 31 0D"
  params: []
  response_format: "OK0=Off; OK1=On"

- id: query_mute
  label: Query Audio Mute
  kind: query
  command: "7E 30 30 33 35 36 20 31 0D"
  params: []
  response_format: "OK0=Off; OK1=On"

- id: query_sound_mode
  label: Query Sound Mode
  kind: query
  command: "7E 30 30 31 33 39 20 31 0D"
  params: []
  response_format: "OK1=Standard; OK2=User; OK3=Classroom; OK4=Meeting; OK5=Movie"

- id: query_input_source
  label: Query Input Source
  kind: query
  command: "7E 30 30 31 32 31 20 31 0D"
  params: []
  response_format: "OK7=HDMI1; OK8=HDMI2; OK9=HDMI3; OK23=USB Type C; OK2=VGA; OK20=Android; OK21=Slot in PC"

- id: query_aspect_ratio
  label: Query Aspect Ratio
  kind: query
  command: "7E 30 30 31 32 37 20 31 0D"
  params: []
  response_format: "OK1=4:3; OK2=16:9; OK14=PTP"

- id: query_picture_mode
  label: Query Picture Mode
  kind: query
  command: "7E 30 30 31 32 33 20 31 0D"
  params: []
  response_format: "OK1=Presentation; OK2=Bright; OK3=Cinema; OK5=User; OK10=DICOM SIM.; OK21=HDR"

- id: query_color_temp
  label: Query Color Temperature
  kind: query
  command: "7E 30 30 31 32 38 20 31 0D"
  params: []
  response_format: "OK0=Standard; OK1=Cool; OK3=Warm"

- id: query_wlan
  label: Query WLAN Status / IP
  kind: query
  command: "7E 30 30 34 35 31 20 {selector} 0D"
  params:
    - name: selector
      type: enum
      description: "ASCII decimal sub-query"
      values:
        - { value: "1", label: "WLAN status (OK0=Disconnected; OK1=Connected)" }
        - { value: "2", label: "WLAN IP address (OK nnn.nnn.nnn.nnn)" }
  response_format: "see selector"

- id: query_mac_address
  label: Query MAC Address
  kind: query
  command: "7E 30 30 35 35 35 20 {selector} 0D"
  params:
    - name: selector
      type: enum
      description: "ASCII decimal interface selector"
      values:
        - { value: "1", label: "LAN MAC address" }
        - { value: "2", label: "WLAN MAC address" }
  response_format: "OK nn:nn:nn:nn:nn:nn"

- id: query_lan
  label: Query LAN Status / IP
  kind: query
  command: "7E 30 30 38 37 20 {selector} 0D"
  params:
    - name: selector
      type: enum
      description: "ASCII decimal sub-query"
      values:
        - { value: "1", label: "LAN status (OK0=Disconnected; OK1=Connected)" }
        - { value: "3", label: "LAN IP address (OK nnn.nnn.nnn.nnn)" }
  response_format: "see selector"

- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  command: "7E 30 30 31 32 32 20 31 0D"
  params: []
  response_format: "OK nnnnnnnnnnnnnn (ex. 20190926164814)"

- id: query_usage_hour
  label: Query Usage Hour
  kind: query
  command: "7E 30 30 31 30 38 20 31 0D"
  params: []
  response_format: "OK nnnnn"

- id: query_device_type
  label: Query Device Type
  kind: query
  command: "7E 30 30 31 34 39 20 31 0D"
  params: []
  response_format: "OK2=IFP"

- id: query_information
  label: Query Information String
  kind: query
  command: "7E 30 30 31 35 30 20 {selector} 0D"
  params:
    - name: selector
      type: enum
      description: "ASCII decimal information selector"
      values:
        - { value: "1",  label: "Composite info (a=power, bbbb=running time, cc=input source, ddd=firmware, ee=display mode)" }
        - { value: "2",  label: "Device native resolution" }
        - { value: "3",  label: "Input source (ex. OKHDMI1)" }
        - { value: "4",  label: "Source resolution (ex. OK1920x1080)" }
        - { value: "16", label: "Power mode standby (OK0=Eco.; OK1=Active)" }
        - { value: "17", label: "DHCP (OK0=Off; OK1=On)" }
        - { value: "18", label: "System temperature (ex. OK48)" }
        - { value: "19", label: "Source refresh rate (ex. OK60Hz)" }
  response_format: "see selector"
  notes: >
    selector=1 returns OKabbbbbccddddee where
    a=0 Power Off / a=1 Power On;
    bbbbb = usage hours; cc = input source code
    (02=VGA1, 08=HDMI2, 10=Component, 14=HDMI3, 15=DisplayPort, 18=Android,
    19=Slot in PC, 21=USB Type C); dddd = firmware version; ee = display mode
    (01=Presentation, 02=Bright, 03=Cinema, 05=User, 10=DICOM SIM., 21=HDR).

- id: query_regulatory_model_name
  label: Query Regulatory Model Name
  kind: query
  command: "7E 30 30 31 35 31 20 33 0D"
  params: []
  response_format: "OK nnn (ex. SLUGRK)"

- id: query_osd_lock
  label: Query OSD Lock
  kind: query
  command: "7E 30 30 32 32 39 20 31 0D"
  params: []
  response_format: "OK0=Off; OK1=On"
```

## Feedbacks
```yaml
# Query responses map to these observable states.
- id: power_state
  type: enum
  values: [off, on]
  query: query_power
- id: contrast_level
  type: integer_range
  range: [0, 100]
  query: query_contrast
- id: brightness_level
  type: integer_range
  range: [0, 100]
  query: query_brightness
- id: volume_level
  type: integer_range
  range: [0, 100]
  query: query_volume
- id: video_mute_state
  type: enum
  values: [off, on]
  query: query_video_mute
- id: audio_mute_state
  type: enum
  values: [off, on]
  query: query_mute
- id: sound_mode
  type: enum
  values: [Standard, User, Classroom, Meeting, Movie]
  query: query_sound_mode
- id: input_source
  type: enum
  values: [HDMI1, HDMI2, HDMI3, "USB Type C", VGA, Android, "Slot in PC"]
  query: query_input_source
- id: aspect_ratio
  type: enum
  values: ["4:3", "16:9", PTP]
  query: query_aspect_ratio
- id: picture_mode
  type: enum
  values: [Presentation, Bright, Cinema, User, "DICOM SIM.", HDR]
  query: query_picture_mode
- id: color_temperature
  type: enum
  values: [Standard, Cool, Warm]
  query: query_color_temp
- id: osd_lock_state
  type: enum
  values: [off, on]
  query: query_osd_lock
- id: power_mode_standby
  type: enum
  values: [Eco, Active]
  query: query_information  # selector=16
- id: wlan_status
  type: enum
  values: [Disconnected, Connected]
  query: query_wlan  # selector=1
- id: lan_status
  type: enum
  values: [Disconnected, Connected]
  query: query_lan  # selector=1
- id: usage_hours
  type: integer
  query: query_usage_hour
- id: firmware_version
  type: string
  query: query_firmware_version
- id: system_temperature
  type: integer
  query: query_information  # selector=18
```

## Variables
```yaml
# Settable parameters exposed as continuous/discrete variables (covered by SET actions above):
- id: treble
  type: integer_range
  range: [0, 100]
  set: set_treble
- id: bass
  type: integer_range
  range: [0, 100]
  set: set_bass
- id: balance
  type: integer_range
  range: [0, 100]
  set: set_balance
- id: color
  type: integer_range
  range: [0, 100]
  set: set_color
- id: backlight
  type: integer_range
  range: [0, 100]
  set: set_backlight
# UNRESOLVED: no separate get commands documented for treble, bass, balance, color, backlight
```

## Events
```yaml
# Unsolicited auto-send status notifications from the display.
- id: system_standby
  payload: "INFO0"
  description: "System entered Standby Mode"
- id: system_warming_up
  payload: "INFO1"
  description: "System is Warming up"
- id: system_cooling_down
  payload: "INFO2"
  description: "System is Cooling down"
- id: system_over_temperature
  payload: "INFO7"
  description: "System Over-temperature warning"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: remote_power_on_standby
    description: >
      OMS and LAN remote power-on only function when Power Mode (Standby) is set
      to Active. Active Standby consumes more power (backlight off, mainboard
      awake) to listen for wake commands.
    source: "Protocol precondition (Power Mode / Standby) section"
  - id: over_temperature_notification
    description: >
      Device auto-sends INFO7 on over-temperature condition.
    source: "GET Command - System Auto send table"
# No explicit power-on sequencing interlock beyond the standby-mode precondition.
```

## Notes
- Command frame is ASCII over both RS-232 and TCP. Same command set applies to both transports (port 23 for RJ45).
- All hex examples use device ID "00" (bytes 2–3 = `30 30`). The source notes device ID is configurable ("01 indicates Device ID = 01"); set the device-ID bytes to match the display's configured ID.
- Parameter bytes are ASCII decimal strings; multi-digit values occupy multiple bytes (e.g. volume 100 = `31 30 30`).
- SET commands acknowledge with `P` (pass) / `F` (fail). GET commands return `OK<value>` or `F`.
- LED indicators (from source): Solid Red = Standby; Solid White = Power on; Flash Red then Blue continuously = Backlight off.
- Source contained OCR artifacts ("od" for CR `0D`, "Solot in PC"/"Slot in PC", "Suage hours"); normalized to `0D` and corrected spellings in labels.

<!-- UNRESOLVED: firmware version compatibility range not stated in source. -->
<!-- UNRESOLVED: electrical/voltage/power/current specs not present in this protocol document. -->
<!-- UNRESOLVED: authentication / login procedure not described (inferred none). -->
<!-- UNRESOLVED: response timing / inter-command delay not specified. -->
<!-- UNRESOLVED: no GET commands documented for treble, bass, balance, color, backlight, language, freeze, pixel-shift — read-back of these not confirmed. -->
```

## Provenance

```yaml
source_domains:
  - region-resource.optoma.com
  - optomausa.com
source_urls:
  - https://region-resource.optoma.com/products/documents/RsaoIQhoaoLqdhAu1QP8DhgZtetPJ59GtrBTkUVk.pdf
  - https://www.optomausa.com/support
retrieved_at: 2026-07-15T00:21:07.478Z
last_checked_at: 2026-07-22T00:20:43.142Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:20:43.142Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions matched source command-for-command with exact hex codes; all transport parameters verified; auto-send events represented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Voltage/power/current specs not in this protocol document. Auth/token behavior not described."
- "no separate get commands documented for treble, bass, balance, color, backlight"
- "no multi-step sequences described in source."
- "firmware version compatibility range not stated in source."
- "electrical/voltage/power/current specs not present in this protocol document."
- "authentication / login procedure not described (inferred none)."
- "response timing / inter-command delay not specified."
- "no GET commands documented for treble, bass, balance, color, backlight, language, freeze, pixel-shift — read-back of these not confirmed."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
