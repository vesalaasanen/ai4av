---
spec_id: admin/lexicon-dc2-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lexicon DC-2 Control Spec"
manufacturer: Lexicon
model_family: "Lexicon DC-2"
aliases: []
compatible_with:
  manufacturers:
    - Lexicon
    - "Lexicon, Inc."
  models:
    - "Lexicon DC-2"
    - "Lexicon MC-1"
    - "JBL Synthesis SDP-3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.harmanluxuryaudio.com
  - manualslib.com
  - manualshelf.com
  - applicationmarket.crestron.com
source_urls:
  - "https://support.harmanluxuryaudio.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwc78d725d/pdfs/MC-1%20Serial%20Definition.pdf"
  - https://www.manualslib.com/manual/291470/Lexicon-Dc-2.html
  - https://www.manualshelf.com/manual/lexicon/dc-2/instruction-manual-english.html
  - https://applicationmarket.crestron.com/lexicon-inc-dc2-north-america/
retrieved_at: 2026-06-03T06:41:03.384Z
last_checked_at: 2026-06-04T06:27:08.876Z
generated_at: 2026-06-04T06:27:08.876Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility ranges not stated in source"
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "firmware version compatibility ranges, product safety/regulatory certifications, DC-2 vs MC-1 vs SDP-3 behavioral differences beyond the ProductId field are not stated in the source."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:27:08.876Z
  matched_actions: 42
  action_count: 42
  confidence: medium
  summary: "All 42 spec actions map 1-to-1 to source command codes in Appendix A; transport parameters confirmed verbatim in section 5.2; source catalogue is fully represented. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-03
---

# Lexicon DC-2 Control Spec

## Summary
Serial (RS-232) control protocol for the Lexicon DC-2 surround processor, also covering the MC-1 and JBL Synthesis SDP-3. Point-to-point, full-duplex binary protocol with framed packets (SOP, DLL data count, command, app data count, data, EOP). Supports parameter get/set, effect configuration, input naming, Zone 2 control, IR passthrough, and asynchronous wake/sleep/FPD notifications.

<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: odd
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from power-on/off events (Wakeup / Sleep notifications, Restore Defaults reset)
- routable        # inferred from input select, Zone 2 record input commands
- queryable       # inferred from GET_* command family returning state packets
- levelable       # inferred from Set System Volume, Set Zone 2 Volume, Output Level Adjustments
```

## Actions
```yaml
# All host-initiated commands (7.3.x and 7.2.x) and asynchronous notifications.
# Frame format: F1 <DLL_DC> <CMD> <AppDC> [data...] F2
# <DLL_DC> = 3 + <AppDC>. <AppDC> = number of application data bytes.
# Literal byte sequences below are copied from the source packet examples and
# Appendix A Command Codes.

- id: wakeup_notification
  label: Wakeup Notification (DC-2 -> Host)
  kind: event
  command: "F1 02 01 F2"
  params: []

- id: sleep_notification
  label: Sleep Notification (DC-2 -> Host)
  kind: event
  command: "F1 02 02 F2"
  params: []

- id: fpd_notification
  label: Front Panel Display Notification (DC-2 -> Host)
  kind: event
  command: "F1 2D 03 2A {line1:21 ASCII bytes null-terminated} {line2:21 ASCII bytes null-terminated} F2"
  params:
    - name: line1
      type: string
      description: FPD line 1 (max 20 chars, null-terminated). Bytes Data[0]-Data[21].
    - name: line2
      type: string
      description: FPD line 2 (max 20 chars, null-terminated). Bytes Data[22]-Data[42].

- id: parameter_change_notification
  label: Parameter Change Notification (DC-2 -> Host)
  kind: event
  command: "F1 05 04 02 {paramId} {value} F2"
  params:
    - name: paramId
      type: integer
      description: ParamId assigned to the changing system parameter
    - name: value
      type: integer
      description: Current value of the parameter (0..MaxValue)

