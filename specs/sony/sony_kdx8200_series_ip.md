---
spec_id: admin/sony-kdx8200-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX8200 Series Control Spec"
manufacturer: Sony
model_family: "BRAVIA 2014 models (Simple IP Control)"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "BRAVIA 2014 models (Simple IP Control)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
  - pro.sony
source_urls:
  - https://raw.githubusercontent.com/xiaolaba/bravia_console_sony/master/Sony_Simple_IP_Control_Protocol_for_BRAVIA.pdf
  - https://pro.sony
retrieved_at: 2026-06-12T04:35:24.676Z
last_checked_at: 2026-06-23T08:49:12.752Z
generated_at: 2026-06-23T08:49:12.752Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "HTTP/JSON-RPC \"High Level Protocol\" layer is mentioned in section 1 but not detailed; WebAPI endpoints not documented in this source."
  - "section intentionally omitted - the source defines all settable"
  - "source does not document device-side macros. Multi-step sequences"
  - "source contains no safety warnings, interlocks, or power-on sequencing."
  - "HTTP/JSON-RPC High Level Protocol endpoints not documented in this source."
  - "Exact KDX8200 series mention — source covers \"BRAVIA 2014 models\" generically; KDX8200-specific behavior not separately documented here."
verification:
  verdict: verified
  checked_at: 2026-06-23T08:49:12.752Z
  matched_actions: 131
  action_count: 131
  confidence: medium
  summary: "All 131 spec actions match source commands; transport confirmed; comprehensive IR code coverage from Table 5. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Sony KDX8200 Series Control Spec

## Summary
Sony BRAVIA Simple IP Control Protocol (v0.6) for 2014-era displays, including the KDX8200 series. TCP server on port 20060 exchanges 24-byte fixed-size frames containing a Four-CC function code and a 16-byte parameter block; covers power, volume, mute, input select, channel, picture mute, PIP, and network info, plus IR-emulation codes.

<!-- UNRESOLVED: HTTP/JSON-RPC "High Level Protocol" layer is mentioned in section 1 but not detailed; WebAPI endpoints not documented in this source. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
notes: |
  Connection model: persistent TCP, server closes after 30s client idle.
  Frame: 24 bytes fixed.
  Byte layout (per Table 1):
    [0-1]  Header: 0x2A 0x53 ("*S", fixed)
    [2]    Type: 0x43='C' (Control), 0x45='E' (Enquiry), 0x41='A' (Answer), 0x4E='N' (Notify)
    [3-6]  Function: 4 ASCII characters (Four-CC), e.g. "POWR", "VOLU"
    [7-22] Parameter: 16 bytes (ASCII '0'-'9', '.', or '#'-padded ASCII strings)
    [23]   Footer: 0x0A (LF, fixed)
```

## Traits
```yaml
powerable: true   # inferred from setPowerStatus / getPowerStatus
levelable: true   # inferred from setAudioVolume / getAudioVolume
queryable: true   # inferred from multiple get* Enquiry commands
routable: true    # inferred from setInputSource / setInput commands
```

## Actions
```yaml
# === Power ===
- id: set_power_off
  label: Set Power Off (Standby)
  kind: action
  command: "2A 53 43 50 4F 57 52 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"
  # Frame: HDR=2A53, Type='C'(43), Func='POWR'(4 bytes), Param=00..00 (16x '0' = standby), FTR=0A
  params: []

- id: set_power_on
  label: Set Power On (Active)
  kind: action
  command: "2A 53 43 50 4F 57 52 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 0A"
  # Param[15] = '1' (0x31) for Active
  params: []

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "2A 53 45 50 4F 57 52 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  # Type='E'(45), Param filled with '#' (0x23) per Common Parameter Definition
  params: []

# === Volume ===
- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "2A 53 43 56 4F 4C 55 {volume_padded_16}"
  # Param = decimal volume value, ASCII right-padded with '0' to fill 16 bytes.
  # Source example: "0000000000000029" for volume 29.
  params:
    - name: volume_padded_16
      type: string
      description: Volume value as decimal digits, left-padded with '0' to 16 ASCII bytes (e.g. "0000000000000029" for level 29)

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "2A 53 45 56 4F 4C 55 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

