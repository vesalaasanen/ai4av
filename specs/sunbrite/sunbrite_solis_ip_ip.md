---
spec_id: admin/sunbrite-solis-ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sunbrite Solis IP Control Spec"
manufacturer: Sunbrite
model_family: "Solis IP"
aliases: []
compatible_with:
  manufacturers:
    - Sunbrite
  models:
    - "Solis IP"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - help.snapone.com
source_urls:
  - "https://help.snapone.com/sb-solis-ig/Content/Topics/IP%20Control%20Guide.htm"
retrieved_at: 2026-05-27T13:46:04.021Z
last_checked_at: 2026-10-07T13:09:01.064Z
generated_at: 2026-10-07T13:09:01.064Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no explicit power-on command; must use Wake-on-LAN."
  - "no discrete settable parameters documented as variables."
  - "no unsolicited event notifications documented in source."
  - "no explicit multi-step macro sequences documented in source."
  - "no explicit safety warnings or interlock procedures in source beyond WoL notes."
  - "port number for IP control server confirmed as 9761; no explicit statement of default or configurable port range."
  - "no explicit statement of PSK refresh or re-enrollment procedure."
  - "SDDP/SSDP discovery detailed but no command-based discovery protocol documented."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:09:01.064Z
  matched_actions: 57
  action_count: 57
  confidence: medium
  summary: "All 57 action units match source commands with correct shapes, transport values are supported, and the source catalogue is fully covered. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Sunbrite Solis IP Control Spec

## Summary
Sunbrite Solis IP is a Smart TV using LG webOS. Control via TCP/IP on port 9761 using AES-128 encrypted commands. Wake-on-LAN supported for power-on from standby. SDDP and SSDP device discovery supported.

<!-- UNRESOLVED: no explicit power-on command; must use Wake-on-LAN. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 9761
auth:
  type: psk  # AES-128 PSK; 8-digit alphanumeric password shown on TV; PBKDF2 key derivation
encryption:
  algorithm: AES-128-CBC
  key_derivation:
    pbkdf2:
      algorithm: sha256
      salt: "0x63,0x61,0xb8,0x0e,0x9b,0xdc,0xa6,0x63,0x8d,0x07,0x20,0xf2,0xcc,0x56,0x8f,0xb9"
      iterations: 16384
  iv_length: 16
  block_length: 16
message_termination: "\r"  # 0x0d
wake_on_lan:
  port: 4343
  magic_packet_format: "6xFF + 16xMACaddress (102 bytes total)"
```

## Traits
```yaml
- powerable      # POWER off command; WoL for power-on
- routable       # INPUT_SELECT, APP_LAUNCH
- queryable      # GET_MANUFACTURER, MODEL_NAME, FIRMWARE_VERSION, POWER_STATUS, CURRENT_APP, etc.
- levelable      # VOLUME_CONTROL (0-100), PICTURE_BACKLIGHT (0-100), PICTURE_CONTRAST (0-100), etc.
```

## Actions
```yaml
- id: power_off
  label: Power Off
  kind: action
  params: []

- id: aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: mode
      type: enum
      values: [4by3, 16by9, setbyoriginal]
      description: Video mode and live TV only

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: mode
      type: enum
      values: [screenmuteon, videomuteon, allmuteoff]
      description: screenmuteon=mute OSD+video, videomuteon=video only, allmuteoff=off

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [vivid, normal, cinema, game, eco, sports]
      description: SDR modes; HDR and Dolby Vision modes are vivid/normal/cinema/game only. IP control cannot switch between SDR/HDR/Dolby Vision; mode must match content type or command ignored.

- id: picture_backlight
  label: Backlight
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: picture_contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: picture_brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: picture_colour
  label: Colour / Color
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: Note spelling COLOUR in command name

- id: picture_tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: 0=Red max, 50=Neutral, 100=Green max

- id: picture_sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 50]
      description: Range 0-50 unlike other picture controls

- id: picture_colour_temperature
  label: Colour Temperature
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: 0=Warm max, 50=Neutral, 100=Cold max

- id: remotecontroller_lock
  label: Remote Control Lock
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]

- id: audio_balance
  label: Audio Balance
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: 0=Left max, 50=Balanced, 100=Right max

- id: audio_equalizer
  label: Audio Equalizer
  kind: action
  params:
    - name: band
      type: integer
      range: [1, 5]
      description: "1=100Hz, 2=300Hz, 3=1kHz, 4=3kHz, 5=10kHz"
    - name: gain
      type: integer
      range: [0, 20]
      description: "0=-10, 1=-9, ... 20=+10; Sound>Sound Mode Settings>Equalizer must be ON"
    - name: level
      type: integer
      range: [0, 20]
      description: Gain level value

- id: energy_saving
  label: Energy Saving
  kind: action
  params:
    - name: mode
      type: enum
      values: [auto, screenoff, maximum, medium, minimum, off]
      description: screenoff may not be compatible with newer models

