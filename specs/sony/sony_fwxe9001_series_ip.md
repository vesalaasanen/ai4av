---
spec_id: admin/sony-fwxe9001-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony FW-XE9001 Series Control Spec"
manufacturer: Sony
model_family: FW-49XE9001
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - FW-49XE9001
    - FW-55XE9001
    - FW-65XE9001
    - FW-75XE9001
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip
  - https://pro-bravia.sony.net/remote-display-control/rest-api
  - https://pro-bravia.sony.net/remote-display-control
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command
retrieved_at: 2026-06-14T22:16:04.104Z
last_checked_at: 2026-06-16T07:17:48.548Z
generated_at: 2026-06-16T07:17:48.548Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated; RED-DA EU spec variant command coverage not fully documented in source"
  - "no settable continuous parameters beyond volume are documented as separate variables"
  - "source documents no multi-step sequences; remove section if not applicable"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "firmware version compatibility not stated; volume numeric range not stated; HDMI/Composite/Component port number limits stated as 1–9999 but actual physical port count not given; specific RED-DA EU variant command set differences not in source"
verification:
  verdict: verified
  checked_at: 2026-06-16T07:17:48.548Z
  matched_actions: 80
  action_count: 80
  confidence: medium
  summary: "All 80 spec action commands have literal matches in the Sony FW-XE9001 source protocol table; transport (TCP port 20060, no auth) verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Sony FW-XE9001 Series Control Spec

## Summary
Simple IP control for Sony BRAVIA Professional FW-XE9001 Series displays. Protocol: SSIP over TCP port 20060, fixed 24-byte messages, four-CC commands. Source: Sony pro-bravia developer portal (Simple IP control page). EU models have RED-DA compliance variants with differing command sets.

<!-- UNRESOLVED: firmware version compatibility not stated; RED-DA EU spec variant command coverage not fully documented in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: setPowerStatus, togglePowerStatus, getPowerStatus
- routable        # inferred: setInput, getInput (HDMI/Composite/Component/Screen Mirroring)
- queryable       # inferred: getPowerStatus, getAudioVolume, getAudioMute, getInput, getPictureMute, getSceneSetting
- levelable       # inferred: setAudioVolume, getAudioVolume
```

## Actions
```yaml
# All commands share a 24-byte fixed frame:
# Byte[0-1] = header 0x2A 0x53 ("*S")
# Byte[2]   = message type (C/E/A/N)
# Byte[3-6] = four-CC command
# Byte[7-22] = parameters (16 bytes, right-padded with "0" or "#")
# Byte[23]  = footer 0x0A (LF)
# Concatenated as ASCII string per source example: *SCPOWR0000000000000000

# --- IR / remote codes (setIrccCode, 4CC=IRCC) ---
- id: set_ircc_code
  label: Send IR Remote Code
  kind: action
  command: "*SCIRCC{code}"
  params:
    - name: code
      type: string
      description: IR code suffix; see IR Commands table (16 hex digits, right-padded with "0")

- id: set_ircc_display
  label: IR Display
  kind: action
  command: "*SCIRCC0000000000000005"
  params: []

- id: set_ircc_home
  label: IR Home
  kind: action
  command: "*SCIRCC0000000000000006"
  params: []

- id: set_ircc_options
  label: IR Options
  kind: action
  command: "*SCIRCC0000000000000007"
  params: []

- id: set_ircc_return
  label: IR Return
  kind: action
  command: "*SCIRCC0000000000000008"
  params: []

- id: set_ircc_up
  label: IR Up
  kind: action
  command: "*SCIRCC0000000000000009"
  params: []

- id: set_ircc_down
  label: IR Down
  kind: action
  command: "*SCIRCC0000000000000010"
  params: []

- id: set_ircc_right
  label: IR Right
  kind: action
  command: "*SCIRCC0000000000000011"
  params: []

- id: set_ircc_left
  label: IR Left
  kind: action
  command: "*SCIRCC0000000000000012"
  params: []

- id: set_ircc_confirm
  label: IR Confirm
  kind: action
  command: "*SCIRCC0000000000000013"
  params: []

- id: set_ircc_red
  label: IR Red
  kind: action
  command: "*SCIRCC0000000000000014"
  params: []

- id: set_ircc_green
  label: IR Green
  kind: action
  command: "*SCIRCC0000000000000015"
  params: []

- id: set_ircc_yellow
  label: IR Yellow
  kind: action
  command: "*SCIRCC0000000000000016"
  params: []

