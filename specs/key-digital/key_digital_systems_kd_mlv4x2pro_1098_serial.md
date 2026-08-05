---
spec_id: admin/key-digital-systems-kd-mlv4x2pro
schema_version: ai4av-public-spec-v1
revision: 1
title: "Key Digital Systems KD-MLV4x2Pro Control Spec"
manufacturer: "Key Digital"
model_family: KD-MLV4x2Pro
aliases: []
compatible_with:
  manufacturers:
    - "Key Digital"
    - "Key Digital Systems"
  models:
    - KD-MLV4x2Pro
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - keydigital.org
source_urls:
  - https://www.keydigital.org/web/content/5795/KD-MLV4x2Pro_Manual.pdf
retrieved_at: 2026-07-13T06:32:44.736Z
last_checked_at: 2026-07-21T23:14:36.948Z
generated_at: 2026-07-21T23:14:36.948Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Help command output in source is truncated (line 137); additional SPM/SPCET commands may exist beyond those captured here. EDID management commands not documented in available source text."
  - "source does not state whether the password applies to the TCP/IP Telnet"
  - "Help output truncated in source at line 137. Additional commands in the"
  - "no per-command acknowledgement responses documented in source"
  - "source does not describe any push/event/notification behavior"
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "- Help command output truncated in source; full command catalogue may be larger."
verification:
  verdict: verified
  checked_at: 2026-07-21T23:14:36.948Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions matched literally against source help output and protocol sections; transport parameters verified; no extra commands visible. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Key Digital Systems KD-MLV4x2Pro Control Spec

## Summary
The KD-MLV4x2Pro is a 4-input × 2-output HDMI/VGA multiviewer matrix switcher with HDBaseT output, supporting advanced control via RS-232 and TCP/IP (Telnet, port 23). Commands are identical across RS-232 and TCP/IP. This spec covers the documented RS-232/TCP-IP command set: input source/type selection, output routing, audio routing/enable, multiview layout (manual screen positioning, transparency, borders), HDBaseT pass-through routing, and system addressing.

<!-- UNRESOLVED: Help command output in source is truncated (line 137); additional SPM/SPCET commands may exist beyond those captured here. EDID management commands not documented in available source text. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23
auth:
  type: password  # source: Admin Login Page "Default password: admin" for Web Control Interface
  # UNRESOLVED: source does not state whether the password applies to the TCP/IP Telnet
  # command channel (port 23) or only to the Web Control Interface. No login procedure is
  # described for RS-232.
```

**Transport notes:**
- Carriage return AND line feed (CR+LF) required at the end of each command string.
- Commands are not case-sensitive. Spaces shown in command syntax may be excluded.
- Control commands are exactly the same via TCP/IP as via RS-232.
- Default TCP/IP address: 192.168.1.239 (adjustable via Web UI, RS-232, or TCP/IP).
- TCP port adjustable up to 9999.
- System address prefix: when unit address ≠ 00, all commands must be prefixed with the two-digit address `zz` (e.g. `01SPI...`). Default address 00 requires no prefix.

## Traits
```yaml
# - powerable    # inferred: output ON/OFF commands present (SPO xx ON/OFF)
# - routable     # inferred: input/output routing commands present (SPO xx SI yy)
# - queryable    # inferred: STA status query returns system state
```

## Actions
```yaml
# All commands below assume default system address 00 (no prefix). Prepend address `zz`
# when system address is set to [01-99]. All commands require trailing CR+LF.

# --- System ---
- id: help
  label: Help
  kind: query
  command: "h"
  params: []

- id: show_status
  label: Show Global System Status
  kind: query
  command: "sta"
  params: []

# --- Video Input Setup (xx=[01~04], y=[1~2]) ---
- id: set_input_video_source
  label: Set Input Video Source
  kind: action
  command: "SPI{xx}VS{y}"
  params:
    - name: xx
      type: integer
      description: Input number (01~04)
    - name: y
      type: integer
      description: "Video source: 1=HDMI, 2=VGA"

- id: set_all_input_video_source
  label: Set All Inputs Video Source
  kind: action
  command: "SPIAVS{y}"
  params:
    - name: y
      type: integer
      description: "Video source: 1=HDMI, 2=VGA"

- id: set_input_audio_source
  label: Set Input Audio Source
  kind: action
  command: "SPI{xx}AS{y}"
  params:
    - name: xx
      type: integer
      description: Input number (01~04)
    - name: y
      type: integer
      description: "Audio source: 1=HDMI, 2=Ext. Audio"

- id: set_all_input_audio_source
  label: Set All Inputs Audio Source
  kind: action
  command: "SPIAAS{y}"
  params:
    - name: y
      type: integer
      description: "Audio source: 1=HDMI, 2=Ext. Audio"

- id: set_input_video_type
  label: Set VGA Input Video Type
  kind: action
  command: "SPI{xx}VT{y}"
  params:
    - name: xx
      type: integer
      description: Input number (01~04)
    - name: y
      type: integer
      description: "Video type: 1=VGA, 2=YPbPr"

