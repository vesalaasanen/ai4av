---
spec_id: admin/sennheiser-adn-cu-1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sennheiser ADN CU 1 Control Spec"
manufacturer: Sennheiser
model_family: "ADN CU1"
aliases: []
compatible_with:
  manufacturers:
    - Sennheiser
  models:
    - "ADN CU1"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.sennheiser.com
source_urls:
  - "https://assets.sennheiser.com/download/assets/QG_ADNMediaCtrlProtocol_A02_EN.pdf/1f94ac1ce7b811f0bce7beb43c66122a?attachment=true"
retrieved_at: 2026-09-26T14:23:19.046Z
last_checked_at: 2026-09-26T14:23:19.046Z
generated_at: 2026-09-26T14:23:19.046Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source prose calls the unit dBU while its enumeration uses dB; no conversion is inferred.\""
  - "source prose calls the unit dBU while its enumeration uses dB; no conversion is inferred. Source: printed p. 22.\""
  - "Source does not specify safety interlocks, operator confirmation, or error recovery procedures."
verification:
  verdict: verified
  checked_at: 2026-09-26T14:23:19.046Z
  matched_actions: 81
  action_count: 81
  confidence: medium
  summary: "Independent complete primary-manual review:47 distinct wire mnemonics support81 Get/Set actions and42 Update families; all prior47 IDs, targeted parameters,17 relative domains,scaled indexes,TCP framing and model scope match; source ambiguities and firmware/auth unknowns remain explicit. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Sennheiser ADN CU 1 Control Spec

## Summary
The Sennheiser ADN CU1 conference central unit accepts ASCII MediaCtrl commands over TCP port 53252. This revision follows the manufacturer's ADN MediaCtrl Protocol, Publ. 03/15, 549157/A02; antenna-module and speaking-unit operations are addressed through the CU, not independent network endpoints. It covers all 47 named command families, with Set and Get operations separated and Update messages documented as feedback.

## Transport
```yaml
protocols:
  - "tcp"
addressing:
  port: 53252
auth:
  type: "UNRESOLVED"
```

## Traits
```yaml
- "queryable"
- "levelable"
```