- id: set_ircc_blue
  label: IR Blue
  kind: action
  command: "*SCIRCC0000000000000017"
  params: []

- id: set_ircc_num1
  label: IR Num1
  kind: action
  command: "*SCIRCC0000000000000018"
  params: []

- id: set_ircc_num2
  label: IR Num2
  kind: action
  command: "*SCIRCC0000000000000019"
  params: []

- id: set_ircc_num3
  label: IR Num3
  kind: action
  command: "*SCIRCC0000000000000020"
  params: []

- id: set_ircc_num4
  label: IR Num4
  kind: action
  command: "*SCIRCC0000000000000021"
  params: []

- id: set_ircc_num5
  label: IR Num5
  kind: action
  command: "*SCIRCC0000000000000022"
  params: []

- id: set_ircc_num6
  label: IR Num6
  kind: action
  command: "*SCIRCC0000000000000023"
  params: []

- id: set_ircc_num7
  label: IR Num7
  kind: action
  command: "*SCIRCC0000000000000024"
  params: []

- id: set_ircc_num8
  label: IR Num8
  kind: action
  command: "*SCIRCC0000000000000025"
  params: []

- id: set_ircc_num9
  label: IR Num9
  kind: action
  command: "*SCIRCC0000000000000026"
  params: []

- id: set_ircc_num0
  label: IR Num0
  kind: action
  command: "*SCIRCC0000000000000027"
  params: []

- id: set_ircc_volume_up
  label: IR Volume Up
  kind: action
  command: "*SCIRCC0000000000000030"
  params: []

- id: set_ircc_volume_down
  label: IR Volume Down
  kind: action
  command: "*SCIRCC0000000000000031"
  params: []

- id: set_ircc_mute
  label: IR Mute
  kind: action
  command: "*SCIRCC0000000000000032"
  params: []

- id: set_ircc_channel_up
  label: IR Channel Up
  kind: action
  command: "*SCIRCC0000000000000033"
  params: []

- id: set_ircc_channel_down
  label: IR Channel Down
  kind: action
  command: "*SCIRCC0000000000000034"
  params: []

- id: set_ircc_subtitle
  label: IR Subtitle
  kind: action
  command: "*SCIRCC0000000000000035"
  params: []

- id: set_ircc_dot
  label: IR DOT
  kind: action
  command: "*SCIRCC0000000000000038"
  params: []

- id: set_ircc_picture_off
  label: IR Picture Off
  kind: action
  command: "*SCIRCC0000000000000050"
  params: []

- id: set_ircc_wide
  label: IR Wide
  kind: action
  command: "*SCIRCC0000000000000061"
  params: []

- id: set_ircc_jump
  label: IR Jump
  kind: action
  command: "*SCIRCC0000000000000062"
  params: []

- id: set_ircc_sync_menu
  label: IR Sync Menu
  kind: action
  command: "*SCIRCC0000000000000076"
  params: []

- id: set_ircc_forward
  label: IR Forward
  kind: action
  command: "*SCIRCC0000000000000077"
  params: []

- id: set_ircc_play
  label: IR Play
  kind: action
  command: "*SCIRCC0000000000000078"
  params: []

- id: set_ircc_rewind
  label: IR Rewind
  kind: action
  command: "*SCIRCC0000000000000079"
  params: []

- id: set_ircc_prev
  label: IR Prev
  kind: action
  command: "*SCIRCC0000000000000080"
  params: []

- id: set_ircc_stop
  label: IR Stop
  kind: action
  command: "*SCIRCC0000000000000081"
  params: []

- id: set_ircc_next
  label: IR Next
  kind: action
  command: "*SCIRCC0000000000000082"
  params: []

- id: set_ircc_pause
  label: IR Pause
  kind: action
  command: "*SCIRCC0000000000000084"
  params: []

- id: set_ircc_flash_plus
  label: IR Flash Plus
  kind: action
  command: "*SCIRCC0000000000000086"
  params: []

- id: set_ircc_flash_minus
  label: IR Flash Minus
  kind: action
  command: "*SCIRCC0000000000000087"
  params: []

- id: set_ircc_tv_power
  label: IR TV Power
  kind: action
  command: "*SCIRCC0000000000000098"
  params: []

- id: set_ircc_audio
  label: IR Audio
  kind: action
  command: "*SCIRCC0000000000000099"
  params: []

- id: set_ircc_input
  label: IR Input
  kind: action
  command: "*SCIRCC0000000000000101"
  params: []

- id: set_ircc_sleep
  label: IR Sleep
  kind: action
  command: "*SCIRCC0000000000000104"
  params: []