- id: acknowledge
  label: Acknowledge (ACK)
  kind: event
  command: "F1 04 E0 01 {command} F2"
  params:
    - name: command
      type: integer
      description: The DC-2 command being acknowledged (Appendix A code)

- id: no_acknowledge
  label: No Acknowledge (NAK)
  kind: event
  command: "F1 05 E1 02 {command} {errorCode} F2"
  params:
    - name: command
      type: integer
      description: The DC-2 command being negatively acknowledged
    - name: errorCode
      type: integer
      description: Error code from Appendix B Error Codes

- id: reset_unit
  label: Reset Unit
  kind: action
  command: "F1 03 10 00 F2"
  params: []

- id: host_wakeup
  label: Host Wakeup
  kind: action
  command: "F1 03 11 00 F2"
  params: []

- id: host_sleep
  label: Host Sleep
  kind: action
  command: "F1 03 12 00 F2"
  params: []

- id: restore_defaults
  label: Restore Factory Defaults
  kind: action
  command: "F1 03 13 00 F2"
  params: []

- id: send_ir_command
  label: Send IR Command
  kind: action
  command: "F1 04 14 01 {keyCode} F2"
  params:
    - name: keyCode
      type: integer
      description: IR key code from Appendix C DC-2/MC-1 IR-Codes (e.g. 0x17 Volume Up, 0x16 Volume Down, 0x15 Mute, 0x12 DVD)

- id: get_unit_config
  label: Get Unit Configuration
  kind: query
  command: "F1 03 15 00 F2"
  params: []

- id: get_system_status
  label: Get System Status
  kind: query
  command: "F1 03 16 00 F2"
  params: []

- id: get_record_zone2_status
  label: Get Record/Zone 2 Status
  kind: query
  command: "F1 03 17 00 F2"
  params: []

- id: get_system_parameter_by_id
  label: Get System Parameter Definition by Id
  kind: query
  command: "F1 04 18 01 {paramId} F2"
  params:
    - name: paramId
      type: integer
      description: Parameter Id (0..System Parameter Count - 1)

- id: get_system_parameter_by_name
  label: Get System Parameter Definition by Name
  kind: query
  command: "F1 {len} 19 {strlen(name)+1} {name} 00 F2"
  params:
    - name: name
      type: string
      description: Parameter name (null-terminated ASCII, max PARAM_NAME_LENGTH=20)

- id: get_system_parameter_values
  label: Get System Parameter Values
  kind: query
  command: "F1 03 1A 00 F2"
  params: []

- id: get_effect_definition
  label: Get Effect Definition by Id
  kind: query
  command: "F1 04 1B 01 {effectId} F2"
  params:
    - name: effectId
      type: integer
      description: Effect Id (0..Total Number of Effects - 1)

- id: get_effect_parameter_definition
  label: Get Effect Parameter Definition
  kind: query
  command: "F1 05 1C 02 {effectId} {paramId} F2"
  params:
    - name: effectId
      type: integer
      description: Effect Id (0..Total Number of Effects - 1)
    - name: paramId
      type: integer
      description: Parameter number within the effect (0..MaxParameters-1)

- id: get_effect_parameter_values
  label: Get Effect Parameter Values
  kind: query
  command: "F1 04 1D 01 {effectId} F2"
  params:
    - name: effectId
      type: integer
      description: Effect Id (0..Total Number of Effects - 1)

- id: set_system_parameter_values
  label: Set System Parameter Values (bulk)
  kind: action
  command: "F1 {len} 1E {sys_param_count} {sys_param_value[0]} ... {sys_param_value[sys_param_count-1]} F2"
  params:
    - name: values
      type: array
      description: Array of unsigned 8-bit integers, length = System Parameter Count from Unit Config; each value bounded by its parameter's MaxValue

