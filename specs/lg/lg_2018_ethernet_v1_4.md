---
schema_version: ai4av-public-spec-v1
device_id: lg/lg-2018-webos-tv-ethernet-ip-control
entity_id: lg_2018_ethernet_v1_4
spec_id: admin/lg-2018-ethernet-v1-4
revision: 1
author: admin
title: "LG 2018 Ethernet IP Control Spec"
status: published
manufacturer: LG
manufacturer_key: lg
model_family: "LG 2018 webOS TV (Ethernet IP Control)"
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - "LG 2018 webOS TV (Ethernet IP Control)"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: lg_2018_ethernet_v1_4.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T08:05:22.862Z
retrieved_at: 2026-04-23T08:05:22.862Z
last_checked_at: 2026-04-23T08:05:22.862Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T08:05:22.862Z
  matched_actions: 33
  action_count: 33
  confidence: high
  summary: "All 27 control actions and 6 status queries match source commands verbatim with correct parameters; transport layer (port, encryption, auth) verified against protocol spec."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# LG 2018 Ethernet IP Control Spec

## Summary
IP Control protocol for 2018 LG webOS TVs over TCP. Device discovery via SDDP/SSDP. Commands encrypted with AES-128-CBC using PBKDF2-derived key from TV-set password. TCP port 9761. Wake-on-LAN supported.

<!-- UNRESOLVED: RS-232 serial control not supported by this device -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 9761  # stated in source
auth:
  type: password  # AES-128-CBC encryption; 8-digit alphanumeric password from IP Control Settings menu
  password_format: alphanumeric_8digit
encryption:
  algorithm: AES-128-CBC
  key_derivation: PBKDF2
  key_length: 128
  iv_length: 16
  salt: "0x63,0x61,0xb8,0x0e,0x9b,0xdc,0xa6,0x63,0x8d,0x07,0x20,0xf2,0xcc,0x56,0x8f,0xb9"
  iterations: 16384
  # UNRESOLVED: hard-coded dev password "12345678" noted for developmental firmware only
```

## Traits
```yaml
- powerable       # POWER off command present
- routable        # INPUT_SELECT, LAUNCH_APP commands present
- queryable       # CURRENT_VOL, MUTE_STATE, CURRENT_APP, CURRENT_CH, GET_MACADDRESS, GET_IPCONTROL_STATE present
- levelable       # VOLUME_CONTROL, PICTURE_BACKLIGHT, PICTURE_CONTRAST, PICTURE_BRIGHTNESS, PICTURE_COLOUR, PICTURE_TINT, PICTURE_SHARPNESS, PICTURE_COLOUR_TEMPERATURE, AUDIO_BALANCE, AUDIO_EQUALIZER, ENERGY_SAVING present
```

## Actions
```yaml
- id: power_off
  label: Power Off
  kind: action
  params: []

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: enum
      values: [4by3, 16by9, setbyoriginal]

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: mode
      type: enum
      values: [screenmuteon, videomuteon, allmuteoff]
      description: screenmuteon=mute OSD+video, videomuteon=video only, allmuteoff=all mute off

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
      values: [vivid, eco, normal, game, cinema, sports]

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
  label: Colour
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: picture_tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: "0=R50, 50=0, 100=G50"

- id: picture_sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 50]

- id: picture_colour_temperature
  label: Colour Temperature
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: "0=W50, 50=0, 100=C50"

- id: remotecontrol_lock
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
      description: "0=L50, 50=0, 100=R50"

- id: audio_equalizer
  label: Audio Equalizer
  kind: action
  params:
    - name: band
      type: integer
      range: [1, 5]
      description: "1=100Hz, 2=300Hz, 3=1kHz, 4=3kHz, 5=10kHz"
    - name: level
      type: integer
      range: [0, 20]
      description: "Mapped to -10 to +10"

- id: energy_saving
  label: Energy Saving
  kind: action
  params:
    - name: mode
      type: enum
      values: [auto, screenoff, Maximum, medium, minimum, off]

- id: channel_setting_atsc_atv
  label: Tune (ATSC/ATV)
  kind: action
  params:
    - name: channel
      type: integer
    - name: source
      type: enum
      values: [antenna, cable]

- id: channel_setting_atsc_dtv
  label: Tune (ATSC DTV)
  kind: action
  params:
    - name: channel
      type: integer
    - name: source
      type: enum
      values: [cable, antennanotphy]

- id: channel_setting_atsc_dtv_minor
  label: Tune (ATSC DTV with Minor)
  kind: action
  params:
    - name: major
      type: integer
    - name: minor
      type: integer
    - name: source
      type: enum
      values: [cable, antennanotphy]

- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  params:
    - name: operation
      type: enum
      values: [add, delete]