## Actions
```yaml
- id: "all_mics_off"
  label: "AllMicsOff Set"
  kind: "action"
  command: "AllMicsOff {execute};"
  params:
    - name: "execute"
      type: "integer"
      min: 1
      max: 1
      description: "Switch all microphones off. Relative changes are not allowed."
  description: "Switch all microphones off. Source: printed p. 7."
- id: "reinit_system"
  label: "ReinitSystem Set"
  kind: "action"
  command: "ReinitSystem {execute};"
  params:
    - name: "execute"
      type: "integer"
      min: 1
      max: 1
      description: "Re-initialize the system. Relative changes are not allowed."
  description: "Re-initialize the system. Source: printed p. 16."
- id: "mic_button"
  label: "MicButton Set"
  kind: "action"
  command: "MicButton {bus_pos};"
  params:
    - name: "bus_pos"
      type: "integer"
      min: 1
      description: "Wired microphone bus position; source gives no maximum."
  description: "Virtually press the microphone button: request activation if off and vice versa. A successful example returns MicStatus; this is not a direct state setter. Source: printed p. 14."
- id: "mic_button_sn"
  label: "MicButtonSN Set"
  kind: "action"
  command: "MicButtonSN {serial_number};"
  params:
    - name: "serial_number"
      type: "string"
      description: "Identification code plus six decimal digits; see Notes. Required target identifier."
  description: "Virtually press the microphone button identified by serial number. Wired units respond using EtherCat bus position (MicStatus); wireless units use MicStatusSN. Source: printed p. 14."
- id: "set_cu_date_time"
  label: "SetCUDateTime Set"
  kind: "action"
  command: "SetCUDateTime {year} {month} {day} {hour} {minute} {second};"
  params:
    - name: "year"
      type: "integer"
      min: 1900
      max: 3000
      description: "Decimal year."
    - name: "month"
      type: "integer"
      min: 1
      max: 12
      description: "Decimal month."
    - name: "day"
      type: "integer"
      min: 1
      max: 31
      description: "Decimal day."
    - name: "hour"
      type: "integer"
      min: 0
      max: 23
      description: "Decimal hour."
    - name: "minute"
      type: "integer"
      min: 0
      max: 59
      description: "Decimal minute."
    - name: "second"
      type: "integer"
      min: 0
      max: 59
      description: "Decimal second."
  description: "Set CU date and time. Invalid calendar dates have no effect. No relative parameters. Source: printed p. 16."
- id: "am_rf_channel"
  label: "AmRfChannel Set"
  kind: "action"
  command: "AmRfChannel {serial_number} {rf_channel};"
  params:
    - name: "serial_number"
      type: "string"
      description: "Antenna module identifier: AM followed by six decimal digits (for example AM100001)."
    - name: "rf_channel"
      type: "integer"
      min: 1
      max: 31
      description: "RF channel of the identified antenna module. 1..30=RfChannel_01..30; 31=RfChannel_searching. The source includes 31 in the shared Set/Update value range. Relative changes are not allowed."
  description: "RF channel of the identified antenna module. 1..30=RfChannel_01..30; 31=RfChannel_searching. The source includes 31 in the shared Set/Update value range. Source: printed p. 8."
- id: "am_rf_channel_query"
  label: "AmRfChannel Get"
  kind: "query"
  command: "AmRfChannel {serial_number};"
  params:
    - name: "serial_number"
      type: "string"
      description: "Antenna module identifier: AM followed by six decimal digits (for example AM100001)."
  description: "Read current value. RF channel of the identified antenna module. 1..30=RfChannel_01..30; 31=RfChannel_searching. The source includes 31 in the shared Set/Update value range. Source: printed p. 8."
- id: "am_rf_output_power"
  label: "AmRfOutputPower Set"
  kind: "action"
  command: "AmRfOutputPower {serial_number} {rf_output_power};"
  params:
    - name: "serial_number"
      type: "string"
      description: "Antenna module identifier: AM followed by six decimal digits (for example AM100001)."
    - name: "rf_output_power"
      type: "integer"
      min: 1
      max: 6
      description: "RF output-power index: 1=0%, 2=20%, 3=40%, 4=60%, 5=80%, 6=100%. Relative changes are not allowed."
  description: "RF output-power index: 1=0%, 2=20%, 3=40%, 4=60%, 5=80%, 6=100%. Source: printed p. 8."
- id: "am_rf_output_power_query"
  label: "AmRfOutputPower Get"
  kind: "query"
  command: "AmRfOutputPower {serial_number};"
  params:
    - name: "serial_number"
      type: "string"
      description: "Antenna module identifier: AM followed by six decimal digits (for example AM100001)."
  description: "Read current value. RF output-power index: 1=0%, 2=20%, 3=40%, 4=60%, 5=80%, 6=100%. Source: printed p. 8."
- id: "auto_freq_selection"
  label: "AutoFreqSelection Set"
  kind: "action"
  command: "AutoFreqSelection {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "1 makes all antenna modules select their frequency automatically. Relative changes are not allowed."
  description: "1 makes all antenna modules select their frequency automatically. Source: printed p. 9."
- id: "auto_freq_selection_query"
  label: "AutoFreqSelection Get"
  kind: "query"
  command: "AutoFreqSelection;"
  params: []
  description: "Read current value. 1 makes all antenna modules select their frequency automatically. Source: printed p. 9."
- id: "blink_on_req"
  label: "BlinkOnReq Set"
  kind: "action"
  command: "BlinkOnReq {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "1 makes the light ring blink while the microphone is in request mode. Relative changes are not allowed."
  description: "1 makes the light ring blink while the microphone is in request mode. Source: printed p. 9."
- id: "blink_on_req_query"
  label: "BlinkOnReq Get"
  kind: "query"
  command: "BlinkOnReq;"
  params: []
  description: "Read current value. 1 makes the light ring blink while the microphone is in request mode. Source: printed p. 9."
- id: "clear_does_clean_request_list"
  label: "ClearDoesCleanRequestList Set"
  kind: "action"
  command: "ClearDoesCleanRequestList {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "Clear speaker request list on cancel: 0=off, 1=on. Relative changes are not allowed."
  description: "Clear speaker request list on cancel: 0=off, 1=on. Source: printed p. 9."
- id: "clear_does_clean_request_list_query"
  label: "ClearDoesCleanRequestList Get"
  kind: "query"
  command: "ClearDoesCleanRequestList;"
  params: []
  description: "Read current value. Clear speaker request list on cancel: 0=off, 1=on. Source: printed p. 9."
- id: "conference_mode"
  label: "ConferenceMode Set"
  kind: "action"
  command: "ConferenceMode {conf_mode};"
  params:
    - name: "conf_mode"
      type: "integer"
      min: 1
      max: 4
      description: "1=Automatic, 2=Overrun, 3=Request, 4=PushToTalk. Relative changes are not allowed."
  description: "1=Automatic, 2=Overrun, 3=Request, 4=PushToTalk. Source: printed p. 9."
- id: "conference_mode_query"
  label: "ConferenceMode Get"
  kind: "query"
  command: "ConferenceMode;"
  params: []
  description: "Read current value. 1=Automatic, 2=Overrun, 3=Request, 4=PushToTalk. Source: printed p. 9."
- id: "enable_su_w_shutdown"
  label: "EnableSUwShutdown Set"
  kind: "action"
  command: "EnableSUwShutdown {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "1 allows users to shut down wireless speaking units. Relative changes are not allowed."
  description: "1 allows users to shut down wireless speaking units. Source: printed p. 9."
- id: "enable_su_w_shutdown_query"
  label: "EnableSUwShutdown Get"
  kind: "query"
  command: "EnableSUwShutdown;"
  params: []
  description: "Read current value. 1 allows users to shut down wireless speaking units. Source: printed p. 9."
- id: "floor_equalizer_high"
  label: "FloorEqualizerHigh Set"
  kind: "action"
  command: "FloorEqualizerHigh {eq_value};"
  params:
    - name: "eq_value"
      type: "string"
      description: "Absolute decimal integer 1..25, or # followed by signed integer delta in index units (for example #1 or #-1). Relative-result handling outside the documented range is UNRESOLVED. Floor (speaking-unit speakers) high equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB)."
  description: "Floor (speaking-unit speakers) high equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB). Source: printed p. 10."
- id: "floor_equalizer_high_query"
  label: "FloorEqualizerHigh Get"
  kind: "query"
  command: "FloorEqualizerHigh;"
  params: []
  description: "Read current value. Floor (speaking-unit speakers) high equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB). Source: printed p. 10."
- id: "floor_equalizer_mid"
  label: "FloorEqualizerMid Set"
  kind: "action"
  command: "FloorEqualizerMid {eq_value};"
  params:
    - name: "eq_value"
      type: "string"
      description: "Absolute decimal integer 1..25, or # followed by signed integer delta in index units (for example #1 or #-1). Relative-result handling outside the documented range is UNRESOLVED. Floor (speaking-unit speakers) mid equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB)."
  description: "Floor (speaking-unit speakers) mid equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB). Source: printed p. 11."
- id: "floor_equalizer_mid_query"
  label: "FloorEqualizerMid Get"
  kind: "query"
  command: "FloorEqualizerMid;"
  params: []
  description: "Read current value. Floor (speaking-unit speakers) mid equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB). Source: printed p. 11."
- id: "floor_equalizer_low"
  label: "FloorEqualizerLow Set"
  kind: "action"
  command: "FloorEqualizerLow {eq_value};"
  params:
    - name: "eq_value"
      type: "string"
      description: "Absolute decimal integer 1..25, or # followed by signed integer delta in index units (for example #1 or #-1). Relative-result handling outside the documented range is UNRESOLVED. Floor (speaking-unit speakers) low equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB)."
  description: "Floor (speaking-unit speakers) low equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB). Source: printed p. 12."
- id: "floor_equalizer_low_query"
  label: "FloorEqualizerLow Get"
  kind: "query"
  command: "FloorEqualizerLow;"
  params: []
  description: "Read current value. Floor (speaking-unit speakers) low equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB). Source: printed p. 12."
- id: "floor_mix"
  label: "FloorMix Set"
  kind: "action"
  command: "FloorMix {floor_mix};"
  params:
    - name: "floor_mix"
      type: "string"
      description: "Absolute decimal integer 1..8, or # followed by signed integer delta in index units (for example #1 or #-1). Relative-result handling outside the documented range is UNRESOLVED. Audio gain-reduction index: 1=0.0 dB, 2=0.5 dB, 3=1.0 dB, 4=1.5 dB, 5=2.0 dB, 6=2.5 dB, 7=3.0 dB, 8=Linear Division. CU displays FloorMix_DivByNumOfChanels as Linear Division."
  description: "Audio gain-reduction index: 1=0.0 dB, 2=0.5 dB, 3=1.0 dB, 4=1.5 dB, 5=2.0 dB, 6=2.5 dB, 7=3.0 dB, 8=Linear Division. CU displays FloorMix_DivByNumOfChanels as Linear Division. Source: printed p. 12."
- id: "floor_mix_query"
  label: "FloorMix Get"
  kind: "query"
  command: "FloorMix;"
  params: []
  description: "Read current value. Audio gain-reduction index: 1=0.0 dB, 2=0.5 dB, 3=1.0 dB, 4=1.5 dB, 5=2.0 dB, 6=2.5 dB, 7=3.0 dB, 8=Linear Division. CU displays FloorMix_DivByNumOfChanels as Linear Division. Source: printed p. 12."
- id: "floor_volume"
  label: "FloorVolume Set"
  kind: "action"
  command: "FloorVolume {volume};"
  params:
    - name: "volume"
      type: "string"
      description: "Absolute decimal integer 0..32, or # followed by signed integer delta in index units (for example #1 or #-1). Relative-result handling outside the documented range is UNRESOLVED. Floor (speaking-unit speakers) volume index; no dB mapping is supplied."
  description: "Floor (speaking-unit speakers) volume index; no dB mapping is supplied. Source: printed p. 12."
- id: "floor_volume_query"
  label: "FloorVolume Get"
  kind: "query"
  command: "FloorVolume;"
  params: []
  description: "Read current value. Floor (speaking-unit speakers) volume index; no dB mapping is supplied. Source: printed p. 12."
- id: "hd_record_is_active"
  label: "HdRecordIsActive Set"
  kind: "action"
  command: "HdRecordIsActive {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "Hard-disc recording: 0=inactive, 1=active. Relative changes are not allowed."
  description: "Hard-disc recording: 0=inactive, 1=active. Source: printed p. 13."
- id: "hd_record_is_active_query"
  label: "HdRecordIsActive Get"
  kind: "query"
  command: "HdRecordIsActive;"
  params: []
  description: "Read current value. Hard-disc recording: 0=inactive, 1=active. Source: printed p. 13."
- id: "limit_of_talk_time"
  label: "LimitOfTalkTime Set"
  kind: "action"
  command: "LimitOfTalkTime {limit_tt};"
  params:
    - name: "limit_tt"
      type: "string"
      description: "Absolute decimal integer 0..60, or # followed by signed integer delta in index units (for example #1 or #-1). Relative-result handling outside the documented range is UNRESOLVED. Talk-time limit in minutes; 0=unlimited."
  description: "Talk-time limit in minutes; 0=unlimited. Source: printed p. 13."
- id: "limit_of_talk_time_query"
  label: "LimitOfTalkTime Get"
  kind: "query"
  command: "LimitOfTalkTime;"
  params: []
  description: "Read current value. Talk-time limit in minutes; 0=unlimited. Source: printed p. 13."
- id: "max_open_mic"
  label: "MaxOpenMic Set"
  kind: "action"
  command: "MaxOpenMic {max_num};"
  params:
    - name: "max_num"
      type: "string"
      description: "Absolute decimal integer 1..10, or # followed by signed integer delta in index units (for example #1 or #-1). Relative-result handling outside the documented range is UNRESOLVED. Maximum number of microphones open simultaneously."
  description: "Maximum number of microphones open simultaneously. Source: printed p. 13."
- id: "max_open_mic_query"
  label: "MaxOpenMic Get"
  kind: "query"
  command: "MaxOpenMic;"
  params: []
  description: "Read current value. Maximum number of microphones open simultaneously. Source: printed p. 13."
- id: "max_speak_req_list_length"
  label: "MaxSpeakReqListLength Set"
  kind: "action"
  command: "MaxSpeakReqListLength {max_num};"
  params:
    - name: "max_num"
      type: "string"
      description: "Absolute decimal integer 1..10, or # followed by signed integer delta in index units (for example #1 or #-1). Relative-result handling outside the documented range is UNRESOLVED. Maximum number of microphones in request status."
  description: "Maximum number of microphones in request status. Source: printed p. 14."
- id: "max_speak_req_list_length_query"
  label: "MaxSpeakReqListLength Get"
  kind: "query"
  command: "MaxSpeakReqListLength;"
  params: []
  description: "Read current value. Maximum number of microphones in request status. Source: printed p. 14."
- id: "open_access_mode"
  label: "OpenAccessMode Set"
  kind: "action"
  command: "OpenAccessMode {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "1 activates open access mode. Relative changes are not allowed."
  description: "1 activates open access mode. Source: printed p. 15."
- id: "open_access_mode_query"
  label: "OpenAccessMode Get"
  kind: "query"
  command: "OpenAccessMode;"
  params: []
  description: "Read current value. 1 activates open access mode. Source: printed p. 15."
- id: "premonition_time"
  label: "PremonitionTime Set"
  kind: "action"
  command: "PremonitionTime {prem_sec};"
  params:
    - name: "prem_sec"
      type: "string"
      description: "Absolute decimal integer 1..13, or # followed by signed integer delta in index units (for example #1 or #-1). Relative-result handling outside the documented range is UNRESOLVED. Warning-time INDEX, not seconds: seconds = 10 * (index - 1). 1=0 s, 2=10 s, ..., 13=120 s before talk time ends."
  description: "Warning-time INDEX, not seconds: seconds = 10 * (index - 1). 1=0 s, 2=10 s, ..., 13=120 s before talk time ends. Source: printed p. 16."
- id: "premonition_time_query"
  label: "PremonitionTime Get"
  kind: "query"
  command: "PremonitionTime;"
  params: []
  description: "Read current value. Warning-time INDEX, not seconds: seconds = 10 * (index - 1). 1=0 s, 2=10 s, ..., 13=120 s before talk time ends. Source: printed p. 16."
- id: "speaker_feedback_suppression"
  label: "SpeakerFeedbackSuppression Set"
  kind: "action"
  command: "SpeakerFeedbackSuppression {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 1
      max: 3
      description: "Feedback suppression: 1=Off, 2=LowIntensity, 3=HighIntensity. Relative changes are not allowed."
  description: "Feedback suppression: 1=Off, 2=LowIntensity, 3=HighIntensity. Source: printed p. 17."
- id: "speaker_feedback_suppression_query"
  label: "SpeakerFeedbackSuppression Get"
  kind: "query"
  command: "SpeakerFeedbackSuppression;"
  params: []
  description: "Read current value. Feedback suppression: 1=Off, 2=LowIntensity, 3=HighIntensity. Source: printed p. 17."
- id: "switchable_mic_volume_is_active"
  label: "SwitchableMicVolumeIsActive Set"
  kind: "action"
  command: "SwitchableMicVolumeIsActive {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "Activate/deactivate SwitchableMicVolume; called Mic Loudspeaker Mute in CM and the CU display. Relative changes are not allowed."
  description: "Activate/deactivate SwitchableMicVolume; called Mic Loudspeaker Mute in CM and the CU display. Source: printed p. 17."
- id: "switchable_mic_volume_is_active_query"
  label: "SwitchableMicVolumeIsActive Get"
  kind: "query"
  command: "SwitchableMicVolumeIsActive;"
  params: []
  description: "Read current value. Activate/deactivate SwitchableMicVolume; called Mic Loudspeaker Mute in CM and the CU display. Source: printed p. 17."
- id: "talk_time_expiration_hard_cut_off"
  label: "TalkTimeExpirationHardCutOff Set"
  kind: "action"
  command: "TalkTimeExpirationHardCutOff {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "1 switches off the microphone immediately when its talk time expires. Relative changes are not allowed."
  description: "1 switches off the microphone immediately when its talk time expires. Source: printed p. 17."
- id: "talk_time_expiration_hard_cut_off_query"
  label: "TalkTimeExpirationHardCutOff Get"
  kind: "query"
  command: "TalkTimeExpirationHardCutOff;"
  params: []
  description: "Read current value. 1 switches off the microphone immediately when its talk time expires. Source: printed p. 17."
- id: "talk_time_limit_is_active"
  label: "TalkTimeLimitIsActive Set"
  kind: "action"
  command: "TalkTimeLimitIsActive {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "1 limits talk time to the configured talk-time limit. Relative changes are not allowed."
  description: "1 limits talk time to the configured talk-time limit. Source: printed p. 17."
- id: "talk_time_limit_is_active_query"
  label: "TalkTimeLimitIsActive Get"
  kind: "query"
  command: "TalkTimeLimitIsActive;"
  params: []
  description: "Read current value. 1 limits talk time to the configured talk-time limit. Source: printed p. 17."
- id: "xlr_mix_minus_is_active"
  label: "XLRMixMinusIsActive Set"
  kind: "action"
  command: "XLRMixMinusIsActive {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "Activate/deactivate XLR Mix Minus mode. Relative changes are not allowed."
  description: "Activate/deactivate XLR Mix Minus mode. Source: printed p. 17."
- id: "xlr_mix_minus_is_active_query"
  label: "XLRMixMinusIsActive Get"
  kind: "query"
  command: "XLRMixMinusIsActive;"
  params: []
  description: "Read current value. Activate/deactivate XLR Mix Minus mode. Source: printed p. 17."
- id: "xlr_in_status"
  label: "XLRinStatus Set"
  kind: "action"
  command: "XLRinStatus {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "1 enables XLR input. Relative changes are not allowed."
  description: "1 enables XLR input. Source: printed p. 17."
- id: "xlr_in_status_query"
  label: "XLRinStatus Get"
  kind: "query"
  command: "XLRinStatus;"
  params: []
  description: "Read current value. 1 enables XLR input. Source: printed p. 17."
- id: "xlr_in_sensitivity"
  label: "XLRinSensitivity Set"
  kind: "action"
  command: "XLRinSensitivity {in_sens};"
  params:
    - name: "in_sens"
      type: "string"
      description: "Absolute decimal integer 1..25, or # followed by signed integer delta in index units (for example #1 or #-1). Relative-result handling outside the documented range is UNRESOLVED. XLR input-sensitivity index: dBU = 1.5 * (index - 13). 1=-18 dBU, 13=0 dBU, 25=+18 dBU."
  description: "XLR input-sensitivity index: dBU = 1.5 * (index - 13). 1=-18 dBU, 13=0 dBU, 25=+18 dBU. Source: printed p. 18."
- id: "xlr_in_sensitivity_query"
  label: "XLRinSensitivity Get"
  kind: "query"
  command: "XLRinSensitivity;"
  params: []
  description: "Read current value. XLR input-sensitivity index: dBU = 1.5 * (index - 13). 1=-18 dBU, 13=0 dBU, 25=+18 dBU. Source: printed p. 18."
- id: "xlr_in_eq_high"
  label: "XLRinEqHigh Set"
  kind: "action"
  command: "XLRinEqHigh {eq_high};"
  params:
    - name: "eq_high"
      type: "string"
      description: "Absolute decimal integer 1..25, or # followed by signed integer delta in index units (for example #1 or #-1). Relative-result handling outside the documented range is UNRESOLVED. XLR input high equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB)."
  description: "XLR input high equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB). Source: printed p. 19."
- id: "xlr_in_eq_high_query"
  label: "XLRinEqHigh Get"
  kind: "query"
  command: "XLRinEqHigh;"
  params: []
  description: "Read current value. XLR input high equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB). Source: printed p. 19."
- id: "xlr_in_eq_mid"
  label: "XLRinEqMid Set"
  kind: "action"
  command: "XLRinEqMid {eq_mid};"
  params:
    - name: "eq_mid"
      type: "string"
      description: "Absolute decimal integer 1..25, or # followed by signed integer delta in index units (for example #1 or #-1). Relative-result handling outside the documented range is UNRESOLVED. XLR input mid equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB)."
  description: "XLR input mid equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB). Source: printed p. 20."
- id: "xlr_in_eq_mid_query"
  label: "XLRinEqMid Get"
  kind: "query"
  command: "XLRinEqMid;"
  params: []
  description: "Read current value. XLR input mid equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB). Source: printed p. 20."
- id: "xlr_in_eq_low"
  label: "XLRinEqLow Set"
  kind: "action"
  command: "XLRinEqLow {eq_low};"
  params:
    - name: "eq_low"
      type: "string"
      description: "Absolute decimal integer 1..25, or # followed by signed integer delta in index units (for example #1 or #-1). Relative-result handling outside the documented range is UNRESOLVED. XLR input low equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB)."
  description: "XLR input low equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB). Source: printed p. 21."
- id: "xlr_in_eq_low_query"
  label: "XLRinEqLow Get"
  kind: "query"
  command: "XLRinEqLow;"
  params: []
  description: "Read current value. XLR input low equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB). Source: printed p. 21."
- id: "xlr_out_status"
  label: "XLRoutStatus Set"
  kind: "action"
  command: "XLRoutStatus {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "1 enables XLR output. Relative changes are not allowed."
  description: "1 enables XLR output. Source: printed p. 21."
- id: "xlr_out_status_query"
  label: "XLRoutStatus Get"
  kind: "query"
  command: "XLRoutStatus;"
  params: []
  description: "Read current value. 1 enables XLR output. Source: printed p. 21."
- id: "xlr_out_volume"
  label: "XLRoutVolume Set"
  kind: "action"
  command: "XLRoutVolume {out_vol};"
  params:
    - name: "out_vol"
      type: "string"
      description: "Absolute decimal integer 1..32, or # followed by signed integer delta in index units (for example #1 or #-1). Relative-result handling outside the documented range is UNRESOLVED. XLR output-volume index: table dB = index - 21 (1=-20 dB, 21=0 dB, 32=+11 dB). UNRESOLVED: source prose calls the unit dBU while its enumeration uses dB; no conversion is inferred."
  description: "XLR output-volume index: table dB = index - 21 (1=-20 dB, 21=0 dB, 32=+11 dB). UNRESOLVED: source prose calls the unit dBU while its enumeration uses dB; no conversion is inferred. Source: printed p. 22."
- id: "xlr_out_volume_query"
  label: "XLRoutVolume Get"
  kind: "query"
  command: "XLRoutVolume;"
  params: []
  description: "Read current value. XLR output-volume index: table dB = index - 21 (1=-20 dB, 21=0 dB, 32=+11 dB). UNRESOLVED: source prose calls the unit dBU while its enumeration uses dB; no conversion is inferred. Source: printed p. 22."
- id: "xlr_out_eq_high"
  label: "XLRoutEqHigh Set"
  kind: "action"
  command: "XLRoutEqHigh {eq_high};"
  params:
    - name: "eq_high"
      type: "string"
      description: "Absolute decimal integer 1..25, or # followed by signed integer delta in index units (for example #1 or #-1). Relative-result handling outside the documented range is UNRESOLVED. XLR output high equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB)."
  description: "XLR output high equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB). Source: printed p. 23."
- id: "xlr_out_eq_high_query"
  label: "XLRoutEqHigh Get"
  kind: "query"
  command: "XLRoutEqHigh;"
  params: []
  description: "Read current value. XLR output high equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB). Source: printed p. 23."
- id: "xlr_out_eq_mid"
  label: "XLRoutEqMid Set"
  kind: "action"
  command: "XLRoutEqMid {eq_mid};"
  params:
    - name: "eq_mid"
      type: "string"
      description: "Absolute decimal integer 1..25, or # followed by signed integer delta in index units (for example #1 or #-1). Relative-result handling outside the documented range is UNRESOLVED. XLR output mid equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB)."
  description: "XLR output mid equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB). Source: printed p. 24."
- id: "xlr_out_eq_mid_query"
  label: "XLRoutEqMid Get"
  kind: "query"
  command: "XLRoutEqMid;"
  params: []
  description: "Read current value. XLR output mid equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB). Source: printed p. 24."
- id: "xlr_out_eq_low"
  label: "XLRoutEqLow Set"
  kind: "action"
  command: "XLRoutEqLow {eq_low};"
  params:
    - name: "eq_low"
      type: "string"
      description: "Absolute decimal integer 1..25, or # followed by signed integer delta in index units (for example #1 or #-1). Relative-result handling outside the documented range is UNRESOLVED. XLR output low equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB)."
  description: "XLR output low equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB). Source: printed p. 25."
- id: "xlr_out_eq_low_query"
  label: "XLRoutEqLow Get"
  kind: "query"
  command: "XLRoutEqLow;"
  params: []
  description: "Read current value. XLR output low equalizer. Equalizer index 1..25: dB = 13 - index (1=+12 dB, 13=0 dB, 25=-12 dB). Source: printed p. 25."
- id: "xlr_out_feedback_suppression"
  label: "XLROutFeedbackSuppression Set"
  kind: "action"
  command: "XLROutFeedbackSuppression {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 1
      max: 3
      description: "XLR output feedback suppression: 1=Off, 2=LowIntensity, 3=HighIntensity. Preserve uppercase O in XLROut. Relative changes are not allowed."
  description: "XLR output feedback suppression: 1=Off, 2=LowIntensity, 3=HighIntensity. Preserve uppercase O in XLROut. Source: printed p. 25."
- id: "xlr_out_feedback_suppression_query"
  label: "XLROutFeedbackSuppression Get"
  kind: "query"
  command: "XLROutFeedbackSuppression;"
  params: []
  description: "Read current value. XLR output feedback suppression: 1=Off, 2=LowIntensity, 3=HighIntensity. Preserve uppercase O in XLROut. Source: printed p. 25."
- id: "hd_record_error_query"
  label: "HdRecordError Get"
  kind: "query"
  command: "HdRecordError;"
  params: []
  description: "Read current value. 1 means recording is active and a hard-disk error exists; always 0 when recording is inactive. Source: printed p. 13."
- id: "lapsed_talk_time_query"
  label: "LapsedTalkTime Get"
  kind: "query"
  command: "LapsedTalkTime {bus_pos};"
  params:
    - name: "bus_pos"
      type: "integer"
      min: 0
      description: "Wired microphone bus position; source explicitly allows minimum 0 here."
  description: "Read current value. Lapsed microphone talk time in seconds. Source BusPos minimum is 0 for this command, unlike MicStatus and MicButton. Source: printed p. 13."
- id: "lapsed_talk_time_sn_query"
  label: "LapsedTalkTimeSN Get"
  kind: "query"
  command: "LapsedTalkTimeSN {serial_number};"
  params:
    - name: "serial_number"
      type: "string"
      description: "Identification code plus six decimal digits; see Notes. Required target identifier."
  description: "Read current value. Lapsed microphone talk time in seconds; source gives wired serial example D1100023. Source: printed p. 13."
- id: "mic_battery_status_query"
  label: "MicBatteryStatus Get"
  kind: "query"
  command: "MicBatteryStatus {serial_number};"
  params:
    - name: "serial_number"
      type: "string"
      description: "Identification code plus six decimal digits; see Notes. Required target identifier."
  description: "Read current value. Remaining microphone battery power in percent. Source: printed p. 14."
- id: "mic_ext_power_supply_query"
  label: "MicExtPowerSupply Get"
  kind: "query"
  command: "MicExtPowerSupply {serial_number};"
  params:
    - name: "serial_number"
      type: "string"
      description: "Wireless speaking unit identifier: C1W or D1W followed by six decimal digits."
  description: "Read current value. Wireless speaking-unit external power supply: 1=present, 0=absent. Source: printed p. 14."
- id: "mic_rf_status_query"
  label: "MicRfStatus Get"
  kind: "query"
  command: "MicRfStatus {serial_number};"
  params:
    - name: "serial_number"
      type: "string"
      description: "Wireless speaking unit identifier: C1W or D1W followed by six decimal digits."
  description: "Read current value. Wireless speaking-unit RF status in percent. Source: printed p. 14."
- id: "mic_status_query"
  label: "MicStatus Get"
  kind: "query"
  command: "MicStatus {bus_pos};"
  params:
    - name: "bus_pos"
      type: "integer"
      min: 1
      description: "Wired microphone bus position; source gives no maximum."
  description: "Read current value. 1=SU_MicOn, 2=SU_MicOnMuted, 3=SU_MicOnPremonition, 4=SU_MicOnPremonitionMuted, 5=SU_MicOnOverrun, 6=SU_MicOnOverrunMuted, 7=SU_MicOff, 8=SU_MicOffRequest, 9=SU_MappingMode, 10=SU_ServiceCalibrateMic, 11=SU_MappingModeRequest. Source: printed p. 15."
- id: "mic_status_sn_query"
  label: "MicStatusSN Get"
  kind: "query"
  command: "MicStatusSN {serial_number};"
  params:
    - name: "serial_number"
      type: "string"
      description: "Identification code plus six decimal digits; see Notes. Required target identifier."
  description: "Read current value. Status by serial number; source includes wired example D1100023. 1=SU_MicOn, 2=SU_MicOnMuted, 3=SU_MicOnPremonition, 4=SU_MicOnPremonitionMuted, 5=SU_MicOnOverrun, 6=SU_MicOnOverrunMuted, 7=SU_MicOff, 8=SU_MicOffRequest, 9=SU_MappingMode, 10=SU_ServiceCalibrateMic, 11=SU_MappingModeRequest. Source: printed p. 15."
```

