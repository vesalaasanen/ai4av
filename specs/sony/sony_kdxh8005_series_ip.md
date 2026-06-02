---
spec_id: admin/sony-kdxh8005-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDXH8005 Series Control Spec"
manufacturer: Sony
model_family: KD-43XH8005
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - KD-43XH8005
    - KD-49XH8005
    - KD-55XH8005
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net/remote-display-control/ip-control-comparison/
retrieved_at: 2026-05-27T15:07:21.888Z
last_checked_at: 2026-06-02T07:06:41.668Z
generated_at: 2026-06-02T07:06:41.668Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the BRAVIA Professional Displays Knowledge Center; protocol applicability to consumer XH8005 chassis not explicitly confirmed in source text. EU-region models ship in three RED-DA compliance variants with different available commands — see Notes."
  - "no multi-step sequences described in source"
  - "no safety warnings, interlock procedures, or power-on sequencing"
verification:
  verdict: verified
  checked_at: 2026-06-02T07:06:41.668Z
  matched_actions: 73
  action_count: 73
  confidence: medium
  summary: "All 73 spec actions match FourCC commands in source; transport parameters verified; source coverage complete. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Sony KDXH8005 Series Control Spec

## Summary
Sony BRAVIA KDXH8005 Series LED TVs (KD-43XH8005 / KD-49XH8005 / KD-55XH8005) controlled over TCP using Sony's SSIP "Simple IP Control" protocol. All messages are fixed 24-byte payloads on TCP port 20060, with a 2-byte header (`*S`), 1-byte message type (C/E/A/N), 4-byte FourCC command, 16-byte parameter block, and 1-byte LF footer.

<!-- UNRESOLVED: source is the BRAVIA Professional Displays Knowledge Center; protocol applicability to consumer XH8005 chassis not explicitly confirmed in source text. EU-region models ship in three RED-DA compliance variants with different available commands — see Notes. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
```

**Message frame (24 bytes, all ASCII printable or 0x0A):**
| Offset | Length | Meaning |
|--------|--------|---------|
| 0–1    | 2      | Header `*S` (0x2A 0x53), fixed |
| 2      | 1      | Message type: `C` (Control) / `E` (Enquiry) / `A` (Answer) / `N` (Notify) |
| 3–6    | 4      | FourCC command code (ASCII) |
| 7–22   | 16     | Parameters (ASCII, right-padded with `#`) |
| 23     | 1      | Footer `0x0A` (LF), fixed |

## Traits
```yaml
- powerable       # inferred from setPowerStatus / togglePowerStatus
- routable        # inferred from setInput / getInput
- queryable       # inferred from get* command set
- levelable       # inferred from setAudioVolume
```

## Actions
```yaml
# ----- Power -----
- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR000000000000000{state}"  # state: 0=Standby, 1=Active; 24th byte is LF (0x0A)
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: 0 = Standby (Off), 1 = Active (On)

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################"  # params padded with `#`
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################"
  params: []

# ----- Audio Volume -----
- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU00000000000000{level}"  # level in decimal digit pad (e.g. 0000000000000029 = 29)
  params:
    - name: level
      type: integer
      description: Volume value, decimal, right-aligned in 16-byte param field

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################"
  params: []

# ----- Audio Mute -----
- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT00000000000000{state}"  # 0=Unmute, 1=Mute
  params:
    - name: state
      type: integer
      enum: [0, 1]

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################"
  params: []

# ----- Input Routing -----
- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT0000000000{kind}0{number}"  # kind 1=HDMI, 3=Composite, 4=Component, 5=ScreenMirroring; number 1-9999
  params:
    - name: kind
      type: integer
      enum: [1, 3, 4, 5]
      description: "1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring"
    - name: number
      type: integer
      description: Input number 1-9999

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT################"
  params: []

