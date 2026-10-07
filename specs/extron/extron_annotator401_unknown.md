---
spec_id: admin/extron-annotator-401
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron Annotator 401 Control Spec"
manufacturer: Extron
model_family: "Annotator 401"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "Annotator 401"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - extron.com
  - media.extron.com
  - manualslib.com
source_urls:
  - https://www.extron.com/download/files/userman/68-2951-01_B_annotator_401.pdf
  - https://media.extron.com/public/download/files/userman/annotator_401_68-2951-50_C.pdf
  - https://www.extron.com/download/files/userman/Annotator_Rev_B.pdf
  - https://www.manualslib.com/manual/3321747/Extron-Electronics-Annotator-401.html
  - https://www.extron.com/product/annotator401
retrieved_at: 2026-07-25T14:03:36.016Z
last_checked_at: 2026-10-07T13:31:58.489Z
generated_at: 2026-10-07T13:31:58.489Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Save unit configuration E 1*"
  - "the save-image-to-network command row and Backup/Restore \"Save unit configuration\" row are truncated. The set-Telnet-port row lacks a port argument, and the set-user-password row lacks an identifiable opcode. The set-NTP-port row shows MAP while related rows show PMAP. Power on/off command not seen in the supplied source."
  - "host→device payload not recoverable from extracted row (\"View detected format 1* X#]\")"
  - "source documents this action but truncates its host payload at \"E 0* /shares/<network\"; path examples do not supply the complete command row."
  - "source set row reads \"E N{ port# }MAP }\", while reset/disable/view rows use PMAP. The previously inferred PMAP setter is unsupported; the intended setter opcode is unknown."
  - "source documents a set row but shows \"E ZPMAP }\", identical to its view payload and lacking a port argument. Setter argument placement is unknown."
  - "source documents this action but shows \"EX12)}\" without an identifiable opcode. CU cannot be inferred from the Ipu reply or reset/view rows."
  - "\"Save unit configuration E 1*\" row is truncated in the supplied source; no complete payload is available."
  - "continuous-value parameters are exposed via the set/view actions"
  - "no explicit multi-step macros documented in source."
  - "source contains no explicit safety interlock procedures or"
  - "save-image-network and save-unit-configuration rows are truncated. Set-Telnet-port lacks a port argument; set-user-password lacks an identifiable opcode; set-NTP-port shows MAP while related rows show PMAP. These setter/capture command fields are null rather than inferred. The supplied source explicitly documents vertical-size commands, clock vertical-position commands, ASTP and ERSR. Power on/off discrete command is not documented in the supplied source."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:31:58.489Z
  matched_actions: 222
  action_count: 222
  confidence: medium
  summary: "All 222 action units map to source SIS rows; transport matches; only the truncated save-unit-configuration row unrepresented. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Extron Annotator 401 Control Spec

## Summary
Extron Annotator 401 — annotation graphics processor / scaler. SIS (Simple Instruction Set) control over RS-232 (rear 3-pole captive screw) and Ethernet (SSH, port 22023) plus Ethernet-over-USB (front USB-C config port, SSH 203.0.113.22:22023). Heavy command set: scaling, EDID, image adjust, HDCP, annotation draw/color/font, OSD menu, image capture/recall, network/IP, NTP, passwords.

<!-- UNRESOLVED: the save-image-to-network command row and Backup/Restore "Save unit configuration" row are truncated. The set-Telnet-port row lacks a port argument, and the set-user-password row lacks an identifiable opcode. The set-NTP-port row shows MAP while related rows show PMAP. Power on/off command not seen in the supplied source. -->

## Transport
```yaml
protocols:
  - tcp        # SSH - SIS over Ethernet (LAN) and Ethernet-over-USB
  - serial     # RS-232 rear panel 3-pole captive screw
addressing:
  port: 22023  # SSH port for SIS (Ethernet and USB-C config port)
  # base_url: N/A (SSH, not HTTP)
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password
  # Username: admin
  # Password: unit serial number (factory); reverts to "extron" after absolute
  # system reset (ZQQQ) or rear-panel RESET. Passwords case-sensitive, max 128
  # chars, pipe "|" not allowed.
```

## Traits
```yaml
traits:
  - queryable    # inferred: many query/view commands return state (Q, I, E...} view rows)
  - levelable    # inferred: continuous-value set/inc/dec (HCTR, VCTR, HSIZ, VSIZ, TXSZ, LNWT)
```