- id: set_effect_parameter_values
  label: Set Effect Parameter Values
  kind: action
  command: "F1 {len} 1F {effect_param_count+1} {effectId} {effect_param_value[0]} ... {effect_param_value[effect_param_count-1]} F2"
  params:
    - name: effectId
      type: integer
      description: Effect Id (0..Total Number of Effects - 1)
    - name: values
      type: array
      description: Array of unsigned 8-bit integers, length = EffectParamCount for this effect; each value bounded by its MaxValue

- id: set_effect_name
  label: Set Effect Name by Effect Id
  kind: action
  command: "F1 {len} 20 {strlen(name)+2} {effectId} {name} 00 F2"
  params:
    - name: effectId
      type: integer
      description: Effect Id (0..Total Number of Effects - 1)
    - name: name
      type: string
      description: New effect name (null-terminated ASCII, max EFFECT_NAME_LENGTH=13)

- id: set_system_volume
  label: Set System Volume
  kind: action
  command: "F1 04 21 01 {value} F2"
  params:
    - name: value
      type: integer
      description: Volume 0..92 (0=-80 dB, 92=+12 dB)

- id: set_main_balance
  label: Set Main Left/Right Balance
  kind: action
  command: "F1 04 22 01 {value} F2"
  params:
    - name: value
      type: integer
      description: Balance 0..32 (0=Left, 32=Right)

- id: set_front_back_balance
  label: Set Front/Back Balance (Fader)
  kind: action
  command: "F1 04 23 01 {value} F2"
  params:
    - name: value
      type: integer
      description: Front/Back balance 0..32 (0=Front, 32=Back)

- id: set_active_effect
  label: Set Active Effect by Id
  kind: action
  command: "F1 04 24 01 {effectId} F2"
  params:
    - name: effectId
      type: integer
      description: Effect Id (0..Total Number of Effects - 1)

- id: set_record_zone2_input
  label: Set Record/Zone 2 Input
  kind: action
  command: "F1 04 25 01 {inputId} F2"
  params:
    - name: inputId
      type: integer
      description: Input Id 0..7 (Appendix D: 0=Tape, 1=Tuner, 2=CD, 3=AUX, 4=TV, 5=V-Disc, 6=DVD, 7=VCR)

- id: clear_record_zone2_input
  label: Clear Record/Zone 2 Input
  kind: action
  command: "F1 04 26 01 {inputId} F2"
  params:
    - name: inputId
      type: integer
      description: Input Id 0..7 (Appendix D)

- id: set_zone2_volume
  label: Set Zone 2 Volume
  kind: action
  command: "F1 04 27 01 {value} F2"
  params:
    - name: value
      type: integer
      description: Zone 2 volume 0..92 (0=-80 dB, 92=+12 dB)

- id: set_zone2_balance
  label: Set Zone 2 Left/Right Balance
  kind: action
  command: "F1 04 28 01 {value} F2"
  params:
    - name: value
      type: integer
      description: Zone 2 balance 0..32 (0=Left, 32=Right)

- id: get_fpd_control_registers
  label: Get FPD Control Registers
  kind: query
  command: "F1 03 29 00 F2"
  params: []

- id: set_fpd_control_registers
  label: Set FPD Control Registers
  kind: action
  command: "F1 07 2A 04 {fpd_ctrlreg0} {fpd_ctrlreg1} {fpd_ctrlreg2} {fpd_minupdate} F2"
  params:
    - name: fpd_ctrlreg0
      type: integer
      description: BitPack of USER_MSG, REC_BLOCK_MSG, SYS_VOL_MSG, LOCKED_MSG, DIG_IN_NOLOCK_MSG, SPEAKER_ERR_MSG, LR_BALANCE_MSG, FB_BALANCE_MSG (Appendix F)
    - name: fpd_ctrlreg1
      type: integer
      description: BitPack of SYS_MUTE_MSG, EQ_BASS_MSG, EQ_TREBLE_MSG, EQ_TILT_MSG, PGM_CHG_MSG, NOISE_ACTIVE_MSG, Z2_KEY_ERR_MSG, REC_SRC_ERR_MSG (Appendix F)
    - name: fpd_ctrlreg2
      type: integer
      description: BitPack of Z2_VOLUME_MSG, Z2_BALANCE_MSG, Z2_MUTE_MSG, REC_SELECT_MSG, DIG_REC_ERR_MSG, BYPASS_ERR_MSG, MAIN_DISP_MSG, DTS_ERR_MSG (Appendix F)
    - name: fpd_minupdate
      type: integer
      description: Minimum FPD update interval. Default 50 (100 mSec). Range 50-255 counts, 500 counts/sec.