# === Mute ===
- id: set_audio_mute_off
  label: Set Audio Mute Off
  kind: action
  command: "2A 53 43 41 4D 55 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"
  # Param[15] = '0'
  params: []

- id: set_audio_mute_on
  label: Set Audio Mute On
  kind: action
  command: "2A 53 43 41 4D 55 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 0A"
  # Param[15] = '1'
  params: []

- id: get_audio_mute
  label: Get Audio Mute Status
  kind: query
  command: "2A 53 45 41 4D 55 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

# === Channel (preset) ===
- id: set_channel
  label: Set Channel (Preset)
  kind: action
  command: "2A 53 43 43 48 4E 4E {major}{minor}"
  # Param: 8 bytes major + '.' + 7 bytes minor, ASCII digits.
  # Source example: "00000050.1000000" = channel 50.1, "00000006.0000000" = channel 6.
  params:
    - name: major
      type: string
      description: 8 ASCII digits, left-padded with '0' (e.g. "00000050")
    - name: minor
      type: string
      description: 7 ASCII digits, left-padded with '0' (e.g. "1000000")

- id: get_channel
  label: Get Current Preset Channel
  kind: query
  command: "2A 53 45 43 48 4E 4E 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

# === Channel (triplet) ===
- id: set_triplet_channel
  label: Set Channel (Triplet, hex)
  kind: action
  command: "2A 53 43 54 43 48 4E {triplet_hex_13}"
  # Param: 3×4-hex-digit triplets concatenated = 12 hex digits total, followed by 4 hex digits (program).
  # Source example: "7FE07FE00400" = 32736.32736.1024.
  params:
    - name: triplet_hex_13
      type: string
      description: 12 hex chars (3×4-digit major/minor) + 4 hex chars program, ASCII uppercase (e.g. "7FE07FE00400")

- id: get_triplet_channel
  label: Get Current Triplet Channel
  kind: query
  command: "2A 53 45 54 43 48 4E 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

# === Input source (tuner/broadcast) ===
- id: set_input_source
  label: Set TV Input Source (tuner)
  kind: action
  command: "2A 53 43 49 53 52 43 {source_padded_16}"
  # Param: 16 ASCII bytes, right-padded with '#' (0x23).
  # Source example: "dvbt############"
  # Allowed sources: dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt
  params:
    - name: source_padded_16
      type: string
      description: One of dvbt/dvbc/dvbs/isdbt/isdbbs/isdbcs/antenna/cable/isdbgt, right-padded with '#' to 16 bytes

- id: get_input_source
  label: Get Current TV Input Source
  kind: query
  command: "2A 53 45 49 53 52 43 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

# === Input (connector) ===
- id: set_input_tv
  label: Set Input to TV
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"
  # Param[11]='0'
  params: []

- id: set_input_hdmi
  label: Set Input to HDMI (1-9999)
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 31 30 30 30 {number}"
  # Param[11]='1' (HDMI), then 4 ASCII digit number right-justified in last 4 bytes
  params:
    - name: number
      type: integer
      description: HDMI port number 1-9999, right-justified in 4 ASCII digit field

- id: set_input_scart
  label: Set Input to SCART (1-9999)
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 32 30 30 30 {number}"
  # Param[11]='2'
  params:
    - name: number
      type: integer
      description: SCART number 1-9999

- id: set_input_composite
  label: Set Input to Composite (1-9999)
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 33 30 30 30 {number}"
  # Param[11]='3'
  params:
    - name: number
      type: integer
      description: Composite number 1-9999

- id: set_input_component
  label: Set Input to Component (1-9999)
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 34 30 30 30 {number}"
  # Param[11]='4'
  params:
    - name: number
      type: integer
      description: Component number 1-9999

- id: set_input_screen_mirroring
  label: Set Input to Screen Mirroring (1-9999)
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 35 30 30 30 {number}"
  # Param[11]='5'
  params:
    - name: number
      type: integer
      description: Screen Mirroring number 1-9999

- id: set_input_pc_rgb
  label: Set Input to PC RGB (1-9999)
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 36 30 30 30 {number}"
  # Param[11]='6'
  params:
    - name: number
      type: integer
      description: PC RGB number 1-9999

- id: get_input
  label: Get Current Input
  kind: query
  command: "2A 53 45 49 4E 50 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