# ----- Picture Mute -----
- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT00000000000000{state}"  # 0=Disable, 1=Enable (black screen)
  params:
    - name: state
      type: integer
      enum: [0, 1]

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT################"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################"
  params: []

# ----- Scene Setting -----
- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{value}#########"  # value: "auto", "auto24pSync", "general" (case-sensitive, right-padded with #)
  params:
    - name: value
      type: string
      enum: ["auto", "auto24pSync", "general"]

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################"
  params: []

# ----- IR Code Passthrough (setIrccCode) -----
# All IR commands use the same FourCC `IRCC` with the IR code as the 16-byte param.
# Right-aligned decimal in the last 2 bytes; leading bytes are ASCII `0` digits.
- id: ircc_display
  label: IR Display
  kind: action
  command: "*SCIRCC0000000000000005"

- id: ircc_home
  label: IR Home
  kind: action
  command: "*SCIRCC0000000000000006"

- id: ircc_options
  label: IR Options
  kind: action
  command: "*SCIRCC0000000000000007"

- id: ircc_return
  label: IR Return
  kind: action
  command: "*SCIRCC0000000000000008"

- id: ircc_up
  label: IR Up
  kind: action
  command: "*SCIRCC0000000000000009"

- id: ircc_down
  label: IR Down
  kind: action
  command: "*SCIRCC0000000000000010"

- id: ircc_right
  label: IR Right
  kind: action
  command: "*SCIRCC0000000000000011"

- id: ircc_left
  label: IR Left
  kind: action
  command: "*SCIRCC0000000000000012"

- id: ircc_confirm
  label: IR Confirm
  kind: action
  command: "*SCIRCC0000000000000013"

- id: ircc_red
  label: IR Red
  kind: action
  command: "*SCIRCC0000000000000014"

- id: ircc_green
  label: IR Green
  kind: action
  command: "*SCIRCC0000000000000015"

- id: ircc_yellow
  label: IR Yellow
  kind: action
  command: "*SCIRCC0000000000000016"

- id: ircc_blue
  label: IR Blue
  kind: action
  command: "*SCIRCC0000000000000017"

- id: ircc_num1
  label: IR Num 1
  kind: action
  command: "*SCIRCC0000000000000018"

- id: ircc_num2
  label: IR Num 2
  kind: action
  command: "*SCIRCC0000000000000019"

- id: ircc_num3
  label: IR Num 3
  kind: action
  command: "*SCIRCC0000000000000020"

- id: ircc_num4
  label: IR Num 4
  kind: action
  command: "*SCIRCC0000000000000021"

- id: ircc_num5
  label: IR Num 5
  kind: action
  command: "*SCIRCC0000000000000022"

- id: ircc_num6
  label: IR Num 6
  kind: action
  command: "*SCIRCC0000000000000023"

- id: ircc_num7
  label: IR Num 7
  kind: action
  command: "*SCIRCC0000000000000024"

- id: ircc_num8
  label: IR Num 8
  kind: action
  command: "*SCIRCC0000000000000025"

- id: ircc_num9
  label: IR Num 9
  kind: action
  command: "*SCIRCC0000000000000026"

- id: ircc_num0
  label: IR Num 0
  kind: action
  command: "*SCIRCC0000000000000027"

- id: ircc_volume_up
  label: IR Volume Up
  kind: action
  command: "*SCIRCC0000000000000030"

- id: ircc_volume_down
  label: IR Volume Down
  kind: action
  command: "*SCIRCC0000000000000031"

- id: ircc_mute
  label: IR Mute
  kind: action
  command: "*SCIRCC0000000000000032"

- id: ircc_channel_up
  label: IR Channel Up
  kind: action
  command: "*SCIRCC0000000000000033"

- id: ircc_channel_down
  label: IR Channel Down
  kind: action
  command: "*SCIRCC0000000000000034"

- id: ircc_subtitle
  label: IR Subtitle
  kind: action
  command: "*SCIRCC0000000000000035"

