---
spec_id: admin/extron-dxp-42-hd-4k-plus
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DXP 42 HD 4K PLUS Control Spec"
manufacturer: Extron
model_family: "DXP 42 HD 4K PLUS"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DXP 42 HD 4K PLUS"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - support.displaymanager.net
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2939-01_A_DXPHD4KPLUS_user_guide.pdf
  - https://media.extron.com/public/download/files/userman/68-2961-01JControlSystNetworkPortsProtocolsLic.pdf
  - https://media.extron.com/public/download/files/userman/68-3596-01F-NetworkPorts-Protocols-and-License.pdf
  - https://media.extron.com/public/download/files/userman/68-3871-01_A_Extron_Control_For_Poly.pdf
  - https://support.displaymanager.net/hc/en-gb/articles/22750870424733-Troubleshooting-Guide-for-Extron-Control-Systems
retrieved_at: 2026-07-25T08:18:43.553Z
last_checked_at: 2026-08-05T08:19:21.575Z
generated_at: 2026-08-05T08:19:21.575Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact TCP/Telnet port number not stated in source (Telnet protocol named but no port value given). USB transport connector named but no USB-level protocol details documented. DXP 42 (4x2) matrix geometry not explicitly enumerated in source — only DXP 88/84/44 (8x8/8x4/4x4) EDID tables appear; inferred from product model name."
  - "TCP/Telnet port number not stated in source (Tier 3 - do not assume 23)"
  - "flow control not stated in source"
  - "no named multi-step macro sequences documented as such in source."
  - "no power-on sequencing interlocks or voltage safety warnings stated in source."
  - "TCP/Telnet port number not stated (Tier 3 — not assuming 23)."
  - "USB transport protocol details (beyond \"connector present\") not documented."
  - "serial flow_control not stated."
  - "firmware version compatibility ranges not stated."
  - "DXP 42 (4x2) specific matrix dimensions not explicitly tabulated (only DXP 88/84/44 EDID tables shown)."
  - "power supply voltage spec, fault behavior, and error-recovery sequences not stated."
  - "voltage/current/power specifications not stated (Tier 3 — never inferred)."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:19:21.575Z
  matched_actions: 124
  action_count: 124
  confidence: medium
  summary: "All 124 spec action units match SIS command templates verbatim in source; transport params verified; bidirectional coverage complete. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Extron DXP 42 HD 4K PLUS Control Spec

## Summary
The Extron DXP 42 HD 4K PLUS is an HDMI matrix switcher (4 inputs x 2 outputs, HDCP 2.x, 4K UHD) in the DXP HD 4K PLUS Series. This spec covers the Simple Instruction Set (SIS) ASCII command protocol used to configure and control the switcher over the rear-panel Remote RS-232 connector, Telnet/TCP (Ethernet LAN), or USB. SIS commands are plain ASCII strings terminated by carriage return / line feed; the switcher replies with status or an error code.

<!-- UNRESOLVED: exact TCP/Telnet port number not stated in source (Telnet protocol named but no port value given). USB transport connector named but no USB-level protocol details documented. DXP 42 (4x2) matrix geometry not explicitly enumerated in source — only DXP 88/84/44 (8x8/8x4/4x4) EDID tables appear; inferred from product model name. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  # UNRESOLVED: TCP/Telnet port number not stated in source (Tier 3 - do not assume 23)
  port: null
  base_ip_default: 192.168.254.254  # stated factory-default IP
serial:
  baud_rate: 9600          # stated default (range 300-115200)
  data_bits: 8             # stated default (alt: 7)
  parity: none             # stated default (alt: Odd/Even/Mark/Space)
  stop_bits: 1             # stated default (alt: 2)
  flow_control: null       # UNRESOLVED: flow control not stated in source
auth:
  type: password           # optional, two levels: administrator and user
  notes: >
    Optional password protection. Default both administrator and user
    passwords are empty (carriage return). Passwords case-sensitive, 0-128
    chars, pipe (|) invalid. Login reply: "Login Administrator" or "Login User".
    Setting/clearing commands: E{pwd}CA} (admin), E{pwd}CU} (user).
terminator:
  host_to_device: none     # "No special characters are required to begin or end a command sequence"
  device_to_host: "CR/LF"  # all responses end with carriage return + line feed (symbol "]")
  escape_char: "ESC (0x1B)" # many SIS commands prefixed with ESC (symbol "E")
```

## Traits
```yaml
traits:
  - routable   # inferred: input/output tie commands present
  - queryable  # inferred: view/query commands return state
  - levelable  # inferred: volume and attenuation level commands present