# === Picture mute ===
- id: set_picture_mute_off
  label: Disable Picture Mute
  kind: action
  command: "2A 53 43 50 4D 55 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"
  params: []

- id: set_picture_mute_on
  label: Enable Picture Mute (blank screen)
  kind: action
  command: "2A 53 43 50 4D 55 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 0A"
  params: []

- id: get_picture_mute
  label: Get Picture Mute Status
  kind: query
  command: "2A 53 45 50 4D 55 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "2A 53 43 54 50 4D 55 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  # Type='C', Func='TPMU' (toggle), Param filled with '#'
  params: []

# === PIP ===
- id: set_pip_off
  label: Disable PIP
  kind: action
  command: "2A 53 43 50 49 50 49 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"
  params: []

- id: set_pip_on
  label: Enable PIP
  kind: action
  command: "2A 53 43 50 49 50 49 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 0A"
  params: []

- id: get_pip
  label: Get PIP Status
  kind: query
  command: "2A 53 45 50 49 50 49 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: toggle_pip
  label: Toggle PIP Status
  kind: action
  command: "2A 53 43 54 50 49 50 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: toggle_pip_position
  label: Cycle PIP Position
  kind: action
  command: "2A 53 43 54 50 50 50 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  # Func='TPPP'
  params: []

# === Network info ===
- id: get_broadcast_address
  label: Get Broadcast IPv4 Address (eth0)
  kind: query
  command: "2A 53 45 42 41 44 52 65 74 68 30 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  # Param = "eth0" (4 ASCII bytes) + 12 '#' pad
  params: []

- id: get_mac_address
  label: Get MAC Address (eth0)
  kind: query
  command: "2A 53 45 4D 41 44 52 65 74 68 30 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  # Func='MADR', Param = "eth0" + 12 '#' pad
  params: []

# === IR emulation (setIrccCode, FourCC='IRCC') ===
# The 'setIrccCode' command sends an IR-like code. Param[0-15] (16 bytes) holds
# the IR code value per Table 5. Source example pattern: HDR TYPE 'IRCC' + 16-byte param.
# Only a representative subset is enumerated here; full IR table contains ~100 codes.
- id: ircc_power_off
  label: IR: Power Off
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"
  # Param: 16 ASCII '0' chars
  params: []

- id: ircc_input
  label: IR: Input
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 0A"
  # Param: 15×'0' + '1' (IR code 1)
  params: []

- id: ircc_volume_up
  label: IR: Volume Up
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 30 0A"
  # Param: 14×'0' + '30' (IR code 30)
  params: []

- id: ircc_volume_down
  label: IR: Volume Down
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 31 0A"
  # Param: 14×'0' + '31' (IR code 31)
  params: []

- id: ircc_mute
  label: IR: Mute
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 32 0A"
  # Param: 14×'0' + '32' (IR code 32)
  params: []

- id: ircc_channel_up
  label: IR: Channel Up
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 33 0A"
  # Param: 14×'0' + '33' (IR code 33)
  params: []

- id: ircc_channel_down
  label: IR: Channel Down
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 34 0A"
  # Param: 14×'0' + '34' (IR code 34)
  params: []
- id: ircc_gguide
  label: "IR: GGuide"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 0A"
  params: []
- id: ircc_epg
  label: "IR: EPG"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 0A"
  params: []
- id: ircc_favorites
  label: "IR: Favorites"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 0A"
  params: []
- id: ircc_display
  label: "IR: Display"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 0A"
  params: []
- id: ircc_home
  label: "IR: Home"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 0A"
  params: []
- id: ircc_options
  label: "IR: Options"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 0A"
  params: []
- id: ircc_return
  label: "IR: Return"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 0A"
  params: []
- id: ircc_up
  label: "IR: Up"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 0A"
  params: []
- id: ircc_down
  label: "IR: Down"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 30 0A"
  params: []
- id: ircc_right
  label: "IR: Right"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 31 0A"
  params: []
- id: ircc_left
  label: "IR: Left"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 32 0A"
  params: []
- id: ircc_confirm
  label: "IR: Confirm"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 33 0A"
  params: []
- id: ircc_red
  label: "IR: Red"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 34 0A"
  params: []
- id: ircc_green
  label: "IR: Green"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 35 0A"
  params: []
