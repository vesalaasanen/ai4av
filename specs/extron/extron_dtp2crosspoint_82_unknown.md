---
spec_id: admin/extron-dtp2-crosspoint-82
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DTP2 CrossPoint 82 Control Spec"
manufacturer: Extron
model_family: "DTP2 CrossPoint 82"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DTP2 CrossPoint 82"
    - "DTP2 CrossPoint 82 IPCP SA"
    - "DTP2 CrossPoint 82 IPCP MA 70"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - extron.com
  - media.extron.com
  - manua.ls
  - manuals.ca
source_urls:
  - https://www.extron.com/download/files/userman/68-3438-01_D_DTP_2_CrossPoint_82.pdf
  - https://media.extron.com/public/download/files/userman/68-3438-50_A_DTP2_CP_82_SUG.pdf
  - https://media.extron.com/public/download/files/userman/IN180x_and_DTP2_CrossPoint_82.pdf
  - https://www.manua.ls/extron/dtp2-crosspoint-82/manual
  - https://www.manuals.ca/extron/dtp2-crosspoint-82/manual
retrieved_at: 2026-05-17T16:50:14.802Z
last_checked_at: 2026-05-20T11:56:12.371Z
generated_at: 2026-05-20T11:56:12.371Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "control TCP port (Telnet/SSH) not stated explicitly in source; UART pass-through start port is 2000 for over-TP UART, which is a different feature"
  - "flow control not stated in source; only baud/parity/data/stop documented as defaults"
  - "control Telnet/SSH port not stated in source"
  - "no multi-step macros documented in source"
  - "no electrical or voltage interlocks documented (power/current ratings not in this excerpt)"
  - "control TCP port (Telnet/SSH) — source describes Telnet/SSH access and a UART pass-through port (default 2000) but does not state the SIS control port number"
  - "serial flow control — only baud/parity/data/stop documented as defaults"
  - "firmware version compatibility ranges not stated in source"
  - "full set of CEC predefined command strings — source lists examples (\"PwrOn\", \"PwrOff\", \"ShowMe\") but not the complete dictionary"
  - "command response timing/latency characteristics not stated"
  - "per-block soft limit ranges for individual OIDs not enumerated in this excerpt"
verification:
  verdict: verified
  checked_at: 2026-05-20T11:56:12.371Z
  matched_actions: 250
  action_count: 250
  confidence: medium
  summary: "All 250 spec actions matched; transport verified. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Extron DTP2 CrossPoint 82 Control Spec

## Summary
Extron DTP2 CrossPoint 82 is an 8x2 4K/60 scaling presentation matrix switcher with DTP2/XTP/HDBaseT twisted-pair extension, audio DSP, and CEC. This spec covers the Extron SIS (Simple Instruction Set) control protocol over RS-232, USB, Telnet, and SSH as documented in the vendor SIS reference. Commands use ASCII; the escape character (rendered "E" in the source) is 0x1B and lines terminate with CR (and CR/LF in responses).

<!-- UNRESOLVED: control TCP port (Telnet/SSH) not stated explicitly in source; UART pass-through start port is 2000 for over-TP UART, which is a different feature -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source; only baud/parity/data/stop documented as defaults
addressing:
  port: null  # UNRESOLVED: control Telnet/SSH port not stated in source
  default_ip: 192.168.254.254
  default_subnet: 255.255.255.0
  default_gateway: 0.0.0.0
auth:
  type: password
  notes: "Factory-configured password for all accounts equals the device serial number; case-sensitive. After a factory reset (E ZQQQ }) the unit has no password. Login response is 'Login Administrator' or 'Login User'."
```

## Traits
```yaml
- routable        # inferred from input-to-output tie commands
- queryable       # inferred from numerous query commands (PWR, HDCP status, info, temperature, etc.)
- levelable       # inferred from contrast/brightness/detail/gain/group-master commands
- powerable       # inferred from power-save mode and DTP remote power commands
```

## Actions
```yaml
# NOTE: In all commands below, "E" represents the ASCII escape character (0x1B) per the source
# symbol definitions ("E = Escape"). "W" is interchangeable with E. "}" is CR (0x0D) with no LF.
# Responses terminate with "]" which is CR/LF (0x0D 0x0A). Spaces in command strings are literal
# spaces only where shown in the source tables. Upper- and lower-case are interchangeable.

# -------- Input Selection and Ties --------
- id: tie_video_and_audio
  label: Tie Video and Audio Input to Output
  kind: action
  command: "{input}*{output}!"
  params:
    - { name: input, type: integer, description: "1=DP1, 2-6=HDMI/DVI 2-6, 7-8=DTP2/XTP 7-8, 9=Aux audio (audio only)" }
    - { name: output, type: integer, description: "1=HDMI/DVI out 1 unscaled, 2=DTP2/XTP/HDBT out 2 scaled, 3=HDMI/DVI Loop out" }

- id: tie_video_only
  label: Tie Video Input to Output
  kind: action
  command: "{input}*{output}%"
  params:
    - { name: input, type: integer }
    - { name: output, type: integer }

- id: tie_audio_only
  label: Tie Audio Input to Output
  kind: action
  command: "{input}*{output}$"
  params:
    - { name: input, type: integer }
    - { name: output, type: integer }

- id: view_current_input
  label: View Current Input on Output
  kind: query
  command: "{output}!"
  params: [{ name: output, type: integer }]

- id: view_video_input
  label: View Video Input on Output
  kind: query
  command: "{output}%"
  params: [{ name: output, type: integer }]

- id: view_audio_input
  label: View Audio Input on Output
  kind: query
  command: "{output}$"
  params: [{ name: output, type: integer }]

# -------- Untie --------
- id: untie_all_outputs
  label: Untie All Outputs (Video and Audio)
  kind: action
  command: "0*!"
  params: []

- id: untie_one_output
  label: Untie One Output (Video and Audio)
  kind: action
  command: "0*{output}!"
  params: [{ name: output, type: integer }]

- id: untie_one_input
  label: Untie All Outputs From Input
  kind: action
  command: "{input}*0!"
  params: [{ name: input, type: integer }]

# -------- Loop Out Tie --------
- id: loop_out_set
  label: Set Loop Out Input
  kind: action
  command: "E!{input}LOUT\r"
  params: [{ name: input, type: integer }]

- id: loop_out_view
  label: View Loop Out Input
  kind: query
  command: "E LOUT\r"
  params: []

# -------- Video Input Name --------
- id: video_input_name_set
  label: Write Video Input Name
  kind: action
  command: "E I{input}*{name}VNAM\r"
  params:
    - { name: input, type: integer }
    - { name: name, type: string, description: "Up to 32 chars; excludes comma, *, |" }

- id: video_input_name_view
  label: View Video Input Name
  kind: query
  command: "E I{input}VNAM\r"
  params: [{ name: input, type: integer }]

# -------- Input Video Format --------
- id: input_video_format_view
  label: View Detected Input Video Format
  kind: query
  command: "{input}*\\"
  params: [{ name: input, type: integer }]

# -------- Input EDID --------
- id: edid_assign_input
  label: Assign EDID to Input
  kind: action
  command: "E A{input}*{edid}EDID\r"
  params:
    - { name: input, type: integer }
    - { name: edid, type: integer, description: "See EDID table; 10-76 default slots, 201-210 custom" }

- id: edid_view_input
  label: View EDID Assigned to Input
  kind: query
  command: "E A{input}EDID\r"
  params: [{ name: input, type: integer }]

- id: edid_save_from_output
  label: Save Output EDID to Custom Slot
  kind: action
  command: "E S{output}*{edid}EDID\r"
  params:
    - { name: output, type: integer }
    - { name: edid, type: integer }

