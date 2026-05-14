---
spec_id: admin/lg-50un6955zuf
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 50UN6955ZUF Control Spec"
manufacturer: LG
model_family: 50UN6955ZUF
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 50UN6955ZUF
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-25T21:03:52.558Z
generated_at: 2026-04-25T21:03:52.558Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:03:52.558Z
  matched_actions: 27
  action_count: 27
  confidence: high
  summary: "All 27 spec actions matched source commands verbatim; transport parameters verified; complete bidirectional coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 50UN6955ZUF Control Spec

## Summary
LG 50-inch 4K UHD commercial television supporting both RS-232C serial control and wired/wireless IP control via Telnet on port 9761. Supports power, picture, audio, channel tuning, input selection, 3D modes, and backlight control. Default IP control password is 828.

<!-- UNRESOLVED: model may have USB serial support (PL2303 chip) but no command documentation for USB path -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9761  # stated: Telnet port for IP control
serial:
  baud_rate: 9600  # stated: "9600 bps (UART)"
  data_bits: 8     # stated: "Data length : 8 bits"
  parity: none      # stated: "Parity : None"
  stop_bits: 1     # stated: "Stop bit : 1 bit"
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: password  # IP control requires password; RS-232 has no auth
  password: "828"  # default password stated for IP control setup
```

## Traits
```yaml
- powerable       # power on/off commands present (ka / POWER)
- levelable       # volume, contrast, brightness, tint, sharpness, backlight present
- routable        # input select command present (xb / INPUT_SELECT)
- queryable       # read mode via FF data returns current state
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: enum
      values: [off, on]
      description: "00 = Off, 01 = On, FF = Query"

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: mode
      type: enum
      values: [01, 02, 04, 05, 06, 07, 09, 0B, 0C, 10-1F]
      description: "01=Normal, 02=Wide, 04=Zoom, 05=Zoom2, 06=Original, 07=14:9, 09=JustScan, 0B=FullWide, 0C=21:9, 10-1F=CinemaZoom"

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: mode
      type: enum
      values: [00, 01, 10]
      description: "00=Off, 01=Screen mute on, 10=Video mute on"

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [00, 01]
      description: "00=Mute on, 01=Mute off"

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: "0-100 (IP); 00-64 (RS-232)"

- id: picture_contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: "0-100 (IP); 00-64 (RS-232)"

- id: picture_brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: "0-100 (IP); 00-64 (RS-232)"

- id: picture_colour
  label: Color/Colour
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: "0-100 (IP); 00-64 (RS-232)"

- id: picture_tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: "0-100 (IP); 00-64 (RS-232) — Red=00 to Green=64"

- id: picture_sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 50]
      description: "0-50 (IP); 00-32 (RS-232)"

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: enum
      values: [00, 01]
      description: "00=OSD off, 01=OSD on"

- id: remotecontrol_lock
  label: Remote Control Lock
  kind: action
  params:
    - name: state
      type: enum
      values: [00, 01]
      description: "00=Lock off, 01=Lock on"

- id: audio_balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: "0-100 (IP); 00-64 (RS-232)"

- id: audio_treble
  label: Treble
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
      description: "RS-232 only: 00-64"

- id: audio_bass
  label: Bass
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
      description: "RS-232 only: 00-64"

- id: picture_colour_temperature
  label: Color Temperature
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: "0-100 (IP); 00-64 (RS-232)"

- id: audio_equalizer
  label: Equalizer
  kind: action
  params:
    - name: band
      type: integer
      range: [1, 5]
      description: "Frequency band 1-5"
    - name: step
      type: integer
      range: [0, 20]
      description: "Step value 0-20"

- id: energy_saving
  label: Energy Saving
  kind: action
  params:
    - name: mode
      type: enum
      values: [00, 01, 02, 03, 04, 05]
      description: "00=Off, 01=Minimum, 02=Medium, 03=Maximum, 04=Auto, 05=Screen off"

- id: channel_tune_analog
  label: Tune Analog Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number (decimal)"
    - name: source
      type: enum
      values: [antenna, cable]
      description: "00=Antenna TV, 80=Cable TV (RS-232); antenna/cable (IP)"

