---
spec_id: admin/tvone-1t-vs-668
schema_version: ai4av-public-spec-v1
revision: 1
title: "tvONE 1T-VS-668 Control Spec"
manufacturer: tvONE
model_family: 1T-VS-668
aliases: []
compatible_with:
  manufacturers:
    - tvONE
  models:
    - 1T-VS-668
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - tvone.com
  - manualslib.com
source_urls:
  - https://tvone.com/filestore/Manuals-Other-Products/Manual-1T-VS-668.pdf
  - https://www.manualslib.com/manual/893665/Tvone-1t-Vs-668.html
  - https://tvone.com/support
retrieved_at: 2026-07-01T14:09:53.118Z
last_checked_at: 2026-08-05T08:47:40.797Z
generated_at: 2026-08-05T08:47:40.797Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Telnet/TCP port number not stated in source. Web GUI base URL/path not stated in source. Firmware version compatibility not stated. HTTP command payloads (if any) not documented beyond the Web GUI UI."
  - "no TCP/Telnet or HTTP port number stated in source"
  - "only \"unit's IP address\" stated; no HTTP path pattern documented"
  - "exact response string/byte framing for each query not specified verbatim in source."
  - "device may emit asynchronous state-change messages but none are described."
  - "none documented."
  - "Telnet/TCP port number not stated (do not assume 23). Web GUI HTTP base URL/path not stated (only IP address given). Exact response framing for R queries not specified. Firmware version compatibility not stated. No voltage/power/current specs populated (not in scope of control protocol and not present in this excerpt)."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:47:40.797Z
  matched_actions: 41
  action_count: 41
  confidence: medium
  summary: "All 41 spec actions match source command set literally; transport 19200/8/N/1 verified; source has no extra RS-232/Telnet commands. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# tvONE 1T-VS-668 Control Spec

## Summary
The tvONE 1T-VS-668 is a Universal Presentation Switcher/Scaler accepting HDMI, YPbPr, Video, and PC inputs. This spec covers the device's documented control interface: RS-232 (DB-9), Telnet over LAN, and a browser-based Web GUI. The same ASCII command set is shared by the RS-232 and Telnet transports; the Web GUI exposes the same functions through a web page but documents no programmatic HTTP API.

<!-- UNRESOLVED: Telnet/TCP port number not stated in source. Web GUI base URL/path not stated in source. Firmware version compatibility not stated. HTTP command payloads (if any) not documented beyond the Web GUI UI. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - http
# Telnet ("tcp") implied from "Telnet" control section; source names it Telnet explicitly.
# HTTP ("http") from documented Web GUI control page.
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: no TCP/Telnet or HTTP port number stated in source
  base_url: null  # UNRESOLVED: only "unit's IP address" stated; no HTTP path pattern documented
auth:
  type: none  # inferred: no auth/login procedure described for RS-232, Telnet, or Web GUI
```

## Traits
```yaml
traits:
  - powerable    # inferred from S POWER command
  - queryable    # inferred from R <param> query commands
  - routable     # inferred from S SOURCE / PORT input-selection commands
  - levelable    # inferred from S VOLUME / S CONTRAST / S BRIGHTNESS etc.
```

## Actions
```yaml
# All commands are case-insensitive (source note). Each command must be followed
# by a carriage return (CR); some systems also require a line feed (LF).
# Parameterized commands show the variable part in {braces}; literal payloads
# are copied verbatim from the source command tables.