- id: edid_view_native_resolution
  label: View EDID Native Resolution
  kind: query
  command: "E N{edid}EDID\r"
  params: [{ name: edid, type: integer }]

- id: edid_export
  label: Export EDID to File
  kind: action
  command: "E E{edid},{filename}EDID\r"
  params:
    - { name: edid, type: integer, description: "201-210 for export" }
    - { name: filename, type: string }

- id: edid_import
  label: Import EDID From File
  kind: action
  command: "E I{edid},{filename}EDID\r"
  params:
    - { name: edid, type: integer, description: "10-210 for import" }
    - { name: filename, type: string }

# -------- HDCP Authorized --------
- id: hdcp_input_enable
  label: Enable HDCP Support on Input
  kind: action
  command: "E E{input}*1HDCP\r"
  params: [{ name: input, type: integer }]

- id: hdcp_input_disable
  label: Disable HDCP Support on Input
  kind: action
  command: "E E{input}*0HDCP\r"
  params: [{ name: input, type: integer }]

- id: hdcp_input_view_support
  label: View HDCP Support Status on Input
  kind: query
  command: "E E{input}HDCP\r"
  params: [{ name: input, type: integer }]

# -------- Input Aspect Ratio --------
- id: aspect_fill
  label: Set Input Aspect Ratio to Fill
  kind: action
  command: "E{input}*1ASPR\r"
  params: [{ name: input, type: integer }]

- id: aspect_follow
  label: Set Input Aspect Ratio to Follow
  kind: action
  command: "E{input}*2ASPR\r"
  params: [{ name: input, type: integer }]

- id: aspect_view
  label: View Aspect Setting on Input
  kind: query
  command: "E{input}ASPR\r"
  params: [{ name: input, type: integer }]

# -------- Active Pixels and Lines --------
- id: active_pixels_view
  label: View Active Pixels on Input
  kind: query
  command: "E{input}APIX\r"
  params: [{ name: input, type: integer }]

- id: active_lines_view
  label: View Active Lines on Input
  kind: query
  command: "E{input}ALIN\r"
  params: [{ name: input, type: integer }]

# -------- Film Mode Detection --------
- id: film_mode_auto
  label: Enable Auto Film Mode Detection
  kind: action
  command: "E{input}*1FILM\r"
  params: [{ name: input, type: integer }]

- id: film_mode_off
  label: Disable Film Mode Detection
  kind: action
  command: "E{input}*0FILM\r"
  params: [{ name: input, type: integer }]

- id: film_mode_view
  label: View Film Mode Setting
  kind: query
  command: "E{input}FILM\r"
  params: [{ name: input, type: integer }]

# -------- Freeze (Output) --------
- id: freeze_enable
  label: Freeze Output
  kind: action
  command: "1*1F"
  params: []

- id: freeze_disable
  label: Unfreeze Output
  kind: action
  command: "1*0F"
  params: []

- id: freeze_view
  label: View Freeze Status
  kind: query
  command: "1F"
  params: []

# -------- Contrast --------
- id: contrast_set
  label: Set Contrast
  kind: action
  command: "E{input}*{value}CONT\r"
  params:
    - { name: input, type: integer }
    - { name: value, type: integer, description: "0-127 (default 64)" }

- id: contrast_increment
  label: Increment Contrast
  kind: action
  command: "E{input}+CONT\r"
  params: [{ name: input, type: integer }]

- id: contrast_decrement
  label: Decrement Contrast
  kind: action
  command: "E{input}-CONT\r"
  params: [{ name: input, type: integer }]

- id: contrast_view
  label: View Contrast
  kind: query
  command: "E{input}CONT\r"
  params: [{ name: input, type: integer }]

# -------- Brightness --------
- id: brightness_set
  label: Set Brightness
  kind: action
  command: "E{input}*{value}BRIT\r"
  params:
    - { name: input, type: integer }
    - { name: value, type: integer, description: "0-127 (default 64)" }

- id: brightness_increment
  label: Increment Brightness
  kind: action
  command: "E{input}+BRIT\r"
  params: [{ name: input, type: integer }]

- id: brightness_decrement
  label: Decrement Brightness
  kind: action
  command: "E{input}-BRIT\r"
  params: [{ name: input, type: integer }]

- id: brightness_view
  label: View Brightness
  kind: query
  command: "E{input}BRIT\r"
  params: [{ name: input, type: integer }]

# -------- Detail Filter --------
- id: detail_set
  label: Set Detail Level
  kind: action
  command: "E 1*{value}HDET\r"
  params: [{ name: value, type: integer, description: "0-127" }]

- id: detail_increment
  label: Increment Detail
  kind: action
  command: "E 1+HDET\r"
  params: []

- id: detail_decrement
  label: Decrement Detail
  kind: action
  command: "E 1-HDET\r"
  params: []

- id: detail_view
  label: View Detail Level
  kind: query
  command: "E 1HDET\r"
  params: []

# -------- Horizontal Position (Image) --------
- id: h_position_set
  label: Set Horizontal Position
  kind: action
  command: "E I1*{value}HCTR\r"
  params: [{ name: value, type: integer, description: "-4096 to 4096" }]

- id: h_position_increment
  label: Shift Image Right 1 Pixel
  kind: action
  command: "E I1+HCTR\r"
  params: []

- id: h_position_decrement
  label: Shift Image Left 1 Pixel
  kind: action
  command: "E I1-HCTR\r"
  params: []

- id: h_position_view
  label: View Horizontal Position
  kind: query
  command: "E I1 HCTR\r"
  params: []

# -------- Vertical Position (Image) --------
- id: v_position_set
  label: Set Vertical Position
  kind: action
  command: "E I1*{value}VCTR\r"
  params: [{ name: value, type: integer, description: "-2400 to 2400" }]

- id: v_position_increment
  label: Shift Image Down 1 Line
  kind: action
  command: "E I1+VCTR\r"
  params: []

- id: v_position_decrement
  label: Shift Image Up 1 Line
  kind: action
  command: "E I1-VCTR\r"
  params: []

- id: v_position_view
  label: View Vertical Position
  kind: query
  command: "E I1 VCTR\r"
  params: []

# -------- Horizontal Size (Image) --------
- id: h_size_set
  label: Set Horizontal Size
  kind: action
  command: "E I1*{value}HSIZ\r"
  params: [{ name: value, type: integer, description: "10 to 2x max output res" }]

- id: h_size_increment
  label: Widen Image 1 Pixel
  kind: action
  command: "E I1+HSIZ\r"
  params: []

- id: h_size_decrement
  label: Narrow Image 1 Pixel
  kind: action
  command: "E I1-HSIZ\r"
  params: []

- id: h_size_view
  label: View Horizontal Size
  kind: query
  command: "E I1 HSIZ\r"
  params: []

# -------- Vertical Size (Image) --------
- id: v_size_set
  label: Set Vertical Size
  kind: action
  command: "E I1*{value}VSIZ\r"
  params: [{ name: value, type: integer }]

- id: v_size_increment
  label: Taller Image 1 Line
  kind: action
  command: "E I1+VSIZ\r"
  params: []

- id: v_size_decrement
  label: Shorten Image 1 Line
  kind: action
  command: "E I1-VSIZ\r"
  params: []

- id: v_size_view
  label: View Vertical Size
  kind: query
  command: "E I1 VSIZ\r"
  params: []

# -------- Compound Image Position and Size --------
- id: compound_image_set
  label: Set Compound Image Position and Size
  kind: action
  command: "E 1,{h_pos}*{v_pos}*{h_size}*{v_size}XIMG\r"
  params:
    - { name: h_pos, type: integer }
    - { name: v_pos, type: integer }
    - { name: h_size, type: integer }
    - { name: v_size, type: integer }

- id: compound_image_view
  label: View Compound Image Position and Size
  kind: query
  command: "E 1 XIMG\r"
  params: []