## Actions
```yaml
# Symbol legend (from source "Symbol Definitions", used verbatim in command payloads):
#   E or W = Escape key (prefix). } = soft CR (end of host command). ] = CR/LF (end of response).
#   X@   = Output select (0=all, 1=HDMI 1, 2=HDMI 2)
#   X1^  = H/V position (5-digit, signed)
#   X1&  = H/V size (5-digit)
#   X1)  = Enable/Disable (0/1)
#   X2!  = EDID/scaler rate code (see EDID table)
#   X2$  = EDID filename (.bin, 128 or 256 bytes)
#   X2)  = Test pattern (0-6)
#   X2*  = Timeout seconds (0-500, 501=never)
#   X2^  = Input preset (1-128)
#   X3!  = Verbose mode (0-3)
#   X3@  = Hostname string
#   X3#  = Password string
#   X3(  = Aspect ratio (1=Fill, 2=Follow)
#   X4)  = Screen saver mode (1-3)
#   X4@  = Video mute (0/1/2)
#   X4%  = Switch effect (0/1/4)
#   X4&  = HDCP notification mode (0/1/2)
#   X5)  = Annotation type (0-11)
#   X5!  = Font name
#   X5@  = Font size (8-127)
#   X5#  = Line color (6-bit RGB)
#   X5$  = Line weight (1-127)
#   X5^  = On-screen clock mode (0-3)
#   X5&  = Annotation coords (8-digit XXXXYYYY)
#   X5(  = USB/TLI device ID (0-32)
#   X6(  = Auto annotation clear (0/1)
#   X6&  = Network folder path
#   X7(  = Print copies (1-50)
#   X7!  = Output group (0-3)
#   X7@  = White/Blackboard (0/1/2)
#   X8)  = TLI device ID string
#   X8!  = NIC interface (1=LAN, 2=USB Extender Plus Tx)
#   X8#  = NTP setting (0/1/2)
#   X11@ = Filename prefix string
#   X11# = Date/time (MM/DD/YY HH:MM:SS)
#   X11$ = IP address (xxx.xxx.xxx.xxx)
#   X11( = Subnet mask
#   X12) = Admin/user password

actions:
  # ---- Input Configuration ----
  - id: view_detected_format
    label: View Detected Input Format
    kind: query
    command: null  # UNRESOLVED: host→device payload not recoverable from extracted row ("View detected format 1* X#]")
    params: []

  # ---- Input EDID ----
  - id: set_input_edid
    label: Set Input EDID
    kind: action
    command: "E A1* X2! EDID }"
    params:
      - {name: rate, symbol: "X2!", type: integer, description: "EDID rate code (EDID table)"}
  - id: view_input_edid
    label: View Input EDID
    kind: query
    command: "E A1EDID }"
    params: []
  - id: save_output_edid
    label: Save HDMI Output EDID
    kind: action
    command: "E S X@ * X2! EDID }"
    params:
      - {name: output, symbol: "X@", type: integer, description: "1=HDMI1, 2=HDMI2"}
      - {name: rate, symbol: "X2!", type: integer, description: "Custom slot 201/202/203"}
  - id: export_edid
    label: Export EDID File
    kind: action
    command: "E E X2! , X2$ EDID }"
    params:
      - {name: rate, symbol: "X2!", type: integer}
      - {name: filename, symbol: "X2$", type: string}
  - id: import_edid
    label: Import EDID File
    kind: action
    command: "E I X2! , X2$ EDID }"
    params:
      - {name: rate, symbol: "X2!", type: integer, description: "201/202/203"}
      - {name: filename, symbol: "X2$", type: string}

  # ---- Image Reset ----
  - id: image_reset
    label: Image Reset (follow aspect)
    kind: action
    command: "1*0A"
    params: []
  - id: image_reset_fill
    label: Image Reset and Fill
    kind: action
    command: "1*1A"
    params: []
  - id: image_reset_follow
    label: Image Reset and Follow Input Aspect
    kind: action
    command: "1*2A"
    params: []

  # ---- Total / Active pixels ----
  - id: view_total_pixels
    label: View Total Pixels
    kind: query
    command: "E TPIX }"
    params: []
  - id: view_active_pixels
    label: View Active Pixels
    kind: query
    command: "E APIX }"
    params: []

  # ---- Video mute ----
  - id: mute_video_black
    label: Mute Video to Black
    kind: action
    command: "X@ *1B"
    params: [{name: output, symbol: "X@", type: integer}]
  - id: mute_video_sync
    label: Mute Video and Sync
    kind: action
    command: "X@ *2B"
    params: [{name: output, symbol: "X@", type: integer}]
  - id: unmute_video
    label: Unmute Video
    kind: action
    command: "X@ *0B"
    params: [{name: output, symbol: "X@", type: integer}]
  - id: view_video_mute
    label: View Video Mute Status
    kind: query
    command: "X@ *B"
    params: [{name: output, symbol: "X@", type: integer}]

  # ---- Horizontal shift ----
  - id: set_hctr
    label: Set Horizontal Position
    kind: action
    command: "E X1^ HCTR }"
    params: [{name: value, symbol: "X1^", type: integer, description: "-32768..+32768"}]
  - id: inc_hctr
    label: Increment Horizontal Position
    kind: action
    command: "E +HCTR }"
    params: []
  - id: dec_hctr
    label: Decrement Horizontal Position
    kind: action
    command: "E -HCTR }"
    params: []
  - id: view_hctr
    label: View Horizontal Position
    kind: query
    command: "E HCTR }"
    params: []

  # ---- Vertical shift ----
  - id: set_vctr
    label: Set Vertical Position
    kind: action
    command: "E X1^ VCTR }"
    params: [{name: value, symbol: "X1^", type: integer}]
  - id: inc_vctr
    label: Increment Vertical Position
    kind: action
    command: "E +VCTR }"
    params: []
  - id: dec_vctr
    label: Decrement Vertical Position
    kind: action
    command: "E -VCTR }"
    params: []
  - id: view_vctr
    label: View Vertical Position
    kind: query
    command: "E VCTR }"
    params: []

  # ---- Horizontal size ----
  - id: set_hsiz
    label: Set Horizontal Size
    kind: action
    command: "E X1& HSIZ }"
    params: [{name: value, symbol: "X1&", type: integer, description: "10..32768"}]
  - id: inc_hsiz
    label: Increment Horizontal Size
    kind: action
    command: "E +HSIZ }"
    params: []
  - id: dec_hsiz
    label: Decrement Horizontal Size
    kind: action
    command: "E -HSIZ }"
    params: []
  - id: view_hsiz
    label: View Horizontal Size
    kind: query
    command: "E HSIZ }"
    params: []

  # ---- Vertical size ----
  - id: set_vsiz
    label: Set Vertical Size
    kind: action
    command: "E X1& VSIZ }"
    params: [{name: value, symbol: "X1&", type: integer}]
  - id: inc_vsiz
    label: Increment Vertical Size
    kind: action
    command: "E +VSIZ }"
    params: []
  - id: dec_vsiz
    label: Decrement Vertical Size
    kind: action
    command: "E -VSIZ }"
    params: []
  - id: view_vsiz
    label: View Vertical Size
    kind: query
    command: "E VSIZ }"
    params: []

  # ---- Compound image position/size ----
  - id: set_ximg
    label: Set Compound Image Position and Size
    kind: action
    command: "E * X1^ * X1^ * X1& * X1& XIMG }"
    params: []
  - id: view_ximg
    label: View Compound Image Position and Size
    kind: query
    command: "E XIMG }"
    params: []

  # ---- Output scaler rate ----
  - id: set_output_rate
    label: Set Output Scaler Rate
    kind: action
    command: "E X2! RATE }"
    params: [{name: rate, symbol: "X2!", type: integer}]
  - id: view_output_rate
    label: View Output Scaler Rate
    kind: query
    command: "E RATE }"
    params: []

  # ---- Screen saver ----
  - id: set_screensaver_mode
    label: Set Screen Saver Mode
    kind: action
    command: "E M X4) SSAV }"
    params: [{name: mode, symbol: "X4)", type: integer, description: "1=black,2=blue,3=user"}]
  - id: view_screensaver_mode
    label: View Screen Saver Mode
    kind: query
    command: "E MSSAV }"
    params: []
  - id: set_screensaver_timeout
    label: Set Screen Saver Timeout
    kind: action
    command: "E T X2* SSAV }"
    params: [{name: seconds, symbol: "X2*", type: integer, description: "1..500, 501=never"}]
  - id: view_screensaver_timeout
    label: View Screen Saver Timeout
    kind: query
    command: "E TSSAV }"
    params: []
  - id: view_screensaver_status
    label: View Screen Saver Status
    kind: query
    command: "E SSSAV }"
    params: []

  # ---- Printer quantity ----
  - id: set_print_quantity
    label: Set Print Quantity
    kind: action
    command: "E Q X7( PRTR }"
    params: [{name: copies, symbol: "X7(", type: integer, description: "1..50"}]
  - id: view_print_quantity
    label: View Print Quantity
    kind: query
    command: "E QPRTR }"
    params: []

  # ---- Audio mute ----
  - id: audio_mute_on
    label: Audio Mute On
    kind: action
    command: "X@ *1Z"
    params: [{name: output, symbol: "X@", type: integer}]
  - id: audio_mute_off
    label: Audio Mute Off
    kind: action
    command: "X@ *0Z"
    params: [{name: output, symbol: "X@", type: integer}]
  - id: view_audio_mute
    label: View Audio Mute
    kind: query
    command: "X@ Z"
    params: [{name: output, symbol: "X@", type: integer}]

  # ---- Audio input format ----
  - id: set_audio_none
    label: Set Audio None (Mute)
    kind: action
    command: "E I1*0AFMT }"
    params: []
  - id: set_audio_lpcm
    label: Set Audio LPCM-2CH
    kind: action
    command: "E I1*2AFMT }"
    params: []
  - id: set_audio_multich
    label: Set Audio Multi-CH
    kind: action
    command: "E I1*3AFMT }"
    params: []
  - id: view_audio_format
    label: View Audio Input Format
    kind: query
    command: "E I1AFMT }"
    params: []

  # ---- Auto memories ----
  - id: amem_enable
    label: Enable Auto Memory
    kind: action
    command: "E 1*1AMEM }"
    params: []
  - id: amem_disable
    label: Disable Auto Memory
    kind: action
    command: "E 1*0AMEM }"
    params: []
  - id: view_amem
    label: View Auto Memory
    kind: query
    command: "E 1AMEM }"
    params: []

  # ---- Input presets ----
  - id: recall_input_preset
    label: Recall Input Preset
    kind: action
    command: "2* X2^ ."
    params: [{name: preset, symbol: "X2^", type: integer, description: "1..128"}]
  - id: save_input_preset
    label: Save Input Preset
    kind: action
    command: "2* X2^ ,"
    params: [{name: preset, symbol: "X2^", type: integer}]
  - id: delete_input_preset
    label: Delete Input Preset
    kind: action
    command: "E X2* X2^ PRST }"
    params: [{name: preset, symbol: "X2^", type: integer}]

  # ---- Test pattern ----
  - id: set_test_pattern
    label: Set Test Pattern
    kind: action
    command: "E X2) TEST }"
    params: [{name: pattern, symbol: "X2)", type: integer, description: "0-6"}]
  - id: view_test_pattern
    label: View Test Pattern
    kind: query
    command: "E TEST }"
    params: []

  # ---- Freeze ----
  - id: freeze_enable
    label: Freeze Enable
    kind: action
    command: "1F"
    params: []
  - id: freeze_disable
    label: Freeze Disable
    kind: action
    command: "0F"
    params: []
  - id: view_freeze
    label: View Freeze Status
    kind: query
    command: "F"
    params: []

  # ---- Upstream switch effect ----
  - id: set_switch_effect
    label: Set Upstream Switch Effect
    kind: action
    command: "E U1* X4% SWEF }"
    params: [{name: effect, symbol: "X4%", type: integer, description: "0=cut,1=fade,4=low-latency"}]
  - id: view_switch_effect
    label: View Switch Effect
    kind: query
    command: "E U1SWEF }"
    params: []

  # ---- Aspect ratio ----
  - id: aspect_fill
    label: Aspect Fill
    kind: action
    command: "E 1*1ASPR }"
    params: []
  - id: aspect_follow
    label: Aspect Follow
    kind: action
    command: "E 1*2ASPR }"
    params: []
  - id: view_aspect
    label: View Aspect Ratio
    kind: query
    command: "E 1ASPR }"
    params: []

  # ---- Executive mode (front panel lockout) ----
  - id: exec_mode_enable
    label: Executive Mode Enable (panel lockout)
    kind: action
    command: "1X"
    params: []
  - id: exec_mode_disable
    label: Executive Mode Disable
    kind: action
    command: "0X"
    params: []

  # ---- Signal presence / HDCP ----
  - id: view_signal_presence
    label: View Video Signal Presence
    kind: query
    command: "E 0LS }"
    params: []
  - id: set_hdcp_notification
    label: Set HDCP Notification Mode
    kind: action
    command: "E N1* X4& HDCP }"
    params: [{name: mode, symbol: "X4&", type: integer}]
  - id: query_hdcp_notification
    label: Query HDCP Notification
    kind: query
    command: "E N1HDCP }"
    params: []
  - id: enable_usb_device
    label: Enable USB Device
    kind: action
    command: "E X5( *1ADEV }"
    params: [{name: device, symbol: "X5(", type: integer, description: "0=all, 1-32"}]
  - id: disable_usb_device
    label: Disable USB Device
    kind: action
    command: "E X5( *0ADEV }"
    params: [{name: device, symbol: "X5(", type: integer}]
  - id: view_usb_device
    label: View USB Device Status
    kind: query
    command: "E X5( ADEV }"
    params: [{name: device, symbol: "X5(", type: integer}]
  - id: hdcp_auth_on
    label: Input HDCP Authorized On
    kind: action
    command: "E E1*1HDCP }"
    params: []
  - id: hdcp_auth_off
    label: Input HDCP Authorized Off
    kind: action
    command: "E E1*0HDCP }"
    params: []
  - id: view_hdcp_auth
    label: View Input HDCP Authorized
    kind: query
    command: "E E1HDCP }"
    params: []

  # ---- Annotation ----
  - id: set_annotation_type
    label: Set Annotation Type
    kind: action
    command: "E X5) DRAW }"
    params: [{name: type, symbol: "X5)", type: integer, description: "0-11"}]
  - id: view_annotation_type
    label: View Annotation Type
    kind: query
    command: "E DRAW }"
    params: []
  - id: set_annotation_device
    label: Set Annotation TLI Device
    kind: action
    command: "E X8) APID }"
    params: [{name: device, symbol: "X8)", type: string}]
  - id: set_annotation_location
    label: Set Annotation Location
    kind: action
    command: "E X5& APNT }"
    params: [{name: coords, symbol: "X5&", type: string, description: "8-digit XXXXYYYY"}]
  - id: complete_annotation
    label: Complete Annotation
    kind: action
    command: "E ASTP }"
    params: []
  - id: set_annotation_color
    label: Set Annotation Color
    kind: action
    command: "E X5( * X5# ACOL }"
    params:
      - {name: device, symbol: "X5(", type: integer}
      - {name: color, symbol: "X5#", type: string, description: "6-bit RGB"}
  - id: view_annotation_color
    label: View Annotation Color
    kind: query
    command: "E X5( ACOL }"
    params: [{name: device, symbol: "X5(", type: integer}]
  - id: fill_enable
    label: Enable Object Fill
    kind: action
    command: "E 1FILL }"
    params: []
  - id: fill_disable
    label: Disable Object Fill
    kind: action
    command: "E 0FILL }"
    params: []
  - id: view_fill
    label: View Fill Setting
    kind: query
    command: "E FILL }"
    params: []
  - id: set_font
    label: Set Annotation Font
    kind: action
    command: "E X5! FONT }"
    params: [{name: font, symbol: "X5!", type: string}]
  - id: view_font
    label: View Font
    kind: query
    command: "E FONT }"
    params: []
  - id: set_text_size
    label: Set Annotation Text Size
    kind: action
    command: "E X5@ TXSZ }"
    params: [{name: size, symbol: "X5@", type: integer, description: "8..127"}]
  - id: view_text_size
    label: View Text Size
    kind: query
    command: "E TXSZ }"
    params: []
  - id: set_line_weight
    label: Set Line Weight
    kind: action
    command: "E X5$ LNWT }"
    params: [{name: weight, symbol: "X5$", type: integer, description: "1..127"}]
  - id: view_line_weight
    label: View Line Weight
    kind: query
    command: "E LNWT }"
    params: []
  - id: set_eraser_size
    label: Set Eraser/Highlighter Size
    kind: action
    command: "E X5$ ERSR }"
    params: [{name: size, symbol: "X5$", type: integer}]
  - id: set_annotation_output
    label: Set Annotation Output Group
    kind: action
    command: "E X7! ASHW }"
    params: [{name: group, symbol: "X7!", type: integer, description: "0-3"}]
  - id: view_annotation_output
    label: View Annotation Output Group
    kind: query
    command: "E ASHW }"
    params: []
  - id: set_cursor_output
    label: Set Cursor Output Group
    kind: action
    command: "E X7! CSHW }"
    params: [{name: group, symbol: "X7!", type: integer}]
  - id: view_cursor_output
    label: View Cursor Output Group
    kind: query
    command: "E CSHW }"
    params: []
  - id: set_cursor_timeout
    label: Set Cursor Timeout
    kind: action
    command: "E X2* CDUR }"
    params: [{name: seconds, symbol: "X2*", type: integer}]
  - id: view_cursor_timeout
    label: View Cursor Timeout
    kind: query
    command: "E CDUR }"
    params: []
  - id: enable_onscreen_clock
    label: Set On-Screen Clock
    kind: action
    command: "E X5^ TIME }"
    params: [{name: mode, symbol: "X5^", type: integer, description: "0-3"}]
  - id: view_onscreen_clock
    label: View On-Screen Clock
    kind: query
    command: "E TIME }"
    params: []
  - id: set_clock_hctr
    label: Set Clock Horizontal Position
    kind: action
    command: "E K X1^ HCTR }"
    params: [{name: value, symbol: "X1^", type: integer, description: "0..4096"}]
  - id: inc_clock_hctr
    label: Increment Clock Horizontal Position
    kind: action
    command: "E K+HCTR }"
    params: []
  - id: dec_clock_hctr
    label: Decrement Clock Horizontal Position
    kind: action
    command: "E K-HCTR }"
    params: []
  - id: view_clock_hctr
    label: View Clock Horizontal Position
    kind: query
    command: "E KHCTR }"
    params: []
  - id: set_clock_vctr
    label: Set Clock Vertical Position
    kind: action
    command: "E K X1^ VCTR }"
    params: [{name: value, symbol: "X1^", type: integer}]
  - id: inc_clock_vctr
    label: Increment Clock Vertical Position
    kind: action
    command: "E K+VCTR }"
    params: []
  - id: dec_clock_vctr
    label: Decrement Clock Vertical Position
    kind: action
    command: "E K-VCTR }"
    params: []
  - id: view_clock_vctr
    label: View Clock Vertical Position
    kind: query
    command: "E KVCTR }"
    params: []

  # ---- Panel calibration / annotation clear / whiteboard ----
  - id: enter_calibration
    label: Enter Touchpanel Calibration
    kind: action
    command: "E 1PCAL }"
    params: []
  - id: exit_calibration
    label: Exit Touchpanel Calibration
    kind: action
    command: "E 0PCAL }"
    params: []
  - id: view_calibration
    label: View Calibration Setting
    kind: query
    command: "E PCAL }"
    params: []
  - id: set_auto_annotation_clear
    label: Set Auto Annotation Clear
    kind: action
    command: "E X6( ACLR }"
    params: [{name: mode, symbol: "X6(", type: integer, description: "0/1"}]
  - id: view_auto_annotation_clear
    label: View Auto Annotation Clear
    kind: query
    command: "E ACLR }"
    params: []
  - id: whiteboard_disable
    label: Disable Whiteboard
    kind: action
    command: "E 0WHBD }"
    params: []
  - id: whiteboard_enable
    label: Enable Whiteboard
    kind: action
    command: "E 1WHBD }"
    params: []
  - id: blackboard_enable
    label: Enable Blackboard
    kind: action
    command: "E 2WHBD }"
    params: []
  - id: view_whiteboard
    label: View White/Blackboard Status
    kind: query
    command: "E WHBD }"
    params: []

  # ---- On-screen menu ----
  - id: set_menu_timeout
    label: Set Menu Timeout
    kind: action
    command: "E X2* MDUR }"
    params: [{name: seconds, symbol: "X2*", type: integer}]
  - id: view_menu_timeout
    label: View Menu Timeout
    kind: query
    command: "E MDUR }"
    params: []
  - id: set_menu_output
    label: Set Menu Output Group
    kind: action
    command: "E X7! MSHW }"
    params: [{name: group, symbol: "X7!", type: integer}]
  - id: view_menu_output
    label: View Menu Output Group
    kind: query
    command: "E MSHW }"
    params: []

  # ---- OSD capture/recall button modes ----
  - id: mcap_internal
    label: OSD Capture to Internal Flash
    kind: action
    command: "E 0MCAP }"
    params: []
  - id: mcap_iqc
    label: OSD Capture to IQC (RAM)
    kind: action
    command: "E 1MCAP }"
    params: []
  - id: mcap_usb
    label: OSD Capture to USB Flash
    kind: action
    command: "E 2MCAP }"
    params: []
  - id: mcap_network
    label: OSD Capture to Network Drive
    kind: action
    command: "E 3MCAP }"
    params: []
  - id: view_mcap
    label: View OSD Capture Mode
    kind: query
    command: "E MCAP }"
    params: []

  # ---- Image capture/recall ----
  - id: save_image_flash
    label: Save Image to Flash
    kind: action
    command: "E 0* /graphics/<filename> MF }"
    params: [{name: filename, type: string}]
  - id: save_image_usb
    label: Save Image to USB
    kind: action
    command: "E 1* /graphics/<filename> MF }"
    params: [{name: filename, type: string}]
  - id: save_image_network
    label: Save Image to Network
    kind: action
    command: null  # UNRESOLVED: source documents this action but truncates its host payload at "E 0* /shares/<network"; path examples do not supply the complete command row.
    params: [{name: path, type: string}]
  - id: disable_image
    label: Disable Static Image (show live video)
    kind: action
    command: "E 0*0RF }"
    params: []
  - id: view_current_image
    label: View Current Image
    kind: query
    command: "E RF }"
    params: []
  - id: quick_capture_ram
    label: Quick Image Capture to RAM
    kind: action
    command: "E 0* /graphics/temp.bmp MF }"
    params: []
  - id: set_image_prefix
    label: Set Capture Filename Prefix
    kind: action
    command: "E P X11@ CFMT }"
    params: [{name: prefix, symbol: "X11@", type: string}]
  - id: clear_image_prefix
    label: Clear Capture Filename Prefix
    kind: action
    command: "E P• CFMT }"  # • = space (Extron space symbol)
    params: []
  - id: read_image_prefix
    label: Read Capture Filename Prefix
    kind: query
    command: "E PCFMT }"
    params: []

  # ---- Network folder capture settings ----
  - id: set_network_folder
    label: Set Network Folder Path
    kind: action
    command: "E F X6& NTWK }"
    params: [{name: path, symbol: "X6&", type: string}]
  - id: clear_network_folder
    label: Clear Network Folder Path
    kind: action
    command: "E F • NTWK }"
    params: []
  - id: read_network_folder
    label: Read Network Folder Path
    kind: query
    command: "E FNTWK }"
    params: []
  - id: set_network_username
    label: Set Network Username
    kind: action
    command: "E U X1* NTWK }"
    params: [{name: username, symbol: "X1*", type: string}]
  - id: clear_network_username
    label: Clear Network Username
    kind: action
    command: "E U • NTWK }"
    params: []
  - id: read_network_username
    label: Read Network Username
    kind: query
    command: "E UNTWK }"
    params: []
  - id: set_network_password
    label: Set Network Password
    kind: action
    command: "E P X3# NTWK }"
    params: [{name: password, symbol: "X3#", type: string}]
  - id: clear_network_password
    label: Clear Network Password
    kind: action
    command: "E P • NTWK }"
    params: []
  - id: read_network_password
    label: Read Network Password (set/unset only)
    kind: query
    command: "E PNTWK }"
    params: []

  # ---- USB driver / extender ----
  - id: list_usb_drivers
    label: List User USB Driver Files
    kind: query
    command: "E LUSBF }"
    params: []
  - id: delete_usb_driver
    label: Delete User USB Driver File
    kind: action
    command: "E D <filename> USBF }"
    params: [{name: filename, type: string}]
  - id: set_usb_network
    label: Set USB Network Support
    kind: action
    command: "E N X1) USBC }"
    params: [{name: state, symbol: "X1)", type: integer, description: "0/1"}]
  - id: view_usb_network
    label: View USB Network Support
    kind: query
    command: "E NUSBC }"
    params: []

  # ---- Time zone / date-time ----
  - id: set_timezone
    label: Set Time Zone
    kind: action
    command: "E <zone name> *TZON }"  # [24] admin-only
    params: [{name: zone, type: string}]
  - id: view_timezone
    label: View Current Time Zone
    kind: query
    command: "E TZON }"
    params: []
  - id: list_timezones
    label: List All Time Zones
    kind: query
    command: "E *TZON }"
    params: []
  - id: set_datetime
    label: Set Date and Time
    kind: action
    command: "E X11# CT }"  # [24] admin-only
    params: [{name: datetime, symbol: "X11#", type: string, description: "MM/DD/YY HH:MM:SS"}]
  - id: read_datetime
    label: Read Date and Time
    kind: query
    command: "E CT }"
    params: []

  # ---- NTP ----
  - id: ntp_enable
    label: Enable NTP
    kind: action
    command: "E 1NTEN }"  # [24] admin-only
    params: []
  - id: ntp_disable
    label: Disable NTP
    kind: action
    command: "E 0NTEN }"  # [24] admin-only
    params: []
  - id: ntp_sync_now
    label: Sync NTP Now
    kind: action
    command: "E 2NTEN }"  # [24] admin-only
    params: []
  - id: view_ntp
    label: View NTP Status
    kind: query
    command: "E NTEN }"  # [24] admin-only
    params: []
  - id: set_ntp_ip
    label: Set NTP Server IP
    kind: action
    command: "E X11$ NTIP }"  # [24] admin-only
    params: [{name: ip, symbol: "X11$", type: string}]
  - id: set_ntp_ip_default
    label: Set NTP IP to Default
    kind: action
    command: "E • NTIP }"  # [24] admin-only
    params: []
  - id: view_ntp_ip
    label: View NTP Server IP
    kind: query
    command: "E NTIP }"  # [24] admin-only
    params: []
  - id: set_ntp_port
    label: Set NTP Port
    kind: action
    command: null  # [24] admin-only; UNRESOLVED: source set row reads "E N{ port# }MAP }", while reset/disable/view rows use PMAP. The previously inferred PMAP setter is unsupported; the intended setter opcode is unknown.
    params: [{name: port, type: integer}]
  - id: reset_ntp_port
    label: Reset NTP Port to 123
    kind: action
    command: "E N123PMAP }"
    params: []
  - id: disable_ntp_port
    label: Disable NTP Port
    kind: action
    command: "E N0PMAP }"
    params: []
  - id: view_ntp_port
    label: View NTP Port
    kind: query
    command: "E NPMAP }"
    params: []

  # ---- Ethernet port config ----
  - id: set_web_port
    label: Set Web Port
    kind: action
    command: "E W{port}PMAP }"  # [24] admin-only
    params: [{name: port, type: integer}]
  - id: reset_web_port
    label: Reset Web Port to 80
    kind: action
    command: "E W80PMAP }"
    params: []
  - id: disable_web_port
    label: Disable Web Port
    kind: action
    command: "E W0PMAP }"
    params: []
  - id: view_web_port
    label: View Web Port
    kind: query
    command: "E WPMAP }"  # [24] admin-only
    params: []
  - id: set_telnet_port
    label: Set Telnet Port
    kind: action
    command: null  # UNRESOLVED: source documents a set row but shows "E ZPMAP }", identical to its view payload and lacking a port argument. Setter argument placement is unknown.
    params: [{name: port, type: integer}]
  - id: reset_telnet_port
    label: Reset Telnet Port to 23
    kind: action
    command: "E Z23PMAP }"
    params: []
  - id: disable_telnet_port
    label: Disable Telnet Port
    kind: action
    command: "E Z0PMAP }"
    params: []
  - id: view_telnet_port
    label: View Telnet Port
    kind: query
    command: "E ZPMAP }"  # [24] admin-only
    params: []

  # ---- Information requests ----
  - id: general_info
    label: General Information
    kind: query
    command: "I"  # also lowercase "i"
    params: []
  - id: query_model_name
    label: Query Model Name
    kind: query
    command: "1I"
    params: []
  - id: query_model_description
    label: Query Model Description
    kind: query
    command: "2I"
    params: []
  - id: query_firmware_version
    label: Query Firmware Version
    kind: query
    command: "Q"
    params: []
  - id: query_firmware_build
    label: Query Firmware and Build Version
    kind: query
    command: "*Q"
    params: []
  - id: query_part_number
    label: Query Part Number
    kind: query
    command: "N"  # also lowercase "n"
    params: []
  - id: view_temperature
    label: View Internal Temperature
    kind: query
    command: "E 20STAT }"
    params: []
  - id: set_verbose_mode
    label: Set Verbose Mode
    kind: action
    command: "E X3! CV }"
    params: [{name: mode, symbol: "X3!", type: integer, description: "0-3"}]
  - id: view_verbose_mode
    label: View Verbose Mode
    kind: query
    command: "E CV }"
    params: []
  - id: set_hostname
    label: Set Hostname
    kind: action
    command: "E X3@ CN }"
    params: [{name: hostname, symbol: "X3@", type: string}]
  - id: set_hostname_default
    label: Set Hostname to Factory Default
    kind: action
    command: "E • CN }"
    params: []
  - id: view_hostname
    label: View Hostname
    kind: query
    command: "E CN }"
    params: []
  - id: usb_device_info
    label: USB Device Information (last selected)
    kind: query
    command: "45I"
    params: []
  - id: list_all_usb_devices
    label: List All USB Devices
    kind: query
    command: "46I"
    params: []

  # ---- IP setup ----
  - id: dhcp_on
    label: DHCP On (LAN)
    kind: action
    command: "E 1DH }"
    params: []
  - id: dhcp_off
    label: DHCP Off (LAN)
    kind: action
    command: "E 0DH }"
    params: []
  - id: view_dhcp
    label: View DHCP Mode (LAN)
    kind: query
    command: "E DH }"
    params: []
  - id: dhcp_on_nic
    label: DHCP On (per NIC)
    kind: action
    command: "E X8! *1DHCP }"
    params: [{name: nic, symbol: "X8!", type: integer, description: "1=LAN,2=USB Extender Plus Tx"}]
  - id: dhcp_off_nic
    label: DHCP Off (per NIC)
    kind: action
    command: "E X8! *0DHCP }"
    params: [{name: nic, symbol: "X8!", type: integer}]
  - id: view_dhcp_nic
    label: View DHCP Mode (per NIC)
    kind: query
    command: "E X8! DHCP }"
    params: [{name: nic, symbol: "X8!", type: integer}]
  - id: set_ip_address
    label: Set LAN IP Address
    kind: action
    command: "E X11$ CI }"
    params: [{name: ip, symbol: "X11$", type: string}]
  - id: view_gateway
    label: View Gateway IP Address
    kind: query
    command: "E CG }"
    params: []
  - id: set_ip_subnet_gateway
    label: Set IP/Subnet/Gateway (all-at-once)
    kind: action
    command: "E X8! * X11$ * X11( * X11$ CISG }"
    params:
      - {name: nic, symbol: "X8!", type: integer}
      - {name: ip, symbol: "X11$", type: string}
      - {name: subnet, symbol: "X11(", type: string}
      - {name: gateway, symbol: "X11$", type: string}
  - id: view_ip_settings
    label: View All IP Settings
    kind: query
    command: "E X8! CISG }"
    params: [{name: nic, symbol: "X8!", type: integer}]

  # ---- Reset / reboot ----
  - id: absolute_system_reset
    label: Absolute System Reset
    kind: action
    command: "E ZQQQ }"
    params: []
  - id: absolute_system_reset_keep_ip
    label: Absolute System Reset (retain IP)
    kind: action
    command: "E ZY }"
    params: []
  - id: reboot_network
    label: Reboot Networking
    kind: action
    command: "E 2BOOT }"
    params: []

  # ---- Passwords ([24] = admin-only) ----
  - id: set_admin_password
    label: Set Administrator Password
    kind: action
    command: "E X12) CA }"  # [24] admin-only
    params: [{name: password, symbol: "X12)", type: string}]
  - id: reset_admin_password
    label: Reset Administrator Password to Default
    kind: action
    command: "E • CA }"  # [24] admin-only
    params: []
  - id: view_admin_password
    label: View Administrator Password (set/unset only)
    kind: query
    command: "E CA }"  # [24] admin-only
    params: []
  - id: set_user_password
    label: Set User Password
    kind: action
    command: null  # [24] admin-only; UNRESOLVED: source documents this action but shows "EX12)}" without an identifiable opcode. CU cannot be inferred from the Ipu reply or reset/view rows.
    params: [{name: password, symbol: "X12)", type: string}]
  - id: reset_user_password
    label: Reset User Password
    kind: action
    command: "E • CU }"  # [24] admin-only
    params: []
  - id: view_user_password
    label: View User Password (set/unset only)
    kind: query
    command: "E CU }"  # [24] admin-only
    params: []

  # ---- Backup/Restore ----
  # UNRESOLVED: "Save unit configuration E 1*" row is truncated in the supplied source; no complete payload is available.

  # ---- Additional input format queries ----
  - id: view_total_lines
    label: View Total Lines
    kind: query
    command: "E TLIN }"
    params: []
  - id: view_active_lines
    label: View Active Lines
    kind: query
    command: "E ALIN }"
    params: []
  - id: view_horizontal_frequency
    label: View Horizontal Frequency
    kind: query
    command: "E HRATE }"
    params: []
  - id: view_vertical_frequency
    label: View Vertical Frequency
    kind: query
    command: "E VRATE }"
    params: []

  # ---- Output format ----
  - id: set_video_bit_depth
    label: Set Video Color Bit Depth
    kind: action
    command: "E V1* X9( BITD }"
    params: [{name: mode, symbol: "X9(", type: integer, description: "0 = Auto (10-bit to sinks w/deep color support (interface/rate permitting), else 8-bit; default); 1 = Force 8-bit"}]
  - id: view_video_bit_depth
    label: View Video Color Bit Depth
    kind: query
    command: "E V1BITD }"
    params: []
  - id: set_hdmi_output_format
    label: Set HDMI Output Format
    kind: action
    command: "EX@ * X4* VTPO }"
    params:
      - {name: output, symbol: "X@", type: integer, description: "1 = HDMI 1; 2 = HDMI 2"}
      - {name: format, symbol: "X4*", type: integer, description: "0 = Auto (based on the display EDID: default); 1 = DVI RGB 444; 2 = RGB 444 Full; 3 = RGB 444 Limited; 5 = YUV 444 Limited; 7 = YUV 422 Limited"}
  - id: view_hdmi_output_format
    label: View HDMI Output Format
    kind: query
    command: "EX@ VTPO }"
    params: [{name: output, symbol: "X@", type: integer, description: "1 = HDMI 1; 2 = HDMI 2"}]

  # ---- Accu-Rate Frame Lock ----
  - id: disable_afl
    label: Disable AFL Mode
    kind: action
    command: "E 0GLOK }"
    params: []
  - id: enable_afl
    label: Enable AFL Mode
    kind: action
    command: "E 1GLOK }"
    params: []
  - id: view_afl_mode
    label: View AFL Mode Setting
    kind: query
    command: "E GLOK }"
    params: []
  - id: view_afl_status
    label: View AFL Mode Status
    kind: query
    command: "E 41STAT }"
    params: []

  # ---- Network printer ----
  - id: enable_network_printer
    label: Enable Network Printer
    kind: action
    command: "E E1PRTR }"
    params: []
  - id: disable_network_printer
    label: Disable Network Printer
    kind: action
    command: "E E0PRTR }"
    params: []
  - id: view_network_printer
    label: View Network Printer Setting
    kind: query
    command: "E EPRTR }"
    params: []

  # ---- Executive mode status ----
  - id: view_executive_mode
    label: View Executive Mode Status
    kind: query
    command: "E X"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: powerup_banner
    description: Power-up copyright/firmware banner (RS-232 only)
    format: "(C) Copyright YYYY, Extron Annotator 401, Vn.nn, 60-nnnn-nn"
  - id: error_response
    description: Error codes returned for invalid commands/parameters
    values:
      - {code: E01, meaning: "Invalid input number"}
      - {code: E10, meaning: "Invalid command"}
      - {code: E11, meaning: "Invalid preset number"}
      - {code: E12, meaning: "Invalid port number"}
      - {code: E13, meaning: "Invalid parameter"}
      - {code: E14, meaning: "Invalid for this configuration"}
      - {code: E17, meaning: "Invalid command for signal type"}
      - {code: E22, meaning: "Busy"}
      - {code: E24, meaning: "Privilege violation"}
      - {code: E25, meaning: "Device not present"}
      - {code: E26, meaning: "Maximum number of connectors exceeded"}
      - {code: E28, meaning: "Bad filename / File not found"}
      - {code: E33, meaning: "Bad file type for logo"}
```