- id: get_custom_name
  label: Get Custom Name
  kind: query
  command: "F1 03 2B 00 F2"
  params: []

- id: set_custom_name
  label: Set Custom Name (Power-on Banner)
  kind: action
  command: "F1 {len} 2C {strlen(name)+2} {enable} {name} 00 F2"
  params:
    - name: enable
      type: boolean
      description: TRUE enables custom name banner on power-on; FALSE disables
    - name: name
      type: string
      description: Custom name (null-terminated ASCII, max CUSTOM_NAME_LENGTH=20)

- id: get_input_name
  label: Get Input Name by Id
  kind: query
  command: "F1 04 2D 01 {inputId} F2"
  params:
    - name: inputId
      type: integer
      description: Input Id 0..7 (Appendix D)

- id: set_input_name
  label: Set Input Name by Id
  kind: action
  command: "F1 0D 2E 09 03 4D 59 20 49 4E 50 55 54 00 F2"  # example: AUX(3) -> "MY INPUT"
  params:
    - name: inputId
      type: integer
      description: Input Id 0..7 (Appendix D)
    - name: name
      type: string
      description: New input name (null-terminated ASCII, max INPUT_NAME_LENGTH=8)

- id: get_communication_configuration
  label: Get Communication Configuration
  kind: query
  command: "F1 03 2F 00 F2"
  params: []

- id: set_communication_configuration
  label: Set Communication Configuration
  kind: action
  command: "F1 04 30 01 {configurationRegister0} F2"
  params:
    - name: acknowledgeEnable
      type: boolean
      description: Bit 0: TRUE enables positive ACK notifications; FALSE disables (NAK always sent)
    - name: parameterChangeEnable
      type: boolean
      description: Bit 1: TRUE enables Parameter Change Notifications; FALSE disables
    - name: ledAcknowledgeEnable
      type: boolean
      description: Bit 2: TRUE enables standby/overload LED traffic indication; FALSE disables

- id: set_mute
  label: Set Mute State
  kind: action
  command: "F1 04 31 01 {muteState} F2"
  params:
    - name: muteState
      type: enum
      description: 0=UNMUTE, 1=USER MUTE (decrement by user amount), 2=FULL MUTE

- id: set_output_level_adjustment
  label: Set Output Level Adjustment
  kind: action
  command: "F1 05 32 02 {adjustmentValue} {outputId} F2"
  params:
    - name: adjustmentValue
      type: integer
      description: 0..40 counts. 0=-10 dB, 40=+10 dB, step 0.5 dB/count
    - name: outputId
      type: integer
      description: Speaker output: 0=Center, 1=Subwoofer, 2=Front Left, 3=Front Right, 4=Side Left, 5=Side Right, 6=Rear Left, 7=Rear Right

- id: send_display_string
  label: Send Display String (OSD + FPD)
  kind: action
  command: "F1 {len} 33 {strlen(str)+2} {displayFlags} {str} 00 F2"
  params:
    - name: displayFlags
      type: integer
      description: Bit 0: TRUE=FPD only; FALSE=OSD+FPD. Bits 1-7 undefined.
    - name: str
      type: string
      description: Display string (null-terminated ASCII, max 40 chars; truncated if longer)
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
  description: "Inferred from Wakeup (0x01) and Sleep (0x02) notifications. Hard power down is not notified."

- id: front_panel_display
  type: string
  description: "Two 20-char null-terminated ASCII lines, transmitted on FPD updates."