# -------- Output Video Mute (per-output) --------
- id: output_video_unmute
  label: Unmute Output Video
  kind: action
  command: "{output}*0B"
  params: [{ name: output, type: integer }]

- id: output_video_mute
  label: Mute Output Video
  kind: action
  command: "{output}*1B"
  params: [{ name: output, type: integer }]

- id: output_video_mute_with_sync
  label: Mute Output Video and Sync
  kind: action
  command: "{output}*2B"
  params: [{ name: output, type: integer }]

- id: output_video_mute_view
  label: View Output Video Mute Status
  kind: query
  command: "{output}B"
  params: [{ name: output, type: integer }]

# -------- Video Mute All Outputs --------
- id: all_outputs_mute
  label: Mute Video All Outputs
  kind: action
  command: "1B"
  params: []

- id: all_outputs_mute_with_sync
  label: Mute Video and Sync All Outputs
  kind: action
  command: "2B"
  params: []

- id: all_outputs_unmute
  label: Unmute All Outputs
  kind: action
  command: "0B"
  params: []

- id: all_outputs_mute_view
  label: View Global Mute
  kind: query
  command: "B"
  params: []

# -------- Output Switcher Rate --------
- id: output_rate_set
  label: Set Output Rate (DTP2 Output 2)
  kind: action
  command: "E 1*{rate}RATE\r"
  params: [{ name: rate, type: integer, description: "EDID emulation table value" }]

- id: output_rate_view
  label: View Output Rate
  kind: query
  command: "E 1 RATE\r"
  params: []

# -------- Video Output Name --------
- id: video_output_name_set
  label: Write Video Output Name
  kind: action
  command: "E O{output}*{name}VNAM\r"
  params:
    - { name: output, type: integer }
    - { name: name, type: string }

- id: video_output_name_view
  label: View Video Output Name
  kind: query
  command: "E O{output}VNAM\r"
  params: [{ name: output, type: integer }]

# -------- HDMI Output Format --------
- id: hdmi_output_format_set
  label: Set HDMI Output Colorspace and Format
  kind: action
  command: "E{output}*{format}VTPO\r"
  params:
    - { name: output, type: integer }
    - { name: format, type: integer, description: "0=Auto,1=DVI,2=RGB Full,3=RGB Limited,5=YUV444 Lim,7=YUV422 Lim" }

- id: hdmi_output_format_view
  label: View HDMI Output Format
  kind: query
  command: "E{output}VTPO\r"
  params: [{ name: output, type: integer }]

- id: hdmi_output_format_view_auto
  label: View HDMI Output Auto Format Resolution
  kind: query
  command: "E{output}*VTPO\r"
  params: [{ name: output, type: integer }]

# -------- Video Bit Depth --------
- id: bit_depth_set
  label: Set Video Bit Depth
  kind: action
  command: "E V{output}*{depth}BITD\r"
  params:
    - { name: output, type: integer }
    - { name: depth, type: integer, description: "0=Auto,1=Force 8-bit (default)" }

- id: bit_depth_view
  label: View Video Bit Depth
  kind: query
  command: "E V{output}BITD\r"
  params: [{ name: output, type: integer }]

# -------- Power Save --------
- id: power_save_set
  label: Set Power Save Mode
  kind: action
  command: "E{mode}PSAV\r"
  params: [{ name: mode, type: integer, description: "0=Full (default),1=Lowest,2=Low" }]

- id: power_save_view
  label: View Power Save Mode
  kind: query
  command: "E PSAV\r"
  params: []

# -------- Screen Saver (DTP2 Output 2 only) --------
- id: screen_saver_mode_set
  label: Set Screen Saver Mode
  kind: action
  command: "E M1*{mode}SSAV\r"
  params: [{ name: mode, type: integer, description: "Default 1 (black)" }]

- id: screen_saver_mode_view
  label: View Screen Saver Mode
  kind: query
  command: "E M1 SSAV\r"
  params: []

- id: screen_saver_duration_set
  label: Set Screen Saver Timeout
  kind: action
  command: "E T1*{seconds}SSAV\r"
  params: [{ name: seconds, type: integer, description: "1-500 sec, 0=instant black, 501=never (default)" }]

- id: screen_saver_duration_view
  label: View Screen Saver Timeout
  kind: query
  command: "E T1 SSAV\r"
  params: []

- id: screen_saver_status_view
  label: View Screen Saver Status
  kind: query
  command: "E S1 SSAV\r"
  params: []

# -------- OSD Menu Duration --------
- id: osd_duration_set
  label: Set OSD Menu Duration
  kind: action
  command: "E{seconds}MDUR\r"
  params: [{ name: seconds, type: integer, description: "1-500 sec, 501=never" }]

- id: osd_duration_view
  label: View OSD Menu Duration
  kind: query
  command: "E MDUR\r"
  params: []

# -------- Logos: User-Supplied Image --------
- id: logo_image_assign
  label: Assign Logo Image File to Slot
  kind: action
  command: "E A{slot},{filename}LOGO\r"
  params:
    - { name: slot, type: integer, description: "1-16, 101=No Signal, 201=HDCP" }
    - { name: filename, type: string }

- id: logo_image_view
  label: View Logo File Assigned to Slot
  kind: query
  command: "E A{slot}LOGO\r"
  params: [{ name: slot, type: integer }]

# -------- Logos: Clear Slot --------
- id: logo_slot_clear
  label: Clear Logo Slot
  kind: action
  command: "E X3*{slot}PRST\r"
  params: [{ name: slot, type: integer }]

# -------- Logo Name --------
- id: logo_name_set
  label: Write Logo Name
  kind: action
  command: "E L{slot},{name}UNAM\r"
  params:
    - { name: slot, type: integer }
    - { name: name, type: string }

- id: logo_name_view
  label: View Logo Name
  kind: query
  command: "E L{slot}UNAM\r"
  params: [{ name: slot, type: integer }]

# -------- Logo Availability --------
- id: logo_availability_view
  label: View Logo Availability
  kind: query
  command: "E Q LOGO\r"
  params: []

# -------- Logo On or Off --------
- id: logo_disable
  label: Disable Current Logo
  kind: action
  command: "E E1*0 LOGO\r"
  params: []

- id: logo_enable
  label: Enable Logo From Slot
  kind: action
  command: "E E1*{slot}LOGO\r"
  params: [{ name: slot, type: integer }]

- id: logo_status_view
  label: View Logo Slot Enabled
  kind: query
  command: "E E 1 LOGO\r"
  params: []

# -------- Logo Horizontal Shift --------
- id: logo_h_shift_set
  label: Set Logo Horizontal Shift
  kind: action
  command: "E L{slot}*{pos}HCTR\r"
  params:
    - { name: slot, type: integer }
    - { name: pos, type: integer }

- id: logo_h_shift_increment
  label: Shift Logo Right 1 Pixel
  kind: action
  command: "E L{slot}+HCTR\r"
  params: [{ name: slot, type: integer }]

- id: logo_h_shift_decrement
  label: Shift Logo Left 1 Pixel
  kind: action
  command: "E L{slot}-HCTR\r"
  params: [{ name: slot, type: integer }]

- id: logo_h_shift_view
  label: View Logo Horizontal Shift
  kind: query
  command: "E L{slot}HCTR\r"
  params: [{ name: slot, type: integer }]

# -------- Logo Vertical Shift --------
- id: logo_v_shift_set
  label: Set Logo Vertical Shift
  kind: action
  command: "E L{slot}*{pos}VCTR\r"
  params:
    - { name: slot, type: integer }
    - { name: pos, type: integer, description: "+/- 2400 max" }

- id: logo_v_shift_increment
  label: Shift Logo Down 1 Pixel
  kind: action
  command: "E L{slot}+VCTR\r"
  params: [{ name: slot, type: integer }]