- id: channel_setting_atsc_atv
  label: Tune ATSC/ATV Channel
  kind: action
  params:
    - name: channel
      type: integer
    - name: source
      type: enum
      values: [antenna, cable]

- id: channel_setting_atsc_dtv
  label: Tune ATSC/DTV Channel
  kind: action
  params:
    - name: channel
      type: integer
    - name: source
      type: enum
      values: [cablemaj, antennanotphy, cablenotphy]
    - name: minor
      type: integer
      required: false

- id: channel_add_delete
  label: Channel Add / Delete
  kind: action
  params:
    - name: action
      type: enum
      values: [add, delete]

- id: key_action
  label: Key Action
  kind: action
  params:
    - name: key
      type: enum
      values: [Exit, channelup, channeldown, volumeup, volumedown, arrowright, arrowleft, volumemute, deviceinput, sleepreserve, livetv, previouschannel, favoritechannel, pause, stop, returnback, captionsubtitle, arrowup, arrowdown, myapp, settingmenu, ok, quickmenu, videomode, audiomode, channellist, bluebutton, yellowbutton, greenbutton, redbutton, aspectration, audiodescription, programmorder, userguide, smarthome, simplelink, fastforward, rewind, programminfo, programguide, play, slowplay, soccerscreen, screenbright, number0, number1, number2, number3, number4, number5, number6, number7, number8, number9]

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: input
      type: enum
      values: [dtv, atv, cadtv, catv, hdmi1, hdmi2, hdmi3, hdmi4]
      description: APP_LAUNCH recommended for HDMI input selection

- id: app_launch
  label: Launch Application
  kind: action
  params:
    - name: appid
      type: string
      description: webOS app ID e.g. com.webos.app.hdmi3, com.webos.app.lgchannels

- id: launch_webos_app
  label: Launch Always Ready / Smart Home Card
  kind: action
  params:
    - name: card
      type: enum
      values: [Art, Clock, Movements, Moments, SoundPalette, LaunchGameCard, LaunchSportsCard]
      description: Solis does not support Always Ready; must use WoL to power on
    - name: level
      type: integer
      required: false

- id: get_manufacturer
  label: Get Manufacturer
  kind: action
  command: GET_MANUFACTURER
  params: []

- id: model_name
  label: Model Name
  kind: action
  command: MODEL_NAME
  params: []

- id: firmware_version
  label: Firmware Version
  kind: action
  command: FIRMWARE_VERSION
  params: []

- id: is_firmware_available
  label: Is Firmware Available
  kind: action
  command: IS_FIRMWARE_AVAILABLE
  params: []

- id: power_status
  label: Power Status
  kind: action
  command: POWER_STATUS
  params: []

- id: get_serial_number
  label: Get Serial Number
  kind: action
  command: GET_SERIAL_NUMBER
  params: []

- id: get_current_audio_codec
  label: Get Current Audio Codec
  kind: action
  command: GET_CURRENT_AUDIO codec
  params: []

- id: get_current_video_signal
  label: Get Current Video Signal
  kind: action
  command: GET_CURRENT_VIDEO signal
  params: []

- id: get_current_audio_output
  label: Get Current Audio Output
  kind: action
  command: GET_CURRENT_AUTIO output
  params: []

- id: friendly_name
  label: Friendly Name
  kind: action
  command: FRIENDLY_NAME
  params: []

- id: arc_status
  label: Arc Status
  kind: action
  command: ARC_STATUS
  params: []

- id: lamp_hours
  label: Lamp Hours
  kind: action
  command: LAMP_HOURS
  params: []

- id: get_macaddress
  label: Get MAC Address
  kind: action
  command: GET_MACADDRESS
  params: []

- id: mute_state
  label: Mute State
  kind: action
  command: MUTE_STATE
  params: []

- id: current_vol
  label: Current Volume
  kind: action
  command: CURRENT_VOL
  params: []

- id: get_ipcontrol_state
  label: Get IP Control State
  kind: action
  command: GET_IPCONTROL_STATE
  params: []
```

## Feedbacks
```yaml
- id: manufacturer
  type: string
  query_command: GET_MANUFACTURER
  description: GET_MANUFACTURER returns "Manufacturer: <mfg name>"

- id: model_name
  type: string
  query_command: MODEL_NAME
  description: MODEL_NAME returns "Model Name: WebOS22"

- id: firmware_version
  type: string
  query_command: FIRMWARE_VERSION
  description: FIRMWARE_VERSION returns "Firmware Version: <version>"

- id: firmware_available
  type: enum
  values: [Yes, No]
  query_command: IS_FIRMWARE_AVAILABLE
  description: IS_FIRMWARE_AVAILABLE returns "Firmware Available: Yes / No"

- id: power_status
  type: enum
  values: [active, "always ready"]
  query_command: POWER_STATUS
  description: POWER_STATUS returns "Power Status: active / always ready"

- id: current_app
  type: object
  query_command: CURRENT_APP
  description: CURRENT_APP returns APP, HDCP, Hot plug, Signal
  properties:
    app: string
    hdcp: string
    hot_plug: string
    signal: string