- id: set_ircc_sleep_timer
  label: IR Sleep Timer
  kind: action
  command: "*SCIRCC0000000000000105"
  params: []

- id: set_ircc_video_2
  label: IR Video 2
  kind: action
  command: "*SCIRCC0000000000000108"
  params: []

- id: set_ircc_picture_mode
  label: IR Picture Mode
  kind: action
  command: "*SCIRCC0000000000000110"
  params: []

- id: set_ircc_demo_surround
  label: IR Demo Surround
  kind: action
  command: "*SCIRCC0000000000000121"
  params: []

- id: set_ircc_hdmi1
  label: IR HDMI 1
  kind: action
  command: "*SCIRCC0000000000000124"
  params: []

- id: set_ircc_hdmi2
  label: IR HDMI 2
  kind: action
  command: "*SCIRCC0000000000000125"
  params: []

- id: set_ircc_hdmi3
  label: IR HDMI 3
  kind: action
  command: "*SCIRCC0000000000000126"
  params: []

- id: set_ircc_hdmi4
  label: IR HDMI 4
  kind: action
  command: "*SCIRCC0000000000000127"
  params: []

- id: set_ircc_action_menu
  label: IR Action Menu
  kind: action
  command: "*SCIRCC0000000000000129"
  params: []

- id: set_ircc_help
  label: IR Help
  kind: action
  command: "*SCIRCC0000000000000130"
  params: []

# --- Power (4CC=POWR) ---
- id: set_power_status_off
  label: Set Power Status Off (Standby)
  kind: action
  command: "*SCPOWR0000000000000000"
  params: []

- id: set_power_status_on
  label: Set Power Status On (Active)
  kind: action
  command: "*SCPOWR0000000000000001"
  params: []

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################"
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################"
  params: []

# --- Volume (4CC=VOLU) ---
- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume}"
  params:
    - name: volume
      type: string
      description: Volume value as decimal digit pad left-padded with "0" (e.g. 0000000000000029). Range not stated in source.

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################"
  params: []

# --- Audio Mute (4CC=AMUT) ---
- id: set_audio_mute_off
  label: Set Audio Mute Off
  kind: action
  command: "*SCAMUT0000000000000000"
  params: []

- id: set_audio_mute_on
  label: Set Audio Mute On
  kind: action
  command: "*SCAMUT0000000000000001"
  params: []

- id: get_audio_mute
  label: Get Audio Mute Status
  kind: query
  command: "*SEAMUT################"
  params: []

# --- Input (4CC=INPT) ---
- id: set_input_hdmi
  label: Set Input HDMI
  kind: action
  command: "*SCINPT0000000001000{n}"
  params:
    - name: n
      type: integer
      description: HDMI port number (1-9999, right-padded with "0"; example source shows 0000 in last 4 bytes)

- id: set_input_composite
  label: Set Input Composite
  kind: action
  command: "*SCINPT0000000003000{n}"
  params:
    - name: n
      type: integer
      description: Composite number (1-9999, right-padded with "0")

- id: set_input_component
  label: Set Input Component
  kind: action
  command: "*SCINPT0000000004000{n}"
  params:
    - name: n
      type: integer
      description: Component number (1-9999, right-padded with "0")

- id: set_input_screen_mirroring
  label: Set Input Screen Mirroring
  kind: action
  command: "*SCINPT0000000005000{n}"
  params:
    - name: n
      type: integer
      description: Screen Mirroring number (1-9999, right-padded with "0")

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT################"
  params: []

# --- Picture Mute (4CC=PMUT) ---
- id: set_picture_mute_off
  label: Set Picture Mute Off
  kind: action
  command: "*SCPMUT0000000000000000"
  params: []

- id: set_picture_mute_on
  label: Set Picture Mute On
  kind: action
  command: "*SCPMUT0000000000000001"
  params: []

- id: get_picture_mute
  label: Get Picture Mute Status
  kind: query
  command: "*SEPMUT################"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################"
  params: []

# --- Scene Setting (4CC=SCEN) ---
- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{value}"
  params:
    - name: value
      type: string
      description: One of: "auto", "auto24pSync", "general". Case-sensitive, right-padded with "#" to 16 bytes. e.g. "auto24pSync#####"

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################"
  params: []