- id: ircc_dot
  label: IR DOT
  kind: action
  command: "*SCIRCC0000000000000038"

- id: ircc_picture_off
  label: IR Picture Off
  kind: action
  command: "*SCIRCC0000000000000050"

- id: ircc_wide
  label: IR Wide
  kind: action
  command: "*SCIRCC0000000000000061"

- id: ircc_jump
  label: IR Jump
  kind: action
  command: "*SCIRCC0000000000000062"

- id: ircc_sync_menu
  label: IR Sync Menu
  kind: action
  command: "*SCIRCC0000000000000076"

- id: ircc_forward
  label: IR Forward
  kind: action
  command: "*SCIRCC0000000000000077"

- id: ircc_play
  label: IR Play
  kind: action
  command: "*SCIRCC0000000000000078"

- id: ircc_rewind
  label: IR Rewind
  kind: action
  command: "*SCIRCC0000000000000079"

- id: ircc_prev
  label: IR Prev
  kind: action
  command: "*SCIRCC0000000000000080"

- id: ircc_stop
  label: IR Stop
  kind: action
  command: "*SCIRCC0000000000000081"

- id: ircc_next
  label: IR Next
  kind: action
  command: "*SCIRCC0000000000000082"

- id: ircc_pause
  label: IR Pause
  kind: action
  command: "*SCIRCC0000000000000084"

- id: ircc_flash_plus
  label: IR Flash Plus
  kind: action
  command: "*SCIRCC0000000000000086"

- id: ircc_flash_minus
  label: IR Flash Minus
  kind: action
  command: "*SCIRCC0000000000000087"

- id: ircc_tv_power
  label: IR TV Power
  kind: action
  command: "*SCIRCC0000000000000098"

- id: ircc_audio
  label: IR Audio
  kind: action
  command: "*SCIRCC0000000000000099"

- id: ircc_input
  label: IR Input
  kind: action
  command: "*SCIRCC0000000000000101"

- id: ircc_sleep
  label: IR Sleep
  kind: action
  command: "*SCIRCC0000000000000104"

- id: ircc_sleep_timer
  label: IR Sleep Timer
  kind: action
  command: "*SCIRCC0000000000000105"

- id: ircc_video2
  label: IR Video 2
  kind: action
  command: "*SCIRCC0000000000000108"

- id: ircc_picture_mode
  label: IR Picture Mode
  kind: action
  command: "*SCIRCC0000000000000110"

- id: ircc_demo_surround
  label: IR Demo Surround
  kind: action
  command: "*SCIRCC0000000000000121"

- id: ircc_hdmi1
  label: IR HDMI 1
  kind: action
  command: "*SCIRCC0000000000000124"

- id: ircc_hdmi2
  label: IR HDMI 2
  kind: action
  command: "*SCIRCC0000000000000125"

- id: ircc_hdmi3
  label: IR HDMI 3
  kind: action
  command: "*SCIRCC0000000000000126"

- id: ircc_hdmi4
  label: IR HDMI 4
  kind: action
  command: "*SCIRCC0000000000000127"

- id: ircc_action_menu
  label: IR Action Menu
  kind: action
  command: "*SCIRCC0000000000000129"

- id: ircc_help
  label: IR Help
  kind: action
  command: "*SCIRCC0000000000000130"

# ----- Network Info -----
- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADReth0############"  # interface id ASCII, e.g. "eth0"
  params:
    - name: interface
      type: string
      description: Interface name (e.g. "eth0")

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADR{interface}##########"  # interface id ASCII, e.g. "eth0"
  params:
    - name: interface
      type: string
      description: Interface name (e.g. "eth0")
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  source: getPowerStatus Answer (param last byte 0=Standby, 1=Active)

- id: audio_volume
  type: integer
  source: getAudioVolume Answer (volume value in 16-byte param)

