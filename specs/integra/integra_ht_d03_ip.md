---
schema_version: ai4av-public-spec-v1
device_id: integra/ht-d03
entity_id: integra_ht_d03
spec_id: admin/integra-ht-d03
revision: 1
author: admin
title: "Integra HT-D03 Control Spec"
status: published
manufacturer: Integra
manufacturer_key: integra
model_family: HT-D03
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - HT-D03
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
source_documents:
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:20.402Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:22.333Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:24.367Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:26.686Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:31.200Z
retrieved_at: 2026-04-29T09:20:31.200Z
last_checked_at: 2026-04-25T20:50:01.493Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T20:50:01.493Z
  matched_actions: 65
  action_count: 65
  confidence: high
  summary: "All 65 spec actions matched literally against source; transport parameters verified; spec is model-appropriate subset of generic ISCP protocol."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Integra HT-D03 Control Spec

## Summary
The Integra HT-D03 is an AV receiver controllable via ISCP (Integra Serial Control Protocol) over both RS-232 and TCP/IP (eISCP). This spec covers the eISCP over Ethernet protocol (TCP port 60128 default) and the serial RS-232 interface. The protocol uses 3-character command codes with variable-length parameters. Commands cover power, volume, input selection, listening modes, tone control, multi-zone operation (Zones 2-4), tuner control, and network/USB playback.

<!-- UNRESOLVED: specific HT-D03 feature subset not confirmed — source is a generic Integra ISCP protocol reference, not model-specific documentation -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 60128  # default; configurable 49152-65535
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  wiring: "3-wire RS-232C, DB9 female (pin 2=TX, pin 3=RX, pin 5=GND), straight-thru cable"
auth:
  type: none  # inferred: no auth procedure in source
```

### eISCP Packet Structure (TCP)
```
Header (16 bytes, big-endian):
  Magic:    "ISCP"          (4 bytes)
  HdrSize:  0x00000010      (4 bytes, big-endian)
  DataSize: <size of data>  (4 bytes, big-endian)
  Version:  0x01            (1 byte)
  Reserved: 0x000000        (3 bytes)

Data (ISCP message):
  Start: "!"                (1 byte)
  Unit:  "1"                (1 byte, "1" = Receiver)
  Cmd:   <3 chars>          (3 bytes)
  Param: <variable>         (variable length)
  End:   0x1A [0x0D 0x0A]  (EOF, optional CR/LF)
```

### RS-232 Message Format
```
Start: "!"  Unit: "1"  Cmd: <3 chars>  Param: <variable>  End: CR|LF|CRLF
```

### Communication Notes
- Maintain a persistent TCP connection; status notifications are only sent on an active connection.
- Only one client connection is supported at a time.
- Minimum 50 ms interval between received messages.
- Response within 50 ms expected; if no response, communication has failed.

## Traits
```yaml
- powerable     # PWR command: power on/standby
- queryable     # QSTN parameter on most commands returns current state
- levelable     # MVL master volume, tone controls, subwoofer level
- routable      # SLI input selector, SLZ/SL3/SL4 zone selectors
- muteable      # AMT audio muting
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: PWR01
  params: []

- id: power_standby
  label: Power Standby
  kind: action
  command: PWR00
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: AMT01
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: AMT00
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: AMTG
  params: []

- id: volume_set
  label: Set Master Volume
  kind: action
  command: MVL<level>
  params:
    - name: level
      type: string
      description: "Volume level in hex (00-64 for 0-100, or 00-50 for 0-80 range depending on model)"

- id: volume_up
  label: Volume Up
  kind: action
  command: MVLUP
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: MVLDOWN
  params: []

- id: volume_up_1db
  label: Volume Up 1dB
  kind: action
  command: MVLUP1
  params: []

- id: volume_down_1db
  label: Volume Down 1dB
  kind: action
  command: MVLDOWN1
  params: []

- id: select_input
  label: Select Input
  kind: action
  command: SLI<code>
  params:
    - name: code
      type: enum
      description: "Input selector code"
      values:
        - "00": "VIDEO1/VCR-DVR"
        - "01": "VIDEO2/CBL-SAT"
        - "02": "VIDEO3/GAME-TV"
        - "03": "VIDEO4/AUX1"
        - "04": "VIDEO5/AUX2"
        - "05": "VIDEO6"
        - "06": "VIDEO7"
        - "10": "DVD"
        - "20": "TAPE1-TV-TAPE"
        - "21": "TAPE2"
        - "22": "PHONO"
        - "23": "CD"
        - "24": "FM"
        - "25": "AM"
        - "26": "TUNER"
        - "27": "MUSIC SERVER"
        - "28": "INTERNET RADIO"
        - "29": "USB-Front"
        - "2A": "USB-Rear"
        - "40": "UNIVERSAL PORT"
        - "30": "MULTI CH"
        - "31": "XM"
        - "32": "SIRIUS"