- id: set_all_input_video_type
  label: Set All VGA Inputs Video Type
  kind: action
  command: "SPIAVT{y}"
  params:
    - name: y
      type: integer
      description: "Video type: 1=VGA, 2=YPbPr"

# --- Video Output Setup (xx=[01~02], yy=[01~06], z=[1~2]) ---
- id: set_output_input
  label: Set Output Video Input
  kind: action
  command: "SPO{xx}SI{yy}"
  params:
    - name: xx
      type: integer
      description: Output number (01~02)
    - name: yy
      type: integer
      description: "Video input (01~04, 05=4K, 06=2K QUAD Multiview)"

- id: set_all_output_input
  label: Set All Outputs Video Input
  kind: action
  command: "SPOASI{yy}"
  params:
    - name: yy
      type: integer
      description: "Video input (01~04, 05=4K, 06=2K QUAD Multiview)"

- id: set_output_onoff
  label: Set Output ON/OFF
  kind: action
  command: "SPO{xx}{state}"
  params:
    - name: xx
      type: integer
      description: Output number (01~02)
    - name: state
      type: string
      description: "ON or OFF"

- id: set_all_output_onoff
  label: Set All Outputs ON/OFF
  kind: action
  command: "SPOA{state}"
  params:
    - name: state
      type: string
      description: "ON or OFF"

- id: set_output_debug
  label: Set Output Debug Mode
  kind: action
  command: "SPO{xx}DBG{state}"
  params:
    - name: xx
      type: integer
      description: Output number (01~02)
    - name: state
      type: string
      description: "ON or OFF"

- id: set_all_output_debug
  label: Set All Outputs Debug Mode
  kind: action
  command: "SPOADBG{state}"
  params:
    - name: state
      type: string
      description: "ON or OFF"

- id: set_multiview_mode
  label: Set Outputs Multiview Mode
  kind: action
  command: "SPOMV{z}"
  params:
    - name: z
      type: integer
      description: "1=Normal, 2=Multiview Mode"

# --- Audio Output Setup (xx=[01~02], yy=[01~04], E=Enable, D=Disable) ---
- id: set_output_audio_input
  label: Set Output Audio by Input (Multiview)
  kind: action
  command: "SPO{xx}SA{yy}"
  params:
    - name: xx
      type: integer
      description: Output number (01~02)
    - name: yy
      type: integer
      description: Audio source input (01~04) in Multiview

- id: set_all_output_audio_input
  label: Set All Outputs Audio by Input (Multiview)
  kind: action
  command: "SPOASA{yy}"
  params:
    - name: yy
      type: integer
      description: Audio source input (01~04) in Multiview

- id: set_hdmi_audio_output
  label: Set HDMI Audio Output Enable/Disable
  kind: action
  command: "SPO{xx}HA{state}"
  params:
    - name: xx
      type: integer
      description: Output number (01~02)
    - name: state
      type: string
      description: "E=Enable or D=Disable"

- id: set_all_hdmi_audio_output
  label: Set All HDMI Audio Outputs Enable/Disable
  kind: action
  command: "SPOAHA{state}"
  params:
    - name: state
      type: string
      description: "E=Enable or D=Disable"

- id: set_external_pcm_output
  label: Set External Digital PCM Output Enable/Disable
  kind: action
  command: "SPO{xx}DA{state}"
  params:
    - name: xx
      type: integer
      description: Output number (01~02)
    - name: state
      type: string
      description: "E=Enable or D=Disable"

- id: set_all_external_pcm_output
  label: Set All External Digital PCM Outputs Enable/Disable
  kind: action
  command: "SPOADA{state}"
  params:
    - name: state
      type: string
      description: "E=Enable or D=Disable"

# --- Multiview Mode Setup (z=[1~9]) ---
- id: set_input_swap
  label: Set Input Swap
  kind: action
  command: "SPMVIS"
  params: []

- id: save_user_screen_mode
  label: Save User Screen Mode
  kind: action
  command: "SPMVSS{z}"
  params:
    - name: z
      type: integer
      description: User screen mode slot (1~9)

- id: set_predefined_screen_mode
  label: Set Predefined Screen Mode (2K Multiview)
  kind: action
  command: "SPMVSM{z}"
  params:
    - name: z
      type: integer
      description: "Predefined mode: 1=QUAD, 2=DOWN, 3=UP, 4=RIGHT, 5=LEFT, 6~9=MANUAL1~4"

# --- Multiview Screen Manual Setup (vv=[01~04]) ---
- id: set_window_position
  label: Set Window X/Y Position
  kind: action
  command: "SPM{vv}XY{aaaa}.{bbbb}.{cccc}.{dddd}"
  params:
    - name: vv
      type: integer
      description: Input/window number (01~04)
    - name: aaaa
      type: integer
      description: Start X-axis (0000~1919)
    - name: bbbb
      type: integer
      description: Start Y-axis (0000~1079)
    - name: cccc
      type: integer
      description: End X-axis (0000~1919)
    - name: dddd
      type: integer
      description: End Y-axis (0000~1079)