## Feedbacks
```yaml
- id: "am_rf_channel_update"
  type: "message"
  pattern: "AmRfChannel {serial_number} {rf_channel};"
  params:
    - name: "serial_number"
      type: "string"
      description: "Antenna module identifier: AM followed by six decimal digits (for example AM100001)."
    - name: "rf_channel"
      type: "integer"
      min: 1
      max: 31
      description: "Returned decimal integer; domain and meaning as documented in am_rf_channel."
  description: "Get response and unsolicited update; printed p. 8. See am_rf_channel for value meanings."
- id: "am_rf_output_power_update"
  type: "message"
  pattern: "AmRfOutputPower {serial_number} {rf_output_power};"
  params:
    - name: "serial_number"
      type: "string"
      description: "Antenna module identifier: AM followed by six decimal digits (for example AM100001)."
    - name: "rf_output_power"
      type: "integer"
      min: 1
      max: 6
      description: "Returned decimal integer; domain and meaning as documented in am_rf_output_power."
  description: "Get response and unsolicited update; printed p. 8. See am_rf_output_power for value meanings."
- id: "auto_freq_selection_update"
  type: "message"
  pattern: "AutoFreqSelection {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "Returned decimal integer; domain and meaning as documented in auto_freq_selection."
  description: "Get response and unsolicited update; printed p. 9. See auto_freq_selection for value meanings."
- id: "blink_on_req_update"
  type: "message"
  pattern: "BlinkOnReq {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "Returned decimal integer; domain and meaning as documented in blink_on_req."
  description: "Get response and unsolicited update; printed p. 9. See blink_on_req for value meanings."
- id: "clear_does_clean_request_list_update"
  type: "message"
  pattern: "ClearDoesCleanRequestList {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "Returned decimal integer; domain and meaning as documented in clear_does_clean_request_list."
  description: "Get response and unsolicited update; printed p. 9. See clear_does_clean_request_list for value meanings."
- id: "conference_mode_update"
  type: "message"
  pattern: "ConferenceMode {conf_mode};"
  params:
    - name: "conf_mode"
      type: "integer"
      min: 1
      max: 4
      description: "Returned decimal integer; domain and meaning as documented in conference_mode."
  description: "Get response and unsolicited update; printed p. 9. See conference_mode for value meanings."
- id: "enable_su_w_shutdown_update"
  type: "message"
  pattern: "EnableSUwShutdown {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "Returned decimal integer; domain and meaning as documented in enable_su_w_shutdown."
  description: "Get response and unsolicited update; printed p. 9. See enable_su_w_shutdown for value meanings."
- id: "floor_equalizer_high_update"
  type: "message"
  pattern: "FloorEqualizerHigh {eq_value};"
  params:
    - name: "eq_value"
      type: "integer"
      min: 1
      max: 25
      description: "Returned decimal integer; domain and meaning as documented in floor_equalizer_high."
  description: "Get response and unsolicited update; printed p. 10. See floor_equalizer_high for value meanings."
- id: "floor_equalizer_mid_update"
  type: "message"
  pattern: "FloorEqualizerMid {eq_value};"
  params:
    - name: "eq_value"
      type: "integer"
      min: 1
      max: 25
      description: "Returned decimal integer; domain and meaning as documented in floor_equalizer_mid."
  description: "Get response and unsolicited update; printed p. 11. See floor_equalizer_mid for value meanings."
- id: "floor_equalizer_low_update"
  type: "message"
  pattern: "FloorEqualizerLow {eq_value};"
  params:
    - name: "eq_value"
      type: "integer"
      min: 1
      max: 25
      description: "Returned decimal integer; domain and meaning as documented in floor_equalizer_low."
  description: "Get response and unsolicited update; printed p. 12. See floor_equalizer_low for value meanings."
- id: "floor_mix_update"
  type: "message"
  pattern: "FloorMix {floor_mix};"
  params:
    - name: "floor_mix"
      type: "integer"
      min: 1
      max: 8
      description: "Returned decimal integer; domain and meaning as documented in floor_mix."
  description: "Get response and unsolicited update; printed p. 12. See floor_mix for value meanings."
- id: "floor_volume_update"
  type: "message"
  pattern: "FloorVolume {volume};"
  params:
    - name: "volume"
      type: "integer"
      min: 0
      max: 32
      description: "Returned decimal integer; domain and meaning as documented in floor_volume."
  description: "Get response and unsolicited update; printed p. 12. See floor_volume for value meanings."
- id: "hd_record_is_active_update"
  type: "message"
  pattern: "HdRecordIsActive {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "Returned decimal integer; domain and meaning as documented in hd_record_is_active."
  description: "Get response and unsolicited update; printed p. 13. See hd_record_is_active for value meanings."
- id: "limit_of_talk_time_update"
  type: "message"
  pattern: "LimitOfTalkTime {limit_tt};"
  params:
    - name: "limit_tt"
      type: "integer"
      min: 0
      max: 60
      description: "Returned decimal integer; domain and meaning as documented in limit_of_talk_time."
  description: "Get response and unsolicited update; printed p. 13. See limit_of_talk_time for value meanings."
- id: "max_open_mic_update"
  type: "message"
  pattern: "MaxOpenMic {max_num};"
  params:
    - name: "max_num"
      type: "integer"
      min: 1
      max: 10
      description: "Returned decimal integer; domain and meaning as documented in max_open_mic."
  description: "Get response and unsolicited update; printed p. 13. See max_open_mic for value meanings."
- id: "max_speak_req_list_length_update"
  type: "message"
  pattern: "MaxSpeakReqListLength {max_num};"
  params:
    - name: "max_num"
      type: "integer"
      min: 1
      max: 10
      description: "Returned decimal integer; domain and meaning as documented in max_speak_req_list_length."
  description: "Get response and unsolicited update; printed p. 14. See max_speak_req_list_length for value meanings."
- id: "open_access_mode_update"
  type: "message"
  pattern: "OpenAccessMode {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "Returned decimal integer; domain and meaning as documented in open_access_mode."
  description: "Get response and unsolicited update; printed p. 15. See open_access_mode for value meanings."
- id: "premonition_time_update"
  type: "message"
  pattern: "PremonitionTime {prem_sec};"
  params:
    - name: "prem_sec"
      type: "integer"
      min: 1
      max: 13
      description: "Returned decimal integer; domain and meaning as documented in premonition_time."
  description: "Get response and unsolicited update; printed p. 16. See premonition_time for value meanings."
- id: "speaker_feedback_suppression_update"
  type: "message"
  pattern: "SpeakerFeedbackSuppression {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 1
      max: 3
      description: "Returned decimal integer; domain and meaning as documented in speaker_feedback_suppression."
  description: "Get response and unsolicited update; printed p. 17. See speaker_feedback_suppression for value meanings."
- id: "switchable_mic_volume_is_active_update"
  type: "message"
  pattern: "SwitchableMicVolumeIsActive {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "Returned decimal integer; domain and meaning as documented in switchable_mic_volume_is_active."
  description: "Get response and unsolicited update; printed p. 17. See switchable_mic_volume_is_active for value meanings."
- id: "talk_time_expiration_hard_cut_off_update"
  type: "message"
  pattern: "TalkTimeExpirationHardCutOff {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "Returned decimal integer; domain and meaning as documented in talk_time_expiration_hard_cut_off."
  description: "Get response and unsolicited update; printed p. 17. See talk_time_expiration_hard_cut_off for value meanings."
- id: "talk_time_limit_is_active_update"
  type: "message"
  pattern: "TalkTimeLimitIsActive {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "Returned decimal integer; domain and meaning as documented in talk_time_limit_is_active."
  description: "Get response and unsolicited update; printed p. 17. See talk_time_limit_is_active for value meanings."
- id: "xlr_mix_minus_is_active_update"
  type: "message"
  pattern: "XLRMixMinusIsActive {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "Returned decimal integer; domain and meaning as documented in xlr_mix_minus_is_active."
  description: "Get response and unsolicited update; printed p. 17. See xlr_mix_minus_is_active for value meanings."
- id: "xlr_in_status_update"
  type: "message"
  pattern: "XLRinStatus {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "Returned decimal integer; domain and meaning as documented in xlr_in_status."
  description: "Get response and unsolicited update; printed p. 17. See xlr_in_status for value meanings."
- id: "xlr_in_sensitivity_update"
  type: "message"
  pattern: "XLRinSensitivity {in_sens};"
  params:
    - name: "in_sens"
      type: "integer"
      min: 1
      max: 25
      description: "Returned decimal integer; domain and meaning as documented in xlr_in_sensitivity."
  description: "Get response and unsolicited update; printed p. 18. See xlr_in_sensitivity for value meanings."
- id: "xlr_in_eq_high_update"
  type: "message"
  pattern: "XLRinEqHigh {eq_high};"
  params:
    - name: "eq_high"
      type: "integer"
      min: 1
      max: 25
      description: "Returned decimal integer; domain and meaning as documented in xlr_in_eq_high."
  description: "Get response and unsolicited update; printed p. 19. See xlr_in_eq_high for value meanings."
- id: "xlr_in_eq_mid_update"
  type: "message"
  pattern: "XLRinEqMid {eq_mid};"
  params:
    - name: "eq_mid"
      type: "integer"
      min: 1
      max: 25
      description: "Returned decimal integer; domain and meaning as documented in xlr_in_eq_mid."
  description: "Get response and unsolicited update; printed p. 20. See xlr_in_eq_mid for value meanings."
- id: "xlr_in_eq_low_update"
  type: "message"
  pattern: "XLRinEqLow {eq_low};"
  params:
    - name: "eq_low"
      type: "integer"
      min: 1
      max: 25
      description: "Returned decimal integer; domain and meaning as documented in xlr_in_eq_low."
  description: "Get response and unsolicited update; printed p. 21. See xlr_in_eq_low for value meanings."
- id: "xlr_out_status_update"
  type: "message"
  pattern: "XLRoutStatus {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 0
      max: 1
      description: "Returned decimal integer; domain and meaning as documented in xlr_out_status."
  description: "Get response and unsolicited update; printed p. 21. See xlr_out_status for value meanings."
- id: "xlr_out_volume_update"
  type: "message"
  pattern: "XLRoutVolume {out_vol};"
  params:
    - name: "out_vol"
      type: "integer"
      min: 1
      max: 32
      description: "Returned decimal integer; domain and meaning as documented in xlr_out_volume."
  description: "Get response and unsolicited update; printed p. 22. See xlr_out_volume for value meanings."
- id: "xlr_out_eq_high_update"
  type: "message"
  pattern: "XLRoutEqHigh {eq_high};"
  params:
    - name: "eq_high"
      type: "integer"
      min: 1
      max: 25
      description: "Returned decimal integer; domain and meaning as documented in xlr_out_eq_high."
  description: "Get response and unsolicited update; printed p. 23. See xlr_out_eq_high for value meanings."
- id: "xlr_out_eq_mid_update"
  type: "message"
  pattern: "XLRoutEqMid {eq_mid};"
  params:
    - name: "eq_mid"
      type: "integer"
      min: 1
      max: 25
      description: "Returned decimal integer; domain and meaning as documented in xlr_out_eq_mid."
  description: "Get response and unsolicited update; printed p. 24. See xlr_out_eq_mid for value meanings."
- id: "xlr_out_eq_low_update"
  type: "message"
  pattern: "XLRoutEqLow {eq_low};"
  params:
    - name: "eq_low"
      type: "integer"
      min: 1
      max: 25
      description: "Returned decimal integer; domain and meaning as documented in xlr_out_eq_low."
  description: "Get response and unsolicited update; printed p. 25. See xlr_out_eq_low for value meanings."
- id: "xlr_out_feedback_suppression_update"
  type: "message"
  pattern: "XLROutFeedbackSuppression {enable};"
  params:
    - name: "enable"
      type: "integer"
      min: 1
      max: 3
      description: "Returned decimal integer; domain and meaning as documented in xlr_out_feedback_suppression."
  description: "Get response and unsolicited update; printed p. 25. See xlr_out_feedback_suppression for value meanings."
- id: "hd_record_error_update"
  type: "message"
  pattern: "HdRecordError {error};"
  params:
    - name: "error"
      type: "integer"
      min: 0
      max: 1
      description: "Returned decimal integer; domain and meaning as documented in hd_record_error_query."
  description: "Get response and unsolicited update; printed p. 13. See hd_record_error_query for value meanings."
- id: "lapsed_talk_time_update"
  type: "message"
  pattern: "LapsedTalkTime {bus_pos} {lapsed_tt};"
  params:
    - name: "bus_pos"
      type: "integer"
      min: 0
      description: "Wired microphone bus position; source explicitly allows minimum 0 here."
    - name: "lapsed_tt"
      type: "integer"
      min: 0
      description: "Returned decimal integer; domain and meaning as documented in lapsed_talk_time_query."
  description: "Get response and unsolicited update; printed p. 13. See lapsed_talk_time_query for value meanings."
- id: "lapsed_talk_time_sn_update"
  type: "message"
  pattern: "LapsedTalkTimeSN {serial_number} {lapsed_tt};"
  params:
    - name: "serial_number"
      type: "string"
      description: "Identification code plus six decimal digits; see Notes. Required target identifier."
    - name: "lapsed_tt"
      type: "integer"
      min: 0
      description: "Returned decimal integer; domain and meaning as documented in lapsed_talk_time_sn_query."
  description: "Get response and unsolicited update; printed p. 13. See lapsed_talk_time_sn_query for value meanings."
- id: "mic_battery_status_update"
  type: "message"
  pattern: "MicBatteryStatus {serial_number} {mic_battery_status};"
  params:
    - name: "serial_number"
      type: "string"
      description: "Identification code plus six decimal digits; see Notes. Required target identifier."
    - name: "mic_battery_status"
      type: "integer"
      min: 0
      max: 100
      description: "Returned decimal integer; domain and meaning as documented in mic_battery_status_query."
  description: "Get response and unsolicited update; printed p. 14. See mic_battery_status_query for value meanings."
- id: "mic_ext_power_supply_update"
  type: "message"
  pattern: "MicExtPowerSupply {serial_number} {ext_power_supply};"
  params:
    - name: "serial_number"
      type: "string"
      description: "Wireless speaking unit identifier: C1W or D1W followed by six decimal digits."
    - name: "ext_power_supply"
      type: "integer"
      min: 0
      max: 1
      description: "Returned decimal integer; domain and meaning as documented in mic_ext_power_supply_query."
  description: "Get response and unsolicited update; printed p. 14. See mic_ext_power_supply_query for value meanings."
- id: "mic_rf_status_update"
  type: "message"
  pattern: "MicRfStatus {serial_number} {rf_status};"
  params:
    - name: "serial_number"
      type: "string"
      description: "Wireless speaking unit identifier: C1W or D1W followed by six decimal digits."
    - name: "rf_status"
      type: "integer"
      min: 0
      max: 100
      description: "Returned decimal integer; domain and meaning as documented in mic_rf_status_query."
  description: "Get response and unsolicited update; printed p. 14. See mic_rf_status_query for value meanings."
- id: "mic_status_update"
  type: "message"
  pattern: "MicStatus {bus_pos} {mic_status};"
  params:
    - name: "bus_pos"
      type: "integer"
      min: 1
      description: "Wired microphone bus position; source gives no maximum."
    - name: "mic_status"
      type: "integer"
      min: 1
      max: 11
      description: "Returned decimal integer; domain and meaning as documented in mic_status_query."
  description: "Get response and unsolicited update; printed p. 15. See mic_status_query for value meanings."
- id: "mic_status_sn_update"
  type: "message"
  pattern: "MicStatusSN {serial_number} {mic_status};"
  params:
    - name: "serial_number"
      type: "string"
      description: "Identification code plus six decimal digits; see Notes. Required target identifier."
    - name: "mic_status"
      type: "integer"
      min: 1
      max: 11
      description: "Returned decimal integer; domain and meaning as documented in mic_status_sn_query."
  description: "Get response and unsolicited update; printed p. 15. See mic_status_sn_query for value meanings."
- id: "error_response"
  type: "message"
  pattern: "error {code}: {text};"
  params:
    - name: "code"
      type: "integer"
      min: 1000
      max: 1070
      description: "Only enumerated codes are documented."
    - name: "text"
      type: "string"
      description: "Exact error text corresponding to the code."
  values:
    - "1000: invalid command"
    - "1010: invalid parameter"
    - "1020: value out of range"
    - "1030: relative parameter is not supported"
    - "1040: invalid number of parameters"
    - "1050: get request not allowed"
    - "1060: set request not allowed"
    - "1070: processing of request currently not possible"
  description: "Invalid command response; printed pp. 4 and 26. No error recovery sequence is specified."
```