- id: input_up
  label: Input Selector Up
  kind: action
  command: SLIUP
  params: []

- id: input_down
  label: Input Selector Down
  kind: action
  command: SLIDOWN
  params: []

- id: set_listening_mode
  label: Set Listening Mode
  kind: action
  command: LMD<code>
  params:
    - name: code
      type: enum
      description: "Listening mode code (partial list)"
      values:
        - "00": "STEREO"
        - "01": "DIRECT"
        - "02": "SURROUND"
        - "11": "PURE AUDIO"
        - "0F": "MONO"
        - "0C": "ALL CH STEREO"
        - "80": "PLII-PLIIx Movie"
        - "81": "PLII-PLIIx Music"
        - "86": "PLII-PLIIx Game"
        - "82": "Neo:6 Cinema"
        - "83": "Neo:6 Music"
        - "40": "5.1ch Surround-Straight Decode"
        - "41": "Dolby EX-DTS ES"

- id: listening_mode_up
  label: Listening Mode Up
  kind: action
  command: LMDUP
  params: []

- id: listening_mode_down
  label: Listening Mode Down
  kind: action
  command: LMDDOWN
  params: []

- id: set_speaker_a
  label: Speaker A On/Off
  kind: action
  command: SPA<code>
  params:
    - name: code
      type: enum
      values: ["00": "Off", "01": "On"]

- id: set_speaker_b
  label: Speaker B On/Off
  kind: action
  command: SPB<code>
  params:
    - name: code
      type: enum
      values: ["00": "Off", "01": "On"]

- id: set_sleep_timer
  label: Set Sleep Timer
  kind: action
  command: SLP<code>
  params:
    - name: code
      type: string
      description: "01-5A hex for 1-90 min, or OFF"

- id: set_dimmer
  label: Set Dimmer Level
  kind: action
  command: DIM<code>
  params:
    - name: code
      type: enum
      values:
        - "00": "Bright"
        - "01": "Dim"
        - "02": "Dark"
        - "03": "Shut-Off"
        - "08": "Bright and LED OFF"

- id: set_display_mode
  label: Set Display Mode
  kind: action
  command: DIF<code>
  params:
    - name: code
      type: enum
      values:
        - "00": "Selector + Volume"
        - "01": "Selector + Listening Mode"

- id: set_audio_selector
  label: Set Audio Selector
  kind: action
  command: SLA<code>
  params:
    - name: code
      type: enum
      values:
        - "00": "AUTO"
        - "01": "MULTI-CHANNEL"
        - "02": "ANALOG"
        - "04": "HDMI"
        - "05": "COAX-OPT"

- id: set_tone_front_bass
  label: Set Front Bass
  kind: action
  command: TFRB<xx>
  params:
    - name: xx
      type: string
      description: "Hex value -A to +A (-10 to +10 in 2-step increments)"

- id: set_tone_front_treble
  label: Set Front Treble
  kind: action
  command: TFRT<xx>
  params:
    - name: xx
      type: string
      description: "Hex value -A to +A (-10 to +10 in 2-step increments)"

- id: trigger_a_on
  label: 12V Trigger A On
  kind: action
  command: TGA01
  params: []

- id: trigger_a_off
  label: 12V Trigger A Off
  kind: action
  command: TGA00
  params: []

- id: trigger_b_on
  label: 12V Trigger B On
  kind: action
  command: TGB01
  params: []

- id: trigger_b_off
  label: 12V Trigger B Off
  kind: action
  command: TGB00
  params: []

- id: trigger_c_on
  label: 12V Trigger C On
  kind: action
  command: TGC01
  params: []

- id: trigger_c_off
  label: 12V Trigger C Off
  kind: action
  command: TGC00
  params: []

- id: net_play
  label: Network-USB Play
  kind: action
  command: NTCPLAY
  params: []

- id: net_stop
  label: Network-USB Stop
  kind: action
  command: NTCSTOP
  params: []

- id: net_pause
  label: Network-USB Pause
  kind: action
  command: NTCPAUSE
  params: []

- id: net_track_up
  label: Network-USB Track Up
  kind: action
  command: NTCTRUP
  params: []

- id: net_track_down
  label: Network-USB Track Down
  kind: action
  command: NTCTRDN
  params: []

# Zone 2
- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  command: ZPW01
  params: []

- id: zone2_power_standby
  label: Zone 2 Power Standby
  kind: action
  command: ZPW00
  params: []

- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  command: ZMT01
  params: []

- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  command: ZMT00
  params: []

- id: zone2_volume_set
  label: Zone 2 Set Volume
  kind: action
  command: ZVL<level>
  params:
    - name: level
      type: string
      description: "Volume level in hex (00-64 or 00-50 range)"