actions:
  # --- POWER ---
  - id: set_power
    label: Set Power
    kind: action
    command: "S POWER {x}"
    params:
      - name: x
        type: integer
        enum: [0, 1]
        enum_labels: {0: OFF, 1: ON}

  - id: query_power
    label: Query Power
    kind: query
    command: "R POWER"
    params: []

  # --- SOURCE / INPUT ROUTING ---
  - id: set_source
    label: Set Source
    kind: action
    command: "S SOURCE {x}"
    params:
      - name: x
        type: integer
        enum: [1, 2, 3, 4, 5, 6, 7, 8]
        enum_labels: {1: "HDMI 1", 2: "HDMI 2", 3: "HDMI 3", 4: YPbPr, 5: VIDEO, 6: "PC 1", 7: "PC 2", 8: "PC 3"}

  - id: query_source
    label: Query Source
    kind: query
    command: "R SOURCE"
    params: []

  - id: set_default_power_on_port
    label: Set Default Input Port at Power-On
    kind: action
    command: "PORT {x}"
    params:
      - name: x
        type: integer
        enum: [0, 1, 2, 3, 4, 5, 6, 7, 8]
        enum_labels: {0: "LAST MEMORY", 1: "HDMI 1", 2: "HDMI 2", 3: "HDMI 3", 4: YPbPr, 5: VIDEO, 6: "PC 1", 7: "PC 2", 8: "PC 3"}

  # --- OUTPUT RESOLUTION ---
  - id: set_output
    label: Set Output Resolution
    kind: action
    command: "S OUTPUT {x}"
    params:
      - name: x
        type: integer
        enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
        enum_labels: {0: "640x480", 1: "800x600", 2: "1024x768", 3: "1280x768", 4: "1360x768", 5: "1280x720", 6: "1280x800", 7: "1280x1024", 8: "1440x900", 9: "1400x1050", 10: "1680x1050", 11: "1600x1200", 12: "1920x1080", 13: "1920x1200", 14: "480p@60", 15: "720p@60", 16: "1080i@60", 17: "1080p@60", 18: "576p@50", 19: "720p@50", 20: "1080i@50", 21: "1080p@50"}
        notes: "0-13 RGB encoded; 14-21 YUV encoded"

  - id: query_output
    label: Query Output Resolution
    kind: query
    command: "R OUTPUT"
    params: []

  # --- SIZE / ASPECT ---
  - id: set_size
    label: Set Size / Aspect
    kind: action
    command: "S SIZE {x}"
    params:
      - name: x
        type: integer
        enum: [0, 1, 2, 3, 4, 5, 6]
        enum_labels: {0: OVERSCAN, 1: FULL, 2: "FOLLOW INPUT", 3: "PAN SCAN", 4: LETTERBOX, 5: "UNDER 2", 6: "UNDER 1"}

  - id: query_size
    label: Query Size / Aspect
    kind: query
    command: "R SIZE"
    params: []

  # --- INPUT HDCP ---
  - id: set_input_hdcp
    label: Set Input HDCP
    kind: action
    command: "S INPUT HDCP {x}"
    params:
      - name: x
        type: integer
        enum: [0, 1]
        enum_labels: {0: ON, 1: OFF}

  - id: query_input_hdcp
    label: Query Input HDCP
    kind: query
    command: "R INPUT HDCP"
    params: []

  # --- CONTRAST ---
  - id: set_contrast
    label: Set Contrast
    kind: action
    command: "S CONTRAST {x}"
    params:
      - name: x
        type: integer
        range: {min: 0, max: 60}

  - id: query_contrast
    label: Query Contrast
    kind: query
    command: "R CONTRAST"
    params: []

  # --- BRIGHTNESS ---
  - id: set_brightness
    label: Set Brightness
    kind: action
    command: "S BRIGHTNESS {x}"
    params:
      - name: x
        type: integer
        range: {min: 0, max: 60}

  - id: query_brightness
    label: Query Brightness
    kind: query
    command: "R BRIGHTNESS"
    params: []

  # --- HUE ---
  - id: set_hue
    label: Set Hue
    kind: action
    command: "S HUE {x}"
    params:
      - name: x
        type: integer
        range: {min: 0, max: 60}

  - id: query_hue
    label: Query Hue
    kind: query
    command: "R HUE"
    params: []

  # --- SATURATION ---
  - id: set_saturation
    label: Set Saturation
    kind: action
    command: "S SATURATION {x}"
    params:
      - name: x
        type: integer
        range: {min: 0, max: 60}

  - id: query_saturation
    label: Query Saturation
    kind: query
    command: "R SATURATION"
    params: []

  # --- SHARPNESS ---
  - id: set_sharpness
    label: Set Sharpness
    kind: action
    command: "S SHARPNESS {x}"
    params:
      - name: x
        type: integer
        range: {min: 0, max: 30}

  - id: query_sharpness
    label: Query Sharpness
    kind: query
    command: "R SHARPNESS"
    params: []

  # --- NOISE REDUCTION ---
  - id: set_noise_reduction
    label: Set Noise Reduction
    kind: action
    command: "S NR {x}"
    params:
      - name: x
        type: integer
        enum: [0, 1, 2, 3]
        enum_labels: {0: OFF, 1: LOW, 2: MIDDLE, 3: HIGH}

  - id: query_noise_reduction
    label: Query Noise Reduction
    kind: query
    command: "R NR"
    params: []

  # --- VOLUME ---
  - id: set_volume
    label: Set Volume
    kind: action
    command: "S VOLUME {x}"
    params:
      - name: x
        type: integer
        range: {min: 0, max: 100}

  - id: query_volume
    label: Query Volume
    kind: query
    command: "R VOLUME"
    params: []

  - id: volume_up
    label: Volume Up
    kind: action
    command: "VOL +"
    params: []

  - id: volume_down
    label: Volume Down
    kind: action
    command: "VOL -"
    params: []

  # --- AUDIO DELAY ---
  - id: set_audio_delay
    label: Set Audio Delay
    kind: action
    command: "S AUDIO DELAY {x}"
    params:
      - name: x
        type: integer
        enum: [0, 1, 2, 3]
        enum_labels: {0: OFF, 1: "40ms", 2: "110ms", 3: "150ms"}

  - id: query_audio_delay
    label: Query Audio Delay
    kind: query
    command: "R AUDIO DELAY"
    params: []

  # --- AUDIO MUTE ---
  - id: set_audio_mute
    label: Set Audio Mute
    kind: action
    command: "S AUDIO MUTE {x}"
    params:
      - name: x
        type: integer
        enum: [0, 1]
        enum_labels: {0: ON, 1: MUTE}

  - id: query_audio_mute
    label: Query Audio Mute
    kind: query
    command: "R AUDIO MUTE"
    params: []

  # --- HDMI AUDIO SOURCE ---
  - id: set_hdmi_audio
    label: Set HDMI Audio Source
    kind: action
    command: "S HDMI AUDIO {x}"
    params:
      - name: x
        type: integer
        enum: [0, 1]
        enum_labels: {0: AUTO, 1: EXT}

  - id: query_hdmi_audio
    label: Query HDMI Audio Source
    kind: query
    command: "R HDMI AUDIO"
    params: []

  # --- KEY LOCK ---
  - id: set_key_lock
    label: Set Key Lock
    kind: action
    command: "S KEY LOCK {x}"
    params:
      - name: x
        type: integer
        enum: [0, 1]
        enum_labels: {0: ENABLE, 1: DISABLE}

  - id: query_key_lock
    label: Query Key Lock
    kind: query
    command: "R KEY LOCK"
    params: []

  # --- FREERUN COLOR ---
  - id: set_freerun_color
    label: Set Freerun Color
    kind: action
    command: "S FREERUNCOLOR {x}"
    params:
      - name: x
        type: integer
        enum: [0, 1]
        enum_labels: {0: BLACK, 1: BLUE}

  - id: query_freerun_color
    label: Query Freerun Color
    kind: query
    command: "R FREERUNCOLOR"
    params: []

  # --- SYSTEM ---
  - id: factory_reset
    label: Factory Reset
    kind: action
    command: "S RESET 1"
    params: []

  - id: query_system_status
    label: Query System Status (Firmware + Source)
    kind: query
    command: "ST"
    params: []
    notes: "Returns VERSION, SOURCE, and PORT ON info (firmware version + source + power-on port)"

  - id: list_commands
    label: List Available Commands
    kind: query
    command: "?"
    params: []
    notes: "Telnet session only; lists all available commands"

  - id: quit_session
    label: Quit Session
    kind: action
    command: "QUIT"
    params: []
    notes: "Telnet only"
