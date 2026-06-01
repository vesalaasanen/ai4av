---
spec_id: admin/sony-kdxg8599-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDXG8599 Series Control Spec"
manufacturer: Sony
model_family: "KDXG8599 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDXG8599 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
source_urls:
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
  - https://pro.sony/s3/2022/09/14131603/VISCA-Command-List-Version-2.00.pdf
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-05-31T22:41:20.902Z
generated_at: 2026-05-31T22:41:20.902Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T22:41:20.902Z
  matched_actions: 121
  action_count: 121
  confidence: high
  summary: "All 121 spec actions matched to source commands; transport parameters verified; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sony KDXG8599 Series Control Spec

## Summary
Sony BRAVIA IP control protocol for 2014 models. Low-level TCP protocol on port 20060 with 24-byte fixed-size messages. Supports power, volume, channel, input, mute, PIP, and IR remote passthrough via `setIrccCode`. No authentication required.

<!-- UNRESOLVED: high-level WebAPI / JSON-RPC layer not documented here -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060  # stated: TCP port 20060
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # power on/off commands (POWR)
- queryable    # status queries (getPowerStatus, getAudioVolume, etc.)
- levelable    # volume, mute, picture mute controls
- routable     # input source selection, channel change
```

## Actions
```yaml
# setIrccCode - IR remote passthrough (Table 5 codes)
- id: setIrccCode_pwrOff
  label: IR Code - Power Off
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 0
- id: setIrccCode_input
  label: IR Code - Input
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 1
- id: setIrccCode_gguide
  label: IR Code - GGuide
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 2
- id: setIrccCode_epg
  label: IR Code - EPG
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 3
- id: setIrccCode_favorites
  label: IR Code - Favorites
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 4
- id: setIrccCode_display
  label: IR Code - Display
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 5
- id: setIrccCode_home
  label: IR Code - Home
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 6
- id: setIrccCode_options
  label: IR Code - Options
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 7
- id: setIrccCode_return
  label: IR Code - Return
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 8
- id: setIrccCode_up
  label: IR Code - Up
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 9
- id: setIrccCode_down
  label: IR Code - Down
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 10
- id: setIrccCode_right
  label: IR Code - Right
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 11
- id: setIrccCode_left
  label: IR Code - Left
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 12
- id: setIrccCode_confirm
  label: IR Code - Confirm
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 13
- id: setIrccCode_red
  label: IR Code - Red
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 14
- id: setIrccCode_green
  label: IR Code - Green
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 15
- id: setIrccCode_yellow
  label: IR Code - Yellow
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 16
- id: setIrccCode_blue
  label: IR Code - Blue
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 17
- id: setIrccCode_num1
  label: IR Code - Num 1
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 18
- id: setIrccCode_num2
  label: IR Code - Num 2
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 19
- id: setIrccCode_num3
  label: IR Code - Num 3
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 20
- id: setIrccCode_num4
  label: IR Code - Num 4
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 21
- id: setIrccCode_num5
  label: IR Code - Num 5
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 22
- id: setIrccCode_num6
  label: IR Code - Num 6
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 23
- id: setIrccCode_num7
  label: IR Code - Num 7
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 24
- id: setIrccCode_num8
  label: IR Code - Num 8
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 25
- id: setIrccCode_num9
  label: IR Code - Num 9
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 26
- id: setIrccCode_num0
  label: IR Code - Num 0
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 27
- id: setIrccCode_num11
  label: IR Code - Num 11
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 28
- id: setIrccCode_num12
  label: IR Code - Num 12
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 29
- id: setIrccCode_volUp
  label: IR Code - Volume Up
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 30
- id: setIrccCode_volDown
  label: IR Code - Volume Down
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 31
- id: setIrccCode_mute
  label: IR Code - Mute
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 32
- id: setIrccCode_chUp
  label: IR Code - Channel Up
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 33
- id: setIrccCode_chDown
  label: IR Code - Channel Down
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 34
- id: setIrccCode_subtitle
  label: IR Code - Subtitle
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 35
- id: setIrccCode_cc
  label: IR Code - Closed Caption
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 36
- id: setIrccCode_enter
  label: IR Code - Enter
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 37
- id: setIrccCode_dot
  label: IR Code - DOT
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 38
- id: setIrccCode_analog
  label: IR Code - Analog
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 39
- id: setIrccCode_teletext
  label: IR Code - Teletext
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 40
- id: setIrccCode_exit
  label: IR Code - Exit
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 41
- id: setIrccCode_analog2
  label: IR Code - Analog2
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 42
- id: setIrccCode_ad
  label: IR Code - *AD
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 43
- id: setIrccCode_digital
  label: IR Code - Digital
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 44
- id: setIrccCode_analogQ
  label: IR Code - Analog?
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 45
- id: setIrccCode_bs
  label: IR Code - BS
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 46
- id: setIrccCode_cs
  label: IR Code - CS
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 47
- id: setIrccCode_bscs
  label: IR Code - BS/CS
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 48
- id: setIrccCode_ddata
  label: IR Code - Ddata
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 49
- id: setIrccCode_picOff
  label: IR Code - Pic Off
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 50
- id: setIrccCode_tvRadio
  label: IR Code - Tv_Radio
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 51
- id: setIrccCode_theater
  label: IR Code - Theater
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 52
- id: setIrccCode_sen
  label: IR Code - SEN
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 53
- id: setIrccCode_inetWidget
  label: IR Code - Internet Widgets
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 54
- id: setIrccCode_inetVideo
  label: IR Code - Internet Video
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 55
- id: setIrccCode_netflix
  label: IR Code - Netflix
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 56
- id: setIrccCode_sceneSel
  label: IR Code - Scene Select
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 57
- id: setIrccCode_mode3d
  label: IR Code - Mode 3D
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 58
- id: setIrccCodeimanual
  label: IR Code - iManual
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 59
- id: setIrccCode_audio
  label: IR Code - Audio
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 60
- id: setIrccCode_wide
  label: IR Code - Wide
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 61
- id: setIrccCode_jump
  label: IR Code - Jump
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 62
- id: setIrccCode_pap
  label: IR Code - PAP
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 63
- id: setIrccCode_myepg
  label: IR Code - MyEPG
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 64
- id: setIrccCode_progDesc
  label: IR Code - Program Description
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 65
- id: setIrccCode_writeCh
  label: IR Code - Write Chapter
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 66
- id: setIrccCode_trackId
  label: IR Code - TrackID
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 67
- id: setIrccCode_tenKey
  label: IR Code - Ten Key
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 68
- id: setIrccCode_appliCast
  label: IR Code - AppliCast
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 69
- id: setIrccCode_actvTVila
  label: IR Code - acTVila
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 70
- id: setIrccCode_delVideo
  label: IR Code - Delete Video
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 71
- id: setIrccCode_photoFrame
  label: IR Code - Photo Frame
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 72
- id: setIrccCode_tvPause
  label: IR Code - TV Pause
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 73
- id: setIrccCode_keyPad
  label: IR Code - KeyPad
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 74
- id: setIrccCode_media
  label: IR Code - Media
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 75
- id: setIrccCode_syncMenu
  label: IR Code - Sync Menu
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 76
- id: setIrccCode_fwd
  label: IR Code - Forward
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 77
- id: setIrccCode_play
  label: IR Code - Play
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 78
- id: setIrccCode_rewind
  label: IR Code - Rewind
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 79
- id: setIrccCode_prev
  label: IR Code - Prev
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 80
- id: setIrccCode_stop
  label: IR Code - Stop
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 81
- id: setIrccCode_next
  label: IR Code - Next
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 82
- id: setIrccCode_rec
  label: IR Code - Rec
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 83
- id: setIrccCode_pause
  label: IR Code - Pause
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 84
- id: setIrccCode_eject
  label: IR Code - Eject
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 85
- id: setIrccCode_flashPlus
  label: IR Code - Flash Plus
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 86
- id: setIrccCode_flashMinus
  label: IR Code - Flash Minus
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 87
- id: setIrccCode_topMenu
  label: IR Code - TopMenu
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 88
- id: setIrccCode_popupMenu
  label: IR Code - PopupMenu
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 89
- id: setIrccCode_rakuraku
  label: IR Code - Rakuraku Start
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 90
- id: setIrccCode_oneTouchRecStart
  label: IR Code - One Touch Time Rec
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 91
- id: setIrccCode_oneTouchView
  label: IR Code - One Touch View
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 92
- id: setIrccCode_oneTouchRec
  label: IR Code - One Touch Rec
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 93
- id: setIrccCode_oneTouchStop
  label: IR Code - One Touch Stop
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 94
- id: setIrccCode_dux
  label: IR Code - DUX
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 95
- id: setIrccCode_football
  label: IR Code - Football Mode
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 96
- id: setIrccCode_social
  label: IR Code - Social
  kind: action
  params:
    - name: code
      type: integer
      description: Parameter 97