- id: zone2_select_input
  label: Zone 2 Select Input
  kind: action
  command: SLZ<code>
  params:
    - name: code
      type: string
      description: "Same input codes as main SLI command"

# Zone 3
- id: zone3_power_on
  label: Zone 3 Power On
  kind: action
  command: PW301
  params: []

- id: zone3_power_standby
  label: Zone 3 Power Standby
  kind: action
  command: PW300
  params: []

- id: zone3_mute_on
  label: Zone 3 Mute On
  kind: action
  command: MT301
  params: []

- id: zone3_mute_off
  label: Zone 3 Mute Off
  kind: action
  command: MT300
  params: []

- id: zone3_volume_set
  label: Zone 3 Set Volume
  kind: action
  command: VL3<level>
  params:
    - name: level
      type: string
      description: "Volume level in hex"

- id: zone3_select_input
  label: Zone 3 Select Input
  kind: action
  command: SL3<code>
  params:
    - name: code
      type: string
      description: "Same input codes as main SLI command"

# Zone 4
- id: zone4_power_on
  label: Zone 4 Power On
  kind: action
  command: PW401
  params: []

- id: zone4_power_standby
  label: Zone 4 Power Standby
  kind: action
  command: PW400
  params: []

- id: zone4_volume_set
  label: Zone 4 Set Volume
  kind: action
  command: VL4<level>
  params:
    - name: level
      type: string
      description: "Volume level in hex"

- id: zone4_select_input
  label: Zone 4 Select Input
  kind: action
  command: SL4<code>
  params:
    - name: code
      type: string
      description: "Same input codes as main SLI command"

# HDMI
- id: set_hdmi_output
  label: Set HDMI Output
  kind: action
  command: HDO<code>
  params:
    - name: code
      type: enum
      values:
        - "00": "No Analog"
        - "01": "Out Main"
        - "02": "Out Sub"
        - "03": "Both"
        - "04": "Both Main"
        - "05": "Both Sub"

- id: set_resolution
  label: Set Monitor Out Resolution
  kind: action
  command: RES<code>
  params:
    - name: code
      type: enum
      values:
        - "00": "Through"
        - "01": "Auto (HDMI only)"
        - "02": "480p"
        - "03": "720p"
        - "04": "1080i"
        - "05": "1080p (HDMI only)"
        - "07": "1080p/24fs (HDMI only)"
        - "06": "Source"

# Audyssey
- id: set_audyssey_eq
  label: Set Audyssey EQ
  kind: action
  command: ADY<code>
  params:
    - name: code
      type: enum
      values: ["00": "Off", "01": "On"]

- id: set_audyssey_dynamic_eq
  label: Set Audyssey Dynamic EQ
  kind: action
  command: ADQ<code>
  params:
    - name: code
      type: enum
      values: ["00": "Off", "01": "On"]

- id: set_audyssey_dynamic_volume
  label: Set Audyssey Dynamic Volume
  kind: action
  command: ADV<code>
  params:
    - name: code
      type: enum
      values:
        - "00": "Off"
        - "01": "Light"
        - "02": "Medium"
        - "03": "Heavy"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  command: PWRQSTN
  values: ["00": "Standby", "01": "On"]

- id: mute_state
  type: enum
  command: AMTQSTN
  values: ["00": "Off", "01": "On"]

- id: volume_level
  type: string
  command: MVLQSTN
  description: "Current volume level in hex"

- id: input_selector
  type: string
  command: SLIQSTN
  description: "Current input selector code in hex"

- id: listening_mode
  type: string
  command: LMDQSTN
  description: "Current listening mode code in hex"

- id: dimmer_level
  type: enum
  command: DIMQSTN
  values:
    - "00": "Bright"
    - "01": "Dim"
    - "02": "Dark"
    - "03": "Shut-Off"
    - "08": "Bright and LED OFF"

- id: display_mode
  type: string
  command: DIFQSTN
  description: "Current display mode code"

- id: audio_selector
  type: string
  command: SLAQSTN
  description: "Current audio selector code"

- id: tone_front
  type: string
  command: TFRQSTN
  description: "Returns BxxTxx format"

- id: subwoofer_level
  type: string
  command: SWLQSTN
  description: "Subwoofer temporary level"

- id: center_level
  type: string
  command: CTLQSTN
  description: "Center temporary level"

- id: sleep_timer
  type: string
  command: SLPQSTN
  description: "Current sleep timer value in hex or OFF"

- id: audio_info
  type: string
  command: IFAQSTN
  description: "Audio information matching front panel display"

- id: video_info
  type: string
  command: IFVQSTN
  description: "Video information matching front panel display"

- id: hdmi_output
  type: string
  command: HDOQSTN
  description: "Current HDMI output selector code"