- id: parameter_change
  type: object
  description: "ParamId + Value pair on each system parameter change (PROGRAM, MUTE, VOLUME, LR_BALANCE, INPUT, RECORD_ENABLED, Z2_VOL, Z2_BAL, Z2_MUTE, BASS, TREBLE, LOUDNESS, TILT, MENU_BKGND)."

- id: unit_config
  type: object
  description: "ProductId (1=DC-2, 2=MC-1, 3=SDP-3), Software Type (1=THX, 2=AC3, 3=DTS), Software Level (0=RELEASED, 1=PRE_ALPHA, 2=ALPHA, 3=BETA, 4=GAMMA, 5=UNSUPPORTED), SW Major/Minor Rev, Protocol Major/Minor Rev, Total System Parameters, Total Effects, 16-byte null-terminated ASCII timestamp 'yy/mm/dd hh:mm'."

- id: system_status
  type: object
  description: "SystemVolume (0=-80dB..92=+12dB), CurrentInput, CurrentEffectId, SampleRate (0=UNKNOWN,1=44.1,2=48,3=88.2,4=96 kHz), InputFormat (0=UNKNOWN,1=AC3,2=PCM,3=ANALOG,4=DTS,5=AC3_2.0,6=AC3_5.1), MuteActive, EffectBypassActive, L/R Balance (0=Left..32=Right), F/B Balance (0=Front..32=Back), VideoSynch."

- id: record_zone2_status
  type: object
  description: "Zone2Volume, AssignedInput, Zone2MuteActive, RecordActive, Zone2Balance (0=Left..32=Right)."

- id: system_parameter_definition
  type: object
  description: "ParamId, MaxValue, Value, null-terminated ParamName (max 20 chars)."

- id: system_parameter_values
  type: array
  description: "Array of unsigned 8-bit integers, length = System Parameter Count from Unit Config."

- id: effect_definition
  type: object
  description: "EffectId, MaxParameters, null-terminated EffectName (max 13 chars)."

- id: effect_parameter_definition
  type: object
  description: "EffectId, ParamId, MaxValue, Value."

- id: effect_parameter_values
  type: array
  description: "Array of unsigned 8-bit integers, length = EffectParamCount for the requested effect."

- id: custom_name
  type: string
  description: "Null-terminated ASCII custom name (max 20 chars)."

- id: input_name
  type: object
  description: "InputId (0..7) plus null-terminated ASCII name (max 8 chars)."

- id: fpd_control_registers
  type: object
  description: "FPD_CtrlReg0, FPD_CtrlReg1, FPD_CtrlReg2 (BitPacks per Appendix F), FPD_MinUpdate (50-255, 500 counts/sec, default 50)."

- id: communication_configuration
  type: object
  description: "Configuration Register 0: bit0=AcknowledgeEnable, bit1=ParameterChangeEnable, bit2=LedAcknowledgeEnable."

- id: peek_value
  type: object
  description: "DC_RESP_PEEK_VALUE (0x8B) - internal use only, not for external distribution."
```

## Variables
```yaml
# Documented settable system parameters (all 8-bit unsigned, 0..MaxValue):
- id: program
  label: Current Effect (PROGRAM)
  type: integer
  description: "Effect selection. 0..MaxValue as defined per system."

- id: mute
  label: Mute
  type: enum
  values: [unmuted, user_mute, full_mute]
  description: "0=UNMUTE, 1=USER MUTE, 2=FULL MUTE"

- id: volume
  label: System Volume
  type: integer
  description: "0..92 (0=-80 dB, 92=+12 dB)"

- id: lr_balance
  label: Left/Right Balance
  type: integer
  description: "0..32 (0=Left, 32=Right)"

- id: fb_balance
  label: Front/Back Balance
  type: integer
  description: "0..32 (0=Front, 32=Back)"

- id: input
  label: Current Input
  type: integer
  description: "0..7 (Appendix D: Tape, Tuner, CD, AUX, TV, V-Disc, DVD, VCR)"