- id: set_transparency
  label: Set Window Transparency
  kind: action
  command: "SPMTY{z}"
  params:
    - name: z
      type: integer
      description: "0=00%, 1=25%, 2=50%, 3=75%"

- id: set_border_line_width
  label: Set Border Line Width
  kind: action
  command: "SPMBLW{z}"
  params:
    - name: z
      type: integer
      description: "0=None, 1~9 pixels"

- id: set_border_line_color
  label: Set Border Line Color
  kind: action
  command: "SPMBLC{rrr}.{ggg}.{bbb}"
  params:
    - name: rrr
      type: integer
      description: Red value (001~255)
    - name: ggg
      type: integer
      description: Green value (001~255)
    - name: bbb
      type: integer
      description: Blue value (001~255)

# --- HDBaseT Pass-through Route Setup ---
- id: set_route_ip_address
  label: Set HDBaseT Route IP Address
  kind: action
  command: "SPCETIPR{xxx}.{xxx}.{xxx}.{xxx}"
  params:
    - name: address
      type: string
      description: IP address in dotted-quad format (xxx.xxx.xxx.xxx)

- id: set_tcpip_port
  label: Set TCP/IP Port
  kind: action
  command: "SPCETIPP{zzzz}"
  params:
    - name: zzzz
      type: integer
      description: TCP/IP port number

# --- System Address Setup (xx=[00-99], 00=Single) ---
- id: set_system_address
  label: Set System Address
  kind: action
  command: "SPCA{xx}"
  params:
    - name: xx
      type: integer
      description: "System address (00-99); 00 = single unit (no prefix)"
```

<!-- UNRESOLVED: Help output truncated in source at line 137. Additional commands in the
     SPM (multiview) and SPCET (HDBaseT pass-through) groups may be undocumented here.
     Specifically, the truncated region fell between border-width and the SPCET IP/port
     commands, so any intermediate commands (e.g. additional SPM sub-mnemonics, EDID set
     commands, front-panel/LCD control) are not captured. -->

## Feedbacks
```yaml
# The STA query returns a full status dump (firmware, RS-232 config, network settings,
# per-input link/video/audio status, per-output input/link/output state, audio output
# state). Individual discrete feedback channels are not documented; status is read via STA.
# UNRESOLVED: no per-command acknowledgement responses documented in source
```

## Variables
```yaml
# Settable parameters (transparency, border width/color, window position, system address,
# TCP/IP address/port) are represented as Actions above. No separate continuous variables
# beyond those actions.
```

## Events
```yaml
# No unsolicited notifications documented in source.
# UNRESOLVED: source does not describe any push/event/notification behavior
```

## Macros
```yaml
# No multi-step command sequences explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements. Factory default reset is performed via front-panel
# button hold (HDMI Input-Type Select + Input Swap, ~10s), not via command.
```

## Notes
- Device is a 4×2 HDMI/VGA multiviewer with HDBaseT output to KD-X222PO receiver.
- No volume or tone control features; only muting/enable of external audio outputs via command.
- Analog video input type (VGA vs Component/YPbPr) MUST be set via RS-232/TCP-IP; default is VGA.
- Active link (voltage + data) status for sources and output devices is viewable via RS-232/TCP-IP terminal (STA).
- HDBaseT port supports bi-directional control with KD-X222PO Rx; IR or RS-232 selected via slide switch.
- Window transparency/border settings apply globally to all windows (not per-window).
- Color-picker reference values documented in source (Red=255/0/0, White=255/255/255, etc.).
- F/W Version 1.05 observed on the unit whose status dump appears in the source.

<!-- UNRESOLVED:
  - Help command output truncated in source; full command catalogue may be larger.
  - Whether the Web UI "admin" password applies to the TCP/IP Telnet command channel is not stated.
  - Firmware version compatibility range not stated (only single observed version 1.05).
  - No per-command acknowledgement/error response format documented.
  - EDID configuration commands not present in available source text.
-->

## Provenance

```yaml
source_domains:
  - keydigital.org
source_urls:
  - https://www.keydigital.org/web/content/5795/KD-MLV4x2Pro_Manual.pdf
retrieved_at: 2026-07-13T06:32:44.736Z
last_checked_at: 2026-07-21T23:14:36.948Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:14:36.948Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions matched literally against source help output and protocol sections; transport parameters verified; no extra commands visible. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Help command output in source is truncated (line 137); additional SPM/SPCET commands may exist beyond those captured here. EDID management commands not documented in available source text."
- "source does not state whether the password applies to the TCP/IP Telnet"
- "Help output truncated in source at line 137. Additional commands in the"
- "no per-command acknowledgement responses documented in source"
- "source does not describe any push/event/notification behavior"
- "source contains no explicit safety warnings, interlock procedures, or"
- "- Help command output truncated in source; full command catalogue may be larger."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