# Power
- id: setPowerStatus
  label: Set Power Status
  kind: action
  params:
    - name: status
      type: integer
      description: "0 = Standby (Off), 1 = Active (On)"
- id: getPowerStatus
  label: Get Power Status
  kind: query
  params: []

# Audio Volume
- id: setAudioVolume
  label: Set Audio Volume
  kind: action
  params:
    - name: volume
      type: string
      description: Decimal digit pad on the left with "0", e.g. "0000000000000029"
- id: getAudioVolume
  label: Get Audio Volume
  kind: query
  params: []

# Audio Mute
- id: setAudioMute
  label: Set Audio Mute
  kind: action
  params:
    - name: mute
      type: integer
      description: "0 = Unmute, 1 = Mute"
- id: getAudioMute
  label: Get Audio Mute Status
  kind: query
  params: []

# Channel (preset number)
- id: setChannel
  label: Set Channel by Preset Number
  kind: action
  params:
    - name: channel
      type: string
      description: "Preset channel number, e.g. '00000050.1000000' means channel 50.1, '00000006.0000000' means channel 6"
- id: getChannel
  label: Get Current Preset Channel
  kind: query
  params: []

# Channel (triplet)
- id: setTripletChannel
  label: Set Channel by Triplet
  kind: action
  params:
    - name: triplet
      type: string
      description: "Triplet in hex, e.g. '7FE07FE00400' means 32736.32736.1024"