- id: channel_tune_digital
  label: Tune Digital Channel
  kind: action
  params:
    - name: physical
      type: integer
      description: "Physical channel number (RS-232 only)"
    - name: major
      type: integer
      description: "Major channel number"
    - name: minor
      type: integer
      description: "Minor/sub-channel number"
    - name: source
      type: enum
      values: [dtv, cadtv, antennanotphy, cablenotphy]
      description: "02=DTV antenna, 06=CADTV, 22=DTV antennanotphy, 26=DTV cablenotphy (RS-232)"

- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  params:
    - name: action
      type: enum
      values: [add, delete]
      description: "01=Add, 00=Delete/Skip"

- id: key_action
  label: Key Action
  kind: action
  params:
    - name: key
      type: string
      description: "Key code from remote key code table (RS-232 hex; IP string)"

- id: picture_backlight
  label: Backlight Control
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: "0-100 (IP); 00-64 (RS-232)"

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: source
      type: enum
      values: [dtv, cadtv, satdtv, atv, catv, avav1, avav2, component1, component2, rgb, hdmi1, hdmi2, hdmi3, hdmi4]
      description: "Multiple input sources supported"

- id: picture_3d
  label: 3D Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, 3dto2d, on]
    - name: format
      type: enum
      values: [topandbottom, sidebyside, checkboard, framesequential, columninterleaving, rowinterleaving]
    - name: direction
      type: enum
      values: [righttoleft, lefttoright]
    - name: effect
      type: integer
      range: [0, 20]

- id: picture_3d_extension
  label: Extended 3D
  kind: action
  params:
    - name: option
      type: enum
      values: [picturecorrection, colorcorrection, sound, normal, depth, viewpoint, genre]
    - name: value
      type: integer
      description: "Varies by option type"

- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: action
      type: integer
      const: 1
      description: "01 = Execute Auto Configure (RGB/PC mode only)"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [00, 01]
  description: "00=Off, 01=On; returned on read (FF)"

- id: acknowledgement
  label: Command Acknowledgement
  type: enum
  values: [OK, NG]
  description: "OK=Success, NG=Failure; format: [Command2][Set ID][OK/NG][Data][x]"

- id: error_code
  label: Error Code
  type: enum
  values: [00]
  description: "00=Illegal Code; returned with NG response"
```

## Variables
```yaml
# All settable picture/audio parameters are covered in Actions.
# No separate Variables section needed beyond what Actions already describe.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event notifications from TV.
# TV sends ACK/NG responses only in reply to commands.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Power on via RS-232 with USB-to-Serial converter only works when TV is already on. Use RS-232C cable for power control when TV is off."
  - description: "Remote control lock (km) requires manual unlock — power off/on (plug-off/plug-in) after 20-30 seconds releases lock, but only if lock was not set while in DC-off standby mode."
  - description: "During playing/recording media, all commands except Power (ka) and Key (mc) are not executed and return NG."
  - description: "3D commands only work on 3D models; non-3D models return NG."
```

## Notes
- Serial protocol uses ASCII codes with crossed (reverse) cable; IP control uses Telnet on port 9761.
- IP control requires enabling via Settings > IP Control Setup menu; default password 828.
- Set ID range for RS-232 is 1-99 (decimal) or 0x00-0x63 (hex); Set ID 0 broadcasts to all TVs.
- RS-232 tune command (ma) supports multiple regional formats; IP uses simpler `CHANNEL_SETTING_ATSC_*` syntax.
- Equalizer requires sound mode set to Equalizer adjustment in TV settings.
- Backlight control requires Energy Saving set to Off in TV settings.
- 3D commands require PICTURE_3D to be on as precondition for most extended options.
<!-- UNRESOLVED: full key code table for IR remote (mc command) — only partial codes shown in source table -->
<!-- UNRESOLVED: USB-to-Serial PL2303 support mentioned but no separate command set documented for USB path -->
<!-- UNRESOLVED: Wake-on-LAN mobile app mentioned but no IP/WOL command protocol documented -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-25T21:03:52.558Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:03:52.558Z
matched_actions: 27
action_count: 27
confidence: high
summary: "All 27 spec actions matched source commands verbatim; transport parameters verified; complete bidirectional coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