- id: logo_v_shift_decrement
  label: Shift Logo Up 1 Pixel
  kind: action
  command: "E L{slot}-VCTR\r"
  params: [{ name: slot, type: integer }]

- id: logo_v_shift_view
  label: View Logo Vertical Shift
  kind: query
  command: "E L{slot}VCTR\r"
  params: [{ name: slot, type: integer }]

# -------- Logo Key Effect --------
- id: logo_key_disabled
  label: Disable Logo Key Effect
  kind: action
  command: "E{slot}*0 LKEF\r"
  params: [{ name: slot, type: integer }]

- id: logo_key_transparency
  label: Enable Logo Key Transparency
  kind: action
  command: "E{slot}*1 LKEF\r"
  params: [{ name: slot, type: integer }]

- id: logo_key_rgb
  label: Enable Logo RGB Key
  kind: action
  command: "E{slot}*2 LKEF\r"
  params: [{ name: slot, type: integer }]

- id: logo_key_level
  label: Enable Logo Level Key
  kind: action
  command: "E{slot}*3 LKEF\r"
  params: [{ name: slot, type: integer }]

- id: logo_key_alpha
  label: Enable Logo Alpha Key
  kind: action
  command: "E{slot}*4 LKEF\r"
  params: [{ name: slot, type: integer }]

- id: logo_key_view
  label: View Logo Key Effect
  kind: query
  command: "E{slot}LKEF\r"
  params: [{ name: slot, type: integer }]

# -------- Logo Key Effect Level --------
- id: logo_key_level_set
  label: Set Logo Key Effect Level
  kind: action
  command: "E{slot}*{var}*{lvl}*LKEY\r"
  params:
    - { name: slot, type: integer }
    - { name: var, type: integer, description: "Key effect variable selector" }
    - { name: lvl, type: integer }

- id: logo_key_level_view
  label: View Logo Key Effect Level
  kind: query
  command: "E{slot}*{var}LKEY\r"
  params:
    - { name: slot, type: integer }
    - { name: var, type: integer }

# -------- Input Presets --------
- id: input_preset_recall
  label: Recall Input Preset
  kind: action
  command: "2*{preset}."
  params: [{ name: preset, type: integer, description: "1-16" }]

- id: input_preset_save
  label: Save Input Preset
  kind: action
  command: "2*{preset},"
  params: [{ name: preset, type: integer }]

- id: input_preset_delete
  label: Delete Input Preset
  kind: action
  command: "E X2*{preset}PRST\r"
  params: [{ name: preset, type: integer }]

# -------- Input Preset Name --------
- id: input_preset_name_set
  label: Write Input Preset Name
  kind: action
  command: "E 2*{preset},{name}PNAM\r"
  params:
    - { name: preset, type: integer }
    - { name: name, type: string }

- id: input_preset_name_view
  label: View Input Preset Name
  kind: query
  command: "E 2*{preset}PNAM\r"
  params: [{ name: preset, type: integer }]

# -------- Auto Memories --------
- id: auto_memory_enable
  label: Enable Auto Memory on Input
  kind: action
  command: "E{input}*1 AMEM\r"
  params: [{ name: input, type: integer }]

- id: auto_memory_disable
  label: Disable Auto Memory on Input
  kind: action
  command: "E{input}*0 AMEM\r"
  params: [{ name: input, type: integer }]

- id: auto_memory_view
  label: View Auto Memory Status
  kind: query
  command: "E{input}AMEM\r"
  params: [{ name: input, type: integer }]

# -------- Tie Presets --------
- id: tie_preset_save
  label: Save Tie Preset
  kind: action
  command: "5*{preset},"
  params: [{ name: preset, type: integer, description: "1-16" }]

- id: tie_preset_recall
  label: Recall Tie Preset
  kind: action
  command: "5*{preset}."
  params: [{ name: preset, type: integer }]

- id: tie_preset_clear
  label: Clear Tie Preset
  kind: action
  command: "E X5*{preset}PRST\r"
  params: [{ name: preset, type: integer }]

- id: tie_preset_name_set
  label: Write Tie Preset Name
  kind: action
  command: "E 5*{preset},{name}PNAM\r"
  params:
    - { name: preset, type: integer }
    - { name: name, type: string }

- id: tie_preset_name_view
  label: View Tie Preset Name
  kind: query
  command: "E 5*{preset}PNAM\r"
  params: [{ name: preset, type: integer }]

# -------- Audio Input Format --------
- id: audio_input_format_set
  label: Set Audio Input Format
  kind: action
  command: "E I{input}*{format}AFMT\r"
  params:
    - { name: input, type: integer }
    - { name: format, type: integer, description: "0=None,1=Analog Aux,2=LPCM-2Ch,3=Multi-Ch,4=LPCM-2Ch Auto Aux,5=Multi-Ch Auto Aux" }

- id: audio_input_format_view
  label: View Audio Input Format
  kind: query
  command: "E I{input}AFMT\r"
  params: [{ name: input, type: integer }]

# -------- Audio Input Name --------
- id: audio_input_name_set
  label: Write Audio Input Name
  kind: action
  command: "E I{audio_input}*{name}ANAM\r"
  params:
    - { name: audio_input, type: integer, description: "1-15 per audio input table" }
    - { name: name, type: string }

- id: audio_input_name_view
  label: View Audio Input Name
  kind: query
  command: "E I{audio_input}ANAM\r"
  params: [{ name: audio_input, type: integer }]

# -------- Audio Output Name --------
- id: audio_output_name_set
  label: Write Audio Output Name
  kind: action
  command: "E O{audio_output}*{name}ANAM\r"
  params:
    - { name: audio_output, type: integer, description: "1=HDMI1,2=TP2,3=Over DTP Analog,4=Line Out,5=Line Out 2,6=Line Out 3,7=Line Out 4" }
    - { name: name, type: string }

- id: audio_output_name_view
  label: View Audio Output Name
  kind: query
  command: "E O{audio_output}ANAM\r"
  params: [{ name: audio_output, type: integer }]

# -------- Audio Mute (output embedded) --------
- id: audio_output_mute_set
  label: Mute/Unmute Output Embedded Audio
  kind: action
  command: "{output}*{state}ZAmt"
  params:
    - { name: output, type: integer }
    - { name: state, type: integer, description: "0=Unmuted,1=Muted" }
  notes: "Z is rendered as escape character in source"

- id: audio_output_mute_view
  label: View Output Audio Mute Status
  kind: query
  command: "{output}*ZAmt"
  params: [{ name: output, type: integer }]

- id: audio_global_mute_view
  label: View Global Audio Mute Status
  kind: query
  command: "ZAmt"
  params: []

# -------- Configure Playback --------
- id: playback_assign_file
  label: Assign File to Playback Slot
  kind: action
  command: "E A{slot},{filename}CPLY\r"
  params:
    - { name: slot, type: integer, description: "1-16" }
    - { name: filename, type: string }

- id: playback_delay_set
  label: Set Playback Repeat Delay
  kind: action
  command: "E D{slot}*{seconds}CPLY\r"
  params:
    - { name: slot, type: integer }
    - { name: seconds, type: integer, description: "0=no delay, 1-300 seconds" }

- id: playback_delay_view
  label: View Playback Repeat Delay
  kind: query
  command: "E D{slot}CPLY\r"
  params: [{ name: slot, type: integer }]

- id: playback_name_set
  label: Write Playback File Name
  kind: action
  command: "E N{slot}*{name}CPLY\r"
  params:
    - { name: slot, type: integer }
    - { name: name, type: string }

- id: playback_name_view
  label: View Playback File Name
  kind: query
  command: "E N{slot}CPLY\r"
  params: [{ name: slot, type: integer }]