- id: ircc_yellow
  label: "IR: Yellow"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 36 0A"
  params: []
- id: ircc_blue
  label: "IR: Blue"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 37 0A"
  params: []
- id: ircc_num1
  label: "IR: Num1"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 38 0A"
  params: []
- id: ircc_num2
  label: "IR: Num2"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 39 0A"
  params: []
- id: ircc_num3
  label: "IR: Num3"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 30 0A"
  params: []
- id: ircc_num4
  label: "IR: Num4"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 31 0A"
  params: []
- id: ircc_num5
  label: "IR: Num5"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 32 0A"
  params: []
- id: ircc_num6
  label: "IR: Num6"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 33 0A"
  params: []
- id: ircc_num7
  label: "IR: Num7"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 34 0A"
  params: []
- id: ircc_num8
  label: "IR: Num8"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 35 0A"
  params: []
- id: ircc_num9
  label: "IR: Num9"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 36 0A"
  params: []
- id: ircc_num0
  label: "IR: Num0"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 37 0A"
  params: []
- id: ircc_num11
  label: "IR: Num11"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 38 0A"
  params: []
- id: ircc_num12
  label: "IR: Num12"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 39 0A"
  params: []
- id: ircc_subtitle
  label: "IR: Subtitle"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 35 0A"
  params: []
- id: ircc_closed_caption
  label: "IR: Closed Caption"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 36 0A"
  params: []
- id: ircc_enter
  label: "IR: Enter"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 37 0A"
  params: []
- id: ircc_dot
  label: "IR: DOT"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 38 0A"
  params: []
- id: ircc_analog
  label: "IR: Analog"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 39 0A"
  params: []
- id: ircc_teletext
  label: "IR: Teletext"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 30 0A"
  params: []
- id: ircc_exit
  label: "IR: Exit"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 31 0A"
  params: []
- id: ircc_analog2
  label: "IR: Analog2"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 32 0A"
  params: []
- id: ircc_ad
  label: "IR: *AD"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 33 0A"
  params: []
- id: ircc_digital
  label: "IR: Digital"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 34 0A"
  params: []
- id: ircc_analog_q
  label: "IR: Analog?"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 35 0A"
  params: []
- id: ircc_bs
  label: "IR: BS"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 36 0A"
  params: []
- id: ircc_cs
  label: "IR: CS"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 37 0A"
  params: []
- id: ircc_bs_cs
  label: "IR: BS/CS"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 38 0A"
  params: []
- id: ircc_ddata
  label: "IR: Ddata"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 39 0A"
  params: []
- id: ircc_pic_off
  label: "IR: Pic Off"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 30 0A"
  params: []
- id: ircc_tv_radio
  label: "IR: Tv_Radio"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 31 0A"
  params: []
- id: ircc_theater
  label: "IR: Theater"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 32 0A"
  params: []
- id: ircc_sen
  label: "IR: SEN"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 33 0A"
  params: []
- id: ircc_internet_widgets
  label: "IR: Internet Widgets"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 34 0A"
  params: []
- id: ircc_internet_video
  label: "IR: Internet Video"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 35 0A"
  params: []
- id: ircc_netflix
  label: "IR: Netflix"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 36 0A"
  params: []
- id: ircc_scene_select
  label: "IR: Scene Select"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 37 0A"
  params: []
- id: ircc_mode3d
  label: "IR: Mode3D"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 38 0A"
  params: []
- id: ircc_imanual
  label: "IR: iManual"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 39 0A"
  params: []
- id: ircc_audio
  label: "IR: Audio"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 30 0A"
  params: []
- id: ircc_wide
  label: "IR: Wide"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 31 0A"
  params: []
- id: ircc_jump
  label: "IR: Jump"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 32 0A"
  params: []
- id: ircc_pap
  label: "IR: PAP"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 33 0A"
  params: []
- id: ircc_myepg
  label: "IR: MyEPG"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 34 0A"
  params: []
- id: ircc_program_description
  label: "IR: Program Description"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 35 0A"
  params: []
- id: ircc_write_chapter
  label: "IR: Write Chapter"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 36 0A"
  params: []
- id: ircc_trackid
  label: "IR: TrackID"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 37 0A"
  params: []