- id: record_enabled
  label: Record/Zone 2 On/Off
  type: boolean
  description: "Enables or disables the Record/Zone 2 output path."

- id: z2_volume
  label: Zone 2 Volume
  type: integer
  description: "0..92 (0=-80 dB, 92=+12 dB)"

- id: z2_balance
  label: Zone 2 Balance
  type: integer
  description: "0..32 (0=Left, 32=Right)"

- id: z2_mute
  label: Zone 2 Mute
  type: boolean
  description: "Zone 2 mute state."

- id: bass
  label: Bass EQ
  type: integer
  description: "Bass level, 0..MaxValue per system parameter definition."

- id: treble
  label: Treble EQ
  type: integer
  description: "Treble level, 0..MaxValue per system parameter definition."

- id: loudness
  label: Loudness
  type: boolean
  description: "Loudness contour on/off."

- id: tilt
  label: Tilt EQ
  type: integer
  description: "Tilt level, 0..MaxValue per system parameter definition."

- id: menu_bkgnd
  label: Menu Background On/Off
  type: boolean
  description: "Enables/disables the menu background display."
```

## Events
```yaml
- id: wakeup
  label: DC-2 Power-On / Reset
  description: "DC_WAKEUP (0x01). Sent by DC-2 after power-on or reset. Waits for ACK up to ACK_TIMEOUT, otherwise continues operating. Retransmits until ACK or RETRANSMIT_COUNT is reached."

- id: sleep
  label: DC-2 Entering Standby
  description: "DC_SLEEP (0x02). Sent by DC-2 when shutting down into standby. No ACK required. Hard power-down is not notified."

- id: front_panel_update
  label: Front Panel Display Update
  description: "DC_FPD (0x03). Two null-terminated ASCII lines, 20 chars each. Transmit rate controlled by FPD control registers. No host response expected."

- id: parameter_change
  label: Parameter Value Change
  description: "DC_PARAM_CHG_MSG (0x04). Sent on any user or system action that changes a tracked system parameter. No host response expected."

- id: ack
  label: Acknowledge
  description: "DC_ACK (0xE0). Positive acknowledgment of a host command. Data byte = command being acknowledged."

- id: nak
  label: No Acknowledge
  description: "DC_NAK (0xE1). Data = command + error code from Appendix B (DC_ERR_PARITY 0x02, DC_ERR_FRAMING 0x03, DC_ERR_OVERRUN 0x04, DC_ERR_INVALID_PACKET 0x05, DC_ERR_TIME_OUT 0x06, DC_ERR_BUFFER_FULL 0x07, DC_INVALID_COUNT 0x10, DC_INVALID_CMD 0x11, DC_INVALID_DATA 0x12, DC_INVALID_ADDRESS 0x13, DC_INVALID_EFFECT_ID 0x14, DC_INVALID_PARAM_ID 0x15, DC_INVALID_NAME 0x16, DC_INVALID_INPUT 0x17)."
```

## Macros
```yaml
# Multi-step sequences described explicitly in section 15 (Application Notes).
- id: upload_complete_system_setup
  label: Upload Complete System Setup from DC-2
  steps:
    - "GET_UNIT_CONFIG (0x15) - learn SW versions, param/effect counts"
    - "GET_SYS_PARAM_VALUES (0x1A) - bulk system parameter values"
    - "GET_SYS_PARAM_BY_ID (0x18) for each parameter - definitions"
    - "GET_EFFECT (0x1B) for each effect - effect definitions"
    - "GET_EFFECT_PARAM_DEF (0x1C) for each (effect,param) - effect param defs"
    - "GET_INPUT_NAME (0x2D) for each of 8 inputs"
    - "GET_CUST_NAME (0x2B) - custom power-on name"

