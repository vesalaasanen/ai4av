---
spec_id: admin/lg-2018-ethernet-v1-4
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 2018 LG TV IP Control Spec"
manufacturer: LG
model_family: "2018 LG TV (webOS 4.0)"
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - "2018 LG TV (webOS 4.0)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-04-30T04:31:17.466Z
last_checked_at: 2026-06-02T17:22:51.416Z
generated_at: 2026-06-02T17:22:51.416Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility ranges not stated"
  - "response/acknowledgement format for non-query commands not fully documented beyond the \"OK\\n\" example for VOLUME_MUTE"
  - "whether all non-query commands share this acknowledgement format.\""
  - "settable parameters distinct from actions are not separately enumerated in the source."
  - "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements beyond the WoL/WoWLAN prerequisites documented under Macros."
  - "response format / ack pattern for non-query commands beyond the single VOLUME_MUTE example."
  - "behavior when a query (other than GET_IPCONTROL_STATE) is issued while the TV is powered off or in standby."
  - "maximum command rate, inter-command delay requirements, and TCP keep-alive expectations."
  - "whether multiple concurrent TCP clients on port 9761 are supported."
  - "exact firmware versions supported (source covers \"2018 LG TV\" / webOS 4.0 generally without a version matrix)."
  - "GET_MACADDRESS interface token spelling discrepancy ('wire' in §3.5 vs 'wired' in §7.2)."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:51.416Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec actions matched verbatim in source; all transport parameters verified; source command set fully represented. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 2018 LG TV IP Control Spec