# --- Network / Address queries (4CC=BADR, MADR) ---
- id: get_broadcast_address
  label: Get Broadcast IPv4 Address
  kind: query
  command: "*SEBADReth0############"
  params: []

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADReth0############"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  description: Reply to getPowerStatus; "0" = standby, "1" = active (last parameter byte)

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  description: Reply to getAudioMute; "0" = not muted, "1" = muted (last parameter byte)

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  description: Reply to getPictureMute; "0" = disabled, "1" = enabled (last parameter byte)

- id: current_input
  type: enum
  values: [hdmi, composite, component, screen_mirroring]
  description: Reply to getInput/fireInputChange; byte 11 of params: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring

- id: audio_volume
  type: integer
  description: Reply to getAudioVolume; volume value in last 16 param bytes (right-padded "0")

- id: scene_setting
  type: string
  description: Reply to getSceneSetting; one of "auto", "auto24pSync", "general", right-padded with "#"

- id: broadcast_address
  type: string
  description: Reply to getBroadcastAddress; IPv4 dotted-quad, right-padded with "#"

- id: mac_address
  type: string
  description: Reply to getMacAddress; MAC address, right-padded with "#"

- id: command_result
  type: enum
  values: [success, error, not_available, not_found]
  description: "Generic Answer (A) reply: 16x'0' = success, 16x'F' = error, 16x'N' = not available / not found"
```

## Variables
```yaml
# UNRESOLVED: no settable continuous parameters beyond volume are documented as separate variables
# Volume range not stated in source
```

## Events
```yaml
- id: fire_power_change
  type: enum
  values: [standby, active]
  description: Unsolicited notify (N) from monitor. 4CC=POWR, last param byte 0=standby, 1=active. Sent when powering on/off.

- id: fire_input_change
  type: enum
  values: [hdmi, composite, component, screen_mirroring]
  description: Unsolicited notify (N) from monitor. 4CC=INPT. All-zero params = generic input change; byte 11 = source kind, last 4 = port number.

- id: fire_volume_change
  type: integer
  description: Unsolicited notify (N) from monitor. 4CC=VOLU, last 16 param bytes = new volume value.

- id: fire_mute_change
  type: enum
  values: [unmuted, muted]
  description: Unsolicited notify (N) from monitor. 4CC=AMUT, last param byte 0=unmuted, 1=muted.

- id: fire_picture_mute_change
  type: enum
  values: [enabled, disabled]
  description: Unsolicited notify (N) from monitor. 4CC=PMUT, last param byte 0=enabled, 1=disabled. (Note: source lists "0" = enabled in firePicture MuteChange description but "Disabled" for getPictureMute reply; convention is preserved as written.)
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences; remove section if not applicable
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements
```

## Notes
- Source: Sony pro-bravia Simple IP control page (https://pro-bravia.sony.net/remote-display-control/). Generic to BRAVIA Professional displays; applies to FW-XE9001 series per scraper family assignment.
- Frame is 24 bytes total. Source example for power off is the literal ASCII string `*SCPOWR0000000000000000` (header "*S", C, "POWR", 16 zero-pad, LF omitted from the printed example).
- All four-CC commands use uppercase ASCII letters. Parameter padding is "0" for numeric values and "#" for string/address values.
- Answer (A) messages: 16x'0' = success, 16x'F' = error, 16x'N' = not available / not found.
- EU area FW-XE9001 models have 3 RED-DA compliance variants with differing command availability. See https://pro-bravia.sony.net/setup/device-settings/red-da/ for spec details.
- All SSIP commands are fire-and-forget at the TCP layer; the monitor returns an Answer (A) and may send Notify (N) events for state changes.

<!-- UNRESOLVED: firmware version compatibility not stated; volume numeric range not stated; HDMI/Composite/Component port number limits stated as 1–9999 but actual physical port count not given; specific RED-DA EU variant command set differences not in source -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip
  - https://pro-bravia.sony.net/remote-display-control/rest-api
  - https://pro-bravia.sony.net/remote-display-control
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command
retrieved_at: 2026-06-14T22:16:04.104Z
last_checked_at: 2026-06-16T07:17:48.548Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:17:48.548Z
matched_actions: 80
action_count: 80
confidence: medium
summary: "All 80 spec action commands have literal matches in the Sony FW-XE9001 source protocol table; transport (TCP port 20060, no auth) verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated; RED-DA EU spec variant command coverage not fully documented in source"
- "no settable continuous parameters beyond volume are documented as separate variables"
- "source documents no multi-step sequences; remove section if not applicable"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
- "firmware version compatibility not stated; volume numeric range not stated; HDMI/Composite/Component port number limits stated as 1–9999 but actual physical port count not given; specific RED-DA EU variant command set differences not in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