- id: key_action
  label: Key Action
  kind: action
  params:
    - name: key
      type: enum
      values: [exit, channelup, channeldown, volumeup, volumedown, arrowright, arrowleft, volumemute, deviceinput, sleepreserve, livetv, previouschannel, favoritechannel, teletext, teletextoption, returnback, avmode, captionsubtitle, arrowup, arrowdown, myapp, settingmenu, ok, quickmenu, videomode, audiomode, channellist, bluebutton, yellowbutton, greenbutton, redbutton, aspectratio, audiodescription, programmorder, userguide, smarthome, simplelink, fastforward, rewind, programminfo, programguide, play, slowplay, soccerscreen, reord, 3d, autoconfig, app, screenbright, number0, number1, number2, number3, number4, number5, number6, number7, number8, number9]

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: input
      type: enum
      values: [dtv, atv, cadtv, catv, av, component1, hdmi1, hdmi2, hdmi3]
      note: APP_LAUNCH preferred for HDMI input select

- id: picture_3d
  label: 3D Mode (3D models only)
  kind: action
  params:
    - name: mode
      type: enum
      values: [on, off, 2d, sidebyside, topbottom]
      description: toggle

- id: picture_3d_extension
  label: Extended 3D (3D models only)
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, sidebyside, topbottom, rowinterleaving, colinterleaving, lineinterleaving]
      description: toggle

- id: launch_app
  label: Launch App
  kind: action
  params:
    - name: appid
      type: string
      description: Application ID (e.g., youtube.leanback.v4, netflix)
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [off]
  note: Only power off is controllable; power on via Wake-on-LAN only

- id: screen_mute_state
  label: Screen Mute State
  type: enum
  values: [screenmuteon, videomuteon, allmuteoff]

- id: volume_mute_state
  label: Volume Mute State
  type: enum
  values: [on, off]
  query: MUTE_STATE

- id: current_volume
  label: Current Volume
  type: integer
  range: [0, 100]
  query: CURRENT_VOL

- id: current_channel
  label: Current Channel
  type: string
  query: CURRENT_CH
  note: Returns "NONE" if non-liveTV app is active; "UNKNOWN" if no channel name

- id: current_app
  label: Current App
  type: string
  query: CURRENT_APP
  note: Returns App ID e.g. "youtube.leanback.v4"

- id: mac_address
  label: MAC Address
  type: string
  query: GET_MACADDRESS
  params:
    - name: interface
      type: enum
      values: [wired, wifi]
      note: Format MM:MM:MM:SS:SS:SS

- id: ipcontrol_state
  label: IP Control State
  type: enum
  values: [on]
  query: GET_IPCONTROL_STATE
  note: Returns ON if server healthy; command time-out if not healthy
```

## Variables
```yaml
# No separate settable parameters found in source — all configurable via Actions
```

## Events
```yaml
# UNRESOLVED: unsolicited event notifications from TV not documented in source
# Device discovery events (SSDP/SDDP) are network-layer, not application-layer events
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - WoWLAN (Wake-on-Wireless-LAN): wired Ethernet cable must be disconnected during testing
  - Wake-on-LAN requires TV and other device on same subnet
  - Mobile TV On (Settings->General->Mobile TV On -> Turn on via Wi-Fi) must be enabled for WoWLAN
# UNRESOLVED: power-on sequencing beyond WoWLAN not documented
```

## Notes
AES-128-CBC encryption required for all commands. Messages terminated with '\r' (0x0d). Padding uses byte count (PKCS7-style). IV randomly generated per command; prefixed to encrypted message. Key derived via PBKDF2 (sha256, 16384 iterations) from 8-digit TV password.

Wake-on-LAN: magic packet = 6xFF + 16x MAC address = 102 bytes total. Port 4343 or any. Broadcast address usable.

Sample app IDs: youtube.leanback.v4, netflix, amazon, googleplaymovieswebos, com.hulu.hulu, com.movenetworks.app.sling-tv-sling-production, vudu.

Sample system app IDs: com.palm.app.settings, com.webos.app.photovideo, com.webos.app.music, com.webos.service.iepg, com.webos.app.browser.

SDDP (Control4) and SSDP (UPnP) supported for device discovery.

<!-- UNRESOLVED: RS-232 serial control not supported by this device -->
<!-- UNRESOLVED: power on command not available via IP Control (WoWLAN only) -->
<!-- UNRESOLVED: unsolicited event push from TV to controller not documented -->
<!-- UNRESOLVED: firmware compatibility range not stated in source -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: lg_2018_ethernet_v1_4.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T08:05:22.862Z
retrieved_at: 2026-04-23T08:05:22.862Z
last_checked_at: 2026-04-23T08:05:22.862Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:05:22.862Z
matched_actions: 33
action_count: 33
confidence: high
summary: "All 27 control actions and 6 status queries match source commands verbatim with correct parameters; transport layer (port, encryption, auth) verified against protocol spec."
```

## Known Gaps

```yaml
[]
```