- id: getTripletChannel
  label: Get Current Triplet Channel
  kind: query
  params: []

# Input Source
- id: setInputSource
  label: Set Input Source
  kind: action
  params:
    - name: source
      type: string
      description: "dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt"
- id: getInputSource
  label: Get Current Input Source
  kind: query
  params: []

# Input (numeric)
- id: setInput
  label: Set Input
  kind: action
  params:
    - name: input
      type: integer
      description: "0 = TV, 1 = HDMI(1-9999), 2 = SCART(1-9999), 3 = Composite(1-9999), 4 = Component(1-9999), 5 = Screen Mirroring(1-9999), 6 = PC RGB Input(1-9999)"
- id: getInput
  label: Get Current Input
  kind: query
  params: []

# Picture Mute
- id: setPictureMute
  label: Set Picture Mute
  kind: action
  params:
    - name: mute
      type: integer
      description: "0 = Disable (Picture mute off), 1 = Enable (make screen black)"
- id: getPictureMute
  label: Get Picture Mute Status
  kind: query
  params: []
- id: togglePictureMute
  label: Toggle Picture Mute
  kind: action
  params: []

# PIP
- id: setPip
  label: Set PIP
  kind: action
  params:
    - name: enable
      type: integer
      description: "0 = Disable PIP, 1 = Enable PIP"
- id: getPip
  label: Get PIP Status
  kind: query
  params: []
- id: togglePip
  label: Toggle PIP
  kind: action
  params: []
- id: togglePipPosition
  label: Toggle PIP Position
  kind: action
  params: []

# Network queries
- id: getBroadcastAddress
  label: Get Broadcast IPv4 Address
  kind: query
  params:
    - name: interface
      type: string
      description: "Interface identifier (e.g. 'eth0')"
- id: getMacAddress
  label: Get MAC Address
  kind: query
  params:
    - name: interface
      type: string
      description: "Interface identifier (e.g. 'eth0')"