- id: ircc_ten_key
  label: "IR: Ten Key"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 38 0A"
  params: []
- id: ircc_applicast
  label: "IR: AppliCast"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 39 0A"
  params: []
- id: ircc_actvila
  label: "IR: acTVila"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 30 0A"
  params: []
- id: ircc_delete_video
  label: "IR: Delete Video"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 31 0A"
  params: []
- id: ircc_photo_frame
  label: "IR: Photo Frame"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 32 0A"
  params: []
- id: ircc_tv_pause
  label: "IR: TV Pause"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 33 0A"
  params: []
- id: ircc_keypad
  label: "IR: KeyPad"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 34 0A"
  params: []
- id: ircc_media
  label: "IR: Media"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 35 0A"
  params: []
- id: ircc_sync_menu
  label: "IR: Sync Menu"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 36 0A"
  params: []
- id: ircc_forward
  label: "IR: Forward"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 37 0A"
  params: []
- id: ircc_play
  label: "IR: Play"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 38 0A"
  params: []
- id: ircc_rewind
  label: "IR: Rewind"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 39 0A"
  params: []
- id: ircc_prev
  label: "IR: Prev"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 30 0A"
  params: []
- id: ircc_stop
  label: "IR: Stop"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 31 0A"
  params: []
- id: ircc_next
  label: "IR: Next"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 32 0A"
  params: []
- id: ircc_rec
  label: "IR: Rec"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 33 0A"
  params: []
- id: ircc_pause
  label: "IR: Pause"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 34 0A"
  params: []
- id: ircc_eject
  label: "IR: Eject"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 35 0A"
  params: []
- id: ircc_flash_plus
  label: "IR: Flash Plus"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 36 0A"
  params: []
- id: ircc_flash_minus
  label: "IR: Flash Minus"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 37 0A"
  params: []
- id: ircc_topmenu
  label: "IR: TopMenu"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 38 0A"
  params: []
- id: ircc_popupmenu
  label: "IR: PopupMenu"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 39 0A"
  params: []
- id: ircc_rakuraku_start
  label: "IR: Rakuraku Start"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 30 0A"
  params: []
- id: ircc_one_touch_time_rec
  label: "IR: One Touch Time Rec"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 31 0A"
  params: []
- id: ircc_one_touch_view
  label: "IR: One Touch View"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 32 0A"
  params: []
- id: ircc_one_touch_rec
  label: "IR: One Touch Rec"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 33 0A"
  params: []
- id: ircc_one_touch_stop
  label: "IR: One Touch Stop"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 34 0A"
  params: []
- id: ircc_dux
  label: "IR: DUX"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 35 0A"
  params: []
- id: ircc_football_mode
  label: "IR: Football Mode"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 36 0A"
  params: []
- id: ircc_social
  label: "IR: Social"
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 37 0A"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  source: "Answer to getPowerStatus: '0' = Standby, '1' = Active"

- id: audio_volume
  type: integer
  source: "Answer to getAudioVolume: decimal value in Param, right-padded with '0'"

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  source: "Answer to getAudioMute: '0' = Not Muted, '1' = Muted"

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  source: "Answer to getPictureMute: '0' = Disabled, '1' = Enabled"

- id: pip_state
  type: enum
  values: [disabled, enabled]
  source: "Answer to getPip: '0' = Disabled, '1' = Enabled"

- id: channel_preset
  type: string
  source: "Answer to getChannel: 8 digits + '.' + 7 digits (e.g. '00000050.1000000')"

- id: channel_triplet
  type: string
  source: "Answer to getTripletChannel: hex triplet, 12+4 digits"

- id: input_source
  type: string
  source: "Answer to getInputSource: one of dvbt/dvbc/dvbs/isdbt/isdbbs/isdbcs/antenna/cable/isdbgt, '#'-padded"

- id: input
  type: object
  source: |
    Answer to getInput: Param[11] encodes type,
    '0'=TV, '1'=HDMI(1-9999), '2'=SCART(1-9999), '3'=Composite(1-9999),
    '4'=Component(1-9999), '5'=Screen Mirroring(1-9999), '6'=PC RGB(1-9999);
    last 4 bytes hold the port number.

- id: broadcast_address
  type: string
  source: "Answer to getBroadcastAddress: IPv4 dotted-quad, '#'-padded"