## Variables
```yaml
# UNRESOLVED: continuous-value parameters are exposed via the set/view actions
# above (HCTR, VCTR, HSIZ, VSIZ, TXSZ, LNWT, RATE, SSAV timeouts). No separate
# variable channel documented beyond those action pairs.
```

## Events
```yaml
# Unsolicited device-initiated messages (require verbose mode 1 or 3 on the
# SIS-over-SSH session):
events:
  - id: input_frequency_change
    message: "Reconfig ]"
  - id: input_video_presence_change
    message: "In00 • 1* X6!]"
  - id: hotplug_output_event
    message: "HplgO X@ * X7)]"
  - id: hdcp_input_status_change
    message: "HdcpI1* X4$]"
  - id: hdcp_output_status_change
    message: "X@ HdcpO X@ * X4$]"
  - id: screen_saver_status_change
    message: "SsavS X6#]"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - absolute_system_reset        # ZQQQ - wipes all settings to factory defaults
  - absolute_system_reset_keep_ip # ZY
  - reboot_network               # 2BOOT - drops all connections
interlocks: []
# UNRESOLVED: source contains no explicit safety interlock procedures or
# power-on sequencing requirements. ZQQQ noted as destructive based on its
# description ("Reset all device settings except firmware version to factory
# defaults").
```