```

## Feedbacks
```yaml
# Each R <param> query returns the numeric value for that setting.
# Response string format per value not specified verbatim beyond "Reports the
# numeric/numerical value for <setting>".
feedbacks:
  - id: power_state
    type: enum
    values: [{0: OFF}, {1: ON}]
  - id: source_state
    type: enum
    values: [{1: "HDMI 1"}, {2: "HDMI 2"}, {3: "HDMI 3"}, {4: YPbPr}, {5: VIDEO}, {6: "PC 1"}, {7: "PC 2"}, {8: "PC 3"}]
  - id: output_resolution_state
    type: enum
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
    # 0-13 RGB encoded; 14-21 YUV encoded
  - id: size_state
    type: enum
    values: [{0: OVERSCAN}, {1: FULL}, {2: "FOLLOW INPUT"}, {3: "PAN SCAN"}, {4: LETTERBOX}, {5: "UNDER 2"}, {6: "UNDER 1"}]
  - id: input_hdcp_state
    type: enum
    values: [{0: ON}, {1: OFF}]
  - id: contrast_level
    type: range
    range: {min: 0, max: 60}
  - id: brightness_level
    type: range
    range: {min: 0, max: 60}
  - id: hue_level
    type: range
    range: {min: 0, max: 60}
  - id: saturation_level
    type: range
    range: {min: 0, max: 60}
  - id: sharpness_level
    type: range
    range: {min: 0, max: 30}
  - id: noise_reduction_state
    type: enum
    values: [{0: OFF}, {1: LOW}, {2: MIDDLE}, {3: HIGH}]
  - id: volume_level
    type: range
    range: {min: 0, max: 100}
  - id: audio_delay_state
    type: enum
    values: [{0: OFF}, {1: "40ms"}, {2: "110ms"}, {3: "150ms"}]
  - id: audio_mute_state
    type: enum
    values: [{0: ON}, {1: MUTE}]
  - id: hdmi_audio_state
    type: enum
    values: [{0: AUTO}, {1: EXT}]
  - id: key_lock_state
    type: enum
    values: [{0: ENABLE}, {1: DISABLE}]
  - id: freerun_color_state
    type: enum
    values: [{0: BLACK}, {1: BLUE}]