## Summary
IP control specification for 2018-model LG webOS 4.0 televisions. Commands are ASCII text terminated with carriage return (`\r`, `0x0d`), encrypted with AES-128-CBC over TCP port 9761. The AES key is derived from an 8-character alphanumeric password (shown on the TV's IP Control Setup menu) via PBKDF2-SHA256 with a fixed 16-byte salt and 2^14 iterations. The IV is randomly generated per command and prepended to the encrypted payload, itself encrypted using AES-128-ECB before transmission. Discovery is supported via SDDP (Control4) and SSDP (UPnP). Power-on uses Wake-on-LAN magic packets rather than an in-band command.

<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: response/acknowledgement format for non-query commands not fully documented beyond the "OK\n" example for VOLUME_MUTE -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 9761
auth:
  type: pre_shared_key  # 8-digit alphanumeric password shown on TV IP Control Setting menu; AES-128 key derived via PBKDF2-SHA256 (salt 0x63,0x61,0xb8,0x0e,0x9b,0xdc,0xa6,0x63,0x8d,0x07,0x20,0xf2,0xcc,0x56,0x8f,0xb9; iterations 2^14; first 16 bytes of derived key used)
encryption:
  algorithm: AES-128-CBC
  block_length_bits: 128
  key_length_bits: 128
  iv_length_bits: 128
  iv_handling: per_message_random_iv_prefixed_and_encrypted_with_AES_128_ECB
  payload_terminator: "\\r"  # 0x0d
  padding: pkcs7_style  # source: "value to be padded is the number of bytes to be padded"
discovery:
  - protocol: SDDP
    version: "1.0"
    events: [NOTIFY ALIVE, NOTIFY IDENTIFY, NOTIFY OFFLINE]
    methods: [SEARCH]
  - protocol: SSDP
    device_types:
      - urn:schemas-upnp.org:device:Basic:1
      - urn:schemas-upnp.org:service:dial:1
      - urn:schemas-upnp.org:device:MediaRenderer:1
    events: [ssdp:alive, ssdp:byebye]
wake_on_lan:
  supported: true
  magic_packet_length_bytes: 102
  default_port: 4343  # source: "Port number 4343 or any number can be used"
  notes: "WoWLAN requires router with WME/WMM; wired Ethernet must be disconnected when testing WoWLAN."
```

## Traits
```yaml
- powerable        # inferred from POWER off command and Wake-on-LAN documentation
- queryable        # inferred from GET_* and CURRENT_* query commands
- routable         # inferred from INPUT_SELECT command
- levelable        # inferred from VOLUME_CONTROL, PICTURE_BACKLIGHT, PICTURE_CONTRAST, etc.
- mutable          # inferred from VOLUME_MUTE and SCREEN_MUTE commands
```

## Actions
```yaml
- id: power_off
  label: Power Off
  kind: action
  command: "POWER off\r"
  params: []
  notes: "Source documents only 'POWER off'. Power-on is performed via Wake-on-LAN magic packet (see Transport.wake_on_lan)."

- id: aspect_ratio_set
  label: Set Aspect Ratio
  kind: action
  command: "ASPECT_RATIO {mode}\r"
  params:
    - name: mode
      type: enum
      values: [4by3, 16by9, setbyoriginal]

- id: screen_mute_set
  label: Set Screen Mute
  kind: action
  command: "SCREEN_MUTE {mode}\r"
  params:
    - name: mode
      type: enum
      values: [screenmuteon, videomuteon, allmuteoff]
      description: "screenmuteon mutes OSD and video; videomuteon mutes video only; allmuteoff disables all mutes."

- id: volume_mute_set
  label: Set Volume Mute
  kind: action
  command: "VOLUME_MUTE {state}\r"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: volume_control_set
  label: Set Volume Level
  kind: action
  command: "VOLUME_CONTROL {level}\r"
  params:
    - name: level
      type: integer
      min: 0
      max: 100

- id: picture_mode_set
  label: Set Picture Mode
  kind: action
  command: "PICTURE_MODE {mode}\r"
  params:
    - name: mode
      type: enum
      values: [vivid, eco, normal, game, cinema, sports]
      description: "Eco maps to APS; Normal maps to Standard."

- id: picture_backlight_set
  label: Set Picture Backlight
  kind: action
  command: "PICTURE_BACKLIGHT {level}\r"
  params:
    - name: level
      type: integer
      min: 0
      max: 100

- id: picture_contrast_set
  label: Set Picture Contrast
  kind: action
  command: "PICTURE_CONTRAST {level}\r"
  params:
    - name: level
      type: integer
      min: 0
      max: 100

- id: picture_brightness_set
  label: Set Picture Brightness
  kind: action
  command: "PICTURE_BRIGHTNESS {level}\r"
  params:
    - name: level
      type: integer
      min: 0
      max: 100

- id: picture_colour_set
  label: Set Picture Colour
  kind: action
  command: "PICTURE_COLOUR {level}\r"
  params:
    - name: level
      type: integer
      min: 0
      max: 100

- id: picture_tint_set
  label: Set Picture Tint
  kind: action
  command: "PICTURE_TINT {level}\r"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "0 maps to R50, 50 maps to 0, 100 maps to G50."

- id: picture_sharpness_set
  label: Set Picture Sharpness
  kind: action
  command: "PICTURE_SHARPNESS {level}\r"
  params:
    - name: level
      type: integer
      min: 0
      max: 50

- id: picture_colour_temperature_set
  label: Set Picture Colour Temperature
  kind: action
  command: "PICTURE_COLOUR_TEMPERATURE {level}\r"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "0 maps to W50, 50 maps to 0, 100 maps to C50."

- id: remote_controller_lock_set
  label: Set Remote Controller Lock
  kind: action
  command: "REMOTECONTROLER_LOCK {state}\r"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: audio_balance_set
  label: Set Audio Balance
  kind: action
  command: "AUDIO_BALANCE {level}\r"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "0 maps to L50, 50 maps to 0, 100 maps to R50."

- id: audio_equalizer_set
  label: Set Audio Equalizer Band
  kind: action
  command: "AUDIO_EQUALIZER {band} {value}\r"
  params:
    - name: band
      type: integer
      min: 1
      max: 5
      description: "1=100Hz, 2=300Hz, 3=1kHz, 4=3kHz, 5=10kHz"
    - name: value
      type: integer
      min: 0
      max: 20
      description: "Value range 0..20 maps to -10..+10 dB (0 -> -10, 20 -> +10)."

- id: energy_saving_set
  label: Set Energy Saving Mode
  kind: action
  command: "ENERGY_SAVING {mode}\r"
  params:
    - name: mode
      type: enum
      values: [auto, screenoff, Maximum, medium, minimum, off]

- id: channel_setting_atsc_atv
  label: Tune ATSC Analog Channel
  kind: action
  command: "CHANNEL_SETTING_ATSC_ATV {channel} {source}\r"
  params:
    - name: channel
      type: integer
      description: "Analog channel number"
    - name: source
      type: enum
      values: [antenna, cable]

- id: channel_setting_atsc_dtv_single
  label: Tune ATSC Digital Channel (cable major-only)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {channel} cablemaj\r"
  params:
    - name: channel
      type: integer
      description: "Major channel number for cable cablemaj tuning"

- id: channel_setting_atsc_dtv_antenna
  label: Tune ATSC Digital Channel (antenna, major/minor)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {major} {minor} antennanotphy\r"
  params:
    - name: major
      type: integer
      description: "Major channel number"
    - name: minor
      type: integer
      description: "Minor channel number"

- id: channel_setting_atsc_dtv_cable
  label: Tune ATSC Digital Channel (cable, major/minor)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {major} {minor} cablenotphy\r"
  params:
    - name: major
      type: integer
      description: "Major channel number"
    - name: minor
      type: integer
      description: "Minor channel number"

- id: channel_add_delete
  label: Add or Delete Channel
  kind: action
  command: "CHANNEL_ADD_DELETE {operation}\r"
  params:
    - name: operation
      type: enum
      values: [add, delete]

- id: key_action
  label: Send Remote Key
  kind: action
  command: "KEY_ACTION {key}\r"
  params:
    - name: key
      type: enum
      values:
        - exit
        - channelup
        - channeldown
        - volumeup
        - Volumedown
        - arrowright
        - arrowleft
        - volumemute
        - deviceinput
        - sleepreserve
        - livetv
        - previouschannel
        - favoritechannel
        - teletext
        - teletextoption
        - returnback
        - avmode
        - captionsubtitle
        - arrowup
        - arrowdown
        - myapp
        - settingmenu
        - ok
        - quickmenu
        - videomode
        - audiomode
        - channellist
        - bluebutton
        - yellowbutton
        - greenbutton
        - redbutton
        - aspectratio
        - audiodescription
        - programmorder
        - userguide
        - smarthome
        - simplelink
        - fastforward
        - rewind
        - programminfo
        - programguide
        - play
        - slowplay
        - soccerscreen
        - reord
        - 3d
        - autoconfig
        - app
        - screenbright
        - number0
        - number1
        - number2
        - number3
        - number4
        - number5
        - number6
        - number7
        - number8
        - number9
  notes: "Source labels KEY_ACTION as Toggle; individual key tokens are discrete payloads."

- id: osd_select_set
  label: Set OSD Display
  kind: action
  command: "OSD_SELECT {state}\r"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: input_select
  label: Select Input Source
  kind: action
  command: "INPUT_SELECT {input}\r"
  params:
    - name: input
      type: enum
      values: [dtv, atv, cadtv, catv, avav1, component1, hdmi1, hdmi2, hdmi3]
  notes: "Source recommends LAUNCH_APP as preferred method for HDMI input selection."

- id: picture_3d_toggle
  label: Toggle 3D Picture
  kind: action
  command: "PICTURE_3D\r"
  params: []
  notes: "3D models only. Source marks this as Toggle."

- id: picture_3d_extension_toggle
  label: Toggle Extended 3D Picture
  kind: action
  command: "PICTURE_3D_EXTENSION\r"
  params: []
  notes: "3D models only. Source marks this as Toggle."

- id: launch_app
  label: Launch Application
  kind: action
  command: "LAUNCH_APP {appid}\r"
  params:
    - name: appid
      type: string
      description: "Application identifier (see Notes for sample IDs)."

- id: get_macaddress
  label: Get MAC Address
  kind: query
  command: "GET_MACADDRESS {interface}\r"
  params:
    - name: interface
      type: enum
      values: [wired, wifi]
  response_format: "MAC address in MM:MM:MM:SS:SS:SS format"
  notes: "Section 3.5 lists token as 'wire|wifi'; section 7.2 lists 'wired|wifi'. Both forms appear in source - verify against device."

- id: mute_state_query
  label: Query Mute State
  kind: query
  command: "MUTE_STATE\r"
  params: []
  response_format: "MUTE:on or MUTE:off"

- id: current_vol_query
  label: Query Current Volume
  kind: query
  command: "CURRENT_VOL\r"
  params: []
  response_format: "VOL:<numerical value>"

- id: current_app_query
  label: Query Current Application
  kind: query
  command: "CURRENT_APP\r"
  params: []
  response_format: "APP:<application id>"

- id: current_ch_query
  label: Query Current Channel
  kind: query
  command: "CURRENT_CH\r"
  params: []
  response_format: "CH:<Channel Name> <Major>-<Minor>"
  notes: "Returns UNKNOWN for channel name if unavailable. Returns NONE if a non-LiveTV application is active."

- id: get_ipcontrol_state
  label: Query IP Control Service State
  kind: query
  command: "GET_IPCONTROL_STATE\r"
  params: []
  response_format: "ON if server is healthy; otherwise the command times out."
```

## Feedbacks
```yaml
- id: mute_state
  type: enum
  values: [on, off]
  source_query: mute_state_query
  response_pattern: "MUTE:{value}"

- id: volume_level
  type: integer
  min: 0
  max: 100
  source_query: current_vol_query
  response_pattern: "VOL:{value}"

- id: current_application
  type: string
  source_query: current_app_query
  response_pattern: "APP:{appid}"

- id: current_channel
  type: object
  fields:
    - name: name
      type: string
      description: "Channel name; 'UNKNOWN' if unavailable; 'NONE' if non-LiveTV app is active."
    - name: major
      type: integer
    - name: minor
      type: integer
  source_query: current_ch_query
  response_pattern: "CH:{name} {major}-{minor}"

- id: mac_address
  type: string
  source_query: get_macaddress
  response_pattern: "MM:MM:MM:SS:SS:SS"

- id: ip_control_state
  type: enum
  values: [ON]
  source_query: get_ipcontrol_state
  notes: "Only 'ON' is documented as a response. Unhealthy state is observed as a TCP timeout, not a payload."

- id: generic_command_ack
  type: string
  response_pattern: "OK\\n"
  notes: "Source shows VOLUME_MUTE on returning 'OK\\n' (with subsequent bytes padded with 0x7d). UNRESOLVED: whether all non-query commands share this acknowledgement format."
```

## Variables
```yaml
# UNRESOLVED: settable parameters distinct from actions are not separately enumerated in the source.
# The level/enum parameters of the *_set actions above cover the configurable surface.
```

## Events
```yaml
- id: ssdp_alive
  source: SSDP
  message: "ssdp:alive"
  notes: "Emitted per device/service type at TV power-up."

- id: ssdp_byebye
  source: SSDP
  message: "ssdp:byebye"
  notes: "Emitted per device/service type at TV power-down."

- id: sddp_alive
  source: SDDP
  message: "NOTIFY ALIVE"
  notes: "Emitted on TV startup."

- id: sddp_identify
  source: SDDP
  message: "NOTIFY IDENTIFY"
  notes: "Emitted when Control4 SDDP is enabled on IP Control Setup screen."

- id: sddp_offline
  source: SDDP
  message: "NOTIFY OFFLINE"
  notes: "Emitted before TV power-off."
```

## Macros
```yaml
- id: power_on_via_wol
  label: Power On (via Wake-on-LAN)
  steps:
    - description: "Send WoL magic packet (6 bytes of 0xFF followed by 16 repetitions of the TV's 48-bit MAC address; 102 bytes total) to the TV's IP or subnet broadcast address on UDP port 4343 (or any port)."
  notes: "Requires both controller and TV on the same subnet. For WoWLAN, the router must support WME/WMM, and the wired Ethernet cable must be disconnected during testing. Settings -> General -> Mobile TV On -> 'Turn on via Wi-Fi' must be on for WoWLAN."

- id: ip_control_setup
  label: Open IP Control Configuration Menu (manual)
  steps:
    - description: "On the TV, open Settings menu and focus the Network icon."
    - description: "Press the numerical key sequence 828888 on the IR remote to display the IP Control Configuration menu."
  notes: "Required once per TV to retrieve the 8-character alphanumeric password used for AES key derivation."
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements beyond the WoL/WoWLAN prerequisites documented under Macros.
```

## Notes

### Sample application IDs (webOS 4.0)
Third-party:
- Amazon → `amazon`
- Google Play → `googleplaymovieswebos`
- Hulu → `com.hulu.hulu`
- Netflix → `netflix`
- SlingTV → `com.movenetworks.app.sling-tv-sling-production`
- Youtube → `youtube.leanback.v4`
- Vudu → `vudu`

System built-in:
- Settings → `com.palm.app.settings`
- Photo & Video → `com.webos.app.photovideo`
- Music → `com.webos.app.music`
- Guide → `com.webos.service.iepg`
- Browser → `com.webos.app.browser`

### Encryption worked example (from source)
Plaintext: `VOLUME_MUTE on\r` (15 bytes). Padded to 16 bytes by appending `0x01`:
`56 4f 4c 55 4d 45 5f 4d 55 54 45 20 6f 6e 0d 01`

With hard-coded developmental password `12345678` (PBKDF2-derived key
`9B B9 91 16 DD C1 33 E0 B0 5B 76 D8 BA 71 3A B0`) and zero IV
(`00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00`), the AES-128-ECB-encrypted IV is:
`D2 B2 1C A0 AD 64 86 CB 20 56 A8 B8 15 03 35 08`

The AES-128-CBC-encrypted payload (using the raw IV before ECB-encryption):
`d2 d3 2b fe ac 13 f4 43 5e 6f 2f 54 2e ea 9c 18`

On-wire transmission: `[ECB-encrypted IV (16 bytes)] || [CBC-encrypted payload (16 bytes)]`.

Response from device for the `VOLUME_MUTE on` command (after CBC decryption with the received IV):
`4f 4b 0a 00 7d 7d 7d 7d 7d 7d 7d 7d 7d 7d 7d 7d` → `OK\n` (bytes after `\n` are padding and should be ignored).

### Command framing reminders
- All command strings terminate with `\r` (`0x0d`) before padding.
- If the (terminated) plaintext is not a multiple of 16 bytes, pad with `N` repeated bytes of value `N` (where `N` is the number of pad bytes needed).
- A fresh random IV must be generated per command; the IV is sent ECB-encrypted, prefixed to the CBC-encrypted payload.

<!-- UNRESOLVED: response format / ack pattern for non-query commands beyond the single VOLUME_MUTE example. -->
<!-- UNRESOLVED: behavior when a query (other than GET_IPCONTROL_STATE) is issued while the TV is powered off or in standby. -->
<!-- UNRESOLVED: maximum command rate, inter-command delay requirements, and TCP keep-alive expectations. -->
<!-- UNRESOLVED: whether multiple concurrent TCP clients on port 9761 are supported. -->
<!-- UNRESOLVED: exact firmware versions supported (source covers "2018 LG TV" / webOS 4.0 generally without a version matrix). -->
<!-- UNRESOLVED: GET_MACADDRESS interface token spelling discrepancy ('wire' in §3.5 vs 'wired' in §7.2). -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-04-30T04:31:17.466Z
last_checked_at: 2026-06-02T17:22:51.416Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:51.416Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec actions matched verbatim in source; all transport parameters verified; source command set fully represented. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility ranges not stated"
- "response/acknowledgement format for non-query commands not fully documented beyond the \"OK\\n\" example for VOLUME_MUTE"
- "whether all non-query commands share this acknowledgement format.\""
- "settable parameters distinct from actions are not separately enumerated in the source."
- "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements beyond the WoL/WoWLAN prerequisites documented under Macros."
- "response format / ack pattern for non-query commands beyond the single VOLUME_MUTE example."
- "behavior when a query (other than GET_IPCONTROL_STATE) is issued while the TV is powered off or in standby."
- "maximum command rate, inter-command delay requirements, and TCP keep-alive expectations."
- "whether multiple concurrent TCP clients on port 9761 are supported."
- "exact firmware versions supported (source covers \"2018 LG TV\" / webOS 4.0 generally without a version matrix)."
- "GET_MACADDRESS interface token spelling discrepancy ('wire' in §3.5 vs 'wired' in §7.2)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