## Variables
```yaml
- id: "am_rf_channel"
  type: "integer"
  description: "State from am_rf_channel_update feedback. Addressed per serial_number."
  range:
    - 1
    - 31
- id: "am_rf_output_power"
  type: "integer"
  description: "State from am_rf_output_power_update feedback. Addressed per serial_number."
  range:
    - 1
    - 6
- id: "auto_freq_selection"
  type: "integer"
  description: "State from auto_freq_selection_update feedback."
  range:
    - 0
    - 1
- id: "blink_on_req"
  type: "integer"
  description: "State from blink_on_req_update feedback."
  range:
    - 0
    - 1
- id: "clear_does_clean_request_list"
  type: "integer"
  description: "State from clear_does_clean_request_list_update feedback."
  range:
    - 0
    - 1
- id: "conference_mode"
  type: "integer"
  description: "State from conference_mode_update feedback."
  range:
    - 1
    - 4
- id: "enable_su_w_shutdown"
  type: "integer"
  description: "State from enable_su_w_shutdown_update feedback."
  range:
    - 0
    - 1
- id: "floor_equalizer_high"
  type: "integer"
  description: "State from floor_equalizer_high_update feedback."
  range:
    - 1
    - 25
- id: "floor_equalizer_mid"
  type: "integer"
  description: "State from floor_equalizer_mid_update feedback."
  range:
    - 1
    - 25
- id: "floor_equalizer_low"
  type: "integer"
  description: "State from floor_equalizer_low_update feedback."
  range:
    - 1
    - 25
- id: "floor_mix"
  type: "integer"
  description: "State from floor_mix_update feedback."
  range:
    - 1
    - 8
- id: "floor_volume"
  type: "integer"
  description: "State from floor_volume_update feedback."
  range:
    - 0
    - 32
- id: "hd_record_is_active"
  type: "integer"
  description: "State from hd_record_is_active_update feedback."
  range:
    - 0
    - 1
- id: "limit_of_talk_time"
  type: "integer"
  description: "State from limit_of_talk_time_update feedback."
  range:
    - 0
    - 60
- id: "max_open_mic"
  type: "integer"
  description: "State from max_open_mic_update feedback."
  range:
    - 1
    - 10
- id: "max_speak_req_list_length"
  type: "integer"
  description: "State from max_speak_req_list_length_update feedback."
  range:
    - 1
    - 10
- id: "open_access_mode"
  type: "integer"
  description: "State from open_access_mode_update feedback."
  range:
    - 0
    - 1
- id: "premonition_time"
  type: "integer"
  description: "State from premonition_time_update feedback."
  range:
    - 1
    - 13
- id: "speaker_feedback_suppression"
  type: "integer"
  description: "State from speaker_feedback_suppression_update feedback."
  range:
    - 1
    - 3
- id: "switchable_mic_volume_is_active"
  type: "integer"
  description: "State from switchable_mic_volume_is_active_update feedback."
  range:
    - 0
    - 1
- id: "talk_time_expiration_hard_cut_off"
  type: "integer"
  description: "State from talk_time_expiration_hard_cut_off_update feedback."
  range:
    - 0
    - 1
- id: "talk_time_limit_is_active"
  type: "integer"
  description: "State from talk_time_limit_is_active_update feedback."
  range:
    - 0
    - 1
- id: "xlr_mix_minus_is_active"
  type: "integer"
  description: "State from xlr_mix_minus_is_active_update feedback."
  range:
    - 0
    - 1
- id: "xlr_in_status"
  type: "integer"
  description: "State from xlr_in_status_update feedback."
  range:
    - 0
    - 1
- id: "xlr_in_sensitivity"
  type: "integer"
  description: "State from xlr_in_sensitivity_update feedback."
  range:
    - 1
    - 25
- id: "xlr_in_eq_high"
  type: "integer"
  description: "State from xlr_in_eq_high_update feedback."
  range:
    - 1
    - 25
- id: "xlr_in_eq_mid"
  type: "integer"
  description: "State from xlr_in_eq_mid_update feedback."
  range:
    - 1
    - 25
- id: "xlr_in_eq_low"
  type: "integer"
  description: "State from xlr_in_eq_low_update feedback."
  range:
    - 1
    - 25
- id: "xlr_out_status"
  type: "integer"
  description: "State from xlr_out_status_update feedback."
  range:
    - 0
    - 1
- id: "xlr_out_volume"
  type: "integer"
  description: "State from xlr_out_volume_update feedback."
  range:
    - 1
    - 32
- id: "xlr_out_eq_high"
  type: "integer"
  description: "State from xlr_out_eq_high_update feedback."
  range:
    - 1
    - 25
- id: "xlr_out_eq_mid"
  type: "integer"
  description: "State from xlr_out_eq_mid_update feedback."
  range:
    - 1
    - 25
- id: "xlr_out_eq_low"
  type: "integer"
  description: "State from xlr_out_eq_low_update feedback."
  range:
    - 1
    - 25
- id: "xlr_out_feedback_suppression"
  type: "integer"
  description: "State from xlr_out_feedback_suppression_update feedback."
  range:
    - 1
    - 3
- id: "hd_record_error"
  type: "integer"
  description: "State from hd_record_error_update feedback."
  range:
    - 0
    - 1
- id: "lapsed_talk_time"
  type: "integer"
  description: "State from lapsed_talk_time_update feedback. Addressed per bus_pos."
  min: 0
- id: "lapsed_talk_time_sn"
  type: "integer"
  description: "State from lapsed_talk_time_sn_update feedback. Addressed per serial_number."
  min: 0
- id: "mic_battery_status"
  type: "integer"
  description: "State from mic_battery_status_update feedback. Addressed per serial_number."
  range:
    - 0
    - 100
- id: "mic_ext_power_supply"
  type: "integer"
  description: "State from mic_ext_power_supply_update feedback. Addressed per serial_number."
  range:
    - 0
    - 1
- id: "mic_rf_status"
  type: "integer"
  description: "State from mic_rf_status_update feedback. Addressed per serial_number."
  range:
    - 0
    - 100
- id: "mic_status"
  type: "integer"
  description: "State from mic_status_update feedback. Addressed per bus_pos."
  range:
    - 1
    - 11
- id: "mic_status_sn"
  type: "integer"
  description: "State from mic_status_sn_update feedback. Addressed per serial_number."
  range:
    - 1
    - 11
```