# -------- Playback Transport --------
- id: playback_transport_set
  label: Start/Stop Playback on Slot
  kind: action
  command: "E{slot}*{state}PLAY\r"
  params:
    - { name: slot, type: integer }
    - { name: state, type: integer, description: "0=Stop,1=Play" }

- id: playback_slot_status_view
  label: View Slot Playback Status
  kind: query
  command: "E{slot}PLAY\r"
  params: [{ name: slot, type: integer }]

- id: playback_global_status_view
  label: View Currently Playing Slot
  kind: query
  command: "E PLAY\r"
  params: []

# -------- Test Pattern --------
- id: test_pattern_set
  label: Set Test Pattern
  kind: action
  command: "E 1*{pattern}TEST\r"
  params: [{ name: pattern, type: integer, description: "0=Off,1=Crop,2=Alt pixels,3=Crosshatch,4=Color bars,5=Grayscale,6=Audio test" }]

- id: test_pattern_view
  label: View Test Pattern
  kind: query
  command: "E 1 TEST\r"
  params: []

# -------- Switch Effects --------
- id: switch_effect_set
  label: Set Output Switch Effect
  kind: action
  command: "E O1*{effect}SWEF\r"
  params: [{ name: effect, type: integer, description: "0=Cut through black,1=Fade through black,2=Seamless fade (default),3=Seamless cut" }]

- id: switch_effect_view
  label: View Output Switch Effect
  kind: query
  command: "E O1 SWEF\r"
  params: []

# -------- Upstream Video Switch Effects --------
- id: upstream_effect_cut
  label: Set Upstream Switch Effect Off (Cut)
  kind: action
  command: "E U1*0 SWEF\r"
  params: []

- id: upstream_effect_seamless
  label: Set Upstream Seamless Cut
  kind: action
  command: "E U1*1 SWEF\r"
  params: []

- id: upstream_effect_view
  label: View Upstream Switch Effect
  kind: query
  command: "E U1 SWEF\r"
  params: []

# -------- Video Signal Presence --------
- id: video_signal_presence_view
  label: View Video Signal Presence All Inputs
  kind: query
  command: "E 0 LS\r"
  params: []

# -------- Front Panel Lock --------
- id: front_panel_lock_set
  label: Set Front Panel Lock Mode
  kind: action
  command: "{mode}X"
  params: [{ name: mode, type: integer, description: "1=Full lockout,2=Input/logos/volume,3=Input/logos,4=Volume only" }]

- id: front_panel_unlock
  label: Disable Front Panel Lock
  kind: action
  command: "0X"
  params: []

- id: front_panel_lock_view
  label: View Front Panel Lock Mode
  kind: query
  command: "X"
  params: []

# -------- HDCP Output Mode --------
- id: hdcp_output_mode_set
  label: Set HDCP Output Mode
  kind: action
  command: "E S{output}*{mode}HDCP\r"
  params:
    - { name: output, type: integer }
    - { name: mode, type: integer, description: "0=Off,1=Follow input,2=Encrypt output,3=Follow input continuous,4=Encrypt output continuous" }

- id: hdcp_output_mode_view
  label: View HDCP Output Mode
  kind: query
  command: "E S{output}HDCP\r"
  params: [{ name: output, type: integer }]

# -------- HDCP Notification --------
- id: hdcp_notification_set
  label: Set HDCP Notification Mode
  kind: action
  command: "E N{output}*{mode}HDCP\r"
  params:
    - { name: output, type: integer }
    - { name: mode, type: integer, description: "0=Black,1=Green w/ OSD bug,2=User image" }

- id: hdcp_notification_view
  label: View HDCP Notification Mode
  kind: query
  command: "E N{output}HDCP\r"
  params: [{ name: output, type: integer }]

# -------- HDCP Status --------
- id: hdcp_input_status_query
  label: Query Input HDCP Status
  kind: query
  command: "E I{input}HDCP\r"
  params: [{ name: input, type: integer }]

- id: hdcp_output_status_query
  label: Query Output HDCP Status
  kind: query
  command: "E O{output}HDCP\r"
  params: [{ name: output, type: integer }]

# -------- Twisted Pair Protocol --------
- id: tp_input_protocol_set
  label: Set Input TP Protocol
  kind: action
  command: "E I{input}*{protocol}HDBT\r"
  params:
    - { name: input, type: integer, description: "7 or 8 only" }
    - { name: protocol, type: integer, description: "0=DTP,1=XTP" }

- id: tp_input_protocol_view
  label: View Input TP Protocol
  kind: query
  command: "E I{input}HDBT\r"
  params: [{ name: input, type: integer }]

- id: tp_output_protocol_set
  label: Set Output 2 TP Protocol
  kind: action
  command: "E O 2*{protocol}HDBT\r"
  params: [{ name: protocol, type: integer, description: "0=DTP,1=XTP,2=HDBaseT" }]

- id: tp_output_protocol_view
  label: View Output 2 TP Protocol
  kind: query
  command: "E O 2 HDBT\r"
  params: []

# -------- DTP Remote Power --------
- id: dtp_input_power_set
  label: Set Input DTP Remote Power
  kind: action
  command: "E I{input}*{power}RPWR\r"
  params:
    - { name: input, type: integer, description: "7 or 8 only" }
    - { name: power, type: integer, description: "0=None,1=DTP 12VDC,2=DTP2 48VDC" }

- id: dtp_input_power_view
  label: View Input DTP Remote Power
  kind: query
  command: "E I{input}RPWR\r"
  params: [{ name: input, type: integer }]

- id: dtp_output_power_set
  label: Set Output 2 DTP Remote Power
  kind: action
  command: "E O 2*{power}RPWR\r"
  params: [{ name: power, type: integer }]

- id: dtp_output_power_view
  label: View Output 2 DTP Remote Power
  kind: query
  command: "E O 2 RPWR\r"
  params: []

# -------- Resets --------
- id: reset_partial
  label: System Reset (Partial)
  kind: action
  command: "E ZXXX\r"
  params: []
  notes: "Resets all device settings to factory defaults"

- id: reset_absolute
  label: Absolute System Reset
  kind: action
  command: "E ZQQQ\r"
  params: []
  notes: "Resets all settings + DHCP/IP; removes factory serial-number passwords"

- id: reset_absolute_retain_ip
  label: Absolute System Reset (Retain IP)
  kind: action
  command: "E ZY\r"
  params: []
  notes: "Like ZQQQ but retains IP/subnet/gateway/DHCP/port mapping"

- id: erase_file
  label: Erase User File
  kind: action
  command: "E{filename}EF\r"
  params: [{ name: filename, type: string }]

- id: erase_current_dir
  label: Erase Current Directory and Files
  kind: action
  command: "E /EF\r"
  params: []

- id: erase_current_dir_recursive
  label: Erase Current Directory and Subdirectories
  kind: action
  command: "E //EF\r"
  params: []

- id: erase_flash
  label: Erase Flash Memory
  kind: action
  command: "E ZFFF\r"
  params: []

# -------- Serial Port Configuration --------
- id: serial_port_set
  label: Set Serial Port Parameters
  kind: action
  command: "E{port}*{baud},{parity},{data},{stop}CP\r"
  params:
    - { name: port, type: integer, description: "1=Remote 3-pole, 7=UART TP IN7, 8=UART TP IN8, 9=UART TP OUT2" }
    - { name: baud, type: integer, description: "300-115200" }
    - { name: parity, type: string, description: "O/E/N/M/S (first letter)" }
    - { name: data, type: integer, description: "7 or 8" }
    - { name: stop, type: integer, description: "1 or 2" }

- id: serial_port_view
  label: View Serial Port Parameters
  kind: query
  command: "E{port}CP\r"
  params: [{ name: port, type: integer }]