# UNRESOLVED: exact response string/byte framing for each query not specified verbatim in source.
```

## Variables
```yaml
# All settable parameters are exposed as discrete S <param> {x} actions above.
# No settable parameter lacks a dedicated command, so this section is N/A.
```

## Events
```yaml
# No unsolicited notifications documented in source.
# UNRESOLVED: device may emit asynchronous state-change messages but none are described.
```

## Macros
```yaml
# No multi-step command sequences described in source.
# UNRESOLVED: none documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# No safety warnings, interlock procedures, or power-on sequencing requirements
# stated in the source. Note: OSD-only FACTORY RESET does not fully reset the
# system (use remote-control reset button for a complete reset); not a safety
# interlock.
```

## Notes
- Commands are case-insensitive (source note 2, §5.5 and §5.6).
- Every command must be terminated with a carriage return (CR); some systems also require a line feed (LF). This terminator is part of the wire format but is not part of the command mnemonic.
- RS-232 uses a DB-9 connector; pinout: 2=Tx, 3=Rx, 5=GND (pins 1,4,6,7,8,9 NC). Use a modem (null-modem) cable between controller and 1T-VS-668.
- The same ASCII command set applies to both RS-232 and Telnet sessions. The `?` (list) and `QUIT` commands are documented for Telnet only.
- Output resolutions 0–13 are RGB encoded; 14–21 are YUV encoded.
- OSD-only FACTORY RESET resets only part of the settings; a full system reset requires the reset button on the remote control.
- The unit's IP address is obtained from the OSD Information menu (needed for Telnet and Web GUI).

<!-- UNRESOLVED: Telnet/TCP port number not stated (do not assume 23). Web GUI HTTP base URL/path not stated (only IP address given). Exact response framing for R queries not specified. Firmware version compatibility not stated. No voltage/power/current specs populated (not in scope of control protocol and not present in this excerpt). -->
````

## Provenance

```yaml
source_domains:
  - tvone.com
  - manualslib.com
source_urls:
  - https://tvone.com/filestore/Manuals-Other-Products/Manual-1T-VS-668.pdf
  - https://www.manualslib.com/manual/893665/Tvone-1t-Vs-668.html
  - https://tvone.com/support
retrieved_at: 2026-07-01T14:09:53.118Z
last_checked_at: 2026-08-05T08:47:40.797Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:47:40.797Z
matched_actions: 41
action_count: 41
confidence: medium
summary: "All 41 spec actions match source command set literally; transport 19200/8/N/1 verified; source has no extra RS-232/Telnet commands. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Telnet/TCP port number not stated in source. Web GUI base URL/path not stated in source. Firmware version compatibility not stated. HTTP command payloads (if any) not documented beyond the Web GUI UI."
- "no TCP/Telnet or HTTP port number stated in source"
- "only \"unit's IP address\" stated; no HTTP path pattern documented"
- "exact response string/byte framing for each query not specified verbatim in source."
- "device may emit asynchronous state-change messages but none are described."
- "none documented."
- "Telnet/TCP port number not stated (do not assume 23). Web GUI HTTP base URL/path not stated (only IP address given). Exact response framing for R queries not specified. Firmware version compatibility not stated. No voltage/power/current specs populated (not in scope of control protocol and not present in this excerpt)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