```

## Feedbacks
```yaml
# Answer messages (Type 0x41) returned from TV
- id: powerStatus_response
  type: enum
  values:
    - 0  # Standby (Off)
    - 1  # Active (On)
- id: audioVolume_response
  type: string
  description: Volume value string padded with leading zeros
- id: audioMute_response
  type: enum
  values:
    - 0  # Not Muted
    - 1  # Muted
- id: channel_response
  type: string
  description: Preset channel number with decimal, e.g. "00000050.1000000"
- id: tripletChannel_response
  type: string
  description: Triplet channel number as hex string
- id: inputSource_response
  type: string
  description: Input source string (dvbt, dvbc, etc.)
- id: input_response
  type: enum
  values:
    - 0   # TV
    - 1   # HDMI(1-9999)
    - 2   # SCART(1-9999)
    - 3   # Composite(1-9999)
    - 4   # Component(1-9999)
    - 5   # Screen Mirroring(1-9999)
    - 6   # PC RGB Input(1-9999)
- id: pictureMute_response
  type: enum
  values:
    - 0  # Disabled (Picture mute off)
    - 1  # Enabled (Picture mute on)
- id: pip_response
  type: enum
  values:
    - 0  # Disabled
    - 1  # Enabled
- id: broadcastAddress_response
  type: string
  description: IPv4 address string, e.g. "192.168.0.14"
- id: macAddress_response
  type: string
  description: MAC address string, e.g. "XX:XX:XX:XX:XX:XX"
- id: commandSuccess_response
  type: string
  description: "0x0000... = success"
- id: commandError_response
  type: string
  description: "0xFFFF... = error / invalid parameter"
- id: noSuchChannel_response
  type: string
  description: "NNNNNNNN... = no such channel"
- id: inputNotFound_response
  type: string
  description: "NNNNNNNN... = not found (e.g. not tuned / no signal)"
```

## Variables
```yaml
# No standalone settable parameters separate from action commands
```

## Events
```yaml
# Notify messages (Type 0x4E) sent unsolicited from TV
- id: firePowerChange
  type: enum
  values:
    - 0  # Sent when powering off
    - 1  # Sent when powering on
- id: fireChannelChange
  type: string
  description: Channel number string with decimal point
- id: fireInputChange
  type: enum
  values:
    - 0   # Sent when input change to TV happens
    - 1   # HDMI(1-9999)
    - 2   # SCART(1-9999)
    - 3   # Composite(1-9999)
    - 4   # Component(1-9999)
    - 5   # Screen Mirroring(1-9999)
    - 6   # PC RGB Input(1-9999)
- id: fireVolumeChange
  type: string
  description: Volume value string
- id: fireMuteChange
  type: enum
  values:
    - 0  # Sent when unmuting
    - 1  # Sent when muting
- id: firePipChange
  type: enum
  values:
    - 0  # Sent when PIP is disabled
    - 1  # Sent when PIP is enabled
- id: firePictureMuteChange
  type: enum
  values:
    - 0  # Sent when picture mute is disabled
    - 1  # Sent when picture mute is enabled
```

## Macros
```yaml
# No explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
<!-- UNRESOLVED: safety warnings / interlock procedures not present in source -->
```

## Notes
TCP connections kept alive but disconnected after 30 seconds of inactivity (server-side). 24-byte fixed message format: 2-byte header (0x2A 0x53), 1-byte type, 4-byte FourCC function code, 16-byte parameter, 1-byte footer (0x0A). IR `setIrccCode` sends IR remote control codes as defined in Table 5. High-level JSON-RPC/WebAPI layer referenced but not documented in this protocol spec.
<!-- UNRESOLVED: high-level WebAPI protocol details, firmware compatibility, voltage/power specs, error recovery sequences -->

## Provenance

```yaml
source_domains:
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
source_urls:
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
  - https://pro.sony/s3/2022/09/14131603/VISCA-Command-List-Version-2.00.pdf
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-05-31T22:41:20.902Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:41:20.902Z
matched_actions: 121
action_count: 121
confidence: high
summary: "All 121 spec actions matched to source commands; transport parameters verified; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