- id: uart_start_set
  label: Set UART Port Start Point
  kind: action
  command: "E{port}MD\r"
  params: [{ name: port, type: integer, description: "Default 2000" }]

- id: uart_start_view
  label: View UART Port Start Point
  kind: query
  command: "E MD\r"
  params: []

# -------- Backup --------
- id: config_backup
  label: Backup Unit Configuration
  kind: action
  command: "E 1*{name}XF\r"
  params: [{ name: name, type: string, description: "Backup file name" }]

# -------- Information Requests --------
- id: info_general
  label: View General Input Information
  kind: query
  command: "{input}*I"
  params: [{ name: input, type: integer }]

- id: info_model_name
  label: Query Model Name
  kind: query
  command: "1I"
  params: []

- id: info_firmware_version
  label: Query Firmware Version
  kind: query
  command: "Q"
  params: []

- id: info_firmware_full
  label: Query Full Firmware Version with Build
  kind: query
  command: "*Q"
  params: []

- id: info_part_number
  label: Query Part Number
  kind: query
  command: "N"
  params: []

- id: info_description
  label: Query Unit Description
  kind: query
  command: "2I"
  params: []

- id: info_temperature
  label: View Internal Temperature (Celsius)
  kind: query
  command: "E 20 STAT\r"
  params: []

# -------- Verbose Mode --------
- id: verbose_mode_set
  label: Set Verbose Mode
  kind: action
  command: "E{mode}CV\r"
  params: [{ name: mode, type: integer, description: "0=None,1=Verbose,2=Tagged queries,3=Verbose+tagged" }]

- id: verbose_mode_view
  label: View Verbose Mode
  kind: query
  command: "E CV\r"
  params: []

# -------- IP Setup --------
- id: dhcp_set
  label: Set DHCP Mode
  kind: action
  command: "E{state}DH\r"
  params: [{ name: state, type: integer, description: "0=Disabled (default),1=Enabled" }]

- id: dhcp_view
  label: View DHCP Mode
  kind: query
  command: "E DH\r"
  params: []

- id: ip_address_set
  label: Set IP Address
  kind: action
  command: "E{ip}CI\r"
  params: [{ name: ip, type: string, description: "nnn.nnn.nnn.nnn" }]

- id: ip_address_view
  label: View IP Address
  kind: query
  command: "E CI\r"
  params: []

- id: subnet_mask_set
  label: Set Subnet Mask
  kind: action
  command: "E{mask}CS\r"
  params: [{ name: mask, type: string }]

- id: subnet_mask_view
  label: View Subnet Mask
  kind: query
  command: "E CS\r"
  params: []

- id: gateway_set
  label: Set Gateway IP Address
  kind: action
  command: "E{gateway}CG\r"
  params: [{ name: gateway, type: string }]

- id: gateway_view
  label: View Gateway IP Address
  kind: query
  command: "E CG\r"
  params: []

# -------- Port Timeout --------
- id: port_timeout_set
  label: Set Current Connection Port Timeout
  kind: action
  command: "E 0*{timeout}TC\r"
  params: [{ name: timeout, type: integer, description: "Tens of seconds; 1-65000" }]

- id: port_timeout_view
  label: View Current Port Timeout
  kind: query
  command: "E 0 TC\r"
  params: []

- id: port_timeout_global_set
  label: Set Global Port Timeout
  kind: action
  command: "E 1*{timeout}TC\r"
  params: [{ name: timeout, type: integer }]

- id: port_timeout_global_view
  label: View Global Port Timeout
  kind: query
  command: "E 1 TC\r"
  params: []

- id: mac_address_view
  label: View MAC Address
  kind: query
  command: "E CH\r"
  params: []

# -------- Combined LAN IP/Subnet/Gateway --------
- id: lan_ip_combined_set
  label: Set IP/Subnet/Gateway Combined
  kind: action
  command: "E 1*{ip}/{prefix}*{gateway}CISG\r"
  params:
    - { name: ip, type: string }
    - { name: prefix, type: integer, description: "0-31" }
    - { name: gateway, type: string }

- id: lan_ip_combined_view
  label: View Combined IP Settings
  kind: query
  command: "E 1 CISG\r"
  params: []

- id: network_reboot
  label: Reboot Networking
  kind: action
  command: "E 2BOOT\r"
  params: []
  notes: "Required for TCP/IP setting changes to take effect"

# -------- Open Connections --------
- id: open_connections_view
  label: Query Number of Open Connections
  kind: query
  command: "E CC\r"
  params: []

# -------- Unit Name --------
- id: unit_name_set
  label: Set Unit Name
  kind: action
  command: "E{name}CN\r"
  params: [{ name: name, type: string, description: "Up to 63 chars: A-Z, 0-9, hyphen; must start with letter" }]

- id: unit_name_reset_default
  label: Reset Unit Name to Factory Default
  kind: action
  command: "E CN\r"
  params: []
  notes: "Source documents same syntax as view; empty name parameter triggers reset"

- id: unit_name_view
  label: View Unit Name
  kind: query
  command: "E CN\r"
  params: []

# -------- Echo for SIS over SSH --------
- id: ssh_echo_enable
  label: Enable Echo (SSH)
  kind: action
  command: "E 1 ECHO\r"
  params: []

- id: ssh_echo_disable
  label: Disable Echo (SSH, Telnet-like)
  kind: action
  command: "E 0 ECHO\r"
  params: []

- id: ssh_echo_view
  label: View Echo Status
  kind: query
  command: "E ECHO\r"
  params: []

# -------- Passwords --------
- id: admin_password_set
  label: Set Administrator Password
  kind: action
  command: "E{password}CA\r"
  params: [{ name: password, type: string, description: "1-128 chars; no pipe" }]

- id: admin_password_view
  label: View Administrator Password (Masked)
  kind: query
  command: "E CA\r"
  params: []

- id: admin_password_clear
  label: Clear Administrator Password
  kind: action
  command: "E CA\r"
  params: []
  notes: "Empty password parameter clears admin password (also clears user password)"

- id: user_password_set
  label: Set User Password
  kind: action
  command: "E{password}CU\r"
  params: [{ name: password, type: string }]

- id: user_password_view
  label: View User Password (Masked)
  kind: query
  command: "E CU\r"
  params: []

- id: user_password_clear
  label: Clear User Password
  kind: action
  command: "E CU\r"
  params: []
  notes: "Empty password parameter clears user password"

# -------- Group Master SIS --------
- id: group_master_limits_view
  label: View Group Master Soft Limits
  kind: query
  command: "E L{group}GRPM\r"
  params: [{ name: group, type: integer, description: "1-10 or alias in braces" }]

- id: group_master_fader_set
  label: Set Group Fader Value
  kind: action
  command: "E D{group}*{value}GRPM\r"
  params:
    - { name: group, type: integer }
    - { name: value, type: integer, description: "0.1 dB resolution x10" }

- id: group_master_fader_view
  label: View Group Fader Value
  kind: query
  command: "E D{group}GRPM\r"
  params: [{ name: group, type: integer }]

- id: group_master_fader_increment
  label: Increment Group Fader
  kind: action
  command: "E D{group}*{inc}+GRPM\r"
  params:
    - { name: group, type: integer }
    - { name: inc, type: integer }

- id: group_master_fader_decrement
  label: Decrement Group Fader
  kind: action
  command: "E D{group}*{dec}-GRPM\r"
  params:
    - { name: group, type: integer }
    - { name: dec, type: integer }

- id: group_master_mute
  label: Mute Group
  kind: action
  command: "E D{group}*1 GRPM\r"
  params: [{ name: group, type: integer }]

- id: group_master_unmute
  label: Unmute Group
  kind: action
  command: "E D{group}*0 GRPM\r"
  params: [{ name: group, type: integer }]