- id: audio_mute
  type: enum
  values: [unmuted, muted]
  source: getAudioMute Answer (param last byte 0=Unmuted, 1=Muted)

- id: current_input
  type: object
  source: getInput Answer
  fields:
    kind: integer   # 1=HDMI, 3=Composite, 4=Component, 5=ScreenMirroring
    number: integer # 1-9999

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  source: getPictureMute Answer (param last byte 0=Disabled, 1=Enabled)

- id: scene_setting
  type: string
  source: getSceneSetting Answer (param value; "N…N" = not available for current input)

- id: broadcast_address
  type: string
  source: getBroadcastAddress Answer (e.g. "192.168.0.14" right-padded with #)

- id: mac_address
  type: string
  source: getMacAddress Answer (MAC right-padded with #)
```

## Variables
```yaml
# Set-only numeric/string parameters already covered as Actions above.
# No additional tunable parameters enumerated in source.
```

## Events
```yaml
# Unsolicited Notify (N) messages from monitor to client.
- id: fire_power_change
  fourcc: POWR
  payload: "*SNPOWR000000000000000{state}"  # state 0=powering off, 1=powering on

- id: fire_input_change
  fourcc: INPT
  payload: "*SNINPT0000000000{kind}0{number}"  # kind 1/3/4/5; number 1-9999

- id: fire_volume_change
  fourcc: VOLU
  payload: "*SNVOLU{level}##############"  # level = right-aligned decimal

- id: fire_mute_change
  fourcc: AMUT
  payload: "*SNAMUT000000000000000{state}"  # state 0=unmuting, 1=muting

- id: fire_picture_mute_change
  fourcc: PMUT
  payload: "*SNPMUT000000000000000{state}"  # state 0=enabled, 1=disabled
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in source.
```

## Notes
Protocol is `SSIP` (Sony Simple IP Control) — fixed 24-byte frames, TCP port 20060, no authentication. All command strings shown above are the literal 23-byte ASCII body; the 24th byte is the fixed LF footer (`0x0A`) and is appended by the stack.

**Answer / error decoding:** an Answer (A) message with `0…0` parameters indicates success; `F…F` (16 F's) indicates an error (e.g. invalid parameters). For setInput, `N…N` indicates "Not Found".

**Required monitor settings** (user must enable in OSD before TCP control works):
- Settings → Network & Internet → Remote device settings → Control remotely
- Settings → Network & Internet → Home network → IP control → Simple IP control

**EU RED-DA caveat:** EU-area models ship in three RED-DA compliance variants; available commands and parameter ranges differ per variant. See https://pro-bravia.sony.net/setup/device-settings/red-da/ for per-variant detail. Commands listed above are the superset for non-EU/redundant variants.

**Source caveat:** protocol documentation lives under Sony's "BRAVIA Professional Displays Knowledge Center" (pro-bravia.sony.net). Source text does not explicitly confirm XH8005 chassis support; treat the list above as the best-effort command set pending a vendor confirmation.

**Variable-length parameter handling:** 16-byte parameter fields are right-padded with ASCII `#` (0x23) for fixed values; numeric values are zero-padded left.

**Connection model:** source describes netcat example — open single TCP connection to monitor IP on port 20060, then send/receive 24-byte messages. No persistent session, no handshake, no keepalive documented in source.

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net/remote-display-control/ip-control-comparison/
retrieved_at: 2026-05-27T15:07:21.888Z
last_checked_at: 2026-06-02T07:06:41.668Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:06:41.668Z
matched_actions: 73
action_count: 73
confidence: medium
summary: "All 73 spec actions match FourCC commands in source; transport parameters verified; source coverage complete. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the BRAVIA Professional Displays Knowledge Center; protocol applicability to consumer XH8005 chassis not explicitly confirmed in source text. EU-region models ship in three RED-DA compliance variants with different available commands — see Notes."
- "no multi-step sequences described in source"
- "no safety warnings, interlock procedures, or power-on sequencing"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