```

## Actions
```yaml
# Symbol legend (verbatim from source):
#   X!   = input number (0 = untie; 1..max inputs)
#   X@   = output number (0 = untie; 1..max outputs)
#   X#   = enable/disable (0/1)
#   X$   = name (16 alphanumerics; 12 for rooms)
#   X%   = analog audio / S/PDIF output number
#   X^   = HDCP authorized device (0 block / 1 allow, default)
#   X*   = output format (0 passthrough / 1 RGB / 2 YUV444 / 3 YUV422)
#   X1)  = HDCP mode (0 auto / 1 on)
#   X1@  = video mute (0 off / 1 video / 2 video+sync)
#   X1#  = audio mute (0..7; outputs 3-8 limited to 0/1)
#   X1%  = input attenuation (-20..00 dB, 00 default)
#   X1^  = output volume (0..100 %, ~1 dB steps; 100 default)
#   X1&  = global preset number (1..16)
#   X1*  = room number (1..10)
#   X1(  = room preset number (1..10)
#   X2)  = front panel lockout mode (0 / 1 / 2 default)
#   X2#  = verbose mode (0 / 1 / 2 / 3)
#   X2$  = power save mode (0 / 1 / 2)
#   X3%  = port timeout (1..65000 in 10-sec intervals; 30 default)
#   X3^  = device name (<=63 alnum/hyphen)
#   X4%  = serial port number (01..99)
#   X4^  = baud rate (9600/19200/38400/115200)
#   X4&  = parity (O/E/N/M/S, first letter only)
#   X4*  = data bits (7/8)
#   X4(  = stop bits (1/2)
#   X5$  = MKP mode (1 normal 1-64 / 2 MKP 1-100)
#   "E"  = ESC character (0x1B); "}" = CR (no LF); "]" = CR/LF

# --- Input and Output Tie Commands ---
- id: tie_input_to_hdmi_and_audio_output
  label: Tie HDMI Input to HDMI and Audio Output
  kind: action
  command: "{X!}*{X@}!"
  params:
    - {name: X!, type: integer, description: Input number (0 = untie)}
    - {name: X@, type: integer, description: Output number}

- id: tie_input_to_hdmi_output
  label: Tie HDMI Input to HDMI Output
  kind: action
  command: "{X!}*{X@}%  (or {X!}*{X@}&)"
  params:
    - {name: X!, type: integer, description: Input number}
    - {name: X@, type: integer, description: Output number}

- id: tie_hdmi_audio_input_to_audio_output
  label: Tie HDMI Audio Input to Audio-Only Output
  kind: action
  command: "{X!}*{X@}$"
  params:
    - {name: X!, type: integer, description: Input number}
    - {name: X@, type: integer, description: Output number}

- id: tie_input_to_all_hdmi_and_audio_outputs
  label: Tie HDMI Input to All HDMI and Audio Outputs
  kind: action
  command: "{X!}*!"
  params:
    - {name: X!, type: integer, description: Input number}

- id: tie_input_to_all_hdmi_outputs
  label: Tie HDMI Input to All HDMI Outputs
  kind: action
  command: "{X!}*%  (or {X!}*&)"
  params:
    - {name: X!, type: integer, description: Input number}

- id: tie_hdmi_audio_input_to_all_audio_outputs
  label: Tie HDMI Audio Input to All Audio-Only Outputs
  kind: action
  command: "{X!}*$"
  params:
    - {name: X!, type: integer, description: Input number}

- id: quick_tie_multiple
  label: Quick Tie (Multiple Ties in One Entry)
  kind: action
  command: "E+Q{X!}*{X@}%...{X!}*{X@}!}"
  params:
    - {name: ties, type: string, description: Repeating {X!}*{X@}% / {X!}*{X@}! tie fragments}

# --- View Ties ---
- id: view_hdmi_and_audio_output_tie
  label: View HDMI and Audio Output Tie
  kind: query
  command: "{X@}!"
  params:
    - {name: X@, type: integer, description: Output number}

- id: view_hdmi_output_tie
  label: View HDMI Output Tie
  kind: query
  command: "{X@}%  (or {X@}&)"
  params:
    - {name: X@, type: integer, description: Output number}

- id: view_audio_output_tie
  label: View Audio Output Tie
  kind: query
  command: "{X@}$"
  params:
    - {name: X@, type: integer, description: Output number}

# --- Input Configuration ---
- id: set_input_name
  label: Set Input Name
  kind: action
  command: "E{X!},{X$}NI}"
  params:
    - {name: X!, type: integer, description: Input number}
    - {name: X$, type: string, description: Name (<=16 alnum)}

- id: view_input_name
  label: View Input Name
  kind: query
  command: "E{X!}NI}"
  params:
    - {name: X!, type: integer, description: Input number}

- id: set_hdcp_authorized_device
  label: Set HDCP Authorized Device (per input)
  kind: action
  command: "EE{X!}*{X^}HDCP}"
  params:
    - {name: X!, type: integer, description: Input number}
    - {name: X^, type: integer, description: "0 = block HDCP, 1 = allow (default)"}

- id: view_hdcp_authorized_device
  label: View HDCP Authorized Device
  kind: query
  command: "EE{X!}HDCP}"
  params:
    - {name: X!, type: integer, description: Input number}