## Notes
- Two SSH entry points share port 22023: rear LAN port and front USB-C config port (USB-C presents IP 203.0.113.22).
- Default IP (DHCP off): 192.168.254.254 / 255.255.255.0 / gateway 0.0.0.0. USB Extender Plus Tx default IP 192.168.1.254.
- Telnet port 23 disabled by default; SIS-over-SSH is the primary Ethernet control path.
- Command timeout: 10 s pause between ASCII chars aborts the command silently.
- Verbose mode 1 = default for RS-232; 0 = default for Ethernet. Verbose 1/3 required to receive unsolicited change notices.
- `[24]` annotation in command comments = Administrator privilege required (else E24 privilege violation).
- `•` in payloads = Extron's space character symbol. `}` = soft CR (host command terminator). `]` = CR/LF (response terminator).

<!-- UNRESOLVED: save-image-network and save-unit-configuration rows are truncated. Set-Telnet-port lacks a port argument; set-user-password lacks an identifiable opcode; set-NTP-port shows MAP while related rows show PMAP. These setter/capture command fields are null rather than inferred. The supplied source explicitly documents vertical-size commands, clock vertical-position commands, ASTP and ERSR. Power on/off discrete command is not documented in the supplied source. -->

## Provenance

```yaml
source_domains:
  - extron.com
  - media.extron.com
  - manualslib.com
source_urls:
  - https://www.extron.com/download/files/userman/68-2951-01_B_annotator_401.pdf
  - https://media.extron.com/public/download/files/userman/annotator_401_68-2951-50_C.pdf
  - https://www.extron.com/download/files/userman/Annotator_Rev_B.pdf
  - https://www.manualslib.com/manual/3321747/Extron-Electronics-Annotator-401.html
  - https://www.extron.com/product/annotator401
retrieved_at: 2026-07-25T14:03:36.016Z
last_checked_at: 2026-10-07T13:31:58.489Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:31:58.489Z
matched_actions: 222
action_count: 222
confidence: medium
summary: "All 222 action units map to source SIS rows; transport matches; only the truncated save-unit-configuration row unrepresented. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Save unit configuration E 1*"
- "the save-image-to-network command row and Backup/Restore \"Save unit configuration\" row are truncated. The set-Telnet-port row lacks a port argument, and the set-user-password row lacks an identifiable opcode. The set-NTP-port row shows MAP while related rows show PMAP. Power on/off command not seen in the supplied source."
- "host→device payload not recoverable from extracted row (\"View detected format 1* X#]\")"
- "source documents this action but truncates its host payload at \"E 0* /shares/<network\"; path examples do not supply the complete command row."
- "source set row reads \"E N{ port# }MAP }\", while reset/disable/view rows use PMAP. The previously inferred PMAP setter is unsupported; the intended setter opcode is unknown."
- "source documents a set row but shows \"E ZPMAP }\", identical to its view payload and lacking a port argument. Setter argument placement is unknown."
- "source documents this action but shows \"EX12)}\" without an identifiable opcode. CU cannot be inferred from the Ipu reply or reset/view rows."
- "\"Save unit configuration E 1*\" row is truncated in the supplied source; no complete payload is available."
- "continuous-value parameters are exposed via the set/view actions"
- "no explicit multi-step macros documented in source."
- "source contains no explicit safety interlock procedures or"
- "save-image-network and save-unit-configuration rows are truncated. Set-Telnet-port lacks a port argument; set-user-password lacks an identifiable opcode; set-NTP-port shows MAP while related rows show PMAP. These setter/capture command fields are null rather than inferred. The supplied source explicitly documents vertical-size commands, clock vertical-position commands, ASTP and ERSR. Power on/off discrete command is not documented in the supplied source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