## Events
```yaml
- id: "attribute_change"
  description: "CU sends the documented Update feedback whenever observable attributes change."
- id: "hd_record_error"
  description: "HdRecordError feedback reports hard-disk error state while recording is active."
```

## Macros
```yaml
[]
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Source: `docs/pdfs/sennheiser_adn_cu_1.pdf`, all 28 PDF pages (printed pp. 1–26 plus cover and imprint). Fresh layout extraction is retained with this draft; the cached Markdown omits several table rows. The glossary explicitly identifies CU as ADN CU1, AM as ADN-W AM, wired units as ADN C1 / ADN D1 and wireless units as ADN-W C1 / ADN-W D1. Firmware compatibility and authentication requirements are UNRESOLVED; publication date is not a firmware version.

Every command and response is an ASCII string terminated by semicolon. Spaces separate the keyword and parameters; the source allows a variable number of whitespace characters. Templates use one space and no additional CR/LF. Partial commands remain buffered until their semicolon arrives. Multiple commands can be concatenated, for example `FloorVolume 12;LimitOfTalkTime 21;`.

Get has no value parameter; targeted queries retain their bus position or serial number. Set includes its value and any target. All 34 Get/Update/Set families have separate Set and Get entries. The 8 Get/Update-only families do not gain invented setters; the 5 Set-only families do not gain invented queries. Updates are unsolicited on attribute changes. For successful attribute setters the update mechanism supplies feedback, including an echo when the value was already set; this does not establish generic echo replies for Set-only operations such as reinitialization or button presses.

Relative change is allowed only for the 17 setters explicitly marked allowed in the source: the three FloorEqualizer commands, FloorMix, FloorVolume, LimitOfTalkTime, MaxOpenMic, MaxSpeakReqListLength, PremonitionTime, XLRinSensitivity, the three XLRinEq commands, XLRoutVolume, and the three XLRoutEq commands. A relative setter uses the same command, with `#` immediately before a signed integer, for example `FloorVolume #1;` or `FloorVolume #-1;`. Absolute values and all returned values are decimal integers. Relative changes operate on the documented numeric index; they are not directly dB or seconds. Handling of an out-of-range relative result is UNRESOLVED.