- id: download_complete_system_setup
  label: Download Complete System Setup to DC-2
  steps:
    - "Verify compatibility via GET_UNIT_CONFIG (SW levels, versions, param/effect counts)"
    - "SET_CUST_NAME (0x2C)"
    - "SET_INPUT_NAME (0x2E) for each of 8 inputs"
    - "SET_EFFECT_NAME (0x20) for each effect"
    - "SET_EFFECT_PARAM_VALUES (0x1F) for each effect"
    - "SET_SYS_PARAM_VALUES (0x1E) - last; unit resets to initialize"

- id: host_initialization_handshake
  label: Host Initialization Handshake
  steps:
    - "HOST transmits HOST_WAKEUP (0x11)"
    - "DC-2 responds with ACK"
    - "DC-2 transmits current FPD buffer via DC_FPD (0x03)"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in the source.
```

## Notes
- DB-9 female connector labeled "RS232" on the rear panel. DC-2 has 1 port; MC-1 has 2 ports (Ch A on both). Pin 2 = Tx from DC-2 perspective (Rx on host), pin 3 = Rx on DC-2 (Tx from host), pin 5 = ground. Use a male-to-female straight-through cable.
- All packets are framed: `F1 <DLL_DC> <CMD> <AppDC> [data...] F2` where DLL_DC = 3 + AppDC.
- Application data is composed of: Parameter Name / Input Name / Effect Name / Custom Name = null-terminated ASCII strings.
- INTER_PACKET_TIME = 200 mSec between packets (Appendix E).
- FPD_LINE_LENGTH=20, PARAM_NAME_LENGTH=20, EFFECT_NAME_LENGTH=13, CUSTOM_NAME_LENGTH=20, INPUT_NAME_LENGTH=8 (Appendix E).
- Hardware verification: install RS-232 wraparound plug (pins 2-3 shorted) on rear-panel "RS232" connector and power cycle. After ~20 seconds the VFD displays "SERIAL PORT A PASSED" / "SERIAL PORT B PASSED" (2 seconds), then enters normal mode.
- Receive buffer is 256 bytes; if full, DC-2 transmits NAK with DC_ERR_BUFFER_FULL (0x07) and ignores further data until cleared.
- 8 FPD custom character codes (ASCII 0x08-0x0F) are used for volume-bar glyphs.
- SW Level field describes the internal application software status, not a hardware revision.
- DC_PEEK (0x08), DC_POKE (0x09), DC_DEBUG_STRING (0x40), DC_DEBUG_CHAR (0x41), PEEK and POKE commands are marked "Not Supported for External Distribution" and are omitted from the Actions block.
- IR codes (Appendix C) range 0x00-0xFF; valid set is the listed table including shift functions and record/zone-2 functions.

<!-- UNRESOLVED: firmware version compatibility ranges, product safety/regulatory certifications, DC-2 vs MC-1 vs SDP-3 behavioral differences beyond the ProductId field are not stated in the source. -->

## Provenance

```yaml
source_domains:
  - support.harmanluxuryaudio.com
  - manualslib.com
  - manualshelf.com
  - applicationmarket.crestron.com
source_urls:
  - "https://support.harmanluxuryaudio.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwc78d725d/pdfs/MC-1%20Serial%20Definition.pdf"
  - https://www.manualslib.com/manual/291470/Lexicon-Dc-2.html
  - https://www.manualshelf.com/manual/lexicon/dc-2/instruction-manual-english.html
  - https://applicationmarket.crestron.com/lexicon-inc-dc2-north-america/
retrieved_at: 2026-06-03T06:41:03.384Z
last_checked_at: 2026-06-04T06:27:08.876Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:27:08.876Z
matched_actions: 42
action_count: 42
confidence: medium
summary: "All 42 spec actions map 1-to-1 to source command codes in Appendix A; transport parameters confirmed verbatim in section 5.2; source catalogue is fully represented. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility ranges not stated in source"
- "no safety warnings, interlock procedures, or power-on sequencing"
- "firmware version compatibility ranges, product safety/regulatory certifications, DC-2 vs MC-1 vs SDP-3 behavioral differences beyond the ProductId field are not stated in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