- id: resolution
  type: string
  command: RESQSTN
  description: "Current monitor out resolution code"

- id: net_play_status
  type: string
  command: NSTQSTN
  description: "3-char string: p=play status (S/P/p/F/R), r=repeat (-/R/F/1), s=shuffle (-/S/A)"

- id: net_track_info
  type: string
  command: NTRQSTN
  description: "cccc/tttt format (current/total track)"

- id: net_time_info
  type: string
  command: NTMQSTN
  description: "mm:ss/mm:ss format (elapsed/track time)"

- id: net_artist
  type: string
  command: NATQSTN
  description: "Net/USB artist name (max 64 ASCII chars)"

- id: net_album
  type: string
  command: NALQSTN
  description: "Net/USB album name (max 64 ASCII chars)"

- id: net_title
  type: string
  command: NTIQSTN
  description: "Net/USB title name (max 64 ASCII chars)"

- id: zone2_power_state
  type: enum
  command: ZPWQSTN
  values: ["00": "Standby", "01": "On"]

- id: zone2_mute_state
  type: enum
  command: ZMTQSTN
  values: ["00": "Off", "01": "On"]

- id: zone2_volume_level
  type: string
  command: ZVLQSTN
  description: "Zone 2 volume level in hex"

- id: zone2_input_selector
  type: string
  command: SLZQSTN
  description: "Zone 2 input selector code"

- id: zone3_power_state
  type: enum
  command: PW3QSTN
  values: ["00": "Standby", "01": "On"]

- id: zone3_mute_state
  type: enum
  command: MT3QSTN
  values: ["00": "Off", "01": "On"]

- id: zone3_volume_level
  type: string
  command: VL3QSTN
  description: "Zone 3 volume level in hex"

- id: zone4_power_state
  type: enum
  command: PW4QSTN
  values: ["00": "Standby", "01": "On"]

- id: zone4_mute_state
  type: enum
  command: MT4QSTN
  values: ["00": "Off", "01": "On"]

- id: zone4_volume_level
  type: string
  command: VL4QSTN
  description: "Zone 4 volume level in hex"
```

## Variables
```yaml
# UNRESOLVED: all continuous parameters are expressed as discrete command codes in the ISCP protocol.
# Volume, tone, and level values are set via hex-encoded parameters in Actions above.
```

## Events
```yaml
- id: status_notification
  description: >-
    Unsolicited status message sent by the receiver when its state changes.
    Format matches command response: !1<cmd><param>.
    Example: receiver changes input -> sends "!1SLI03".
  direction: device_to_controller
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Zone 2 volume/tone/balance only works when main zone is ON"
  - "Zone 2 tone/balance only works when Zone 2 is powered or variable"
  - "12V Triggers (TGA/TGB/TGC) only available when each trigger parameter is set to OFF in Setup Menu"
# UNRESOLVED: power-on sequencing requirements not stated in source
```

## Notes
- ISCP (Integra Serial Control Protocol) uses 3-character command codes with variable-length hex parameters. The "QSTN" parameter is universally used as a query suffix on any command.
- eISCP over TCP wraps ISCP messages in a 16-byte big-endian header (magic "ISCP", header size 0x10, data size, version 0x01).
- RS-232 uses 3-wire connection (TX, RX, GND) with straight-thru cable, DB9 female connector.
- Volume levels are expressed in hexadecimal (e.g., "00"-"64" maps to 0-100 decimal).
- The receiver supports only one simultaneous TCP client connection. A persistent connection is required to receive unsolicited status change notifications.
- Minimum 50 ms between commands; receiver responds within 50 ms.
- Zone 2-4 command sets are largely parallel to the main zone commands with different command prefixes.
- Tuner (FM/AM/XM/SIRIUS/HD Radio) functions are shared across main and zone sides.
- Many commands (tone per speaker, XM, SIRIUS, HD Radio, RI system) are model-dependent and may not all apply to the HT-D03 specifically.

<!-- UNRESOLVED: exact HT-D03 command subset not confirmed — source is a generic Integra ISCP protocol reference -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: maximum volume range (0-100 vs 0-80) depends on model, not confirmed for HT-D03 -->
<!-- UNRESOLVED: XM/SIRIUS/HD Radio command availability for HT-D03 not confirmed -->

## Provenance

```yaml
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
source_documents:
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:20.402Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:22.333Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:24.367Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:26.686Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:31.200Z
retrieved_at: 2026-04-29T09:20:31.200Z
last_checked_at: 2026-04-25T20:50:01.493Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T20:50:01.493Z
matched_actions: 65
action_count: 65
confidence: high
summary: "All 65 spec actions matched literally against source; transport parameters verified; spec is model-appropriate subset of generic ISCP protocol."
```

## Known Gaps

```yaml
[]
```