- id: serial_number
  type: string
  query_command: GET_SERIAL_NUMBER
  description: GET_SERIAL_NUMBER returns "Serial Number: <serial>"

- id: current_audio_codec
  type: enum
  values: [PCM, AC3]
  query_command: GET_CURRENT_AUDIO codec
  description: GET_CURRENT_AUDIO codec returns "Audio codec: PCM/AC3"

- id: current_video_signal
  type: string
  query_command: GET_CURRENT_VIDEO signal
  description: GET_CURRENT_VIDEO signal returns "Video signal type: <resolution>"

- id: current_audio_output
  type: enum
  values: [external_arc, tv_speakers]
  query_command: GET_CURRENT_AUTIO output
  description: GET_CURRENT_AUDIO output returns "Sound output: external_arc / tv_speakers"

- id: friendly_name
  type: string
  query_command: FRIENDLY_NAME
  description: FRIENDLY_NAME returns "Friendly name: [mfg] webOS TV WEBOS22"

- id: arc_status
  type: enum
  values: [not_ready, eARC, ARC]
  query_command: ARC_STATUS
  description: ARC_STATUS returns "Arc State: not_ready / eARC / ARC"

- id: lamp_hours
  type: string
  query_command: LAMP_HOURS
  description: LAMP_HOURS returns "Lamp hour: <value>"

- id: mac_address
  type: object
  query_command: GET_MACADDRESS
  description: GET_MACADDRESS returns wired or wifi MAC
  properties:
    interface: enum
    values: [wired, wifi]

- id: mute_state
  type: enum
  values: [on, off]
  query_command: MUTE_STATE

- id: current_volume
  type: integer
  query_command: CURRENT_VOL
  description: CURRENT_VOL returns current volume level

- id: ipcontrol_state
  type: enum
  values: [ON]
  query_command: GET_IPCONTROL_STATE
  description: GET_IPCONTROL_STATE returns ON if server healthy, otherwise timeout
```

## Variables
```yaml
# No persistent parameter storage beyond current state queries.
# UNRESOLVED: no discrete settable parameters documented as variables.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "TV does not support Always Ready. Power on from standby requires Wake-on-LAN magic packet to MAC address."
  - description: "Solis does not support Always Ready Smart Home Cards; WoL required to power on."
# UNRESOLVED: no explicit safety warnings or interlock procedures in source beyond WoL notes.
```

## Notes
- Commands composed of main command + sub-command/parameter. Example: `VOLUME_MUTE on`, `VOLUME_CONTROL 15`, `KEY_ACTION quickmenu`.
- Clear text messages terminated with `\r` (0x0d). Padding required if message length not multiple of 16 bytes; padding value = number of bytes padded.
- Encrypted messages prefixed with IV (16 bytes). IV itself encrypted using AES-128 ECB mode.
- Wake-on-LAN: magic packet = 6xFF + 16xMAC (102 bytes total). Port 4343 or any port. Broadcast IP or unicast IP both valid.
- "COLOUR" spelling used in PICTURE_COLOUR command (not "COLOR").
- PICTURE_MODE commands do not switch between SDR/HDR/Dolby Vision — content type is set by TV and source. Incompatible picture mode commands are ignored.
- Audio Equalizer requires Sound > Sound Mode Settings > Equalizer to be ON.
- APP_LAUNCH is recommended method for HDMI input selection.
- webOS app IDs documented include: com.webos.app.settings, com.webos.app.hdmi1-4, com.webos.app.lgchannels, youtube.leanback.v4, Netflix, and 60+ others.
<!-- UNRESOLVED: port number for IP control server confirmed as 9761; no explicit statement of default or configurable port range. -->
<!-- UNRESOLVED: no explicit statement of PSK refresh or re-enrollment procedure. -->
<!-- UNRESOLVED: SDDP/SSDP discovery detailed but no command-based discovery protocol documented. -->

## Provenance

```yaml
source_domains:
  - help.snapone.com
source_urls:
  - "https://help.snapone.com/sb-solis-ig/Content/Topics/IP%20Control%20Guide.htm"
retrieved_at: 2026-05-27T13:46:04.021Z
last_checked_at: 2026-10-07T13:09:01.064Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:09:01.064Z
matched_actions: 57
action_count: 57
confidence: medium
summary: "All 57 action units match source commands with correct shapes, transport values are supported, and the source catalogue is fully covered. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no explicit power-on command; must use Wake-on-LAN."
- "no discrete settable parameters documented as variables."
- "no unsolicited event notifications documented in source."
- "no explicit multi-step macro sequences documented in source."
- "no explicit safety warnings or interlock procedures in source beyond WoL notes."
- "port number for IP control server confirmed as 9761; no explicit statement of default or configurable port range."
- "no explicit statement of PSK refresh or re-enrollment procedure."
- "SDDP/SSDP discovery detailed but no command-based discovery protocol documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