- id: group_master_mute_view
  label: View Group Mute Status
  kind: query
  command: "E D{group}GRPM\r"
  params: [{ name: group, type: integer }]
  notes: "Same syntax as view fader value; response context distinguishes"

# -------- DSP SIS (output 2 only) --------
- id: dsp_gain_set
  label: Set Gain Level on OID
  kind: action
  command: "E G{oid}*{value}AU\r"
  params:
    - { name: oid, type: integer, description: "See OID table 30000-30017, 40100-40105, 60000-60011" }
    - { name: value, type: integer, description: "Level in 0.1 dB steps (x10)" }

- id: dsp_gain_view
  label: View Gain Level on OID
  kind: query
  command: "E G{oid}AU\r"
  params: [{ name: oid, type: integer }]

- id: dsp_audio_mute
  label: Mute Audio on OID
  kind: action
  command: "E M{oid}*1 AU\r"
  params: [{ name: oid, type: integer }]

- id: dsp_audio_unmute
  label: Unmute Audio on OID
  kind: action
  command: "E M{oid}*0 AU\r"
  params: [{ name: oid, type: integer }]

- id: dsp_audio_mute_view
  label: View Audio Mute Status on OID
  kind: query
  command: "E M{oid}AU\r"
  params: [{ name: oid, type: integer }]

- id: dsp_phantom_enable
  label: Enable Phantom Power on OID
  kind: action
  command: "E Z{oid}*1 AU\r"
  params: [{ name: oid, type: integer, description: "Only Mic/Line Inputs 1 and 2" }]

- id: dsp_phantom_disable
  label: Disable Phantom Power on OID
  kind: action
  command: "E Z{oid}*0 AU\r"
  params: [{ name: oid, type: integer }]

- id: dsp_phantom_view
  label: View Phantom Power Status on OID
  kind: query
  command: "E Z{oid}AU\r"
  params: [{ name: oid, type: integer }]

# -------- CEC: Enable/Disable --------
- id: cec_output_mode_set
  label: Enable/Disable CEC on Output
  kind: action
  command: "E O{output}*{mode}CCEC\r"
  params:
    - { name: output, type: integer }
    - { name: mode, type: integer, description: "0=Disabled,2=Insertion unidirectional,4=Bidirectional" }

- id: cec_all_outputs_mode_set
  label: Enable/Disable CEC on All Outputs
  kind: action
  command: "E O{mode}*CCEC\r"
  params: [{ name: mode, type: integer }]

- id: cec_output_status_view
  label: View Output CEC Status
  kind: query
  command: "E O{output}CCEC\r"
  params: [{ name: output, type: integer }]

# -------- CEC: Send Commands --------
- id: cec_send_predefined
  label: Send CEC Predefined Command to Output
  kind: action
  command: "E O{output}*{command}DCEC\r"
  params:
    - { name: output, type: integer }
    - { name: command, type: string, description: 'Quoted predefined action e.g. "PwrOn", "PwrOff", "ShowMe"' }

- id: cec_send_raw
  label: Send CEC Raw Data to Output
  kind: action
  command: "E O{output}*{data}DCEC\r"
  params:
    - { name: output, type: integer }
    - { name: data, type: string, description: 'Percent-hex bytes e.g. %2A%07%FF' }

- id: cec_broadcast_predefined
  label: Broadcast CEC Predefined Command
  kind: action
  command: "E O{output}*15*{command}DCEC\r"
  params:
    - { name: output, type: integer }
    - { name: command, type: string }

- id: cec_broadcast_raw
  label: Broadcast CEC Raw Data
  kind: action
  command: "E O{output}*15*{data}DCEC\r"
  params:
    - { name: output, type: integer }
    - { name: data, type: string }

# -------- CEC: Other --------
- id: cec_list_devices
  label: List CEC Device Presence
  kind: query
  command: "E LQ!CEC\r"
  params: []

- id: cec_rediscover_output
  label: Rediscover CEC Device on Output
  kind: action
  command: "E O{output}QCEC\r"
  params: [{ name: output, type: integer }]

- id: cec_physical_address_view
  label: View CEC Physical Address of Output
  kind: query
  command: "E O{output}PCEC\r"
  params: [{ name: output, type: integer }]
```

## Feedbacks
```yaml
- id: tie_response
  type: string
  description: "Response to tie commands: 'In{input}*{output}' (audio+video), '*Vid' suffix for video, '*Aud' suffix for audio"

- id: untie_response
  type: string
  description: "Response to untie: 'In00 All', 'Out{output} In00 All', 'Out00 In{input} All'"

- id: video_mute_status
  type: enum
  values: [0, 1, 2]
  description: "0=Unmuted, 1=Muted video to black, 2=Muted video and sync"

- id: input_video_signal_type
  type: enum
  values: [0, 1, 2, 3]
  description: "0=No signal, 1=DVI, 2=HDMI, 3=DisplayPort"

- id: hdcp_status
  type: enum
  values: [0, 1, 2]
  description: "0=No sink/source detected, 1=Detected but no HDCP, 2=Detected with HDCP"

- id: hdcp_output_mode
  type: enum
  values: [0, 1, 2, 3, 4]
  description: "0=Off, 1=Follow input, 2=Encrypt output, 3=Follow input continuous, 4=Encrypt output continuous"

- id: aspect_ratio_setting
  type: enum
  values: [1, 2]
  description: "1=Fill, 2=Follow"

- id: power_save_mode
  type: enum
  values: [0, 1, 2]
  description: "0=Full power (default), 1=Lowest, 2=Low"

- id: front_panel_lock_status
  type: enum
  values: [0, 1, 2, 3, 4]
  description: "0=Off, 1=Full lockout, 2=Input/logos/volume, 3=Input/logos, 4=Volume only"

- id: video_signal_presence
  type: bitmap
  description: "Per-input signal status: 0=No signal, 1=Signal detected"

- id: bit_depth_setting
  type: enum
  values: [0, 1]
  description: "0=Auto, 1=Force 8-bit (default)"

- id: tp_protocol_setting
  type: enum
  values: [0, 1, 2]
  description: "0=DTP (default), 1=XTP, 2=HDBaseT (output only)"

- id: dtp_remote_power_status
  type: enum
  values: [0, 1, 2]
  description: "0=None (default), 1=DTP 12VDC, 2=DTP2 48VDC"

- id: cec_status
  type: enum
  values: [0, 2, 3, 4, 5]
  description: "0=Disabled, 2=Mode 2 no device, 3=Mode 2 with device, 4=Mode 4 no device, 5=Mode 4 with device"

- id: cec_send_result
  type: enum
  values: [0, 1, 2]
  description: "0=Failed NAK, 1=Success ACK, 2=Unable to send"

- id: verbose_mode_state
  type: enum
  values: [0, 1, 2, 3]
  description: "0=None (LAN default), 1=Verbose (RS-232/USB default), 2=Tagged queries, 3=Verbose+tagged"

- id: model_name
  type: string
  description: "DTP2 CrossPoint 82 / DTP2 CrossPoint 82 IPCP SA / DTP2 CrossPoint 82 IPCP MA 70"

- id: firmware_version
  type: string
  description: "Format: n.nn or n.nn.nnnn with build number"

- id: part_number
  type: string
  description: "60-1615-01 (base), 60-1615-02 (IPCP SA), or full IPCP MA 70 part number"

- id: internal_temperature_celsius
  type: integer
  description: "Two digits zero-padded; degrees Celsius"

- id: mac_address
  type: string
  description: "Six pairs of hexadecimal characters"

- id: open_connections_count
  type: integer
  description: "0 through maximum open connections"

- id: dhcp_state
  type: enum
  values: [0, 1]
  description: "0=Disabled (default), 1=Enabled"