Serial identifiers consist of the type prefix plus six decimal digits: `AM` antenna module, `C1` wired chairman, `D1` wired delegate, `C1W` wireless chairman, `D1W` wireless delegate. Examples: `AM100001`, `D1100004`, `C1W100001`, `D1W100017`. The source demonstrates wired serial-number addressing for MicButtonSN, MicStatusSN and LapsedTalkTimeSN, so those operations are not restricted to wireless units. For wired slave units the source says the response always uses EtherCat position; after `MicButtonSN D1100023;` its example is `MicStatus 1 1;`. Wireless examples use `MicStatusSN D1W100017 1;`. Consumers must accept the appropriate status feedback family rather than assume a button-command echo or response serial number.

On printed p. 14, MicButton and MicButtonSN are explicitly headed Set and demonstrated as virtual button requests, but their parameter-table column is labeled Required for get. This apparent source header typo is retained as an uncertainty; no Get variant is inferred. SetCUDateTime's prose example omits a semicolon, but the global mandatory command framing supplies it in the template. For XLRoutVolume the table labels its scale in dB while prose says dBU; the numeric index is unambiguous, the unit wording remains UNRESOLVED.

The IP address, subnet mask and standard gateway are configurable on the CU display. About 45 seconds after startup are needed before connection is possible. The manual says: “The frequency of messages (commands) sent to the CU should not exceed an average of about 100 ms to give the CU enough time for processing.” This is interpreted as guidance to space commands by about 100 ms on average, not a hard limit or timeout. It says “some hundred messages” are buffered but supplies no exact capacity. Connection count, reconnect policy, timeouts and physical serial control are UNRESOLVED. No hardware test was performed.

<!-- UNRESOLVED: Source does not specify safety interlocks, operator confirmation, or error recovery procedures. -->

## Provenance

```yaml
source_domains:
  - assets.sennheiser.com
source_urls:
  - "https://assets.sennheiser.com/download/assets/QG_ADNMediaCtrlProtocol_A02_EN.pdf/1f94ac1ce7b811f0bce7beb43c66122a?attachment=true"
retrieved_at: 2026-09-26T14:23:19.046Z
last_checked_at: 2026-09-26T14:23:19.046Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-26T14:23:19.046Z
matched_actions: 81
action_count: 81
confidence: medium
summary: "Independent complete primary-manual review:47 distinct wire mnemonics support81 Get/Set actions and42 Update families; all prior47 IDs, targeted parameters,17 relative domains,scaled indexes,TCP framing and model scope match; source ambiguities and firmware/auth unknowns remain explicit. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source prose calls the unit dBU while its enumeration uses dB; no conversion is inferred.\""
- "source prose calls the unit dBU while its enumeration uses dB; no conversion is inferred. Source: printed p. 22.\""
- "Source does not specify safety interlocks, operator confirmation, or error recovery procedures."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