- id: view_input_hdcp_status
  label: View Input HDCP Status
  kind: query
  command: "EI{X!}HDCP}"
  params:
    - {name: X!, type: integer, description: Input number}

- id: view_all_input_hdcp_status
  label: View All Inputs HDCP Status
  kind: query
  command: "EIHDCP}"
  params: []

# --- EDID Commands ---
- id: view_edid_hex
  label: View EDID in Hex
  kind: query
  command: "ER{X!}EDID]"
  params:
    - {name: X!, type: integer, description: Input slot number}

- id: view_edid_native_resolution
  label: View EDID Native Resolution
  kind: query
  command: "EN{X!}EDID]"
  params:
    - {name: X!, type: integer, description: Input slot number}

- id: import_edid
  label: Import EDID
  kind: action
  command: "EI{X5@},{X5#}EDID]"
  params:
    - {name: X5@, type: integer, description: EDID reference slot}
    - {name: X5#, type: string, description: EDID filename (.bin, 128/256 bytes)}

- id: export_edid
  label: Export EDID
  kind: action
  command: "EE{X5@},{X5#}EDID]"
  params:
    - {name: X5@, type: integer, description: EDID reference slot}
    - {name: X5#, type: string, description: EDID filename (.bin)}

# --- Output Configuration ---
- id: set_output_name
  label: Set Output Name
  kind: action
  command: "E{X@},{X$}NO}"
  params:
    - {name: X@, type: integer, description: Output number}
    - {name: X$, type: string, description: Name (<=16 alnum)}

- id: view_output_name
  label: View Output Name
  kind: query
  command: "E{X@}NO}"
  params:
    - {name: X@, type: integer, description: Output number}

- id: set_output_format
  label: Set Output Format
  kind: action
  command: "E{X@}*{X*}VTPO}"
  params:
    - {name: X@, type: integer, description: Output number}
    - {name: X*, type: integer, description: "0 passthrough / 1 RGB / 2 YUV444 / 3 YUV422"}

- id: view_output_format
  label: View Output Format
  kind: query
  command: "E{X@}VTPO}"
  params:
    - {name: X@, type: integer, description: Output number}

- id: set_output_hdcp_mode_auto
  label: Set Output HDCP Mode to Auto
  kind: action
  command: "ES{X@}*0HDCP}"
  params:
    - {name: X@, type: integer, description: Output number}

- id: set_output_hdcp_mode_on
  label: Set Output HDCP Mode to On
  kind: action
  command: "ES{X@}*1HDCP}"
  params:
    - {name: X@, type: integer, description: Output number}

- id: view_hdcp_mode
  label: View Output HDCP Mode
  kind: query
  command: "ES{X@}HDCP}"
  params:
    - {name: X@, type: integer, description: Output number}

- id: view_output_hdcp_status
  label: View Output HDCP Status
  kind: query
  command: "EO{X@}HDCP}"
  params:
    - {name: X@, type: integer, description: Output number}

- id: view_all_outputs_hdcp_status
  label: View All Outputs HDCP Status
  kind: query
  command: "EOHDCP}"
  params: []

- id: set_hdmi_video_mute
  label: Set HDMI Video Mute (per output)
  kind: action
  command: "{X@}*{X1@}B"
  params:
    - {name: X@, type: integer, description: Output number}
    - {name: X1@, type: integer, description: "0 unmute / 1 video / 2 video+sync"}

- id: view_hdmi_video_mute_status
  label: View HDMI Video Mute Status
  kind: query
  command: "{X@}B"
  params:
    - {name: X@, type: integer, description: Output number}

- id: set_hdmi_video_mute_all_outputs
  label: Set HDMI Video Mute to All Outputs
  kind: action
  command: "{X1@}*B"
  params:
    - {name: X1@, type: integer, description: "0 unmute / 1 video / 2 video+sync"}

- id: view_all_output_mutes
  label: View All Output Mutes
  kind: query
  command: "EVM}"
  params: []

# --- Audio Configuration ---
- id: set_input_attenuation
  label: Set Input Attenuation
  kind: action
  command: "{X!}*-{X1%}G"
  params:
    - {name: X!, type: integer, description: Input number}
    - {name: X1%, type: integer, description: Attenuation -20..00 dB (00 default)}

- id: decrease_input_attenuation
  label: Decrease Input Attenuation (+1 dB)
  kind: action
  command: "{X!}+G"
  params:
    - {name: X!, type: integer, description: Input number}

- id: increase_input_attenuation
  label: Increase Input Attenuation (-1 dB)
  kind: action
  command: "{X!}-G"
  params:
    - {name: X!, type: integer, description: Input number}

- id: view_input_attenuation
  label: View Input Attenuation
  kind: query
  command: "{X!}G"
  params:
    - {name: X!, type: integer, description: Input number}

- id: set_output_volume
  label: Set Output Volume
  kind: action
  command: "{X@}*{X1^}V"
  params:
    - {name: X@, type: integer, description: Output number}
    - {name: X1^, type: integer, description: "0..100 % (~1 dB steps; 100 default)"}

- id: increase_output_volume
  label: Increase Output Volume (+1 dB)
  kind: action
  command: "{X@}+V"
  params:
    - {name: X@, type: integer, description: Output number}

- id: decrease_output_volume
  label: Decrease Output Volume (-1 dB)
  kind: action
  command: "{X@}-V"
  params:
    - {name: X@, type: integer, description: Output number}

- id: view_output_volume
  label: View Output Volume Level
  kind: query
  command: "{X@}V"
  params:
    - {name: X@, type: integer, description: Output number}

- id: set_audio_mute
  label: Set Audio Mute (per output)
  kind: action
  command: "{X@}*{X1#}Z"
  params:
    - {name: X@, type: integer, description: Output number}
    - {name: X1#, type: integer, description: "0..7 (outputs 1-2); 0/1 only (outputs 3-8)"}

- id: view_audio_mute_status
  label: View Audio Mute Status
  kind: query
  command: "{X@}Z"
  params:
    - {name: X@, type: integer, description: Output number}

- id: set_audio_mute_all_outputs
  label: Set Audio Mute to All Outputs
  kind: action
  command: "{X#}*Z"
  params:
    - {name: X#, type: integer, description: "0 disable (unmute) / 1 enable (mute)"}

# --- Global Presets ---
- id: save_global_preset
  label: Save Global Preset
  kind: action
  command: "{X1&},"
  params:
    - {name: X1&, type: integer, description: Global preset number (1..16)}

- id: recall_global_preset
  label: Recall Global Preset
  kind: action
  command: "{X1&}."
  params:
    - {name: X1&, type: integer, description: Global preset number (1..16)}

- id: directly_write_global_preset
  label: Directly Write Global Preset
  kind: action
  command: "E+{X1&}P{X!}*{X@}%...{X!}*{X@}%}"
  params:
    - {name: X1&, type: integer, description: Global preset number (1..16)}
    - {name: ties, type: string, description: Repeating {X!}*{X@}% tie fragments}

- id: view_global_hdmi_preset
  label: View Global HDMI Preset
  kind: query
  command: "E{X1&}*01*1VC}"
  params:
    - {name: X1&, type: integer, description: Global preset number (1..16)}

- id: view_global_audio_preset
  label: View Global Audio Preset
  kind: query
  command: "E{X1&}*01*2VC}"
  params:
    - {name: X1&, type: integer, description: Global preset number (1..16)}

- id: set_global_preset_name
  label: Set Global Preset Name
  kind: action
  command: "E{X1&},{X$}NG}"
  params:
    - {name: X1&, type: integer, description: Global preset number (1..16)}
    - {name: X$, type: string, description: Name (<=16 alnum)}

- id: view_global_preset_name
  label: View Global Preset Name
  kind: query
  command: "E{X1&}NG}"
  params:
    - {name: X1&, type: integer, description: Global preset number (1..16)}

- id: reset_all_global_presets
  label: Reset All Global Presets
  kind: action
  command: "EZG}"
  params: []

- id: reset_individual_global_preset
  label: Reset Individual Global Preset
  kind: action
  command: "E{X1&}ZG}"
  params:
    - {name: X1&, type: integer, description: Global preset number (1..16)}

# --- Rooms ---
- id: set_room_outputs
  label: Set Room Outputs
  kind: action
  command: "E{X1*},{X@[1]},{X@[2]}...{X@[n]}MR}"
  params:
    - {name: X1*, type: integer, description: Room number (1..10)}
    - {name: outputs, type: string, description: Comma-separated output numbers}

- id: view_room_outputs
  label: View Room Outputs
  kind: query
  command: "E{X1*}MR}"
  params:
    - {name: X1*, type: integer, description: Room number (1..10)}

- id: set_room_name
  label: Set Room Name
  kind: action
  command: "E{X1*},{X$}NR}"
  params:
    - {name: X1*, type: integer, description: Room number (1..10)}
    - {name: X$, type: string, description: Name (<=12 alnum)}

- id: view_room_name
  label: View Room Name
  kind: query
  command: "E{X1*}NR}"
  params:
    - {name: X1*, type: integer, description: Room number (1..10)}

- id: reset_room_map
  label: Reset Room Map (all rooms)
  kind: action
  command: "EZR}"
  params: []

- id: reset_individual_room
  label: Reset Individual Room
  kind: action
  command: "E{X1*}ZR}"
  params:
    - {name: X1*, type: integer, description: Room number (1..10)}

# --- Room Presets ---
- id: save_room_preset
  label: Save Room Preset
  kind: action
  command: "{X1*}*{X1(},"
  params:
    - {name: X1*, type: integer, description: Room number (1..10)}
    - {name: X1(, type: integer, description: Room preset number (1..10)}

- id: recall_room_preset
  label: Recall Room Preset
  kind: action
  command: "{X1*}*{X1(}."
  params:
    - {name: X1*, type: integer, description: Room number (1..10)}
    - {name: X1(, type: integer, description: Room preset number (1..10)}

- id: directly_write_room_preset
  label: Directly Write Room Preset
  kind: action
  command: "E+{X1*}*{X1(}P{X!}*{X@}%...{X!}*{X@}%}"
  params:
    - {name: X1*, type: integer, description: Room number (1..10)}
    - {name: X1(, type: integer, description: Room preset number (1..10)}
    - {name: ties, type: string, description: Repeating {X!}*{X@}% tie fragments}

- id: view_room_hdmi_preset
  label: View Room HDMI Preset
  kind: query
  command: "E{X1*}*{X1(}*01*1VC}"
  params:
    - {name: X1*, type: integer, description: Room number (1..10)}
    - {name: X1(, type: integer, description: Room preset number (1..10)}

- id: view_room_audio_preset
  label: View Room Audio Preset
  kind: query
  command: "E{X1*}*{X1(}*01*2VC}"
  params:
    - {name: X1*, type: integer, description: Room number (1..10)}
    - {name: X1(, type: integer, description: Room preset number (1..10)}

- id: set_room_preset_name
  label: Set Room Preset Name
  kind: action
  command: "E{X1*}*{X1(},{X$}NP}"
  params:
    - {name: X1*, type: integer, description: Room number (1..10)}
    - {name: X1(, type: integer, description: Room preset number (1..10)}
    - {name: X$, type: string, description: Name (<=16 alnum)}

- id: view_room_preset_name
  label: View Room Preset Name
  kind: query
  command: "E{X1*}*{X1(}NP}"
  params:
    - {name: X1*, type: integer, description: Room number (1..10)}
    - {name: X1(, type: integer, description: Room preset number (1..10)}

- id: reset_all_room_presets
  label: Reset All Room Presets
  kind: action
  command: "EZP}"
  params: []

- id: reset_individual_room_preset
  label: Reset Individual Room Preset
  kind: action
  command: "E{X1*}*{X1(}ZP}"
  params:
    - {name: X1*, type: integer, description: Room number (1..10)}
    - {name: X1(, type: integer, description: Room preset number (1..10)}

# --- Advanced Configuration ---
- id: set_front_panel_lockout_mode
  label: Set Front Panel Lockout Mode (Executive Mode)
  kind: action
  command: "{X2)}X"
  params:
    - {name: X2), type: integer, description: "0 unlock / 1 full lockout / 2 basic-only (default)"}

- id: view_front_panel_lockout_mode
  label: View Front Panel Lockout Mode
  kind: query
  command: "X{X2)}]"
  params: []

- id: view_video_signal_presence
  label: View Video Signal Presence (all inputs)
  kind: query
  command: "0LS"
  params: []

# --- Device Commands: Verbose Mode ---
- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  command: "E{X2#}CV}"
  params:
    - {name: X2#, type: integer, description: "0 none (Telnet default) / 1 verbose (RS-232/USB default) / 2 tagged / 3 verbose+tagged"}

- id: view_verbose_mode
  label: View Verbose Mode
  kind: query
  command: "ECV}"
  params: []

# --- Device Commands: Reset ---
- id: reset_flash_memory
  label: Reset Flash Memory (clear flash)
  kind: action
  command: "EZFFF}"
  params: []

- id: reset_all_device_settings_factory
  label: Reset All Device Settings to Factory Default (except unit name)
  kind: action
  command: "EZXXX}"
  params: []

- id: absolute_system_reset
  label: Absolute System Reset (incl. DHCP off, IP settings)
  kind: action
  command: "EZQQQ}"
  params: []

- id: reset_all_device_settings_delete_files
  label: Reset All Device Settings and Delete Files (excl. IP)
  kind: action
  command: "EZY}"
  params: []

- id: reset_mutes
  label: Reset Mutes (unmute all outputs)
  kind: action
  command: "EZZ}"
  params: []

# --- Power Save Mode ---
- id: set_power_save_mode
  label: Set Power Save Mode
  kind: action
  command: "E{X2$}PSAV}"
  params:
    - {name: X2$, type: integer, description: "0 normal (default) / 1 limited / 2 limited + front-panel lock"}

- id: set_power_save_mode_2
  label: Set Power Save Mode 2 (front panel locked)
  kind: action
  command: "E2PSAV}"
  params: []

- id: set_power_save_mode_0
  label: Set Power Save Mode 0 (normal operation)
  kind: action
  command: "E0PSAV}"
  params: []

- id: view_power_save_mode
  label: View Power Save Mode
  kind: query
  command: "EPSAV}"
  params: []

# --- Information Requests ---
- id: view_general_info
  label: View General Info (input/output counts)
  kind: query
  command: "I"
  params: []

- id: view_firmware_version
  label: View Firmware Version
  kind: query
  command: "Q"
  params: []

- id: view_full_firmware_version
  label: View Full Firmware Version
  kind: query
  command: "*Q"
  params: []

- id: view_detailed_firmware_version
  label: View Detailed Firmware Version (bootloader/factory/user)
  kind: query
  command: "0Q"
  params: []

- id: view_part_number
  label: View Part Number
  kind: query
  command: "N"
  params: []

- id: view_matrix_status
  label: View Matrix Status (voltage / temp / fan)
  kind: query
  command: "S"
  params: []

- id: view_power_supply_status
  label: View Power Supply Status (voltage)
  kind: query
  command: "1S"
  params: []

- id: view_temperature
  label: View Internal Temperature
  kind: query
  command: "2S"
  params: []

- id: view_fan_speed
  label: View Internal Fan Speed
  kind: query
  command: "3S"
  params: []

# --- IP Control Port ---
- id: set_dhcp_mode
  label: Set DHCP Mode
  kind: action
  command: "E{X#}DH}"
  params:
    - {name: X#, type: integer, description: "0 disable / 1 enable"}

- id: view_dhcp_mode
  label: View DHCP Mode
  kind: query
  command: "EDH}"
  params: []

- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "E{X2*}CI}"
  params:
    - {name: X2*, type: string, description: IP address nnn.nnn.nnn.nnn}

- id: view_ip_address
  label: View IP Address
  kind: query
  command: "ECI}"
  params: []

- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  command: "E{X3!}CS}"
  params:
    - {name: X3!, type: string, description: Subnet mask nnn.nnn.nnn.nnn}

- id: view_subnet_mask
  label: View Subnet Mask
  kind: query
  command: "ECS}"
  params: []

- id: set_gateway_ip_address
  label: Set Gateway IP Address
  kind: action
  command: "E{X3@}CG}"
  params:
    - {name: X3@, type: string, description: Gateway nnn.nnn.nnn.nnn}

- id: view_gateway_ip_address
  label: View Gateway IP Address
  kind: query
  command: "ECG}"
  params: []

- id: view_mac_address
  label: View MAC Address
  kind: query
  command: "ECH}"
  params: []

- id: view_number_of_open_connections
  label: View Number of Open Connections
  kind: query
  command: "ECC}"
  params: []

- id: reboot_network
  label: Reboot Network (after IP/DHCP change)
  kind: action
  command: "E2BOOT}"
  params: []

- id: set_current_port_timeout
  label: Set Current Port Timeout
  kind: action
  command: "E0*{X3%}TC}"
  params:
    - {name: X3%, type: integer, description: "1..65000 in 10-sec intervals (30 default)"}

- id: view_current_port_timeout
  label: View Current Port Timeout
  kind: query
  command: "E0TC}"
  params: []

- id: set_global_ip_port_timeout
  label: Set Global IP Port Timeout
  kind: action
  command: "E1*{X3%}TC}"
  params:
    - {name: X3%, type: integer, description: "1..65000 in 10-sec intervals (30 default)"}

- id: view_global_ip_port_timeout
  label: View Global IP Port Timeout
  kind: query
  command: "E1TC}"
  params: []

- id: set_device_name
  label: Set Device Name
  kind: action
  command: "E{X3^}CN}"
  params:
    - {name: X3^, type: string, description: "<=63 alnum/hyphen, first=alpha, last!=hyphen"}

- id: view_device_name
  label: View Device Name
  kind: query
  command: "ECN}"
  params: []

- id: set_date_and_time
  label: Set Date and Time
  kind: action
  command: "E{X3&}CT}"
  params:
    - {name: X3&, type: string, description: "MM/DD/YY HH:mm:SS"}

- id: view_date_and_time
  label: View Date and Time
  kind: query
  command: "ECT}"
  params: []

- id: view_gmt_offset
  label: View GMT Offset
  kind: query
  command: "ECZ}"
  params: []

- id: view_available_time_zones
  label: View Available Time Zones
  kind: query
  command: "E*TZON}"
  params: []

- id: set_time_zone
  label: Set Time Zone
  kind: action
  command: "E{X4)}*TZON}"
  params:
    - {name: X4), type: string, description: Time zone code (see view_available_time_zones)}

- id: view_time_zone
  label: View Time Zone
  kind: query
  command: "ETZON}"
  params: []

# --- Passwords ---
- id: set_administrator_password
  label: Set Administrator Password
  kind: action
  command: "E{X4@}CA}"
  params:
    - {name: X4@, type: string, description: "Password 0..128 chars (case-sensitive, no '|')"}

- id: clear_administrator_password
  label: Clear Administrator Password
  kind: action
  command: "E•CA}"
  params: []

- id: view_administrator_password
  label: View Administrator Password
  kind: query
  command: "ECA}"
  params: []

- id: set_user_password
  label: Set User Password
  kind: action
  command: "E{X4@}CU}"
  params:
    - {name: X4@, type: string, description: "Password 0..128 chars (case-sensitive, no '|')"}

- id: clear_user_password
  label: Clear User Password
  kind: action
  command: "E•CU}"
  params: []

- id: view_user_password
  label: View User Password
  kind: query
  command: "ECU}"
  params: []

# --- Serial Port Configuration ---
- id: set_serial_port_parameters
  label: Set Serial Port Parameters (per port)
  kind: action
  command: "E{X4%}*{X4^},{X4&},{X4*},{X4(}CP}"
  params:
    - {name: X4%, type: integer, description: "Serial port number (01..99)"}
    - {name: X4^, type: integer, description: "Baud: 9600/19200/38400/115200"}
    - {name: X4&, type: string, description: "Parity first letter: O/E/N/M/S"}
    - {name: X4*, type: integer, description: "Data bits: 7/8"}
    - {name: X4(, type: integer, description: "Stop bits: 1/2"}

- id: view_serial_port_parameters
  label: View Serial Port Parameters
  kind: query
  command: "E{X4%}CP}"
  params:
    - {name: X4%, type: integer, description: "Serial port number (01..99)"}

# --- MKP Mode for Volume Control ---
- id: set_mkp_mode
  label: Set MKP Mode (volume steps)
  kind: action
  command: "E{X5$}SVOL}"
  params:
    - {name: X5$, type: integer, description: "1 normal 1-64 steps (default) / 2 MKP 1-100 steps"}

- id: view_mkp_mode
  label: View MKP Mode
  kind: query
  command: "ESVOL}"
  params: []
```

## Feedbacks
```yaml
# Verbose-mode (1 or 3) device-initiated messages - sent unsolicited on local events.
- id: password_prompt
  type: string
  values: ["Password:"]

- id: quick_switch_notice
  type: string
  values: ["Qik"]   # front-panel switching occurred

- id: preset_recalled_notice
  type: string
  format: "Rpr{nn}"   # nn = preset number recalled from front panel

- id: preset_saved_notice
  type: string
  format: "Spr{nn}"   # nn = preset number saved from front panel

- id: video_mute_toggle_notice
  type: string
  format: "{nn}Vmt{x}"   # nn=output, x=0 off / 1 on

- id: audio_mute_toggle_notice
  type: string
  format: "{nn}Amt{x}"   # nn=output, x=0 off / 1 on

- id: executive_mode_toggle_notice
  type: string
  format: "Exe{n}"   # n = 0 off / 1 view-only / 2 basic-only

- id: hot_plug_output_notice
  type: string
  format: "HplgO{nn}"   # nn = output number where hot-plug detected

# Query-response feedbacks (one per matching query action above):
- id: tie_state
  type: string
  format: "Out{X@}•In{X!}•All | Vid | Aud"

- id: input_hdcp_status_value
  type: enum
  values: [0, 1, 2]   # 0 no source / 1 HDCP compliant / 2 not compliant

- id: output_hdcp_status_value
  type: enum
  values: [0, 1, 2, 3]

- id: video_mute_state
  type: enum
  values: [0, 1, 2]

- id: audio_mute_state
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7]

- id: verbose_mode_state
  type: enum
  values: [0, 1, 2, 3]

- id: power_save_mode_state
  type: enum
  values: [0, 1, 2]

- id: error_response
  type: enum
  values: [E01, E10, E11, E12, E13, E14, E17, E18, E21, E22, E24, E25, E26, E27, E28]
```

## Variables
```yaml
- id: input_attenuation
  type: integer
  unit: dB
  range: [-20, 0]
  default: 0

- id: output_volume
  type: integer
  unit: percent
  range: [0, 100]
  default: 100

- id: port_timeout
  type: integer
  unit: seconds
  range: [10, 650000]   # 1..65000 in 10-sec intervals
  default: 300

- id: front_panel_lockout_mode
  type: enum
  values: [0, 1, 2]
  default: 2

- id: verbose_mode
  type: enum
  values: [0, 1, 2, 3]
  default: 1   # RS-232/USB; 0 for Telnet
```

## Events
```yaml
# Unsolicited device-initiated messages - same content as Feedbacks "notice" entries.
# Sent only when verbose mode 1 or 3 is enabled.
- id: on_front_panel_switch
  message: "Qik"
- id: on_preset_recall
  message: "Rpr{nn}"
- id: on_preset_save
  message: "Spr{nn}"
- id: on_video_mute_toggle
  message: "{nn}Vmt{x}"
- id: on_audio_mute_toggle
  message: "{nn}Amt{x}"
- id: on_executive_mode_toggle
  message: "Exe{n}"
- id: on_output_hot_plug
  message: "HplgO{nn}"
- id: on_password_prompt
  message: "Password:"
```

## Macros
```yaml
# UNRESOLVED: no named multi-step macro sequences documented as such in source.
# Quick Tie and Direct-Write Preset commands (see Actions) are single-command
# multi-tie entries but are represented as individual actions, not macros.
```

## Safety
```yaml
confirmation_required_for:
  - absolute_system_reset          # EZQQQ} - full factory reset incl. IP
  - reset_flash_memory             # EZFFF} - clears flash memory
  - reset_all_device_settings_factory   # EZXXX}
  - reset_all_device_settings_delete_files   # EZY}
interlocks:
  - password_required_for_reset_commands   # E24 privilege violation if not admin-level for [24]-tagged cmds
  - power_save_mode_2_blocks_front_panel   # only E0PSAV} or PCS can exit
  - front_panel_lockout_mode_1_blocks_changes   # only lock-mode change permitted
# Reset Mode 5 (hardware) equivalent to SIS EZQQQ} - clears ties, presets, mutes, files.
# UNRESOLVED: no power-on sequencing interlocks or voltage safety warnings stated in source.
```

## Notes
- **SIS command framing:** No special start/stop characters required for a command; commands can be chained back-to-back with no spaces. All device responses terminate with CR/LF (symbol `]`); commands using the `}` terminator end with CR only (no LF). Many commands are prefixed with the ESC character (symbol `E` = 0x1B).
- **Case sensitivity:** Upper- and lowercase are interchangeable in SIS commands unless otherwise stated. Passwords ARE case-sensitive.
- **Copyright banner:** On TCP/Telnet connect (or after power cycle on RS-232), the device emits `(c) Copyright 20nn, Extron Electronics, DXPnn HD 4K Plus, Vn.nn, 60-1495-nn] Ddd,DD Mmm YYYY HH:MM:SS]` — includes firmware version and part number.
- **Default network:** IP 192.168.254.254, subnet 255.255.0.0, gateway 0.0.0.0, DHCP off.
- **Connections:** Up to 200 simultaneous TCP connections (HTTP + Telnet combined); no indication given when limit reached.
- **Idle timeout:** Ethernet link drops after 5 minutes of inactivity by default (configurable via Port Timeout commands). Extron recommends periodic query commands to keep alive.
- **Verbose mode default:** `0` for Telnet, `1` for RS-232/USB. Verbose 1 or 3 required to receive device-initiated event notices.
- **Numbering note:** The character `0` denotes the digit zero; `O` is capital letter "o" — relevant for response parsing.
- **Telnet carriage-return:** Use default Telnet LF-only on Enter; `set crlf` breaks the SIS link.
- **Front-panel lockout default:** Mode 2 (basic-only). Opening PCS forces mode 0.

<!-- UNRESOLVED: TCP/Telnet port number not stated (Tier 3 — not assuming 23). -->
<!-- UNRESOLVED: USB transport protocol details (beyond "connector present") not documented. -->
<!-- UNRESOLVED: serial flow_control not stated. -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated. -->
<!-- UNRESOLVED: DXP 42 (4x2) specific matrix dimensions not explicitly tabulated (only DXP 88/84/44 EDID tables shown). -->
<!-- UNRESOLVED: power supply voltage spec, fault behavior, and error-recovery sequences not stated. -->
<!-- UNRESOLVED: voltage/current/power specifications not stated (Tier 3 — never inferred). -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - support.displaymanager.net
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2939-01_A_DXPHD4KPLUS_user_guide.pdf
  - https://media.extron.com/public/download/files/userman/68-2961-01JControlSystNetworkPortsProtocolsLic.pdf
  - https://media.extron.com/public/download/files/userman/68-3596-01F-NetworkPorts-Protocols-and-License.pdf
  - https://media.extron.com/public/download/files/userman/68-3871-01_A_Extron_Control_For_Poly.pdf
  - https://support.displaymanager.net/hc/en-gb/articles/22750870424733-Troubleshooting-Guide-for-Extron-Control-Systems
retrieved_at: 2026-07-25T08:18:43.553Z
last_checked_at: 2026-08-05T08:19:21.575Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:19:21.575Z
matched_actions: 124
action_count: 124
confidence: medium
summary: "All 124 spec action units match SIS command templates verbatim in source; transport params verified; bidirectional coverage complete. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact TCP/Telnet port number not stated in source (Telnet protocol named but no port value given). USB transport connector named but no USB-level protocol details documented. DXP 42 (4x2) matrix geometry not explicitly enumerated in source — only DXP 88/84/44 (8x8/8x4/4x4) EDID tables appear; inferred from product model name."
- "TCP/Telnet port number not stated in source (Tier 3 - do not assume 23)"
- "flow control not stated in source"
- "no named multi-step macro sequences documented as such in source."
- "no power-on sequencing interlocks or voltage safety warnings stated in source."
- "TCP/Telnet port number not stated (Tier 3 — not assuming 23)."
- "USB transport protocol details (beyond \"connector present\") not documented."
- "serial flow_control not stated."
- "firmware version compatibility ranges not stated."
- "DXP 42 (4x2) specific matrix dimensions not explicitly tabulated (only DXP 88/84/44 EDID tables shown)."
- "power supply voltage spec, fault behavior, and error-recovery sequences not stated."
- "voltage/current/power specifications not stated (Tier 3 — never inferred)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