- id: login_response
  type: enum
  values: ["Login Administrator", "Login User"]
  description: "Returned after successful password entry"

- id: error_code
  type: enum
  values: ["E01", "E10", "E11", "E12", "E13", "E14", "E17", "E22", "E24", "E25", "E28", "E33"]
  description: "E01=Invalid input, E10=Invalid command, E11=Invalid preset, E12=Invalid port, E13=Invalid value, E14=Not valid for configuration, E17=Invalid command for signal type, E22=Busy, E24=Privilege violation, E25=Device not present, E28=Bad filename, E33=Bad file type for logo"
```

## Variables
```yaml
- id: contrast
  type: integer
  description: "Per-input contrast 0-127 (default 64)"

- id: brightness
  type: integer
  description: "Per-input brightness 0-127 (default 64)"

- id: detail_filter
  type: integer
  description: "Sharpness 0-127 (default 64)"

- id: gain_level
  type: integer
  description: "DSP gain in 0.1 dB resolution (x10 multiplier), per OID"

- id: group_master_fader
  type: integer
  description: "Group master fader value 0.1 dB resolution (x10)"

- id: screen_saver_timeout
  type: integer
  description: "1-500 sec, 0=instant, 501=never (default)"

- id: osd_menu_duration
  type: integer
  description: "1-500 sec, 501=never"

- id: port_timeout
  type: integer
  description: "Tens of seconds; 1-65000 (default 30 = 300 sec)"

- id: ip_address
  type: string
  description: "nnn.nnn.nnn.nnn (default 192.168.254.254)"

- id: subnet_mask
  type: string
  description: "nnn.nnn.nnn.nnn (default 255.255.255.0)"

- id: gateway_address
  type: string
  description: "nnn.nnn.nnn.nnn (default 0.0.0.0)"

- id: unit_name
  type: string
  description: "Up to 63 chars A-Z 0-9 hyphen"
```

## Events
```yaml
- id: reconfig
  description: "Sent when a change in current input frequency is detected"
  payload: "Reconfig"

- id: hot_plug_output
  description: "Hot plug event on an output"
  payload: "HplgO{output}*{state}"
  fields:
    - { name: output, type: integer }
    - { name: state, type: integer, description: "1=assertion, 0=de-assertion" }

- id: hdcp_input_change
  description: "Change in HDCP status of an input"
  payload: "HdcpI{input}*{status}"
  fields:
    - { name: input, type: integer }
    - { name: status, type: integer }

- id: hdcp_output_change
  description: "Change in HDCP status of an output"
  payload: "HdcpO{output}*{status}"
  fields:
    - { name: output, type: integer }
    - { name: status, type: integer }

- id: sync_change
  description: "Sync detected or removed on any input (per-input bitmap)"
  payload: "IN00 {status}*...*{status}"
  fields:
    - { name: status, type: bitmap, description: "Per-input video signal status 0/1" }

- id: cec_received_data
  description: "Asynchronous CEC received data in bidirectional mode"
  payload: "DcecO{output}*{address_byte}{data}*{result}"
  fields:
    - { name: output, type: integer }
    - { name: address_byte, type: string }
    - { name: data, type: string }
    - { name: result, type: integer }
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for:
  - reset_absolute
  - reset_absolute_retain_ip
  - reset_partial
  - erase_flash
  - erase_current_dir
  - erase_current_dir_recursive
interlocks:
  - id: network_reboot_required
    description: "TCP/IP setting changes (DHCP, IP, subnet, gateway, port mapping) do not take effect until 'E 2BOOT }' is issued"
  - id: admin_password_prereq_for_user
    description: "A user password cannot be assigned if no administrative password exists (E14 error returned)"
  - id: tp_remote_power_mode_lock
    description: "Remote power is forced to Off in HDBT and XTP modes; attempting to change while not in DTP mode returns E14"
notes:
  - "Factory-configured passwords for all accounts equal the device serial number; case-sensitive"
  - "Full factory reset (E ZQQQ }) removes serial-number passwords; unit then has no password"
  - "DisplayPort Input 1 has HDCP Authorized permanently enabled"
# UNRESOLVED: no electrical or voltage interlocks documented (power/current ratings not in this excerpt)
```

## Notes
- All command strings use the Extron SIS convention. In the source the escape character is rendered as "E"; the actual byte is 0x1B. The character "W" is interchangeable with E. The character "}" denotes carriage return (0x0D) with no LF; "]" denotes CR/LF in responses. The pipe "|" can substitute for "}". Spaces shown in the command tables are literal.
- Response format varies with verbose mode (E CV}): mode 0 returns terse responses; modes 1-3 prepend the command mnemonic (e.g., "Vmt", "HdcpE", "GrpmD"). In verbose response mode the device also emits unsolicited responses for setting changes triggered by signal changes or other interfaces.
- Audio DSP and Group Master commands apply only to the DTP2/XTP/HDBT output (output 2).
- CEC bidirectional mode (4) generates asynchronous "DcecO..." messages from sink devices; control software must parse them out-of-band.
- Three model variants share this command set: base (60-1615-01), IPCP SA (60-1615-02), and IPCP MA 70.
- The "Z" character in Audio Mute commands (`{output}*{state}ZAmt`, `ZAmt`) is rendered ambiguously in the source PDF extraction. Implementers should consult the original Extron SIS reference for the exact byte; based on context it appears to be a literal letter Z rather than escape.

<!-- UNRESOLVED: control TCP port (Telnet/SSH) — source describes Telnet/SSH access and a UART pass-through port (default 2000) but does not state the SIS control port number -->
<!-- UNRESOLVED: serial flow control — only baud/parity/data/stop documented as defaults -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->
<!-- UNRESOLVED: full set of CEC predefined command strings — source lists examples ("PwrOn", "PwrOff", "ShowMe") but not the complete dictionary -->
<!-- UNRESOLVED: command response timing/latency characteristics not stated -->
<!-- UNRESOLVED: per-block soft limit ranges for individual OIDs not enumerated in this excerpt -->

## Provenance

```yaml
source_domains:
  - extron.com
  - media.extron.com
  - manua.ls
  - manuals.ca
source_urls:
  - https://www.extron.com/download/files/userman/68-3438-01_D_DTP_2_CrossPoint_82.pdf
  - https://media.extron.com/public/download/files/userman/68-3438-50_A_DTP2_CP_82_SUG.pdf
  - https://media.extron.com/public/download/files/userman/IN180x_and_DTP2_CrossPoint_82.pdf
  - https://www.manua.ls/extron/dtp2-crosspoint-82/manual
  - https://www.manuals.ca/extron/dtp2-crosspoint-82/manual
retrieved_at: 2026-05-17T16:50:14.802Z
last_checked_at: 2026-05-20T11:56:12.371Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T11:56:12.371Z
matched_actions: 250
action_count: 250
confidence: medium
summary: "All 250 spec actions matched; transport verified. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "control TCP port (Telnet/SSH) not stated explicitly in source; UART pass-through start port is 2000 for over-TP UART, which is a different feature"
- "flow control not stated in source; only baud/parity/data/stop documented as defaults"
- "control Telnet/SSH port not stated in source"
- "no multi-step macros documented in source"
- "no electrical or voltage interlocks documented (power/current ratings not in this excerpt)"
- "control TCP port (Telnet/SSH) — source describes Telnet/SSH access and a UART pass-through port (default 2000) but does not state the SIS control port number"
- "serial flow control — only baud/parity/data/stop documented as defaults"
- "firmware version compatibility ranges not stated in source"
- "full set of CEC predefined command strings — source lists examples (\"PwrOn\", \"PwrOff\", \"ShowMe\") but not the complete dictionary"
- "command response timing/latency characteristics not stated"
- "per-block soft limit ranges for individual OIDs not enumerated in this excerpt"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