- id: mac_address
  type: string
  source: "Answer to getMacAddress: MAC string, '#'-padded"

- id: answer_success
  type: enum
  values: [ok]
  source: "Type='A' with Param all '0' = success"

- id: answer_error
  type: enum
  values: [error]
  source: "Type='A' with Param all 'F' = error (e.g. invalid parameter)"
```

## Variables
```yaml
# UNRESOLVED: section intentionally omitted - the source defines all settable
# parameters as discrete actions (set* commands), not as variables.
```

## Events
```yaml
# Unsolicited notifications from the device (Type='N', 0x4E). Source Table 4.
- id: power_change
  fire_command: "2A 53 4E 50 4F 57 52 ..."
  description: "firePowerChange: sent when powering off (Param[15]='0') or on ('1')"

- id: channel_change
  fire_command: "2A 53 4E 43 48 4E 4E {channel_16}"
  description: "fireChannelChange: sent on channel change; Param = same format as setChannel"

- id: input_change
  fire_command: "2A 53 4E 49 4E 50 54 ..."
  description: "fireInputChange: sent on input change; Param[11] encodes type, last 4 bytes port number"

- id: volume_change
  fire_command: "2A 53 4E 56 4F 4C 55 {volume_16}"
  description: "fireVolumeChange: sent on volume change"

- id: mute_change
  fire_command: "2A 53 4E 41 4D 55 54 ..."
  description: "fireMuteChange: sent on mute state change ('0' = unmuted, '1' = muted)"

- id: pip_change
  fire_command: "2A 53 4E 50 49 50 49 ..."
  description: "firePipChange: sent on PIP enable/disable"

- id: picture_mute_change
  fire_command: "2A 53 4E 50 4D 55 54 ..."
  description: "firePictureMuteChange: sent on picture mute state change"
```

## Macros
```yaml
# UNRESOLVED: source does not document device-side macros. Multi-step sequences
# must be composed by the controller.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing.
```

## Notes
- Protocol version: 0.6 (per source header).
- Frame = 24 bytes: 0x2A 0x53 | Type(1) | Func(4 ASCII) | Param(16) | 0x0A.
- Param encoding: ASCII digits '0'-'9' for numerics, '#' (0x23) for pad, 'F' (0x46) for error. Examples: "0000000000000029" = volume 29; "dvbt############" = DVB-T source.
- 30-second idle timeout: server closes connection if no client command within 30s.
- The source also describes a "High Level Protocol" (HTTP/JSON-RPC) in section 1, but no WebAPI endpoint details are in this document; that layer is out of scope.
- IR codes (setIrccCode, ~100 codes in Table 5) are partially enumerated above as representative actions; full set available from source.
- Model coverage: source says "BRAVIA 2014 models"; KDX8200 series inclusion is inferred from the operator-supplied product name, not directly named in this document.

<!-- UNRESOLVED: HTTP/JSON-RPC High Level Protocol endpoints not documented in this source. -->
<!-- UNRESOLVED: Exact KDX8200 series mention — source covers "BRAVIA 2014 models" generically; KDX8200-specific behavior not separately documented here. -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
  - pro.sony
source_urls:
  - https://raw.githubusercontent.com/xiaolaba/bravia_console_sony/master/Sony_Simple_IP_Control_Protocol_for_BRAVIA.pdf
  - https://pro.sony
retrieved_at: 2026-06-12T04:35:24.676Z
last_checked_at: 2026-06-23T08:49:12.752Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T08:49:12.752Z
matched_actions: 131
action_count: 131
confidence: medium
summary: "All 131 spec actions match source commands; transport confirmed; comprehensive IR code coverage from Table 5. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HTTP/JSON-RPC \"High Level Protocol\" layer is mentioned in section 1 but not detailed; WebAPI endpoints not documented in this source."
- "section intentionally omitted - the source defines all settable"
- "source does not document device-side macros. Multi-step sequences"
- "source contains no safety warnings, interlocks, or power-on sequencing."
- "HTTP/JSON-RPC High Level Protocol endpoints not documented in this source."
- "Exact KDX8200 series mention — source covers \"BRAVIA 2014 models\" generically; KDX8200-specific behavior not separately documented here."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
